'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useSelectedScheduleContext } from '@/contexts/SelectedScheduleContext'
import { useTeamSchedules } from '@/hooks/useTeamSchedules'
import { useEffect, useRef } from 'react'
import { flexCol, flexRowICenter } from '@/style/custom'
import { Schedule } from '@/types/schedule'
import ScheduleCard from './ScheduleCard'
import ScheduleListSkeleton from './skeleton/ScheduleListSkeleton'
import dayjs from 'dayjs'

function ScheduleList() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const refs = useRef<HTMLDivElement[]>([])

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mainStadiumId = parseInt(
    searchParams.get('mainStadiumId') as string,
  )
  const scheduleId = searchParams.get('scheduleId')
  const { selectedSchedule, setSelectedSchedule } =
    useSelectedScheduleContext()

  const { data: schedules } = useTeamSchedules(
    Number(mainStadiumId),
    dayjs().startOf('day').toISOString(),
  )

  const renderScheduleContent = () => {
    if (!schedules) return <ScheduleListSkeleton />

    return (
      <div
        ref={wrapperRef}
        className={flexRowICenter(
          'w-full',
          'gap-3',
          'overflow-x-scroll',
          'scrollbar-hide',
        )}
      >
        {schedules.map((schedule: Schedule, index: number) => (
          <ScheduleCard
            ref={(el) => {
              if (el) {
                refs.current[index] = el
              }
            }}
            key={schedule.id}
            isCurrent={schedule.id === selectedSchedule?.id}
            schedule={schedule}
            onClick={handleScheduleClick}
          />
        ))}
      </div>
    )
  }

  const handleScheduleClick = (schedule: Schedule) => {
    setSelectedSchedule(schedule)

    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('scheduleId', schedule.id.toString())

    const newUrl = `${pathname}?${currentParams.toString()}`
    window.history.pushState(null, '', newUrl)
  }

  useEffect(() => {
    if (scheduleId) {
      return setSelectedSchedule(
        schedules?.find(
          (schedule: Schedule) => schedule.id === Number(scheduleId),
        ) || null,
      )
    }
  }, [mainStadiumId, scheduleId, schedules, pathname])

  useEffect(() => {
    if (selectedSchedule) {
      const index = schedules?.findIndex(
        (schedule: Schedule) => schedule.id === selectedSchedule.id,
      )

      if (index !== undefined) {
        wrapperRef.current?.scrollTo({
          top: 0,
          left: refs.current[index].offsetLeft - 24,
          behavior: 'smooth',
        })
      }
    }
  }, [selectedSchedule])

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
