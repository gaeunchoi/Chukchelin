import { Stadium } from '@/types/stadium'

export const matchStadium = (
  stadiums: Stadium[] | undefined,
  stadiumId: number,
): Stadium | undefined => {
  if (!stadiums?.length) return undefined
  return stadiums.find((stadium) => stadium.id === stadiumId)
}
