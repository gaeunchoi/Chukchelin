import useSWR from 'swr'

export const useTeamSchedules = (
  teamId?: number | null,
  from?: string,
) => useSWR(teamId ? `/team/${teamId}/schedule?from=${from}` : null)
