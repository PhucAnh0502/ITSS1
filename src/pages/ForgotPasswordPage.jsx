import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../lib/api";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setLoading(true);
            try {
                await forgotPassword(email);

                toast.success("OTPをメールに送信しました！");
                navigate("/get-otp", { state: { email } });
            } catch (error) {
                toast.error(error.message || "エラーが発生しました");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        パスワードをお忘れですか？
                    </h1>
                    <p className="text-gray-500 mb-8">
                        心配しないでください！アカウントに登録されているメールアドレスを入力してください。
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                メールアドレス
                            </label>
                            <input
                                type="email"
                                value={email}
                                disabled={loading}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="maihuylong@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "送信中..." : "OTPを取得"}
                        </button>
                    </form>
                    <p className="text-center text-gray-600 text-sm mt-6">
                        アカウントをお持ちでないですか？{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-700 font-medium"
                        >
                            新規登録
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
