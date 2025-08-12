import { Restaurant } from './restaurant'
import { Stadium } from './stadium'
import { User } from './user'

export type Review = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: number
  restaurant_id: number
  score: number
  content: string
  review_image: ReviewImageType[]
  user: User
  restaurant: Restaurant
  stadium: Stadium
}

export type ReviewImageType = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  review_id: number
  image_url: string
}
