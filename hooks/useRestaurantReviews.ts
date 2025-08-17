import useSWR from 'swr'

export const useRestaurantReviews = (
  restaurantId: number,
  sortBy?: string,
  sortOrder?: string,
  isOnlyHomeFan?: boolean,
) => {
  const queryParams = new URLSearchParams()

  if (sortBy) queryParams.append('sortBy', sortBy)
  if (sortOrder) queryParams.append('sortOrder', sortOrder)
  if (isOnlyHomeFan) queryParams.append('homeYn', 'Y')

  const queryString = queryParams.toString()
  const url = `/restaurant/${restaurantId}/review${
    queryString ? `?${queryString}` : ''
  }`

  return useSWR(url)
}
