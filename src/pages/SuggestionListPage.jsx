import React, { useState } from 'react'; 
import { Search } from 'lucide-react';
import FilterSidebar from '../components/suggestion/FilterSidebar';
import SpotCard from '../components/suggestion/SpotCard';
import AddressModal from '../components/suggestion/AdressModal';

const SuggestionListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const spots = [
    {
      id: 1,
      name: 'ポリテクニック体育館',
      sports: 'スポーツ：バドミントン、卓球、バスケットボールなど。',
      distanceWork: '5km',
      distanceHome: '200m',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
      id: 2,
      name: '市民スポーツセンター',
      sports: 'スポーツ：水泳、ジム、ヨガ。',
      distanceWork: '2.5km',
      distanceHome: '1.2km',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        name: '中央公園グラウンド',
        sports: 'スポーツ：サッカー、ジョギング。',
        distanceWork: '8km',
        distanceHome: '300m',
        image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
  ];

  return (
    <div className="container mx-auto pl-4 pr-12 py-8">
      <AddressModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Page Title & Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-700">提案リスト</h1>
        <div className="relative mt-4 md:mt-0 w-full md:w-64">
          <input 
            type="text" 
            placeholder="Tìm kiếm" 
            className="w-full border-b border-gray-300 py-1 px-2 focus:outline-none focus:border-indigo-500 text-sm bg-transparent"
          />
          <Search className="absolute right-2 top-1 text-gray-400" size={16} />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col lg:flex-row gap-8">
        <FilterSidebar onAddClick={() => setIsModalOpen(true)} />
        
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