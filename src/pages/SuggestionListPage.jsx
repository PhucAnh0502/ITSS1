import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import FilterSidebar from '../components/suggestion/FilterSidebar';
import SpotCard from '../components/suggestion/SpotCard';
import AddressModal from '../components/suggestion/AdressModal';

const USER_ID = "6353ad48-1b74-4cb6-c59a-08de2c394d5f";

const SuggestionListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [spots, setSpots] = useState([]);
  const fetchFilterPlace = async () => {
    try {
      const res = await fetch(
        `http://scic.navistar.io:3636/api/v1/FilterPlace?userId=${USER_ID}`
      );
      const data = await res.json();
      setFilterPlaces(data);
    } catch (err) {
      console.error("Error fetching FilterPlace:", err);
    }
  };


  useEffect(() => {
    async function loadData() {
      try {
        const res1 = await fetch(`http://scic.navistar.io:3636/api/v1/FilterPlace?userId=${USER_ID}`);
        const filterData = await res1.json();
        setFilterPlaces(filterData);

        const res2 = await fetch("http://scic.navistar.io:3636/api/v1/Spot");
        const spotData = await res2.json();
        setSpots(spotData);

      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto pl-4 pr-12 py-8">
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchFilterPlace}
        userId={USER_ID}
      />

      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-700">提案リスト</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input
            type="text"
            placeholder="検索"
            className="w-full border-b border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500 text-sm bg-transparent"
          />
          <Search className="absolute right-2 top-1 text-gray-400" size={16} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        <FilterSidebar
          filters={filterPlaces}
          onAddClick={() => setIsModalOpen(true)}
        />

        <div className="flex-1">
          {spots.map((spot) => (
            <SpotCard key={spot.id} spot={spot} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionListPage;