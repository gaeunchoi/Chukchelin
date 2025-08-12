import useSWR from 'swr'

export const useRestaurants = (
  stadiumId: number | null,
  sortBy?: string,
  sortOrder?: string,
) =>
  useSWR(
    stadiumId
      ? `stadium/${stadiumId}/restaurant?sortBy=${sortBy}&sortOrder=${sortOrder}`
      : null,
  )
