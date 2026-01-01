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
        RESET_PASSWORD_MAIL: '/Auth/reset-password-mail',
        VALIDATE_TOKEN: '/Auth/validate-token',
        RESET_PASSWORD: '/Auth/reset-password',
        CHANGE_PASSWORD: '/Auth/change-password',
    },
    USERS: {
        LIST : '/User',
        USER: (id) => `/User/${id}`,
    }
}

// Register user
export const registerUser = async (userData, t) => {
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
            let errorMessage = t("register_failed")

            try {
                errorMessage = JSON.parse(error).message || t("register_failed")
            } catch (e) {}

            throw new Error(errorMessage)
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

// Login user
export const loginUser = async (credentials, t) => {
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
            let errorMessage = t("login_failed")

            try {
                errorMessage = JSON.parse(error).message || errorMessage
            } catch (e) {}

            throw new Error(errorMessage)
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

// Forgot Password - Send OTP
export const forgotPassword = async (email, t) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.RESET_PASSWORD_MAIL}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = t("get_otp_failed")
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}

// Verify OTP
export const verifyOtp = async (otpValue, t) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.VALIDATE_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: otpValue }),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = t("invalid_otp")
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}

// Reset Password
export const resetPassword = async (data, t) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.AUTH.RESET_PASSWORD}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = t("reset_password_failed")
            try { errorMessage = JSON.parse(error).message || errorMessage } catch (e) {}
            throw new Error(errorMessage)
        }
        return true
    } catch (error) {
        throw error
    }
}
