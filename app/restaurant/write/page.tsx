'use client'
import { Suspense, useEffect } from 'react'
import { page } from '@/style/custom'
import { useSearchParams } from 'next/navigation'
import { useRestaurant } from '@/hooks/useRestaurant'
import ReviewForm from '../_components/review/ReviewForm'
import ReviewHeader from '../_components/review/ReviewHeader'
import RestaurantReviewFormSkeleton from '../_components/skeleton/RestaurantReviewFormSkeleton'
import { trackReviewStarted } from '@/utils/analytics'

function RestaurantReviewWritePage() {
  const searchParams = useSearchParams()
  const restaurantId = parseInt(
    searchParams.get('restaurantId') as string,
  )
  const { data: restaurant } = useRestaurant(restaurantId)

  useEffect(() => {
    if (restaurant) {
      // 리뷰 작성 시작 이벤트 추적
      trackReviewStarted(restaurant.id.toString(), restaurant.name)
    }
  }, [restaurant])

  return (
    <div className={page()}>
      <ReviewHeader />
      <Suspense fallback={<RestaurantReviewFormSkeleton />}>
        <ReviewForm />
      </Suspense>
    </div>
  )
}

export default RestaurantReviewWritePage
