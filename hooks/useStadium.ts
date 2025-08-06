import useSWR from 'swr'

export const useStadium = (stadiumId: number) =>
  useSWR(`/stadium/${stadiumId}`)
