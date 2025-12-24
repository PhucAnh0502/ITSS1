import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
// import { forgotPassword } from "../lib/api";
import { forgotPassword } from "../lib/api-mock";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Email validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validate email format
        if (!email.trim()) {
            toast.error("メールアドレスを入力してください");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("有効なメールアドレスを入力してください");
            return;
        }

        setLoading(true);
        try {
            await forgotPassword(email);
            toast.success("OTPをメールに送信しました！");
            navigate("/get-otp", { state: { email } });
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error("このメールアドレスは登録されていません");
            } else if (error.response?.status === 429) {
                toast.error("リクエストが多すぎます。しばらくお待ちください");
            } else if (error.response?.status === 500) {
                toast.error("サーバーエラーが発生しました。後でもう一度お試しください");
            } else if (!navigator.onLine) {
                toast.error("インターネット接続を確認してください");
            } else {
                toast.error(error.message || "エラーが発生しました");
            }
        } finally {
            setLoading(false);
        }
    }, [email, navigate]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
                        aria-label="前のページに戻る"
                        disabled={loading}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        パスワードをお忘れですか？
                    </h1>

                    <p className="text-gray-500 mb-8">
                        心配しないでください！アカウントに登録されているメールアドレスを入力してください。
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                メールアドレス
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                disabled={loading}
                                onChange={handleEmailChange}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                required
                                aria-required="true"
                                aria-disabled={loading}
                                autoComplete="email"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label={loading ? "送信中" : "OTPを取得"}
                        >
                            {loading ? "送信中..." : "OTPを取得"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        アカウントをお持ちでないですか？{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline"
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