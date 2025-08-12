import { Stadium, Team } from './stadium'

export type Schedule = {
  id: number
  created_at: string
  updated_at: string
  deleted_at: string
  league_id: number
  home_team_id: number
  away_team_id: number
  stadium_id: number
  schedule_at: string
  round: number
  league: {
    id: number
    created_at: string
    updated_at: string
    deleted_at: string
    name: string
    logo_image_url: string | null
  }
  home_team: ScheduleTeam
  away_team: ScheduleTeam
  stadium: Stadium
}

export type ScheduleTeam = Team & { leagudId: string }
