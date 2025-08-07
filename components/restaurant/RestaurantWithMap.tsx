import { flexColIJCenter } from '@/style/custom'
import { useMainStadiumContext } from '@/contexts/MainStadiumContext'
import { useRestaurants } from '@/hooks/useRestaurant'
import { Restaurant } from '@/types/restaurant'
import StadiumMap from '../stadium/StadiumMap'
import RestaurantItem from './RestaurantItem'
import { SortOption, sortConfig } from '@/constants/sortLabel'
import { useEffect } from 'react'

type RestaurantWithMapProps = {
  sortOption: SortOption
}

function RestaurantWithMap({ sortOption }: RestaurantWithMapProps) {
  const { mainStadium } = useMainStadiumContext()
  const { data: sortedRestaurants, mutate: mutateRestaurants } =
    useRestaurants(
      mainStadium?.id || null,
      sortConfig[sortOption].sortBy,
      sortConfig[sortOption].sortOrder,
    )

  useEffect(() => {
    mutateRestaurants()
  }, [sortOption, mutateRestaurants])

  return (
    <div className={flexColIJCenter('w-full', 'gap-9')}>
      <StadiumMap
        stadium={mainStadium}
        restaurants={sortedRestaurants}
      />
      {sortedRestaurants?.map((restaurant: Restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
    </div>
  )
}

export default RestaurantWithMap
