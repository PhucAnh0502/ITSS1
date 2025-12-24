export const API_BASE_URL = import.meta.env.VITE_BASE_API_URL || 'http://localhost:3000/api'

export const API = {
    FILTER_PLACES: '/FilterPlace',
    GYM: {
        SEARCH: '/Gym/search',
        SEARCH_ADVANCED: '/Gym/search-advanced',
        PLACE_DETAIL: (id) => `/Gym/${id}`,
    },
    AUTH: {
        REGISTER: '/Auth/register',
        LOGIN: '/Auth/login',
        FORGOT_PASSWORD: '/auth/forgot-password',
        VERIFY_OTP: '/auth/verify-otp',
        RESET_PASSWORD: '/auth/reset-password',
        RESEND_OTP: '/auth/resend-otp',
    },
    USERS: {
        LIST : '/User',
        USER: (id) => `/User/${id}`,
    }
}

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.REGISTER}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "Registration failed"

            try {
                errorMessage = JSON.parse(error).message || "Registration failed"
            } catch (e) {
                errorMessage = error || "Registration failed"
            }

            throw new Error(errorMessage)
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.LOGIN}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "ログインに失敗しました"

            try {
                errorMessage = JSON.parse(error).message || errorMessage
            } catch (e) {
                errorMessage = error || "ログインに失敗しました"
            }

            throw new Error(errorMessage)
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

// Resend OTP
export const resendOtp = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.RESEND_OTP}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "再送信に失敗しました"
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}

// Forgot Password - Send OTP
export const forgotPassword = async (email) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.FORGOT_PASSWORD}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "OTPの送信に失敗しました"
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}

// Verify OTP
export const verifyOtp = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.VERIFY_OTP}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "無効なOTPです"
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}

// Reset Password
export const resetPassword = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.RESET_PASSWORD}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "パスワードのリセットに失敗しました"
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}
