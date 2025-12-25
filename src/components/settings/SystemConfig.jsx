import React, {useState} from 'react';
import { PencilLine } from 'lucide-react';
import ChangePasswordModal from './ChangePasswordModal';

const SystemConfig = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignout = () => {
    sessionStorage.removeItem("token");
    window.location.href = '/login';
  }

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-12 animate-fadeIn">
      {/* Phần Bảo mật */}
      <section>
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-lg font-bold text-gray-700">セキュリティとアカウント</h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-indigo-600 transition p-1"
          >
            <PencilLine size={22} />
          </button>
        </div>
        <div className="max-w-sm space-y-1">
          <label className="block text-xs font-medium text-gray-500">パスワード</label>
          <input 
            type="password" 
            readOnly 
            value="********************" 
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 tracking-widest outline-none text-gray-400"
          />
        </div>
      </section>

      {/* Phần Cài đặt chung */}
      <section>
        <div className="flex justify-between items-center mb-6 border-b pb-2">
          <h3 className="text-lg font-bold text-gray-700">一般設定</h3>
        </div>
        <div className="max-w-sm space-y-1">
          <label className="block text-xs font-medium text-gray-500">言語</label>
          <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 outline-none transition cursor-pointer">
            <option value="vi">Vietnamese</option>
            <option value="en">English</option>
            <option value="jp">日本語</option>
          </select>
        </div>
      </section>

      {/* Nút Đăng xuất */}
      <div className="pt-6 flex justify-center">
        <button className="border border-red-300 text-red-500 px-16 py-2.5 rounded-full hover:bg-red-50 hover:border-red-400 transition-all duration-200 font-medium active:scale-95" onClick={handleSignout}>
          サインアウト
        </button>
      </div>

      {/* MODAL ĐỔI MẬT KHẨU */}
      <ChangePasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default SystemConfig;