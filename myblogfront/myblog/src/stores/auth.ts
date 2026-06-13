import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { login as apiLogin, register as apiRegister, refreshToken, getUserInfo } from '@/api/auth'
import type { UserInfo, LoginParams, RegisterParams } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref<string>(localStorage.getItem('access_token') || '')
  const refreshTokenValue = ref<string>(localStorage.getItem('refresh_token') || '')
  const user = ref<UserInfo | null>(null)
  const loading = ref(false)

  const isLoggedIn = computed(() => !!accessToken.value)
  const isAdmin = computed(() => user.value?.is_staff ?? false)

  function saveTokens(access: string, refresh: string) {
    accessToken.value = access
    refreshTokenValue.value = refresh
    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)
  }

  function clearTokens() {
    accessToken.value = ''
    refreshTokenValue.value = ''
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  async function login(params: LoginParams) {
    loading.value = true
    try {
      const res = await apiLogin(params)
      saveTokens(res.data.access, res.data.refresh)
      await fetchUser()
      return true
    } finally {
      loading.value = false
    }
  }

  async function register(params: RegisterParams) {
    loading.value = true
    try {
      await apiRegister(params)
      return true
    } finally {
      loading.value = false
    }
  }

  async function fetchUser() {
    try {
      const res = await getUserInfo()
      user.value = res.data
    } catch {
      user.value = null
    }
  }

  async function refreshAccessToken() {
    if (!refreshTokenValue.value) return false
    try {
      const res = await refreshToken(refreshTokenValue.value)
      saveTokens(res.data.access, refreshTokenValue.value)
      return true
    } catch {
      clearTokens()
      user.value = null
      return false
    }
  }

  function logout() {
    clearTokens()
    user.value = null
  }

  return {
    accessToken,
    refreshTokenValue,
    user,
    loading,
    isLoggedIn,
    isAdmin,
    login,
    register,
    fetchUser,
    refreshAccessToken,
    logout,
  }
})
