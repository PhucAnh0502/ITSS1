import React from 'react';
import { Trash2, Plus } from 'lucide-react';

const FilterSidebar = ({ onAddClick }) => {
  const filters = [
    { label: '家', checked: false },
    { label: '会社', checked: true },
  ];

  return (
    <aside className="w-full lg:w-1/6 space-y-6 shrink-0 h-fit">
      <h2 className="font-bold text-lg text-gray-700">順番</h2>
      
      <div className="space-y-3">
        {filters.map((filter, index) => (
          <div key={index} className="flex items-center justify-between group cursor-pointer">
            <div className="flex items-center gap-2">
              <input 
                type="radio" 
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
              />
              <span className="text-gray-600 text-sm">{filter.label}</span>
            </div>
            <Trash2 size={16} className="text-red-400 opacity-0 group-hover:opacity-100 transition cursor-pointer" />
          </div>
        ))}
      </div>

      {/* Add Button */}
      <button 
        onClick={onAddClick}
        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 flex items-center justify-center hover:border-indigo-500 hover:text-indigo-500 transition"
      >
        <Plus size={20} />
      </button>
    </aside>
  );
};

export default FilterSidebar;