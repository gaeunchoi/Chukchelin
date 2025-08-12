'use client'
import { useSearchParams } from 'next/navigation'
import { forwardRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { flexCol } from '@/style/custom'
import { Schedule } from '@/types/schedule'
import { Team } from '@/types/stadium'
import { formatDate } from '@/utils/formatDate'

type ScheduleCardProps = {
  isCurrent: boolean
  schedule: Schedule
  onClick: (schedule: Schedule) => void
}

const ScheduleCard = forwardRef<HTMLDivElement, ScheduleCardProps>(
  ({ isCurrent, schedule, onClick }: ScheduleCardProps, ref) => {
    const mainStadiumId = parseInt(
      useSearchParams().get('mainStadiumId') as string,
    )
    const [opposingTeam, setOpposingTeam] = useState<Team | null>(
      null,
    )
    const [isAway, setIsAway] = useState<boolean>(false)

    const mainTextColor = isCurrent ? 'text-white' : 'text-black'
    const subTextColor = isCurrent
      ? 'text-[#E6E6E6]'
      : 'text-[#6D6D6D]'

    const patternStyle = isCurrent
      ? {
          backgroundImage: 'url(/schedule-card-pattern.png)',
          backgroundSize: 'auto',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
        }
      : {}

    useEffect(() => {
      setOpposingTeam(
        schedule.home_team_id !== mainStadiumId
          ? schedule.home_team
          : schedule.away_team,
      )
      setIsAway(schedule?.home_team_id !== mainStadiumId)
    }, [schedule, mainStadiumId, setOpposingTeam])

    return (
      <div
        ref={ref}
        className={flexCol(
          'justify-center',
          'gap-3',
          'px-5',
          'py-4',
          'rounded-md',
          'min-w-[170px]',
          'min-h-[120px]',
          'relative',
          {
            'bg-black': isCurrent,
            'bg-[#F9F9F9]': !isCurrent,
          },
        )}
        onClick={() => {
          if (!opposingTeam) return
          onClick(schedule)
        }}
      >
        {isCurrent && (
          <div
            className="absolute inset-0 rounded-md"
            style={patternStyle}
          />
        )}
        <div className={flexCol('gap-1', 'relative', 'z-10')}>
          <div
            className={cn('text-[16px]', 'font-bold', mainTextColor)}
          >
            vs {opposingTeam?.short_name}({isAway ? 'Away' : 'Home'})
          </div>
          <div
            className={cn('text-[14px]', 'font-bold', subTextColor)}
          >
            {schedule.stadium.name}
          </div>
        </div>
        <div
          className={cn(
            'text-[14px]',
            'font-bold',
            subTextColor,
            'relative',
            'z-10',
          )}
        >
          {formatDate(schedule.schedule_at)}
        </div>
      </div>
    )
  },
)

ScheduleCard.displayName = 'ScheduleCard'

export default ScheduleCard
