import { axiosInstance } from './axiosInstance'

export const favoriteRestaurant = async (restaurantId: number) => {
  const res = await axiosInstance.post(
    `/restaurant/${restaurantId}/favorite`,
  )
  return res.data
}
