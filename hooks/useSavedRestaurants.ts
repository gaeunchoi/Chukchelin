import useSWR from 'swr'

export const useSavedRestaurants = (stadiumId: number | null) =>
  useSWR(`/user/me/favorite-restaurant?stadiumId=${stadiumId}`)
