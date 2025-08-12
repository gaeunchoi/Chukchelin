'use client'
import { createContext, useState, useContext, ReactNode } from 'react'

type MainStadiumIdContextType = {
  mainStadiumId: number | null
  setMainStadiumId: (stadiumId: number) => void
}

const MainStadiumIdContext =
  createContext<MainStadiumIdContextType | null>(null)

export const MainStadiumProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [mainStadiumId, setMainStadiumId] = useState<number | null>(
    null,
  )

  return (
    <MainStadiumIdContext.Provider
      value={{ mainStadiumId, setMainStadiumId }}
    >
      {children}
    </MainStadiumIdContext.Provider>
  )
}

export const useMainStadiumIdContext = () => {
  const context = useContext(MainStadiumIdContext)
  if (!context) {
    throw new Error(
      'useMainStadiumIdContext must be used within a MainStadiumProvider',
    )
  }
  return context
}
