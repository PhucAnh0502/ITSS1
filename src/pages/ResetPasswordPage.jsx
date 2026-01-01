import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { resetPassword } from "../lib/api";
import { useLang } from '../context/LanguageContext';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const {t} = useLang();

    const [passwordStrength, setPasswordStrength] = useState({
        minLength: false,
        hasNumber: false,
        hasLetter: false,
        hasSpecial: false
    });

    useEffect(() => {
        if (!email || !otp) {
            toast.error(t('session_invalid'));
            navigate('/forgot-password');
        }
    }, [email, otp, navigate, t]);

    useEffect(() => {
        setPasswordStrength({
            minLength: password.length >= 8,
            hasNumber: /\d/.test(password),
            hasLetter: /[a-zA-Z]/.test(password),
            hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password)
        });
    }, [password]);

    const isPasswordStrong = Object.values(passwordStrength).every(Boolean);
    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        if (password.length < 6) {
            toast.error(t('password_min_length'));
            return;
        }

        if (!isPasswordStrong) {
            toast.error(t('strong_password'));
            return;
        }

        if (password !== confirmPassword) {
            toast.error(t('password_not_match'));
            return;
        }

        setLoading(true);
        try {
            await resetPassword({
                email,
                otp,
                password,
                confirmPassword
            }, t);

            toast.success(t('change_password_success'));
            navigate('/password-changed');
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error(t('otp_verification_failed'));
            } else if (error.response?.status === 429) {
                toast.error(t('too_many_requests'));
            } else if (!navigator.onLine) {
                toast.error(t('check_internet_connection'));
            } else {
                toast.error(error.message || t('change_password_failed'));
            }
        } finally {
            setLoading(false);
        }
    }, [email, otp, password, confirmPassword, isPasswordStrong, navigate, t]);

    if (!email || !otp) return null;

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

                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                        {t("enter_new_password")}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("new_password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    disabled={loading}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                    required
                                    aria-required="true"
                                    aria-invalid={password && !isPasswordStrong}
                                    aria-describedby="password-requirements"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-900"
                                    aria-label={showPassword ? "パスワードを隠す" : "パスワードを表示"}
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {password && (
                                <div id="password-requirements" className="mt-3 space-y-2">
                                    <PasswordRequirement
                                        met={passwordStrength.minLength}
                                        text={t("password_min_length")}
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasLetter}
                                        text={t("include_alphabets")}
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasNumber}
                                        text={t("include_numbers")}
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasSpecial}
                                        text={t("include_special_characters")}
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                {t("confirm_password")}
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    disabled={loading}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                                    required
                                    aria-required="true"
                                    aria-invalid={confirmPassword && !passwordsMatch}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-900"
                                    aria-label={showConfirmPassword ? "パスワードを隠す" : "パスワードを表示"}
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {confirmPassword && (
                                <div className="mt-2">
                                    {passwordsMatch ? (
                                        <p className="text-sm text-green-600 flex items-center gap-1">
                                            <Check size={16} />
                                            {t("password_match")}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <X size={16} />
                                            {t("password_not_match")}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isPasswordStrong || !passwordsMatch}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label={loading ? t("reseting_password") : t("reset_password")}
                        >
                            {loading ? t("reseting_password") : t("reset_password")}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        {t("remember_password")}{" "}
                        <Link
                            to="/"
                            className="text-blue-500 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline"
                        >
                            {t("login")}
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const PasswordRequirement = ({ met, text }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-600' : 'text-gray-500'}`}>
        {met ? <Check size={16} /> : <X size={16} />}
        <span>{text}</span>
    </div>
);

export default ResetPasswordPage;