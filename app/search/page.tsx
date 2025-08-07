import { SearchKeywordProvider } from '@/contexts/SearchKeywordContext'
import { page } from '@/style/custom'
import SearchHeader from './_components/SearchHeader'
import SearchResult from './_components/SearchResult'

function SearchPage() {
  return (
    <SearchKeywordProvider>
      <div className={page()}>
        <SearchHeader />
        <SearchResult />
      </div>
    </SearchKeywordProvider>
  )
}

export default SearchPage
