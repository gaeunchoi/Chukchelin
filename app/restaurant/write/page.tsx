'use client'
import { Suspense, useEffect } from 'react'
import { page } from '@/style/custom'
import ReviewForm from '../_components/review/ReviewForm'
import ReviewHeader from '../_components/review/ReviewHeader'
import RestaurantReviewFormSkeleton from '../_components/skeleton/RestaurantReviewFormSkeleton'
import { track } from '@amplitude/analytics-browser'
import { useUser } from '@/hooks/useUser'
import NotAllowAuth from '@/components/common/NotAllowAuth'

function RestaurantReviewWritePage() {
  useEffect(() => {
    track('Restaurant | Review Write Viewed', {
      pageName: 'Review Write',
      pagePath: '/restaurant/write',
      timestamp: Date.now(),
    })
  }, [])

  const { error: notLoggedIn } = useUser()
  if (notLoggedIn) {
    track('Restaurant | Review Write Not Logged In', {
      pageName: 'Review Write',
      pagePath: '/restaurant/write',
      timestamp: Date.now(),
    })
    return <NotAllowAuth />
  }

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
