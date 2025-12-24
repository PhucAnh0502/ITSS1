import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
// import { verifyOtp, resendOtp } from "../lib/api";
import { verifyOtp, resendOtp } from "../lib/api-mock";
import toast from "react-hot-toast";

const GetOTPPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef([]);

    useEffect(() => {
        if (!email) {
            toast.error("メールアドレスが見つかりません");
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendTimer]);

    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const handleChange = useCallback((index, value) => {
        if (value && isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
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
        else if (e.key === 'ArrowRight' && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    }, [otp]);

    const handlePaste = useCallback((e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 4);

        if (/^\d+$/.test(pastedData)) {
            const newOtp = pastedData.split('').concat(['', '', '', '']).slice(0, 4);
            setOtp(newOtp);

            const nextIndex = Math.min(pastedData.length, 3);
            inputRefs.current[nextIndex]?.focus();
        }
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');

        if (otpValue.length !== 4) {
            toast.error("4桁のOTPを入力してください");
            return;
        }

        setLoading(true);
        try {
            await verifyOtp({ email, otp: otpValue });

            toast.success("OTP認証に成功しました！");
            navigate('/reset-password', { state: { email, otp: otpValue } });
        } catch (error) {
            if (error.message.includes('expired')) {
                toast.error("OTPの有効期限が切れました。再送信してください");
            } else if (error.message.includes('invalid')) {
                toast.error("無効なOTPです。もう一度お試しください");
            } else if (!navigator.onLine) {
                toast.error("インターネット接続を確認してください");
            } else {
                toast.error(error.message || "認証に失敗しました");
            }
            setOtp(['', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    }, [otp, email, navigate]);

    const handleResend = useCallback(async () => {
        if (resendTimer > 0 || resending) return;

        setResending(true);
        try {
            await resendOtp({ email });

            toast.success("OTPを再送信しました！");
            setResendTimer(60); // 60 seconds cooldown
            setOtp(['', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (error) {
            if (error.message.includes('rate limit')) {
                toast.error("再送信の回数制限に達しました。しばらくお待ちください");
            } else if (!navigator.onLine) {
                toast.error("インターネット接続を確認してください");
            } else {
                toast.error(error.message || "再送信に失敗しました");
            }
        } finally {
            setResending(false);
        }
    }, [email, resendTimer, resending]);

    const isOtpComplete = otp.every(digit => digit !== '');

    if (!email) return null;

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
                        OTP認証
                    </h1>

                    <p className="text-gray-500 mb-8">
                        <span className="font-medium text-gray-700">{email}</span> に送信された認証コードを入力してください。
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex justify-between gap-3 sm:gap-4">
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
                                    className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
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
                            aria-label={loading ? "認証中" : "認証する"}
                        >
                            {loading ? "認証中..." : "認証する"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            コードが届きませんか？{" "}
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={resendTimer > 0 || resending}
                                className="text-blue-500 font-medium hover:underline hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:no-underline transition-colors focus:outline-none focus:underline"
                            >
                                {resending ? "送信中..." : resendTimer > 0 ? `再送信 (${resendTimer}秒)` : "再送信"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetOTPPage;