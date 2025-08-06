import { axiosInstance } from './axiosInstance'

export const getStadiums = async () => {
  const res = await axiosInstance.get('/stadium')
  return res.data
}
