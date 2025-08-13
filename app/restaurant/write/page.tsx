import { Suspense } from 'react'
import { page } from '@/style/custom'
import ReviewForm from '../_components/review/ReviewForm'
import ReviewHeader from '../_components/review/ReviewHeader'
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
