import { usePathname, useSearchParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useStadium } from '@/hooks/useStadium'
import { useEffect } from 'react'
import { SavedRestaurant } from '@/types/restaurant'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import RestaurantWithMap from '@/components/map/RestaurantWithMap'

import { flexCol } from '@/style/custom'

const EmptyRestaurantsMessage = ({
  stadiumName,
}: {
  stadiumName: string
}) => (
  <div className={flexCol('w-full', 'py-8', 'text-gray-500')}>
    <div className="text-center">
      <p className="text-lg font-semibold mb-2">
        저장된 맛집이 없습니다
      </p>
      <p className="text-sm">
        {stadiumName} 인근에 저장한 맛집이 없어요.
      </p>
      <p className="text-sm mt-1">
        다른 구장을 선택하거나 새로운 맛집을 저장해보세요!
      </p>
    </div>
  </div>
)

function TabForRestaurant() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const mainStadiumId = parseInt(
    searchParams.get('mainStadiumId') as string,
  )
  const { data: loggedInUser } = useUser()
  const { data: selectedStadium } = useStadium(mainStadiumId)
  const { data: savedRestaurants, mutate: mutateSavedRestaurants } =
    useSavedRestaurants(mainStadiumId)

  useEffect(() => {
    if (loggedInUser && !mainStadiumId) {
      const newUrl = `/mypage?mainStadiumId=${loggedInUser.favorite_team_id}`
      window.history.pushState(null, '', newUrl)
    }
  }, [loggedInUser, mainStadiumId])

  useEffect(() => {
    mutateSavedRestaurants()
  }, [mainStadiumId, mutateSavedRestaurants])

  const handleStadiumSelect = (stadiumId: number) => {
    const currentParams = new URLSearchParams(searchParams.toString())
    currentParams.set('mainStadiumId', stadiumId.toString())

    const newUrl = `${pathname}?${currentParams.toString()}`
    window.history.pushState(null, '', newUrl)
  }

  return (
    <div className={flexCol('w-full', 'items-start', 'gap-4')}>
      <StadiumSelector
        onSelect={handleStadiumSelect}
        selectedStadiumId={mainStadiumId}
      />
      {savedRestaurants && savedRestaurants.length > 0 ? (
        <RestaurantWithMap
          stadiumId={mainStadiumId}
          restaurants={savedRestaurants}
        />
      ) : (
        <EmptyRestaurantsMessage
          stadiumName={selectedStadium?.name || ''}
        />
      )}
    </div>
  )
}

export default TabForRestaurant
