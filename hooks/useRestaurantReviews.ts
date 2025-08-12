import useSWR from 'swr'

export const useRestaurantReviews = (
  restaurantId: number,
  sortBy?: string,
  sortOrder?: string,
) =>
  useSWR(
    `/restaurant/${restaurantId}/review?sortBy=${sortBy}&sortOrder=${sortOrder}`,
  )
