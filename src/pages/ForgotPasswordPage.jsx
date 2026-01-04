import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { forgotPassword } from "../lib/api";
import { useLang } from "../context/LanguageContext";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {t} = useLang();

    // Email validation
    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Validate email format
        if (!email.trim()) {
            toast.error(t("please_enter_email"));
            return;
        }

        if (!isValidEmail(email)) {
            toast.error(t("please_enter_email"));
            return;
        }

        setLoading(true);
        try {
            await forgotPassword(email, t);
            toast.success(t("otp_sent_to_email"));
            navigate("/get-otp", { state: { email } });
        } catch (error) {
            if (error.response?.status === 404) {
                toast.error(t("email_not_registered"));
            } else if (error.response?.status === 429) {
                toast.error(t("too_many_requests"));
            } else if (error.response?.status === 500) {
                toast.error(t("server_error"));
            } else if (!navigator.onLine) {
                toast.error(t("check_internet_connection"));
            } else {
                toast.error(error.message || t("server_error"));
            }
        } finally {
            setLoading(false);
        }
    }, [email, navigate, t]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 pt-6 pb-12 md:pt-12">
                <div className="w-full max-w-lg">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg p-1"
                        aria-label={t("back_to_login")}
                        disabled={loading}
                    >
                        <ArrowLeft size={24} />
                    </button>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        {t("reset_password")}
                    </h1>

                    <p className="text-gray-500 mb-8 text-center">
                        {t("please_enter_email")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("email")}
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
                        <div className="text-gray-700 text-sm">{t("otp_note")}</div>

                        <button
                            type="submit"
                            disabled={loading || !email}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label={loading ? t("sending") : t("get_otp")}
                        >
                            {loading ? t("sending") : t("get_otp")}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        {t("don_t_have_account")}{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline"
                        >
                            {t("register")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;