'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import TabForRestaurant from './TabForRestaurant'
import TabForReview from './TabForReview'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useMyReviews } from '@/hooks/useMyReviews'
import { flexCol, flexRowICenter } from '@/style/custom'
import { track } from '@amplitude/analytics-browser'
import Skeleton from 'react-loading-skeleton'

function TabContent() {
  const {
    data: savedRestaurants,
    isLoading: isSavedRestaurantsLoading,
  } = useSavedRestaurants(null)
  const { data: myReview, isLoading: isMyReviewsLoading } =
    useMyReviews()
  const [activeTab, setActiveTab] = useState<
    'restaurants' | 'reviews'
  >('restaurants')

  const handleTabClick = (tab: 'restaurants' | 'reviews') => {
    setActiveTab(tab)
    track(`Mypage | Tab Clicked`, {
      tab,
    })
  }

  return (
    <div
      className={flexCol('w-full', 'h-full', 'items-start', 'gap-6')}
    >
      <div
        className={flexRowICenter(
          'gap-4',
          'text-gray-800',
          'text-[14px]',
          'font-medium',
        )}
      >
        <div
          onClick={() => handleTabClick('restaurants')}
          className={cn(
            'py-3',
            'px-2',
            'box-border',
            'border-b-3',
            'border-transparent',
            'cursor-pointer',
            {
              'border-black font-bold': activeTab === 'restaurants',
            },
          )}
        >
          저장한 맛집{' '}
          {isSavedRestaurantsLoading ? (
            <Skeleton
              width={9}
              height={14}
            />
          ) : (
            savedRestaurants?.length || 0
          )}
        </div>
        <div
          onClick={() => handleTabClick('reviews')}
          className={cn(
            'py-3',
            'box-border',
            'border-b-3',
            'border-transparent',
            'cursor-pointer',
            {
              'border-black font-bold': activeTab === 'reviews',
            },
          )}
        >
          작성한 리뷰{' '}
          {isMyReviewsLoading ? (
            <Skeleton
              width={9}
              height={14}
            />
          ) : (
            myReview?.length || 0
          )}
        </div>
      </div>
      <div className="w-full h-full">
        {activeTab === 'restaurants' ? (
          <TabForRestaurant />
        ) : (
          <TabForReview />
        )}
      </div>
    </div>
  )
}

export default TabContent
