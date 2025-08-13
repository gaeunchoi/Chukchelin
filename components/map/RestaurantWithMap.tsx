import { useStadium } from '@/hooks/useStadium'
import { useRestaurants } from '@/hooks/useRestaurants'
import { flexColIJCenter } from '@/style/custom'
import { Restaurant, SavedRestaurant } from '@/types/restaurant'
import { useEffect } from 'react'
import { SortOption, sortConfig } from '@/constants/sortLabel'
import RestaurantListSkeleton from '@/app/_components/skeleton/RestaurantListSkeleton'
import MapContainer from './MapContainer'
import RestaurantItem from '../restaurant/RestaurantItem'

type RestaurantWithMapProps = {
  stadiumId: number | null
  sortOption?: SortOption
  restaurants?: SavedRestaurant[]
}

function RestaurantWithMap({
  stadiumId,
  sortOption,
  restaurants,
}: RestaurantWithMapProps) {
  const { data: stadium } = useStadium(stadiumId)

  const { data: sortedRestaurants, mutate: mutateRestaurants } =
    useRestaurants(
      stadiumId,
      sortConfig[sortOption || SortOption.RATING_HIGH].sortBy,
      sortConfig[sortOption || SortOption.RATING_HIGH].sortOrder,
    )

  const displayRestaurants: Restaurant[] | SavedRestaurant[] =
    restaurants || sortedRestaurants

  useEffect(() => {
    if (!sortedRestaurants) {
      mutateRestaurants()
    }
  }, [sortOption, mutateRestaurants, sortedRestaurants])

  if (!displayRestaurants) return <RestaurantListSkeleton />

  return (
    <div className={flexColIJCenter('w-full', 'gap-9')}>
      <MapContainer
        stadium={stadium || null}
        restaurants={displayRestaurants}
      />
      {displayRestaurants?.map(
        (restaurant: Restaurant | SavedRestaurant) => {
          const restaurantData =
            'restaurant' in restaurant
              ? restaurant.restaurant
              : restaurant
          return (
            <RestaurantItem
              isRow
              key={restaurant.id}
              restaurant={restaurantData}
            />
          )
        },
      )}
    </div>
  )
}

export default RestaurantWithMap
