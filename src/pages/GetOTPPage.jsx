import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { API_BASE_URL } from "../lib/api";
import toast from "react-hot-toast";

const GetOTPPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || 'your email';
    const [otp, setOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Backspace support to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpValue = otp.join('');
        if (otpValue.length === 4) {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, otp: otpValue }),
                });

                if (!response.ok) throw new Error("無効なOTPです");

                toast.success("OTP認証に成功しました！");
                navigate('/reset-password', { state: { email, otp: otpValue } });
            } catch (error) {
                toast.error(error.message || "無効なOTPです");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 hover:text-gray-900">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">OTP認証</h1>
                    <p className="text-gray-500 mb-8">{email} に送信された認証コードを入力してください。</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="flex justify-between gap-4">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    disabled={loading}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-16 h-16 text-center text-2xl font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            ))}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "認証中..." : "認証する"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            コードが届きませんか？ <button className="text-blue-500 font-medium hover:underline hover:text-blue-700">再送信</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetOTPPage;