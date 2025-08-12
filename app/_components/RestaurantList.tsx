import { usePathname, useSearchParams } from 'next/navigation'
import { useSelectedScheduleContext } from '@/contexts/SelectedScheduleContext'
import { useStadium } from '@/hooks/useStadium'
import { useState, useEffect } from 'react'
import { flexCol, flexRowICenter } from '@/style/custom'
import { SortOption, sortLabelMap } from '@/constants/sortLabel'
import RestaurantSortSelector from '@/components/restaurant/RestaurantSortSelector'
import RestaurantWithMap from '@/components/map/RestaurantWithMap'

function RestaurantList() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mainStadiumId = parseInt(
    searchParams.get('mainStadiumId') as string,
  )
  const urlSortOption = searchParams.get('sortOption') as SortOption
  const { selectedSchedule } = useSelectedScheduleContext()

  const { data: stadium } = useStadium(
    selectedSchedule?.stadium.id || mainStadiumId,
  )

  const [sortOption, setSortOption] = useState<SortOption>(
    urlSortOption || SortOption.RATING_HIGH,
  )

  const sortOptions = Object.values(SortOption).map((option) => ({
    value: option,
    label: sortLabelMap[option],
  }))

  const handleSortOptionSelect = (option: string) => {
    const selectedOption = sortOptions.find(
      (options) => options.label === option,
    )

    if (selectedOption) {
      setSortOption(selectedOption.value)

      const currentParams = new URLSearchParams(
        searchParams.toString(),
      )
      currentParams.set('sortOption', selectedOption.value)

      const newUrl = `${pathname}?${currentParams.toString()}`
      window.history.pushState(null, '', newUrl)
    }
  }

  useEffect(() => {
    if (
      urlSortOption &&
      Object.values(SortOption).includes(urlSortOption)
    ) {
      setSortOption(urlSortOption)
    }
  }, [urlSortOption])

  if (!mainStadiumId) return null

  return (
    <div className={flexCol('flex-1', 'w-full', 'gap-3')}>
      <div className={flexRowICenter('w-full', 'justify-between')}>
        <div className="text-[14px]">
          {stadium?.name} 주변{' '}
          <span className="font-bold">
            맛집 {stadium?.restaurant_count || '-'}개
          </span>
        </div>
        <RestaurantSortSelector
          selectedOption={sortLabelMap[sortOption]}
          options={sortOptions.map((option) => option.label)}
          onSelect={handleSortOptionSelect}
        />
      </div>
      <RestaurantWithMap
        sortOption={sortOption}
        stadiumId={selectedSchedule?.stadium.id || mainStadiumId}
      />
    </div>
  )
}

export default RestaurantList
