'use client'
import { useRestaurant } from '@/hooks/useRestaurant'
import { flexColICenter, page, stickyButton } from '@/style/custom'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import RestaurantHeader from '../_components/detail/RestaurantHeader'
import RestaurantItem from '@/components/restaurant/RestaurantItem'
import RestaurantReviewList from '../_components/detail/RestaurantReviewList'
import RestaurantPageSkeleton from '../_components/skeleton/RestaurantPageSkeleton'
import { track } from '@amplitude/analytics-browser'
import { useEffect } from 'react'

function RestaurantPage() {
  const router = useRouter()
  const params = useParams()
  const restaurantId = parseInt(params.id as string)
  const { data: restaurant, isLoading } = useRestaurant(restaurantId)

  useEffect(() => {
    if (restaurant) {
      track('Restaurant | Restaurant Detail Viewed', {
        pageName: 'Restaurant Detail',
        pagePath: `/restaurant/${restaurantId}`,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        category: restaurant.restaurant_category.name,
        stadium: restaurant.stadium?.name,
        timestamp: Date.now(),
      })
    }
  }, [restaurant, restaurantId])

  const handleReviewWriteButtonClick = () => {
    router.push(`/restaurant/write?restaurantId=${restaurantId}`)
  }

  if (restaurantId === undefined) {
    return (
      <div className={flexColICenter('w-full', 'h-full')}>
        레스토랑 아이디가 존재하지 않습니다.
      </div>
    )
  }

  return (
    <div className={page()}>
      <RestaurantHeader restaurantId={restaurantId} />
      {isLoading ? (
        <RestaurantPageSkeleton />
      ) : (
        <>
          <RestaurantItem restaurant={restaurant} />
          <RestaurantReviewList restaurantId={restaurantId} />
          <Button
            className={stickyButton()}
            onClick={handleReviewWriteButtonClick}
          >
            리뷰 작성하기
          </Button>
        </>
      )}
    </div>
  )
}

export default RestaurantPage
