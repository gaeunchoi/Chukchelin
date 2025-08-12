import MapContainerSkeleton from '@/components/skeleton/MapContainerSkeleton'
import RestaurantItemSkeleton from '@/components/skeleton/RestaurantItemSkeleton'
import { flexCol, flexColIJCenter } from '@/style/custom'

function RestaurantListSkeleton() {
  return (
    <div className={flexCol('w-full', 'gap-9')}>
      <MapContainerSkeleton />
      <div className={flexColIJCenter('w-full', 'gap-9')}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <RestaurantItemSkeleton
            key={idx}
            isRow
          />
        ))}
      </div>
    </div>
  )
}

export default RestaurantListSkeleton
