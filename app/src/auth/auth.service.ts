import { AuthRequest, AuthResponse } from '../models/auth.model'
import { api } from '../plugins/axios'

export const login = async (payload: AuthRequest): Promise<AuthResponse> => {
  try {
    const { data } = await api.post<AuthResponse>('/users/login', payload)
    localStorage.setItem('token', data.token)
    return data
  } catch (e) {
    throw new Error(e.message)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}
