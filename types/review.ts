import { Restaurant } from './restaurant'
import { Stadium } from './stadium'

export type Review = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: number
  restaurant_id: number
  score: number
  content: string
  review_image: string[]
  restaurant: Restaurant
  stadium: Stadium
}
