import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Check, X } from 'lucide-react';
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
// import { resetPassword } from "../lib/api";
import { resetPassword } from "../lib/api-mock";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { email, otp } = location.state || {};
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [passwordStrength, setPasswordStrength] = useState({
        minLength: false,
        hasNumber: false,
        hasLetter: false,
        hasSpecial: false
    });

    useEffect(() => {
        if (!email || !otp) {
            toast.error("セッションが無効です。最初からやり直してください");
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

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

        if (password.length < 8) {
            toast.error("パスワードは8文字以上である必要があります");
            return;
        }

        if (!isPasswordStrong) {
            toast.error("パスワードは数字、文字、特殊文字を含める必要があります");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("パスワードが一致しません");
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

            toast.success("パスワードが正常にリセットされました！");
            navigate('/password-changed');
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error("無効なOTPまたはセッションが期限切れです");
            } else if (error.response?.status === 429) {
                toast.error("リクエストが多すぎます。しばらくお待ちください");
            } else if (!navigator.onLine) {
                toast.error("インターネット接続を確認してください");
            } else {
                toast.error(error.message || "パスワードのリセットに失敗しました");
            }
        } finally {
            setLoading(false);
        }
    }, [email, otp, password, confirmPassword, isPasswordStrong, navigate]);

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

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        新しいパスワードを作成
                    </h1>

                    <p className="text-gray-500 mb-8">
                        安全なパスワードを設定してください。
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                新しいパスワード
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
                                        text="8文字以上"
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasLetter}
                                        text="アルファベットを含む"
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasNumber}
                                        text="数字を含む"
                                    />
                                    <PasswordRequirement
                                        met={passwordStrength.hasSpecial}
                                        text="特殊文字を含む (!@#$%^&*)"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                パスワードの確認
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
                                            パスワードが一致します
                                        </p>
                                    ) : (
                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                            <X size={16} />
                                            パスワードが一致しません
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !isPasswordStrong || !passwordsMatch}
                            className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            aria-label={loading ? "リセット中" : "パスワードをリセット"}
                        >
                            {loading ? "リセット中..." : "パスワードをリセット"}
                        </button>
                    </form>

                    <p className="text-center text-gray-600 text-sm mt-6">
                        既にアカウントをお持ちですか？{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:text-blue-700 font-medium transition-colors focus:outline-none focus:underline"
                        >
                            ログイン
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