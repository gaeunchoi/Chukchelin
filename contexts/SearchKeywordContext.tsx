'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type SearchKeywordContextType = {
  searchKeyword: string
  setSearchKeyword: (searchKeyword: string) => void
}

const SearchKeywordContext = createContext<SearchKeywordContextType>({
  searchKeyword: '',
  setSearchKeyword: () => {},
})

export const SearchKeywordProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [searchKeyword, setSearchKeyword] = useState('')

  return (
    <SearchKeywordContext.Provider
      value={{
        searchKeyword,
        setSearchKeyword,
      }}
    >
      {children}
    </SearchKeywordContext.Provider>
  )
}

export const useSearchKeywordContext = () => {
  const context = useContext(SearchKeywordContext)
  if (!context)
    throw new Error(
      'useSearchKeywordContext must be used within a SearchKeywordProvider',
    )
  return context
}
