import { flexCol, flexRowICenter } from '@/style/custom'
import ImageSkeleton from './ImageSkeleton'
import Skeleton from 'react-loading-skeleton'

type ReviewItemSkeletonProps = {
  isDetailPage?: boolean
}

const UserContentSkeleton = () => (
  <div
    className={flexRowICenter(
      'w-full',
      'overflow-x-scroll',
      'scrollbar-hide',
    )}
  >
    <ImageSkeleton
      size={48}
      isCircle
    />
    <div className={flexCol('gap-0.5')}>
      <Skeleton
        width={100}
        height={17}
      />
      <Skeleton
        width={200}
        height={17}
      />
    </div>
  </div>
)

const ReviewContentSkeleton = () => (
  <>
    <div
      className={flexRowICenter(
        'w-full',
        'overflow-x-scroll',
        'scrollbar-hide',
      )}
    >
      {Array.from({ length: 3 }).map((_, idx) => (
        <ImageSkeleton
          key={idx}
          size={120}
        />
      ))}
    </div>
    <Skeleton
      width={100}
      height={17}
    />
    <Skeleton
      width={300}
      height={17}
    />
  </>
)

const RestaurantContentSkeleton = () => (
  <div className={flexRowICenter('w-full')}>
    <ImageSkeleton size={48} />
    <div className={flexCol('gap-1')}>
      <Skeleton
        width={100}
        height={17}
      />
      <Skeleton
        width={200}
        height={17}
      />
    </div>
  </div>
)

function ReviewItemSkeleton({
  isDetailPage,
}: ReviewItemSkeletonProps) {
  return (
    <div className={flexCol('w-full', 'items-start', 'gap-4', 'p-4')}>
      {isDetailPage && <UserContentSkeleton />}
      <ReviewContentSkeleton />
      {!isDetailPage && <RestaurantContentSkeleton />}
    </div>
  )
}

export default ReviewItemSkeleton
