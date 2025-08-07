import { Stadium } from '@/types/stadium'
import { createContext, useState, useContext, ReactNode } from 'react'

type MainStadiumContextType = {
  mainStadium: Stadium | null
  setMainStadium: (stadium: Stadium) => void
}

const MainStadiumContext =
  createContext<MainStadiumContextType | null>(null)

export const MainStadiumProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [mainStadium, setMainStadium] = useState<Stadium | null>(null)

  return (
    <MainStadiumContext.Provider
      value={{ mainStadium, setMainStadium }}
    >
      {children}
    </MainStadiumContext.Provider>
  )
}

export const useMainStadiumContext = () => {
  const context = useContext(MainStadiumContext)
  if (!context) {
    throw new Error(
      'useMainStadiumContext must be used within a MainStadiumProvider',
    )
  }
  return context
}
