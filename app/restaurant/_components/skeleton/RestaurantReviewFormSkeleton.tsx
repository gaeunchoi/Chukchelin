import { flexCol } from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

function RestaurantReviewFormSkeleton() {
  return (
    <div className={flexCol('w-full', 'gap-12')}>
      <div className={flexCol('w-full', 'gap-3')}>
        <div className={flexCol()}>
          <Skeleton
            width={200}
            height={20}
          />
          <Skeleton
            width={250}
            height={20}
          />
        </div>
        <Skeleton
          width={140}
          height={20}
        />
      </div>
      {/* 이미지 */}
      <Skeleton
        width={80}
        height={80}
      />
      <Skeleton height={200} /> {/* 인풋박스 */}
    </div>
  )
}

export default RestaurantReviewFormSkeleton
