import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const ConfirmedChangePasswordPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce-slow">
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">パスワードを変更しました！</h1>
                    <p className="text-gray-500 mb-8">パスワードが正常に変更されました。</p>

                    <button
                        onClick={() => navigate('/login')}
                        className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                        ログインに戻る
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmedChangePasswordPage;