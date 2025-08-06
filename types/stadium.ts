export type Team = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  stadium_id: number
  name: string
  short_name: string
  logo_image_url: string
  team_id: number | null
}

export type Stadium = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string | null
  name: string
  address: string
  latitude: number
  longitude: number
  description: string
  capacity: number

  team: Team[]
  restaurant_count: number
}
