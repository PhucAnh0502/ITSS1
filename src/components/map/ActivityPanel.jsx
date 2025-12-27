import React, { useState } from "react";
import { MapPin } from "lucide-react";
import { activities } from "../../constants";
import { useLang } from "../../context/LanguageContext";

const ActivityPanel = ({ onSearch, onActivityClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [activeActivity, setActiveActivity] = useState(null);
  const {t} = useLang();

  const displayedActivities = isExpanded ? activities : activities.slice(0, 6);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchText);
    }
  };

  const handleActivitySelect = (item) => {
    setActiveActivity(item.label);
    onActivityClick(item.trans);
  };

  return (
    <div className={`bg-gray-100 rounded-3xl p-6 lg:p-8 shadow-inner flex flex-col items-center transition-all duration-500 ease-in-out ${isExpanded ? 'h-full' : 'h-auto'}`}>
      <div className="w-full max-w-sm flex flex-col gap-6 h-full">
        
        <div className="w-full bg-white rounded-xl p-4 flex items-center shadow-sm hover:shadow-md transition-shadow shrink-0">
          <MapPin className="text-red-500 w-6 h-6 mr-3 fill-current shrink-0" />
          <input 
            type="text" 
            placeholder={t('where_you_go')} 
            className="w-full outline-none text-gray-600 font-medium placeholder-blue-300 bg-transparent"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className={`grid grid-cols-2 gap-4 w-full transition-all duration-500 ${isExpanded ? 'overflow-y-auto flex-1 pr-2 custom-scrollbar' : 'overflow-hidden'}`}>
          {displayedActivities.map((item, index) => (
            <button
              key={index}
              onClick={() => handleActivitySelect(item)}
              className={`transition-all text-white font-bold py-4 rounded-xl shadow-md text-sm md:text-base flex justify-center items-center animate-fadeIn ${activeActivity === item.label ? 'bg-blue-700 ring-2 ring-yellow-400 scale-105' : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'}`}
            >
              {t(item.label)}
            </button>
          ))}
        </div>

        {!isExpanded && (
          <div className="flex justify-center mt-2 shrink-0">
            <button onClick={() => setIsExpanded(true)} className="bg-blue-800 hover:bg-blue-900 text-white text-sm font-bold py-3 px-12 rounded-full shadow-lg transition-transform transform hover:scale-105">{t('more')}</button>
          </div>
        )}
        {isExpanded && <button onClick={() => setIsExpanded(false)} className="text-gray-400 text-sm mt-2 shrink-0">{t('less')}</button>} 
      </div>
      
      <style>{`.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }`}</style>
    </div>
  );
};

export default ActivityPanel;