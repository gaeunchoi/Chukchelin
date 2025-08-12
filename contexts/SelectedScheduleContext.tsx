import { Schedule } from '@/types/schedule'
import { createContext, ReactNode, useContext, useState } from 'react'

type SelectedScheduleContextType = {
  selectedSchedule: Schedule | null
  setSelectedSchedule: (schedule: Schedule | null) => void
}

const SelectedScheduleContext =
  createContext<SelectedScheduleContextType | null>(null)

export const SelectedScheduleProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [selectedSchedule, setSelectedSchedule] =
    useState<Schedule | null>(null)

  return (
    <SelectedScheduleContext.Provider
      value={{
        selectedSchedule,
        setSelectedSchedule,
      }}
    >
      {children}
    </SelectedScheduleContext.Provider>
  )
}

export const useSelectedScheduleContext = () => {
  const context = useContext(SelectedScheduleContext)
  if (!context) {
    throw new Error(
      'useSelectedScheduleContext must be used within a SelectedScheduleProvider',
    )
  }
  return context
}
