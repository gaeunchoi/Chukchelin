'use client'
import { SearchKeywordProvider } from '@/contexts/SearchKeywordContext'
import { page } from '@/style/custom'
import SearchHeader from './_components/SearchHeader'
import SearchResult from './_components/SearchResult'
import { track } from '@amplitude/analytics-browser'
import { useEffect } from 'react'

function SearchPage() {
  useEffect(() => {
    track('Search | Search Page Viewed', {
      page_name: 'Search',
      page_path: '/search',
    })
  }, [])

  return (
    <SearchKeywordProvider>
      <div className={page('gap-2')}>
        <SearchHeader />
        <SearchResult />
      </div>
    </SearchKeywordProvider>
  )
}

export default SearchPage
