import Skeleton from 'react-loading-skeleton'
import ReviewItemSkeleton from '@/components/skeleton/ReviewItemSkeleton'
import { flexColIJCenter, flexRowICenter } from '@/style/custom'

function RestaurantReviewListSkeleton() {
  return (
    <div className={flexColIJCenter('w-full', 'gap-5')}>
      <div className="w-full">
        <Skeleton
          width={50}
          height={17}
        />
      </div>

      <div className={flexRowICenter('w-full', 'justify-between')}>
        <Skeleton
          width={100}
          height={17}
        />
        <Skeleton
          width={100}
          height={17}
        />
      </div>
      {Array.from({ length: 2 }).map((_, idx) => (
        <ReviewItemSkeleton
          key={idx}
          isDetailPage
        />
      ))}
    </div>
  )
}

export default RestaurantReviewListSkeleton
