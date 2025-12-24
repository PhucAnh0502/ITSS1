import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from "react-router-dom"
import toast from 'react-hot-toast';
import { resetPassword } from "../lib/api";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("パスワードが一致しません");
            return;
        }
        if (password.length < 6) {
            toast.error("パスワードは6文字以上である必要があります");
            return;
        }

        setLoading(true);
        try {
            await resetPassword({
                email,
                otp,
                password,
                confirmPassword
            });

            navigate('/password-changed');
        } catch (error) {
            toast.error(error.message || "パスワードのリセットに失敗しました");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-gray-900">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">新しいパスワードを作成</h1>
                    <p className="text-gray-500 mb-8">新しいパスワードを入力してください。</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">新しいパスワード</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    disabled={loading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">パスワードの確認</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    disabled={loading}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "リセット中..." : "パスワードをリセット"}
                        </button>
                    </form>
                    <p className="text-center text-gray-600 text-sm mt-6">
                        既にアカウントをお持ちですか？{" "}
                        <Link to="/login" className="text-blue-500 hover:text-blue-700 font-medium">
                            ログイン
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;