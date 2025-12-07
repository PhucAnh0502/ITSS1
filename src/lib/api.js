const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

export const API = {
    FILTER_PLACES: '/FilterPlace',
    GYM: {
        SEARCH: '/Gym/search',
        SEARCH_ADVANCED: '/Gym/search-advanced',
    },
    AUTH: {
        REGISTER: '/Auth/register',
        LOGIN: '/Auth/login',
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
            const error = await response.json()
            throw new Error(error.message || 'Registration failed')
        }

        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}

