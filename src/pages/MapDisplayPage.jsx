import React, { useEffect, useRef, useCallback, useState } from "react"; 
import goongjs from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";
import toast from "react-hot-toast";
import ActivityPanel from "../components/map/ActivityPanel";
import { useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { calculateDistance } from "../lib/utils";

const GOONG_MAP_KEY = import.meta.env.VITE_GOONG_MAP_KEY;
const GOONG_API_KEY = import.meta.env.VITE_GOONG_API_KEY; 

goongjs.accessToken = GOONG_MAP_KEY;

const MapDisplayPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]); 
  const searchMarkerRef = useRef(null); 
  const userMarkerRef = useRef(null); 
  const [searchLocation, setSearchLocation] = useState(null);

  const navigate = useNavigate();
  const { t } = useLang();

  const initMap = useCallback((lng, lat) => {
    if (mapRef.current) return;

    mapRef.current = new goongjs.Map({
      container: mapContainerRef.current,
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [lng, lat],
      zoom: 13,
    });

    mapRef.current.addControl(new goongjs.NavigationControl(), "top-right");

    userMarkerRef.current = new goongjs.Marker({ color: "red" })
      .setLngLat([lng, lat])
      .setPopup(new goongjs.Popup().setHTML("Your location"))
      .addTo(mapRef.current);
      
    setSearchLocation({ lat, lng });
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Check Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          initMap(longitude, latitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error(t('cant_get_current_location'));
          initMap(105.85, 21.02);
        },
        { enableHighAccuracy: true } 
      );
    } else {
      toast.error("Trình duyệt không hỗ trợ định vị.");
      initMap(105.85, 21.02);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initMap]);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const addMarkerToMap = useCallback((lng, lat, placeData, popupHtml) => {
    if (!mapRef.current) return;

    const popup = new goongjs.Popup({ offset: 25 }).setHTML(popupHtml);

    const marker = new goongjs.Marker({ color: "#3B82F6" })
      .setLngLat([lng, lat])
      .setPopup(popup) 
      .addTo(mapRef.current);
    
    const markerElement = marker.getElement();
    markerElement.style.cursor = 'pointer'; 
    
    markerElement.addEventListener('click', () => {
      const safeType = encodeURIComponent('node'); 
      const dataToSend = {
        place_id: placeData.place_id,
        name: placeData.name,
        address: placeData.formatted_address,
        sports: placeData.types
      }

      navigate(`/list/${safeType}/${placeData.place_id}`, { 
        state: { existingData: dataToSend } 
      });
    });
    
    markersRef.current.push(marker);
  }, [navigate]); 

  const handleSearch = async (text) => {
    if (!text.trim()) return;
    try {
      const searchUrl = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&input=${encodeURIComponent(text)}`;
      const res = await fetch(searchUrl);
      const data = await res.json();

      if (data.predictions?.[0]) {
        const placeId = data.predictions[0].place_id;
        const detailUrl = `https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${placeId}`;
        const resDetail = await fetch(detailUrl);
        const dataDetail = await resDetail.json();
        
        const { lat, lng } = dataDetail.result.geometry.location;
        setSearchLocation({ lat, lng });

        if (searchMarkerRef.current) searchMarkerRef.current.remove();
        markersRef.current.forEach(m => m.remove());
        markersRef.current = [];

        const content = `<b>${dataDetail.result.name}</b><br/>${dataDetail.result.formatted_address}`;
        searchMarkerRef.current = new goongjs.Marker({ color: "orange" })
          .setLngLat([lng, lat])
          .setPopup(new goongjs.Popup({ offset: 25 }).setHTML(content))
          .addTo(mapRef.current);

        mapRef.current.flyTo({ center: [lng, lat], zoom: 15, essential: true });
      } else {
        toast.error(t('cant_find_location'));
      }
    } catch (e) { 
      console.error(e);
      toast.error(t('cant_find_location'));
    }
  };

  const handleActivityClick = async (label) => {
    if (!mapRef.current) return;
    
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Ưu tiên vị trí tìm kiếm (marker vàng) nếu có, không thì dùng vị trí hiện tại (marker đỏ)
    const referenceLocation = searchMarkerRef.current 
      ? { lat: searchMarkerRef.current.getLngLat().lat, lng: searchMarkerRef.current.getLngLat().lng }
      : (userMarkerRef.current 
          ? { lat: userMarkerRef.current.getLngLat().lat, lng: userMarkerRef.current.getLngLat().lng }
          : { lat: mapRef.current.getCenter().lat, lng: mapRef.current.getCenter().lng });

    try {
      const queries = [
        label,
        `${label} gần đây`,
        `${label} nearby`,
        `sân ${label}`,
        `khu ${label}`,
      ];

      const allPlaces = new Map(); 

      await Promise.all(
        queries.map(async (query) => {
          try {
            const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&location=${referenceLocation.lat},${referenceLocation.lng}&input=${encodeURIComponent(query)}&radius=15000`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.predictions?.length > 0) {
              const details = await Promise.all(
                data.predictions.map(async p => {
                  try {
                    const r = await fetch(`https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${p.place_id}`);
                    const detailData = await r.json();
                    return detailData.result;
                  } catch (e) {
                    return null;
                  }
                })
              );

              details.forEach(place => {
                if (place && place.geometry?.location && !allPlaces.has(place.place_id)) {
                  allPlaces.set(place.place_id, place);
                }
              });
            }
          } catch (e) {
            console.error(`Error searching with query "${query}":`, e);
          }
        })
      );

      const placesArray = Array.from(allPlaces.values());

      if (placesArray.length > 0) {
        const placesWithDistance = placesArray
          .map(place => {
            const { lat, lng } = place.geometry.location;
            const distance = calculateDistance(referenceLocation.lat, referenceLocation.lng, lat, lng);
            return { place, distance };
          })
          .filter(item => item.distance <= 20);

        // Sắp xếp theo khoảng cách
        placesWithDistance.sort((a, b) => a.distance - b.distance);

        // Lấy tối đa 20 địa điểm gần nhất
        const nearbyPlaces = placesWithDistance.slice(0, 20);

        if (nearbyPlaces.length > 0) {
          nearbyPlaces.forEach(({ place, distance }) => {
            const { lat, lng } = place.geometry.location;
            const content = `<b>${place.name}</b><br/>${place.formatted_address}<br/><small>${distance.toFixed(2)} km</small>`;
            addMarkerToMap(lng, lat, place, content);
          });
          toast.success(t('find_places')(nearbyPlaces.length));
        } else {
          toast.error(t('cant_find_activity')(label));
        }
      } else {
        toast.error(t('cant_find_activity')(label));
      }
    } catch (e) { 
      console.error(e);
      toast.error('Có lỗi khi tìm kiếm địa điểm'); 
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-20 py-8 md:py-12 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{t('map')}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="w-full lg:w-2/3 xl:w-3/4 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <div ref={mapContainerRef} className="w-full h-80 sm:h-[420px] md:h-[520px] lg:h-[640px]" />
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
          <ActivityPanel 
            onSearch={handleSearch} 
            onActivityClick={handleActivityClick} 
          />
        </div>
      </div>
    </div>
  );
};

export default MapDisplayPage;