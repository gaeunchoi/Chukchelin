import { flexRowICenter } from '@/style/custom'
import Skeleton from 'react-loading-skeleton'

const ScheduleCardSkeleton = () => {
  return (
    <div className="min-w-[170px] min-h-[120px] rounded-md overflow-hidden">
      <Skeleton
        width={170}
        height={120}
        className="rounded-md"
      />
    </div>
  )
}

function ScheduleListSkeleton() {
  return (
    <div
      className={flexRowICenter('w-full', 'gap-3', 'overflow-hidden')}
    >
      {Array.from({ length: 4 }).map((_, idx) => (
        <ScheduleCardSkeleton key={idx} />
      ))}
    </div>
  )
}

export default ScheduleListSkeleton
