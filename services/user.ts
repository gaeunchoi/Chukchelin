import { axiosInstance } from './axiosInstance'
import { User } from '@/types/user'

export const updateUser = async (payload: {
  nickname?: string
  favorite_team_id: number
}): Promise<User> => {
  const res = await axiosInstance.patch('/user/me', payload)
  return res.data
}

export const randomProfileImage = async () => {
  const res = await axiosInstance.put('/user/me/profile-image')
  return res.data
}
