import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Search } from "lucide-react";
import FilterSidebar from "../components/suggestion/FilterSidebar";
import SpotCard from "../components/suggestion/SpotCard";
import SuggestionSkeleton from "../components/skeletons/SuggestionSkeleton";
import AddressModal from "../components/suggestion/AdressModal";
import { API } from "../lib/api";
import toast from "react-hot-toast";
import { getUserIdFromToken, createLocalSpotId } from "../lib/utils";
import { useLang } from "../context/LanguageContext";
import { filters as constantFilters, filteredSpots as constantFilteredSpots } from "../constants";

const SuggestionListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [spots, setSpots] = useState([]);
  const [filteredSpots, setFilteredSpots] = useState([]);
  const [selectedFilterPlace, setSelectedFilterPlace] = useState(null);
  const [isFetchingSpots, setIsFetchingSpots] = useState(false);
  const [workAdded, setWorkAdded] = useState(() => {
    try {
      return localStorage.getItem("workAdded") === "1";
    } catch {
      return false;
    }
  });

  const {t} = useLang();

  const userId = getUserIdFromToken()

  const WORK_FILTER_ID = "3";
  const normalizeAddress = useCallback((addr) => (addr || "").trim().toLowerCase(), []);

  const baseLocalFilters = useMemo(
    () => constantFilters
      .filter((f) => f.id !== WORK_FILTER_ID)
      .map((f) => ({ ...f, source: "local" })),
    []
  );

  const workFilter = useMemo(() => {
    const found = constantFilters.find((f) => f.id === WORK_FILTER_ID);
    return found ? { ...found, source: "local" } : null;
  }, []);

  const buildLocalSpots = useCallback((filterId) => {
    return constantFilteredSpots
      .filter((spot) => String(spot.filterId) === String(filterId))
      .map((spot) => ({
        ...spot,
        id: createLocalSpotId(spot.filterId, spot.name),
        type: "local",
      }));
  }, []);

  const mergeFilters = useCallback((apiFilters) => {
    const byAddress = new Map();

    baseLocalFilters.forEach((f) => {
      byAddress.set(normalizeAddress(f.address), f);
    });

    const shouldShowWork = workAdded && !!workFilter;
    if (shouldShowWork && workFilter) {
      byAddress.set(normalizeAddress(workFilter.address), workFilter);
    }

    const filteredApi = apiFilters.filter((f) => {
      if (!workFilter) return true;
      const isWorkAddr = normalizeAddress(f.address) === normalizeAddress(workFilter.address);
      return shouldShowWork ? true : !isWorkAddr;
    });

    filteredApi.forEach((f) => {
      const key = normalizeAddress(f.address);
      if (!byAddress.has(key)) {
        byAddress.set(key, { ...f, source: "api" });
      }
    });

    return Array.from(byAddress.values());
  }, [baseLocalFilters, workFilter, workAdded, normalizeAddress]);

  const fetchFilterPlace = useCallback(async () => {
    if (!userId) {
      setFilterPlaces(mergeFilters([]));
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${API.FILTER_PLACES}?userId=${userId}`
      );
      const data = await res.json();
      const apiFilters = Array.isArray(data) ? data : [];
      setFilterPlaces(mergeFilters(apiFilters));
    } catch (err) {
      console.error("Error fetching FilterPlace:", err);
      toast.error(err.message || t("error_getting_filter_place"));
      setFilterPlaces(mergeFilters([]));
    }
  }, [userId, t, mergeFilters]);

  const fetchSpots = async (filter) => {
    if (!filter) return;

    if (filter.source === "local") {
      const spotsFromLocal = buildLocalSpots(filter.id);
      setSpots(spotsFromLocal);
      setFilteredSpots(spotsFromLocal);
      return;
    }

    const address = filter.address;
    if (!address) return;
    setIsFetchingSpots(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}${
          API.GYM.SEARCH_ADVANCED
        }?originAddress=${encodeURIComponent(address)}`
      );
      const spotData = await res.json();
      const filteredData = (spotData.data || []).filter(spot => spot?.name !== "Phòng tập không tên");
      setSpots(filteredData);
      setFilteredSpots(filteredData);
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

  const handleSelectFilter = (filter) => {
    setSelectedFilterPlace(filter);
    if(filter) {
      fetchSpots(filter);
    }
  };

  const handleWorkAdded = useCallback(() => {
    setWorkAdded(true);
    try { localStorage.setItem("workAdded", "1"); } catch {}
    fetchFilterPlace();
  }, [fetchFilterPlace, t]);

  const handleWorkDeleted = useCallback(() => {
    setWorkAdded(false);
    try { localStorage.removeItem("workAdded"); } catch {}
    fetchFilterPlace();
  }, [fetchFilterPlace]);

  const handleFilterSpots = (text) => {
    const filtered = spots.filter((spot) =>
      spot?.name?.toLowerCase().includes(text.toLowerCase()) ||
      spot?.address?.toLowerCase().includes(text.toLowerCase()) ||
      spot?.sports?.some((sport) => 
        sport?.toLowerCase().includes(text.toLowerCase())
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
          <SpotCard key={spot.id || spot.osmId || spot.name} spot={spot} />
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
        onWorkAdded={handleWorkAdded}
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
          selectedFilter={selectedFilterPlace}
          onSelectFilter={handleSelectFilter}
          onDeleteSucess={fetchFilterPlace}
          onWorkDeleted={handleWorkDeleted}
        />
        {renderContent()}
      </div>
    </div>
  );
};

export default SuggestionListPage;
