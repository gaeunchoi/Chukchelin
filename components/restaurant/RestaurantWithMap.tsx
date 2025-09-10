import { useSelectedScheduleContext } from '@/contexts/SelectedScheduleContext'
import { useStadium } from '@/hooks/useStadium'
import { useRestaurants } from '@/hooks/useRestaurants'
import { flexColIJCenter } from '@/style/custom'
import { Restaurant } from '@/types/restaurant'
import { useEffect } from 'react'
import RestaurantListSkeleton from '@/app/_components/skeleton/RestaurantListSkeleton'
import StadiumMap from '../stadium/StadiumMap'
import RestaurantItem from './RestaurantItem'
import { SortOption, sortConfig } from '@/constants/sortLabel'

type RestaurantWithMapProps = {
  sortOption: SortOption
}

function RestaurantWithMap({ sortOption }: RestaurantWithMapProps) {
  const { selectedSchedule } = useSelectedScheduleContext()
  const { data: stadium } = useStadium(
    selectedSchedule?.stadium.id || null,
  )
  const { data: sortedRestaurants, mutate: mutateRestaurants } =
    useRestaurants(
      selectedSchedule?.stadium.id || null,
      sortConfig[sortOption].sortBy,
      sortConfig[sortOption].sortOrder,
    )

  useEffect(() => {
    mutateRestaurants()
  }, [sortOption, mutateRestaurants])

  if (!stadium || !sortedRestaurants)
    return <RestaurantListSkeleton />

  return (
    <div className={flexColIJCenter('w-full', 'gap-9')}>
      <StadiumMap
        stadium={stadium || null}
        restaurants={sortedRestaurants}
      />
      {sortedRestaurants?.map((restaurant: Restaurant) => (
        <RestaurantItem
          isRow
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  )
}

export default RestaurantWithMap
