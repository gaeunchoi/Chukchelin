import { axiosInstance } from './axiosInstance'
import { User } from '@/types/user'

type LoginResponse = {
  accessToken: string
  user: User
}

export const login = async (code: string): Promise<LoginResponse> => {
  const res = await axiosInstance.post('/auth/kakao', { code })
  return {
    accessToken: res.data.accessToken,
    user: res.data.user,
  }
}
