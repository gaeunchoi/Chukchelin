'use client'
import { flexCol, flexRowICenter } from '@/style/custom'
import { useMainStadiumIdContext } from '@/contexts/MainStadiumIdContext'
import { useSelectScheduleContext } from '@/contexts/SelectScheduleContext'
import { useTeamSchedules } from '@/hooks/useTeamSchedules'
import { useEffect } from 'react'
import { Team } from '@/types/stadium'
import { Schedule } from '@/types/schedule'
import ScheduleCard from './ScheduleCard'
import ScheduleListSkeleton from './skeleton/ScheduleListSkeleton'
import dayjs from 'dayjs'

function ScheduleList() {
  const { mainStadiumId } = useMainStadiumIdContext()
  const { selectedSchedule, setSelectedSchedule, setOpposingTeam } =
    useSelectScheduleContext()
  const { data: schedules } = useTeamSchedules(
    mainStadiumId,
    dayjs().startOf('day').toISOString(),
  )

  const renderScheduleContent = () => {
    if (!schedules) return <ScheduleListSkeleton />
    return (
      <div
        className={flexRowICenter(
          'w-full',
          'gap-3',
          'overflow-x-scroll',
          'scrollbar-hide',
        )}
      >
        {schedules.map((schedule: Schedule) => (
          <ScheduleCard
            key={schedule.id}
            isCurrent={schedule.id === selectedSchedule?.id}
            schedule={schedule}
            onClick={handleScheduleClick}
          />
        ))}
      </div>
    )
  }

  const handleScheduleClick = (
    schedule: Schedule,
    opposingTeam: Team,
  ) => {
    setSelectedSchedule(schedule)
    setOpposingTeam(opposingTeam)
  }

  useEffect(() => {
    if (schedules && schedules.length > 0) {
      setSelectedSchedule(schedules[0])
      setOpposingTeam(
        schedules[0].home_team_id !== mainStadiumId
          ? schedules[0].home_team
          : schedules[0].away_team,
      )
    }
  }, [mainStadiumId, schedules, setSelectedSchedule, setOpposingTeam])

  if (!mainStadiumId) return null

  return (
    <div className={flexCol('w-full', 'gap-3')}>
      <div className="text-[14px]">
        <span className="font-bold">다가오는 경기</span>를
        선택해주세요
      </div>
      {renderScheduleContent()}
    </div>
  )
}

export default ScheduleList
