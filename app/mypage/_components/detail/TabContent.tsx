'use client'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import TabForRestaurant from './TabForRestaurant'
import TabForReview from './TabForReview'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useMyReviews } from '@/hooks/useMyReviews'
import { flexCol, flexRowICenter } from '@/style/custom'

function TabContent() {
  const { data: savedRestaurants } = useSavedRestaurants(null)
  const { data: myReview } = useMyReviews()
  const [activeTab, setActiveTab] = useState<
    'restaurants' | 'reviews'
  >('restaurants')

  return (
    <div
      className={flexCol('w-full', 'h-12', ' items-start', 'gap-6')}
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
          onClick={() => setActiveTab('restaurants')}
          className={cn(
            'py-3',
            'box-border',
            'border-b-3',
            'border-transparent',
            {
              'border-black font-bold': activeTab === 'restaurants',
            },
          )}
        >
          저장한 맛집 {savedRestaurants?.length || '0'}
        </div>
        <div
          onClick={() => setActiveTab('reviews')}
          className={cn(
            'py-3',
            'box-border',
            'border-b-3',
            'border-transparent',
            {
              'border-black font-bold': activeTab === 'reviews',
            },
          )}
        >
          작성한 리뷰 {myReview?.length || '0'}
        </div>
      </div>
      {activeTab === 'restaurants' && <TabForRestaurant />}
      {activeTab === 'reviews' && <TabForReview />}
    </div>
  )
}

export default TabContent
