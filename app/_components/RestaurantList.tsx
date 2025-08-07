import { flexColIJCenter, flexRowICenter } from '@/style/custom'
import { useMainStadiumContext } from '@/contexts/MainStadiumContext'
import { useState } from 'react'
import RestaurantWithMap from '@/components/restaurant/RestaurantWithMap'
import RestaurantSortSelector from '@/components/restaurant/RestaurantSortSelector'
import { SortOption, sortLabelMap } from '@/constants/sortLabel'

function RestaurantList() {
  const { mainStadium } = useMainStadiumContext()
  const [sortOption, setSortOption] = useState<SortOption>(
    SortOption.RATING_HIGH,
  )

  const sortOptions = Object.values(SortOption).map((option) => ({
    value: option,
    label: sortLabelMap[option],
  }))

  if (!mainStadium) {
    return (
      <div
        className={flexColIJCenter(
          'w-full',
          'h-full',
          '-mt-12',
          'text-sm',
          'text-gray-500',
          'gap-2',
        )}
      >
        <p className="text-lg font-semibold mb-2 text-center">
          왼쪽 상단에서 구장을 선택해주세요
        </p>
        <div className={flexColIJCenter('gap-0', 'text-center')}>
          <p>마이페이지에서 좋아하는 팀을 설정하면</p>
          <p>해당 구장 인근의 맛집을 바로 확인할 수 있습니다.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={flexColIJCenter('flex-1', 'w-full', 'gap-3')}>
      <div className={flexRowICenter('w-full', 'justify-between')}>
        <div className="text-[14px]">
          {mainStadium?.name} 주변{' '}
          <span className="font-bold">
            맛집 {mainStadium?.restaurant_count || '-'}개
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
      <RestaurantWithMap sortOption={sortOption} />
    </div>
  )
}

export default RestaurantList
