import { flexCol, flexRowICenter } from '@/style/custom'
import { useMainStadiumIdContext } from '@/contexts/MainStadiumIdContext'
import { useSelectScheduleContext } from '@/contexts/SelectScheduleContext'
import { useStadium } from '@/hooks/useStadium'
import { useState } from 'react'
import { SortOption, sortLabelMap } from '@/constants/sortLabel'
import RestaurantSortSelector from '@/components/restaurant/RestaurantSortSelector'
import RestaurantWithMap from '@/components/map/RestaurantWithMap'

function RestaurantList() {
  const { mainStadiumId } = useMainStadiumIdContext()
  const { selectedSchedule } = useSelectScheduleContext()
  const { data: stadium } = useStadium(
    selectedSchedule?.stadium?.id || null,
  )
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.RATING_HIGH,
  )

  const sortOptions = Object.values(SortOption).map((option) => ({
    value: option,
    label: sortLabelMap[option],
  }))

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
          onSelect={(selectedLabel) => {
            const selectedOption = sortOptions.find(
              (option) => option.label === selectedLabel,
            )
            if (selectedOption) {
              setSortOption(selectedOption.value)
            }
          }}
        />
      </div>
      <RestaurantWithMap
        sortOption={sortOption}
        stadiumId={selectedSchedule?.stadium.id || null}
      />
    </div>
  )
}

export default RestaurantList
