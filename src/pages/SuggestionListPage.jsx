import React, { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import FilterSidebar from "../components/suggestion/FilterSidebar";
import SpotCard from "../components/suggestion/SpotCard";
import SuggestionSkeleton from "../components/skeletons/SuggestionSkeleton";
import AddressModal from "../components/suggestion/AdressModal";
import { API } from "../lib/api";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "../lib/utils";
import { useLang } from "../context/LanguageContext";

const SuggestionListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedFilterPlace, setSelectedFilterPlace] = useState(null);
  const [isFetchingSpots, setIsFetchingSpots] = useState(false);

  const {t} = useLang();

  const userId = getUserIdFromToken()

  const fetchFilterPlace = useCallback(async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${API.FILTER_PLACES}?userId=${userId}`
      );
      const data = await res.json();
      setFilterPlaces(data);
    } catch (err) {
      console.error("Error fetching FilterPlace:", err);
      toast.error(err.message || t("error_getting_filter_place"));
    }
  }, [userId, t]);

  const fetchSpots = async (address) => {
    if (!address) return;
    setIsFetchingSpots(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${
          API.GYM.SEARCH_ADVANCED
        }?originAddress=${encodeURIComponent(address)}`
      );
      const spotData = await res.json();
      setSpots(spotData.data || []);
      setFilteredSpots(spotData.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || t("error_getting_suggestion_places")); 
    } finally {
      setIsFetchingSpots(false);
    }
  };

  useEffect(() => {
    fetchFilterPlace();
  }, [fetchFilterPlace]);

  const handleSelectFilter = (address) => {
    setSelectedFilterPlace(address);
    if(address) {
      fetchSpots(address);
    }
  };

  const handleFilterSpots = (text) => {
    const filtered = spots.filter((spot) =>
      spot?.name.toLowerCase().includes(text.toLowerCase()) ||
      spot?.address.toLowerCase().includes(text.toLowerCase()) ||
      spot?.sports.some((sport) => 
        sport.toLowerCase().includes(text.toLowerCase())
      )
    );
    setFilteredSpots(filtered);
  }

  const renderContent = () => {
    if (isFetchingSpots) {
      return (
        <div className="flex-1 space-y-4">
          <SuggestionSkeleton />
          <SuggestionSkeleton />
          <SuggestionSkeleton />
        </div>
      );
    }

    if (!selectedFilterPlace) {
      return (
        <div className="flex-1 flex justify-center mt-20 text-gray-500">
          {t("please_select_filter_place")} 
        </div>
      );
    }

    if (filteredSpots.length === 0) {
      return (
        <div className="flex-1 flex justify-center mt-20 text-gray-500">
          {spots.length === 0 
            ? t("no_suggestions") 
            : t("no_suggestions") 
          }
        </div>
      );
    }

    return (
      <div 
        className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 max-h-[60vh] md:max-h-[70vh] min-h-80" 
      >
        {filteredSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 py-6 md:py-8">
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFilterPlace}
        userId={userId}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 border-b border-gray-200 pb-4 gap-4">
        <h1 className="text-3xl font-bold text-gray-700">{t('suggest_list')}</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder={t('search')}
            className="w-full border-b border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500 text-sm bg-transparent"
            onChange={(e) => {
              handleFilterSpots(e.target.value);
            }}
          />
          <Search className="absolute right-2 top-1 text-gray-400" size={16} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <FilterSidebar
          filters={filterPlaces}
          onAddClick={() => setIsModalOpen(true)}
          selectedAddress={selectedFilterPlace}
          onSelectFilter={handleSelectFilter}
          onDeleteSucess={fetchFilterPlace}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default SuggestionListPage;
