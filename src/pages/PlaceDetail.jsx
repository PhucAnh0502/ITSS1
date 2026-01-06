import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import toast from "react-hot-toast";
import { API, API_BASE_URL } from "../lib/api";
import { placeImages, filteredSpots as constantFilteredSpots } from "../constants";
import { useLang } from "../context/LanguageContext";
import { calculateDistance, createLocalSpotId } from "../lib/utils";

const PlaceDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [spotData, setSpotData] = useState(location.state?.existingData || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [calculatedDistance, setCalculatedDistance] = useState(null);

  const {t} = useLang();

  const [randomPlaceImages] = useState(() => {
    return [...placeImages].sort(() => 0.5 - Math.random()).slice(0, 5);
  });

  const [fallbackDistance] = useState(() => {
    return (Math.random() * 10).toFixed(2);
  });

  const imageUrls = useMemo(() => {
    if (spotData?.imageUrls?.length > 0) return spotData.imageUrls;
    return randomPlaceImages;
  }, [spotData, randomPlaceImages]);

  useEffect(() => {
    // Lấy vị trí hiện tại
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  useEffect(() => {
    // Tính khoảng cách khi có cả vị trí người dùng và spotData
    if (userLocation && spotData?.geometry?.location) {
      const { lat, lng } = spotData.geometry.location;
      const distance = calculateDistance(userLocation.lat, userLocation.lng, lat, lng);
      setCalculatedDistance(distance);
    }
  }, [userLocation, spotData]);

  const fetchSpotDetail = async () => {
    try {
      setLoading(true);
      const fullId = `${type}/${id}`;
      const encodedId = encodeURIComponent(fullId);
      const response = await fetch(
        `${API_BASE_URL}${API.GYM.PLACE_DETAIL(encodedId)}`
      );

      if (!response.ok) {
        const error = await response.text();
        let errorMessage = t('get_place_details_error');
        try {
          errorMessage = JSON.parse(error).message || errorMessage;
        } catch {
          errorMessage = error || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setSpotData(data.data);
    } catch (error) {
      console.error("Error fetching spot detail:", error);
      toast.error(t('get_place_details_error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (spotData) return;

    if (type === "local") {
      const localSpot = constantFilteredSpots
        .map((spot) => ({
          ...spot,
          id: createLocalSpotId(spot.filterId, spot.name),
          type: "local",
        }))
        .find((spot) => spot.id === id);

      if (localSpot) {
        setSpotData(localSpot);
        return;
      }
    }

    fetchSpotDetail();
  }, []);

  const nextImage = () => {
    if (imageUrls.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (imageUrls.length <= 1) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  if (loading) return <div className="p-10 text-center">{t('getting_place_details')}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 bg-white max-h-screen font-sans text-gray-800">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">{t('location_details')}</h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 relative group select-none">
          <div className="aspect-4/3 w-full overflow-hidden rounded-lg shadow-sm relative bg-gray-100">
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {imageUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Slide ${index}`}
                  className="min-w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400?text=No+Image";
                  }}
                />
              ))}
            </div>

            {imageUrls.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                >
                  <ChevronLeft className="text-white w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full hover:bg-black/50 transition opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                >
                  <ChevronRight className="text-white w-6 h-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {imageUrls.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${
                        index === currentImageIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/60 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            {spotData?.name}
          </h2>
          <p className="text-gray-400 text-lg mb-6">{spotData?.address || spotData?.description}</p>
          <p className="text-sm text-gray-700 leading-relaxed mb-6">
            {spotData?.description}
          </p>
          <div className="mb-8 font-bold text-gray-800">
            {t('type')} : {spotData?.sports?.join("、 ")}
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-2">{t('distance')} :</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  {t('from_work')}:{" "}
                  {calculatedDistance !== null
                    ? calculatedDistance.toFixed(2)
                    : (spotData?.distanceInMeters
                        ? (spotData.distanceInMeters / 1000).toFixed(2)
                        : fallbackDistance)}{" "}
                  km
                </p>
              </div>
            </div>
            <div className="relative">
              <h4 className="font-bold text-gray-800 mb-2">{t('opening_hours')} :</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>{spotData?.openingHours?.days || t('mon_to_sun')}</p>
                <p>{spotData?.openingHours?.time || "05:00 - 22:00"}</p>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  spotData?.address || spotData?.name || ""
                )}`}
                target="_blank"
                rel="noreferrer"
                className="absolute right-0 bottom-0 block w-10 h-10 hover:opacity-80 transition"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Google_Maps_icon_%282020%29.svg"
                  alt="Google Map"
                  className="w-full h-full object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#333333] text-white text-sm px-8 py-2 rounded-md hover:bg-black transition shadow-md"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default PlaceDetail;
