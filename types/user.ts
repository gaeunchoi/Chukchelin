import { Review } from './review'

export type User = {
  id: number
  provider: string
  providerId: string
  nickname: string
  favoriteTeam?: string
  profileImage: string
  createdAt: string
  updatedAt: string

  reviews: Review[]
  favoriteRestaurants: UserFavoriteRestaurant[]
}

export type UserFavoriteRestaurant = {
  userId: number
  restaurantId: number
  isAwayFan: boolean
}
