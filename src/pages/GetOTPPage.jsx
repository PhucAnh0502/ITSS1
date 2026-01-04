import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { verifyOtp } from '../lib/api';
import toast from "react-hot-toast";
import { useLang } from "../context/LanguageContext";

const GetOTPPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    const {t} = useLang();

    useEffect(() => {
        if (!email) {
            toast.error(t("email_not_registered"));
            navigate('/forgot-password');
        }
    }, [email, navigate, t]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = useCallback((index, value) => {
        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handleKeyDown = useCallback((index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowLeft' && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        else if (e.key === 'ArrowRight' && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);

        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').concat(['', '', '', '', '', '']).slice(0, 6);
            setOtp(newOtp);

            const nextIndex = Math.min(pastedData.length, 5);
            inputRefs.current[nextIndex]?.focus();
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 6) {
            toast.error(t("enter_6_digit_otp"));
            return;
        }

        setLoading(true);
        try {
            await verifyOtp(otpValue, t);

            toast.success(t("otp_verification_success"));
            navigate('/reset-password', { state: { email, otp: otpValue } });
        } catch (error) {
            if (error.message.includes('expired')) {
                toast.error(t("otp_expired"));
            } else if (error.message.includes('invalid')) {
                toast.error(t("otp_invalid"));
            } else if (!navigator.onLine) {
                toast.error(t("check_internet_connection"));
            } else {
                toast.error(error.message || t("otp_verification_failed"));
            }
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    }, [otp, email, navigate, t]);

    const isOtpComplete = otp.every(digit => digit !== '');

    if (!email) return null;

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

                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 text-center">
                        {t("check_email")}
                    </h1>

                    <p className="text-gray-500 mb-10 text-center leading-relaxed text-sm md:text-base">
                        <span className="font-medium text-gray-700">{t("enter_otp_sent_to")(email)}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    disabled={loading}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                    aria-label={`OTP桁${index + 1}`}
                                    aria-required="true"
                                    autoComplete="off"
                                />
                            ))}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isOtpComplete}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label={loading ? t("authenticating") : t("verify")}
                        >
                            {loading ? t("authenticating") : t("verify")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GetOTPPage;