import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { registerUser } from "../lib/api"
import { useLang } from "../context/LanguageContext"

export default function RegisterPage() {
  const navigate = useNavigate()
  const {t} = useLang();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    avatarUrl: "",
    bio: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    // Validation (only require email and passwords)
    const { email, password, confirmPassword } = formData

    if (!email || !password || !confirmPassword) {
      setError(t('please_fill_all_fields'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('password_not_match'))
      return
    }

    if (password.length < 6) {
      setError(t('password_min_length'))
      return
    }

    try {
      setLoading(true)
      await registerUser(formData)
      toast.success(t('register_success'))
      navigate('/')
      setFormData({
        fullName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        avatarUrl: "",
        bio: "",
      })
    } catch (err) {
      setError(err.message || t('register_failed'))
      toast.error(err.message || t('register_failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('welcome')}
          </h1>
        </div>

        {/* Register Form Container */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            {t('register')}
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('email')}</label>
              <input
                name="email"
                type="email"
                disabled={loading}
                value={formData.email}
                onChange={handleChange}
                placeholder="maihuylong@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>


            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('password')}</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  disabled={loading}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('confirm_password')}</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  disabled={loading}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
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

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('sending') : t('register')}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            {t('already_have_account')}{" "}
            <Link to="/" className="text-blue-500 hover:text-blue-700 font-medium">
              {t('login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

