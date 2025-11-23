import React from 'react';
import { X } from 'lucide-react'; 

const AddressModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose} 
    >
      {/* Modal Content */}
      <div 
        className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">住所の提案</h2>

        <form className="space-y-4">
          {/* Location Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">場所の名前</label>
            <input 
              type="text" 
              placeholder="家" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">住所</label>
            <input 
              type="text" 
              placeholder="10, Dan Phuong, Ha Noi" 
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button 
              type="button"
              className="w-full border border-blue-500 text-blue-500 font-medium py-2 rounded-lg hover:bg-blue-50 transition"
              onClick={onClose} 
            >
              提案を追加
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;