'use client'
import { Suspense, useEffect } from 'react'
import { page } from '@/style/custom'
import ReviewForm from '../_components/review/ReviewForm'
import ReviewHeader from '../_components/review/ReviewHeader'
import RestaurantReviewFormSkeleton from '../_components/skeleton/RestaurantReviewFormSkeleton'
import { track } from '@amplitude/analytics-browser'

function RestaurantReviewWritePage() {
  useEffect(() => {
    track('Restaurant | Review Write Viewed', {
      pageName: 'Review Write',
      pagePath: '/restaurant/write',
      timestamp: Date.now(),
    })
  }, [])

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
