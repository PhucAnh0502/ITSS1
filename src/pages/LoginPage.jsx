import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { loginUser } from "../lib/api"
import { useLang } from "../context/LanguageContext"

export default function LoginPage() {
  const navigate = useNavigate()
  const {t} = useLang();

  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setError("")

    const { email, password } = formData
    if (!email || !password) {
      setError(t('please_fill_all_fields'))
      return
    }

    try {
      setLoading(true)
      const response = await loginUser(formData, t)
      toast.success(t('login_success'))
      if (response && response.token) {
        sessionStorage.setItem("authToken", response.token)
      }
      navigate("/map")
    } catch (err) {
      setError(err.message || t('login_failed'))
      toast.error(err.message || t('login_failed'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 pt-6 pb-12 md:pt-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('welcome')}</h1>
        </div>

        <div className="w-full max-w-lg">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">{t('login')}</h2>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:text-blue-700">{t('forgot_password')}</Link>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t('authenticating') : t('login')}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-6">
            {t('don_t_have_account')} <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium">{t('register')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
