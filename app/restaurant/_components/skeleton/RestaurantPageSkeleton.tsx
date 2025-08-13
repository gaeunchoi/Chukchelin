import RestaurantItemSkeleton from '@/components/skeleton/RestaurantItemSkeleton'
import RestaurantReviewListSkeleton from './RestaurantReviewListSkeleton'
import { flexCol } from '@/style/custom'

function RestaurantPageSkeleton() {
  return (
    <div className={flexCol('gap-5', 'w-full')}>
      <RestaurantItemSkeleton />
      <RestaurantReviewListSkeleton />
    </div>
  )
}

export default RestaurantPageSkeleton
