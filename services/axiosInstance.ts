import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().AccessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
