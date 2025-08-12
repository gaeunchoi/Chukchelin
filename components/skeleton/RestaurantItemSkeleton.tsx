import { cn } from '@/lib/utils'
import ImageSkeleton from './ImageSkeleton'
import { flexRowICenter, flexColIJCenter } from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

type RestaurantItemSkeletonProps = {
  isRow?: boolean
}

const RestaurantBadgeSkeleton = () => {
  return (
    <div className="rounded-full overflow-hidden">
      <Skeleton
        width={90}
        height={23}
      />
    </div>
  )
}

function RestaurantItemSkeleton({
  isRow,
}: RestaurantItemSkeletonProps) {
  return (
    <div
      className={cn('w-full', 'flex', 'gap-3', {
        'flex-row items-start': isRow,
        'flex-col items-center justify-center': !isRow,
      })}
    >
      <ImageSkeleton size={48} />
      <div
        className={flexColIJCenter(
          'w-full',
          'gap-3',
          isRow && 'items-start',
        )}
      >
        <div
          className={flexColIJCenter(isRow && 'items-start gap-1')}
        >
          <Skeleton
            width={100}
            height={16}
          />
          <Skeleton
            width={200}
            height={16}
          />
        </div>

        <div className={flexRowICenter('gap-1')}>
          <RestaurantBadgeSkeleton />
          <RestaurantBadgeSkeleton />
        </div>
      </div>
    </div>
  )
}

export default RestaurantItemSkeleton
