import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { API } from '../../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useLang } from '../../context/LanguageContext';

const FilterSidebar = ({ filters = [], onAddClick, selectedAddress, onSelectFilter, onDeleteSucess }) => {
  const navigate = useNavigate();
  const {t} = useLang();

  const handleDelete = async (filterPlaceId) => {
    const confirmDelete = window.confirm(t('confirm_delete'));
    if (confirmDelete) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}${API.FILTER_PLACES}?filterPlaceId=${filterPlaceId}`, {
          method: 'DELETE',
        });
        if(res.ok) {
          toast.success(t('delete_filter_place_success'));
          onDeleteSucess();
        }
      } catch (error) {
        console.error("Error deleting filter place:", error);
        toast.error(error.message || "error deleting filter place");
        navigate("/");
      }
    } 
  }

  return (
    <aside className="w-full lg:w-1/6 space-y-6 shrink-0 h-fit">
      <h2 className="font-bold text-lg text-gray-700">{t('order')}</h2>

      <div className="space-y-3">
        {filters.map((item, index) => (
          <div key={item.id || index} className="flex items-center justify-between group cursor-pointer" onClick={() => onSelectFilter(item.address)}>
            <div className="flex items-center gap-2">
              <input 
                type="radio" 
                name='location_filter'
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" 
                checked={selectedAddress === item.address}
                onChange={() => onSelectFilter(item.address)}
              />
              <span className="text-gray-600 text-sm">{item.name}</span>
            </div>
            <Trash2 onClick={() => handleDelete(item.id)} size={16} className="text-red-400 opacity-0 group-hover:opacity-100 transition cursor-pointer" />
          </div>
        ))}
      </div>

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
