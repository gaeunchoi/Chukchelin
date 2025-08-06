import {
  flexCol,
  flexColICenter,
  flexColIJCenter,
  flexRowICenter,
} from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

type UserProfileSkeletonProps = {
  editMode: boolean
}

function UserProfileSkeleton({ editMode }: UserProfileSkeletonProps) {
  if (editMode) {
    return (
      <div className={flexColICenter('w-full', 'gap-7')}>
        <Skeleton
          circle
          width={120}
          height={120}
        />
        <div className={flexColIJCenter('gap-1')}>
          <Skeleton
            width={100}
            height={17}
          />
          <Skeleton
            width={150}
            height={17}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={flexRowICenter('w-full', 'gap-3')}>
      <Skeleton
        circle
        width={64}
        height={64}
      />
      <div className={flexCol('gap-2')}>
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
}

export default UserProfileSkeleton
