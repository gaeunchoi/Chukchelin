import { Restaurant } from './restaurant'

export type Stadium = {
  id: number
  name: string
  teamName: string
  address: string
  latitude: number
  longitude: number
  restaurants: Restaurant[]
}
