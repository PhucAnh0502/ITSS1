import React, { useState } from 'react';
import { X } from 'lucide-react';
import { API } from '../../lib/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

const AddressModal = ({ isOpen, onClose, onSuccess, userId }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_API_URL}${API.FILTER_PLACES}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          name,
          address
        })
      });

      onClose();
      onSuccess(); 
      setName("");
      setAddress("");
    } catch (err) {
      console.error("Error creating filter place:", err);
      toast.error(err.message || "Error creating filter place");
      navigate("/");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 relative animate-scaleIn"
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
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">場所の名前</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="家"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">住所</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="10, Dan Phuong, Ha Noi"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50"
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