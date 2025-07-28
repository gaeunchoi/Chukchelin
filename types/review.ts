import { Restaurant } from './restaurant'
import { User } from './user'

export type Review = {
  id: number
  rating: number
  content: string
  reviewImages: ReviewImage[]
  createdAt: string
  updatedAt: string

  user: User
  restaurant: Restaurant
}

export type ReviewImage = {
  id: number
  reviewId: number
  url: string
}
