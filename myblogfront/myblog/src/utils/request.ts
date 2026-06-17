import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import { TOKEN_KEY, REFRESH_TOKEN_KEY, LOGIN_PATH } from '@/config'

const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/blog',
  timeout: 10000
})

request.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

let isRefreshing = false

request.interceptors.response.use(response => {
  return response
}, async error => {
  const originalRequest = error.config
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const authStore = useAuthStore()
        const success = await authStore.refreshAccessToken()
        if (success) {
          originalRequest.headers.Authorization = `Bearer ${authStore.accessToken}`
          isRefreshing = false
          return request(originalRequest)
        }
      } catch {
        isRefreshing = false
      }
    }
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    window.location.href = LOGIN_PATH
  }
  console.error('请求出错:', error.response?.data || error.message)
  return Promise.reject(error)
})

export default request
