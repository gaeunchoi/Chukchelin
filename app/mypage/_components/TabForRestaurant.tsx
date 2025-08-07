import RestaurantItem from '@/components/restaurant/RestaurantItem'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import StadiumMap from '@/components/stadium/StadiumMap'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useEffect, useState, useMemo } from 'react'
import { Stadium } from '@/types/stadium'
import { SavedRestaurant } from '@/types/restaurant'
import { useStadiums } from '@/hooks/useStadiums'
import { useUser } from '@/hooks/useUser'
import { flexColIJCenter } from '@/style/custom'

function TabForRestaurant() {
  const { data: stadiums } = useStadiums()
  const { data: user } = useUser()
  const [selectedStadium, setSelectedStadium] =
    useState<Stadium | null>(null)

  const { data: savedRestaurants, mutate: mutateSavedRestaurants } =
    useSavedRestaurants(selectedStadium?.id || null)

  const favoriteStadium = useMemo(() => {
    if (!user?.favorite_team || !stadiums) return null
    return (
      stadiums.find((stadium: Stadium) =>
        stadium.team.some(
          (team) => team.id === user.favorite_team!.id,
        ),
      ) || null
    )
  }, [user?.favorite_team, stadiums])

  useEffect(() => {
    if (favoriteStadium && !selectedStadium) {
      setSelectedStadium(favoriteStadium)
    }
  }, [favoriteStadium, selectedStadium])

  useEffect(() => {
    mutateSavedRestaurants()
  }, [selectedStadium, mutateSavedRestaurants])

  const handleStadiumSelect = (stadium: Stadium) => {
    setSelectedStadium(stadium)
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

  console.log(savedRestaurants)
  return (
    <div className="w-full flex flex-col items-start gap-4">
      <StadiumSelector
        onSelect={handleStadiumSelect}
        selectedStadium={selectedStadium}
      />
      <StadiumMap
        stadium={selectedStadium}
        restaurants={savedRestaurants}
      />
      {savedRestaurants && savedRestaurants.length > 0 ? (
        savedRestaurants.map((data: SavedRestaurant) => (
          <RestaurantItem
            key={data.id}
            restaurant={data.restaurant}
          />
        ))
      ) : (
        <EmptyRestaurantsMessage />
      )}
    </div>
  )
}

export default TabForRestaurant
