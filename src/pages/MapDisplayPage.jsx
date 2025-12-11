import React, { useEffect, useRef, useCallback } from "react"; 
import goongjs from "@goongmaps/goong-js";
import "@goongmaps/goong-js/dist/goong-js.css";
import toast from "react-hot-toast";
import ActivityPanel from "../components/map/ActivityPanel";

const GOONG_MAP_KEY = import.meta.env.VITE_GOONG_MAP_KEY;
const GOONG_API_KEY = import.meta.env.VITE_GOONG_API_KEY; 

goongjs.accessToken = GOONG_MAP_KEY;

const MapDisplayPage = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;

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

    return () => mapRef.current.remove();
  }, []);

  const addMarkerToMap = useCallback((lng, lat, popupHtml) => {
      if (!mapRef.current) return;

      const popup = new goongjs.Popup({ offset: 25 }).setHTML(popupHtml);

      const marker = new goongjs.Marker({ color: "#3B82F6" })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(mapRef.current);
      
      markersRef.current.push(marker);

      mapRef.current.flyTo({ center: [lng, lat], zoom: 15, essential: true });
  }, []);

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
            
            markersRef.current.forEach(m => m.remove());
            markersRef.current = [];

            const { lat, lng } = dataDetail.result.geometry.location;
            const content = `<b>${dataDetail.result.name}</b><br/>${dataDetail.result.formatted_address}`;
            addMarkerToMap(lng, lat, content);
        } else {
            toast.error("No results found.");
        }
    } catch (e) { console.error(e); }
  };

  const handleActivityClick = async (label) => {
    if (!mapRef.current) return;
    
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const center = mapRef.current.getCenter();
    try {
      const url = `https://rsapi.goong.io/Place/AutoComplete?api_key=${GOONG_API_KEY}&location=${center.lat},${center.lng}&input=${encodeURIComponent(label)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.predictions?.length > 0) {
        const top5 = data.predictions.slice(0, 5);
        const details = await Promise.all(top5.map(async p => {
            const r = await fetch(`https://rsapi.goong.io/Place/Detail?api_key=${GOONG_API_KEY}&place_id=${p.place_id}`);
            return (await r.json()).result;
        }));

        details.forEach(place => {
            if(!place?.geometry) return;
            const { lat, lng } = place.geometry.location;
            const content = `<b>${place.name}</b><br/>${place.formatted_address}`;
            
            const popup = new goongjs.Popup({ offset: 25 }).setHTML(content);
            const marker = new goongjs.Marker({ color: "#3B82F6" }).setLngLat([lng, lat]).setPopup(popup).addTo(mapRef.current);
            markersRef.current.push(marker);
        });
      }
    } catch (e) { console.error(e); }
  };

  return (
    <div className="max-h-screen bg-white pl-32 pr-48 py-12 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">マップ</h1>
        <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="font-semibold text-black">Map</span>
            <span className="text-gray-300">|</span>
            <span>Satellite</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
        
        <div className="w-full lg:w-11/16 relative rounded-lg overflow-hidden border border-gray-200 shadow-sm transition-all">
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>

        <div className="w-full lg:w-5/16 shrink-0">
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