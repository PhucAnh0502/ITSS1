import React, { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { API_BASE_URL, API } from "../../lib/api";
import toast from "react-hot-toast";
import { getUserIdFromToken } from "../../lib/utils";
import { useLang } from "../../context/LanguageContext";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const userId = getUserIdFromToken();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const {t} = useLang();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error(t('password_not_match'));
      return;
    }

    setLoading(true);

    const requestBody = {
      id: userId,
      ...formData,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}${API.AUTH.CHANGE_PASSWORD}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        toast.success(t('change_password_success'));
        setFormData({ oldPassword: "", newPassword: "", confirmNewPassword: "" });
        onClose();
      } else {
        toast.error(t('change_password_failed'));
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(t('server_error'));
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 animate-fadeIn"
      style={{ zIndex: 9999 }} 
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-scaleIn relative p-6"
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
          {t('change_password')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">{t('password')}</label>
            <input
              type="password"
              name="oldPassword"
              value={formData.oldPassword}
              disabled={loading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="••••••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">{t('new_password')}</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              disabled={loading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="••••••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">{t('confirm_password')}</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              disabled={loading}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              placeholder="••••••••••••"
              onChange={handleChange}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg hover:bg-blue-50 font-bold transition-all disabled:opacity-50 active:scale-95"
            >
              {loading ? t('sending') : t('confirm')}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body 
  );
};

export default ChangePasswordModal;