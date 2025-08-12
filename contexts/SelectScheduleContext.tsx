import { createContext, useState, ReactNode, useContext } from 'react'
import { Schedule } from '@/types/schedule'
import { Team } from '@/types/stadium'

type SelectScheduleContextType = {
  selectedSchedule: Schedule | null
  setSelectedSchedule: (schedule: Schedule) => void
  opposingTeam: Team | null
  setOpposingTeam: (team: Team) => void
}

const SelectScheduleContext =
  createContext<SelectScheduleContextType | null>(null)

export const SelectScheduleProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<Schedule | null>(null)
  const [opposingTeam, setOpposingTeam] = useState<Team | null>(null)

  return (
    <SelectScheduleContext.Provider
      value={{
        selectedSchedule,
        setSelectedSchedule,
        opposingTeam,
        setOpposingTeam,
      }}
    >
      {children}
    </SelectScheduleContext.Provider>
  )
}

export const useSelectScheduleContext = () => {
  const context = useContext(SelectScheduleContext)
  if (!context) {
    throw new Error(
      'useSelectScheduleContext must be used within a SelectScheduleProvider',
    )
  }
  return context
}
