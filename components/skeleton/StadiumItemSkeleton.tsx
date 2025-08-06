import { flexCol, flexRowICenter } from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

function StadiumItemSkeleton() {
  return (
    <div
      className={flexRowICenter(
        'w-full',
        'justify-between',
        'cursor-pointer',
        'hover:bg-gray-50',
        'rounded-lg',
        'transition-colors',
      )}
    >
      <div className={flexRowICenter()}>
        <Skeleton
          circle
          width={40}
          height={40}
        />
        <div
          className={flexCol('items-start', 'justify-start', 'gap-1')}
        >
          <Skeleton
            width={120}
            height={17}
          />
          <Skeleton
            width={80}
            height={17}
          ></Skeleton>
        </div>
      </div>
      <Skeleton
        width={84}
        height={17}
      />
    </div>
  )
}

export default StadiumItemSkeleton
