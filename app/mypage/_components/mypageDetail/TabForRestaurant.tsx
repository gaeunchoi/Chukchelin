import { useUser } from '@/hooks/useUser'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useStadium } from '@/hooks/useStadium'
import { useEffect, useState } from 'react'
import { SavedRestaurant } from '@/types/restaurant'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import RestaurantWithMap from '@/components/map/RestaurantWithMap'

import { flexCol, flexColIJCenter } from '@/style/custom'

function TabForRestaurant() {
  const { data: loggedInUser } = useUser()
  const [selectedStadiumId, setSelectedStadiumId] = useState<
    number | null
  >(null)
  const { data: selectedStadium } = useStadium(selectedStadiumId)
  const { data: savedRestaurants, mutate: mutateSavedRestaurants } =
    useSavedRestaurants(selectedStadiumId)

  useEffect(() => {
    if (loggedInUser)
      setSelectedStadiumId(loggedInUser?.favorite_team_id)
  }, [loggedInUser])

  useEffect(() => {
    mutateSavedRestaurants()
  }, [selectedStadiumId, mutateSavedRestaurants])

  const handleStadiumSelect = (stadiumId: number) => {
    setSelectedStadiumId(stadiumId)
  }

  const EmptyRestaurantsMessage = () => (
    <div
      className={flexColIJCenter('w-full', 'py-8', 'text-gray-500')}
    >
      <div className="text-center">
        <p className="text-lg font-semibold mb-2">
          저장된 맛집이 없습니다
        </p>
        <p className="text-sm">
          {selectedStadium?.name} 인근에 저장한 맛집이 없어요.
        </p>
        <p className="text-sm mt-1">
          다른 구장을 선택하거나 새로운 맛집을 저장해보세요!
        </p>
      </div>
    </div>
  )

  return (
    <div className={flexCol('w-full', 'items-start', 'gap-4')}>
      <StadiumSelector
        onSelect={handleStadiumSelect}
        selectedStadiumId={selectedStadiumId}
      />
      {savedRestaurants && savedRestaurants.length > 0 ? (
        <RestaurantWithMap
          stadiumId={selectedStadiumId}
          restaurants={savedRestaurants.map(
            (data: SavedRestaurant) => data.restaurant,
          )}
        />
      ) : (
        <EmptyRestaurantsMessage />
      )}
    </div>
  )
}

export default TabForRestaurant
