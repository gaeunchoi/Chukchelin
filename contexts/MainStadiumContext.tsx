import { createContext, useState, useContext, ReactNode } from 'react'

type MainStadiumContextType = {
  mainStadiumId: number | null
  setMainStadiumId: (stadiumId: number) => void
}

const MainStadiumContext =
  createContext<MainStadiumContextType | null>(null)

export const MainStadiumProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [mainStadiumId, setMainStadiumId] = useState<number | null>(
    null,
  )

  return (
    <MainStadiumContext.Provider
      value={{ mainStadiumId, setMainStadiumId }}
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
