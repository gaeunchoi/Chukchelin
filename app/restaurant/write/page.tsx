import { Suspense } from 'react'
import { page } from '@/style/custom'
import ReviewHeader from '../_components/restaurant_review/ReviewHeader'
import ReviewForm from '../_components/restaurant_review/ReviewForm'
import RestaurantReviewFormSkeleton from '../_components/skeleton/RestaurantReviewFormSkeleton'

function RestaurantReviewWritePage() {
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
