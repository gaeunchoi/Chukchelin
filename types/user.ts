import { Team } from './stadium'

export type User = {
  id: number
  nickname: string
  profile_image_url: string
  review_count: number
  review_averate_score: number | null
  favorite_team_id: number | null
  terms_agreed_at: string
  privacy_policy_agreed_at: string
  marketing_agreed_at: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  favorite_team: Team | null
}
