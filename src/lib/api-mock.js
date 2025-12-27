export const API_BASE_URL = 'http://mock-api'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const registerUser = async (userData) => {
    await delay(1000)
    return { success: true }
}

export const forgotPassword = async (email) => {
    await delay(1000)
    return true
}

export const verifyOtp = async (data) => {
    await delay(1000)
    // Mock validation: assume '123456' is the correct OTP
    if (data.otp === '788661') {
        return true
    }
    throw new Error("無効なOTPです (テスト用: 788661)")
}

export const resetPassword = async (data) => {
    await delay(1000)
    return true
}

export const resendOtp = async (data) => {
    await delay(1000)
    return true
}