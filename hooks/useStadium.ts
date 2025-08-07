import useSWR from 'swr'

export const useStadium = (stadiumId: number | null) =>
  useSWR(stadiumId ? `/stadium/${stadiumId}` : null)
