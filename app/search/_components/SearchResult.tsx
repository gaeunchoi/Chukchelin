'use client'
import RestaurantItem from '@/components/restaurant/RestaurantItem'
import StadiumItem from '@/components/stadium/StadiumItem'
import StadiumMap from '@/components/stadium/StadiumMap'
import { useSearchKeywordContext } from '@/contexts/SearchKeywordContext'
import { useSearchResult } from '@/hooks/useSearchResult'
import {
  flexCol,
  flexColIJCenter,
  flexRowICenter,
} from '@/style/custom'
import { Restaurant } from '@/types/restaurant'
import { Stadium } from '@/types/stadium'
import { useEffect, useMemo } from 'react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

const SearchGuideItem = ({
  label,
  example,
}: {
  label: string
  example: string
}) => (
  <div
    className={flexRowICenter(
      'w-full',
      'text-[14px]',
      'text-[#6A6A6A]',
    )}
  >
    <span className="font-semibold text-black">{label}</span>
    <span>예&#41; {example}</span>
  </div>
)

const NoResults = () => (
  <div className={flexCol('gap-3', 'p-2')}>
    <div className="text-[14px] text-[#6A6A6A]">
      검색 결과가 없습니다.
    </div>
  </div>
)

function SearchResult() {
  const { searchKeyword } = useSearchKeywordContext()

  const {
    data: searchResult,
    mutate: mutateSearchResult,
    isLoading,
  } = useSearchResult(searchKeyword)

  useEffect(() => {
    if (searchKeyword.trim() !== '') {
      mutateSearchResult()
    }
  }, [searchKeyword, mutateSearchResult])

  const searchGuide = useMemo(
    () => (
      <div className={flexCol('w-full')}>
        <div className="text-[14px] font-semibold text-[#A5A5A5]">
          <div className={flexCol('gap-3', 'p-2')}>
            <SearchGuideItem
              label="구장명"
              example="수원 월드컵 경기장"
            />
            <SearchGuideItem
              label="구단명"
              example="수원 삼성 블루윙즈"
            />
            <SearchGuideItem
              label="식당명"
              example="홍화루"
            />
          </div>
        </div>
      </div>
    ),
    [],
  )

  const noResults = useMemo(
    () => (
      <div className={flexCol('flex-1', 'w-full')}>
        <div className="text-[14px] font-semibold text-[#A5A5A5]">
          <NoResults />
        </div>
      </div>
    ),
    [],
  )

  const loadingResult = useMemo(
    () => (
      <div className={flexColIJCenter('w-full', 'gap-4')}>
        <div className="text-[14px] font-semibold text-[#A5A5A5]">
          검색중입니다
        </div>
        <LoadingSpinner width={200} />
      </div>
    ),
    [],
  )

  if (searchKeyword.trim() === '') {
    return searchGuide
  }

  if (isLoading) return loadingResult
  if (
    searchResult?.stadiums.length === 0 &&
    searchResult?.restaurants.length === 0
  ) {
    return noResults
  }

  return (
    <div className={flexCol('w-full')}>
      <div className="text-[14px] font-semibold text-[#A5A5A5]">
        <div className={flexCol('gap-12', 'p-2')}>
          <div className={flexCol('gap-3')}>
            <div className="text-[14px] font-bold">
              구장 ({searchResult?.stadiums.length})
            </div>
            {searchResult?.stadiums.map((stadium: Stadium) => (
              <div
                className={flexColIJCenter('gap-3')}
                key={stadium.id}
              >
                <StadiumItem stadium={stadium} />
                <StadiumMap stadium={stadium} />
              </div>
            ))}
          </div>
          <div className={flexCol('gap-3')}>
            <div className="text-[14px] font-bold">
              식당 ({searchResult?.restaurants.length})
            </div>
            <div className={flexColIJCenter('w-full', 'gap-6')}>
              {searchResult?.restaurants.map(
                (restaurant: Restaurant) => {
                  return (
                    <RestaurantItem
                      restaurant={restaurant}
                      key={restaurant.id}
                    />
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResult
