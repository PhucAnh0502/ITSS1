import { PencilLine, Check, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useLang } from '../../context/LanguageContext';

const PersonalInfo = ({ userData, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...userData });
  const { t } = useLang();

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({ ...userData });
    setIsEditing(false);
  };

  const handleSubmit = () => {
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="animate-fadeIn flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b pb-2">
        <h3 className="text-lg font-bold text-gray-700">{t('personal_info')}</h3>
        
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)} 
            className="text-gray-400 hover:text-indigo-600 transition p-1"
          >
            <PencilLine size={20} />
          </button>
        )}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: t('email'), name: 'email' },
          { label: t('home_address'), name: 'homeAddress' },
          { label: t('office_address'), name: 'workAddress' }
        ].map((field) => (
          <div key={field.name} className="space-y-1">
            <label className="block text-xs font-medium text-gray-500">{field.label}</label>
            <input 
              type="text" 
              name={field.name}
              readOnly={!isEditing} 
              value={formData[field.name] || ''} 
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-2.5 outline-none transition-all ${
                isEditing 
                ? "border-indigo-300 bg-white ring-2 ring-indigo-50 shadow-sm" 
                : "border-gray-200 bg-gray-50 text-gray-700"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Nút Save và Cancel */}
      {isEditing && (
        <div className="flex justify-center space-x-3 pt-6  animate-slideInUp">
          <button 
            onClick={handleCancel} 
            className="flex items-center border border-red-300 text-red-500 px-8 py-2.5 rounded-full hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-medium active:scale-95"
          >
            <X size={18} />
            <span>{t('cancel')}</span>
          </button>
          
          <button 
            onClick={handleSubmit} 
            className="flex items-center border border-green-300 text-green-500 px-8 py-2.5 rounded-full hover:bg-green-50 hover:border-green-400 transition-all duration-200 font-medium active:scale-95"
          >
            <Check size={18} />
            <span>{t('save')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;