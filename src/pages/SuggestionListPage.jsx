import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import FilterSidebar from "../components/suggestion/FilterSidebar";
import SpotCard from "../components/suggestion/SpotCard";
import AddressModal from "../components/suggestion/AdressModal";
import { API } from "../lib/api";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "../lib/utils";

const SuggestionListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedFilterPlace, setSelectedFilterPlace] = useState(null);
  const [isFetchingSpots, setIsFetchingSpots] = useState(false);

  const userId = getUserIdFromToken()

  const fetchFilterPlace = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${
          API.FILTER_PLACES
        }?userId=${userId}`
      );
      const data = await res.json();
      setFilterPlaces(data);
    } catch (err) {
      console.error("Error fetching FilterPlace:", err);
      toast.error(err.message || "Error fetching FilterPlace");
    }
  };

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
      toast.error(error.message || "Error fetching spots"); 
    } finally {
      setIsFetchingSpots(false);
    }
  };

  useEffect(() => {
    fetchFilterPlace();
  }, []);

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
        <div className="flex-1 flex justify-center mt-20 text-gray-500">
          読み込み中... 
        </div>
      );
    }

    if (!selectedFilterPlace) {
      return (
        <div className="flex-1 flex justify-center mt-20 text-gray-500">
            場所を選択してください 
        </div>
      );
    }

    if (filteredSpots.length === 0) {
      return (
        <div className="flex-1 flex justify-center mt-20 text-gray-500">
          {spots.length === 0 
            ? "提案がありません。" 
            : "検索結果が見つかりません" 
          }
        </div>
      );
    }

    return (
      <div 
        className="flex-1 overflow-y-auto pr-2 space-y-4 h-[550px]" 
      >
        {filteredSpots.map((spot) => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto pl-4 pr-12 py-8">
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFilterPlace}
        userId={userId}
      />

      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-700">提案リスト</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="検索"
            className="w-full border-b border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500 text-sm bg-transparent"
            onChange={(e) => {
              handleFilterSpots(e.target.value);
            }}
          />
          <Search className="absolute right-2 top-1 text-gray-400" size={16} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
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
