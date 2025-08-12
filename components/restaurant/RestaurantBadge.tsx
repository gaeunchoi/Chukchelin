import { badge } from '@/style/custom'

type RestaurantBadgeProps = {
  isOutline?: boolean
  content: string
}

function RestaurantBadge({
  isOutline,
  content,
}: RestaurantBadgeProps) {
  return (
    <div
      className={badge({
        'text-gray-900 bg-white border-gray-200': isOutline,
        'text-white bg-black border-black': !isOutline,
      })}
    >
      {content}
    </div>
  )
}

export default RestaurantBadge
