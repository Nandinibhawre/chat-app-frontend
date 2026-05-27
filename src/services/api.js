import axios from 'axios'

// BASE URL
const BASE_URL = 'https://chat-app-backend-production-54a2.up.railway.app'

// AXIOS INSTANCE
const api = axios.create({

  baseURL: BASE_URL,
})

// ADD JWT TOKEN AUTOMATICALLY
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem('token')

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`
    }

    return config
  },

  (error) => {

    return Promise.reject(error)
  }
)

// =========================
// REGISTER USER
// =========================

export const registerUser =
  async (userData) => {

    const response =
      await api.post(

        '/api/auth/register',

        userData
      )

    return response.data
  }

// =========================
// LOGIN USER
// =========================

export const loginUser =
  async (loginData) => {

    const response =
      await api.post(

        '/api/auth/login',

        loginData
      )

    // SAVE TOKEN
    localStorage.setItem(

      'token',

      response.data.token
    )

    // SAVE USER EMAIL
    localStorage.setItem(

      'userEmail',

      response.data.email
    )

    // SAVE USERNAME
    localStorage.setItem(

      'username',

      response.data.username
    )

    return response.data
  }

// =========================
// GET ALL USERS
// =========================

export const getAllUsers =
  async () => {

    const response =
      await api.get(

        '/api/auth/users'
      )

    return response.data
  }

  export const getMessages =
  async (sender, receiver) => {

    const response =
      await api.get(

        `/api/messages?sender=${sender}&receiver=${receiver}`
      )

    return response.data
  }

  //forget password
  export const forgotPassword =
  async (email) => {

    const response =
      await axios.post(

        `${BASE_URL}/auth/forgot-password`,

        null,

        {
          params: { email }
        }
      )

    return response.data
}
export default api