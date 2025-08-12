import useSWR from 'swr'

export const useRestaurant = (restaurantId: number | null) =>
  useSWR(`/restaurant/${restaurantId}`)
