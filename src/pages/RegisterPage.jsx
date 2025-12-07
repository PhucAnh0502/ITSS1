import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router"
import { registerUser } from "../lib/api"

export default function RegisterPage() {
  const navigate = useNavigate()

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
      setError("すべてのフィールドを入力してください")
      return
    }

    if (password !== confirmPassword) {
      setError("パスワードが一致しません")
      return
    }

    if (password.length < 6) {
      setError("パスワードは6文字以上である必要があります")
      return
    }

    setLoading(true)
    try {
      const response = await registerUser(formData)
      toast.success("登録成功しました！")
      navigate('/login')
      console.log("Registration successful:", response)
      // Optional: Reset form
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
      setError(err.message || "登録に失敗しました。もう一度試してください")
      toast.error(err.message || "登録に失敗しました")
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
            FreeTime Spotsプロジェクトへようこそ
          </h1>
        </div>

        {/* Register Form Container */}
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            新規登録
          </h2>

          <form onSubmit={handleRegister} className="space-y-6">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="maihuylong@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>


            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">パスワードの確認</label>
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
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

            {/* Note: hidden fields (fullName, userName, phone, avatarUrl, bio) remain in formData but are not rendered */}

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
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "登録中..." : "新規登録"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-6">
            既にアカウントをお持ちですか？{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
              ログイン
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

