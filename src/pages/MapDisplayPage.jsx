import React, { useEffect, useRef, useCallback, useState } from "react"; 
import goongjs from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";
import toast from "react-hot-toast";
import ActivityPanel from "../components/map/ActivityPanel";
import { useNavigate } from "react-router-dom";

const GOONG_MAP_KEY = import.meta.env.VITE_GOONG_MAP_KEY;
const GOONG_API_KEY = import.meta.env.VITE_GOONG_API_KEY; 

goongjs.accessToken = GOONG_MAP_KEY;

const MapDisplayPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]); 
  const searchMarkerRef = useRef(null); 
  const [searchLocation, setSearchLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapRef.current = new goongjs.Map({
      container: mapContainerRef.current,
      style: "https://tiles.goong.io/assets/goong_map_web.json",
      center: [105.85, 21.02],
      zoom: 13,
    });

    mapRef.current.addControl(new goongjs.NavigationControl(), "top-right");

    new goongjs.Marker({ color: "red" })
      .setLngLat([105.85, 21.02])
      .setPopup(new goongjs.Popup().setHTML("Vị trí của bạn"))
      .addTo(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
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

          navigate(`/list/${safeType}/${placeData.place_id}`,{ 
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
            toast.error("Không tìm thấy kết quả.");
        }
    } catch (e) { 
        console.error(e);
        toast.error("Lỗi khi tìm kiếm địa điểm.");
    }
  };

  const handleActivityClick = async (label) => {
    if (!mapRef.current) return;
    
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const location = searchLocation || { 
        lat: mapRef.current.getCenter().lat, 
        lng: mapRef.current.getCenter().lng 
    };

    try {
      const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&location=${location.lat},${location.lng}&input=${encodeURIComponent(label)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.predictions?.length > 0) {
        const top5 = data.predictions.slice(0, 5);
        
        const details = await Promise.all(top5.map(async p => {
            const r = await fetch(`https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${p.place_id}`);
            const detailData = await r.json();
            return detailData.result;
        }));

        details.forEach(place => {
            if(!place?.geometry) return;
            const { lat, lng } = place.geometry.location;
            const content = `<b>${place.name}</b><br/>${place.formatted_address}`;
            addMarkerToMap(lng, lat, place, content);
        });
        
      } else {
          toast.error("Không tìm thấy hoạt động nào quanh đây.");
      }
    } catch (e) { 
        console.error(e); 
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 md:px-20 py-12 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Bản đồ địa điểm</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
        <div className="w-full lg:w-3/4 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
        <div className="w-full lg:w-1/4 shrink-0">
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