import { flexCol } from '@/style/custom'
import StadiumItemSkeleton from '@/components/skeleton/StadiumItemSkeleton'

function HomeStadiumSkeleton() {
  return (
    <div className={flexCol('w-full')}>
      <span className="text-[14px] font-semibold">홈 구장</span>
      <div className={flexCol('w-full', 'gap-6')}>
        {Array.from({ length: 10 }).map((_, idx) => (
          <StadiumItemSkeleton key={idx} />
        ))}
      </div>
    </div>
  )
}

export default HomeStadiumSkeleton
