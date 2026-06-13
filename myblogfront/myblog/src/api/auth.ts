import request from '@/utils/request'

export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  password: string
  password2: string
}

export interface TokenResponse {
  access: string
  refresh: string
}

export interface UserInfo {
  id: number
  username: string
  is_staff: boolean
  is_superuser: boolean
}

export const login = (data: LoginParams) => {
  return request.post<TokenResponse>('/auth/login/', data)
}

export const register = (data: RegisterParams) => {
  return request.post('/auth/register/', data)
}

export const refreshToken = (refresh: string) => {
  return request.post<TokenResponse>('/auth/refresh/', { refresh })
}

export const getUserInfo = () => {
  return request.get<UserInfo>('/auth/user/')
}
