import { axiosInstance } from './axiosInstance'

export const login = async (payload: {
  code: string
  redirectUrl: string
}) => {
  const res = await axiosInstance.post('/auth/kakao', payload)
  return res.data
}
