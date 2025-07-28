import { Review } from './review'
import { UserFavoriteRestaurant } from './user'

export type Restaurant = {
  id: number
  name: string
  category: string
  stadiumId: number
  address: string
  latitude: number
  longitude: number
  phone: string
  businessHours: string
  holiday?: string
  breakTime?: string
  lastOrder?: string
  note?: string

  reviews: Review[]
  likedByUsers: UserFavoriteRestaurant[]
}
