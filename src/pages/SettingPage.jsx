import React, { useState, useEffect, useRef } from 'react';
import PersonalInfo from '../components/settings/PersonalInfo';
import SystemConfig from '../components/settings/SystemConfig';
import { PencilLine, User, Loader2 } from 'lucide-react';
import { API, API_BASE_URL } from '../lib/api';
import toast from 'react-hot-toast';
import { getUserIdFromToken } from '../lib/utils';

const SettingPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fileInputRef = useRef(null);

  const userId = getUserIdFromToken();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}${API.USERS.USER(userId)}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("error in fetchUserData: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateUser = async (updatedData) => {
    try {
      const response = await fetch(`${API_BASE_URL}${API.USERS.USER(userId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setUserData(updatedData);
        toast.success("プロフィールが正常に更新されました");
      } else {
        toast.error("プロフィールの更新に失敗しました");
      }
    } catch (error) {
      console.error("error in update user: ", error);
      toast.error("サーバーエラーが発生しました");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("画像ファイルを選択してください");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("5MB以下の画像を選択してください");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result; 
      
      handleUpdateUser({ 
        ...userData, 
        avatarUrl: base64String 
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="mt-2 text-gray-500">データを読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 flex px-6 pb-20">
      {/* Input file ẩn */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Sidebar */}
      <aside className="w-1/4 flex flex-col items-center text-center">
        <div className="relative group">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-100 shadow-sm overflow-hidden">
            {userData?.avatarUrl ? (
              <img src={userData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User size={50} className="text-gray-400" />
            )}
          </div>
          <button 
            onClick={triggerFileInput}
            className="absolute top-0 -right-2 bg-white p-1.5 rounded-full shadow-md border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
          >
            <PencilLine size={20} />
          </button>
        </div>
        <h2 className="mt-4 font-bold text-xl text-gray-800">{userData?.userName || "N/A"}</h2>
        <p className="text-sm text-gray-500 mt-1">メール: {userData?.email}</p>
      </aside>

      {/* Main content */}
      <section className="w-3/4 ml-12">
        <div className="flex space-x-1 mb-0">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-5 py-2.5 flex items-center space-x-2 rounded-t-lg transition-all duration-200 ${
              activeTab === 'personal' 
                ? 'bg-white border-t border-l border-r border-gray-200 font-semibold text-indigo-700' 
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            <span>パーソナル情報</span>
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`px-5 py-2.5 rounded-t-lg transition-all duration-200 ${
              activeTab === 'system' 
                ? 'bg-white border-t border-l border-r border-gray-200 font-semibold text-indigo-700' 
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
            }`}
          >
            システムコンフィグレーション
          </button>
        </div>

        <div className="bg-white p-8 rounded-b-lg rounded-tr-lg border border-gray-200 shadow-sm min-h-[400px]">
          {activeTab === 'personal' ? (
            <PersonalInfo userData={userData} onSave={handleUpdateUser} key={userData?.id || 'loading'}/>
          ) : (
            <SystemConfig />
          )}
        </div>
      </section>
    </div>
  );
};

export default SettingPage;