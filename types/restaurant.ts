import { Stadium } from './stadium'

export type Restaurant = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  stadium_id: number
  name: string
  address: string
  latitude: number
  longitude: number
  contact: string
  business_hours: string
  holiday: string
  break_time: string
  last_order_time: string
  note: string | null
  review_count: number
  review_average_score: number | null
  user_favorite_count: number
  category_id: number
  distance: number
  home_recommend_count: number
  restaurant_category: RestaurantCategory
  stadium?: Stadium
}

export type RestaurantCategory = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  name: string
  image_url: string
}

export type SavedRestaurant = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  user_id: number
  restaurant_id: number
  restaurant: Restaurant
}
