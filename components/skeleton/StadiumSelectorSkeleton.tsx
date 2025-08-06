import { flexRowICenter } from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

function StadiumSelectorSkeleton() {
  return (
    <div className={flexRowICenter('w-full', 'gap-0.5')}>
      <Skeleton
        circle
        width={20}
        height={20}
      />
      <Skeleton
        width={200}
        height={17}
      />
    </div>
  )
}

export default StadiumSelectorSkeleton
