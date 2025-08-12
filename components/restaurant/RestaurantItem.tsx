import {
  flexColIJCenter,
  flexRowIJCenter,
  flexRowICenter,
} from '@/style/custom'
import { Restaurant } from '@/types/restaurant'
import { Bookmark } from 'lucide-react'
import CategoryImage from '../image/CategoryImage'
import { useRouter } from 'next/navigation'
import formatDistance from '@/utils/formatDistance'
import ScoreRating from '../common/ScoreRating'
import RestaurantBadge from './RestaurantBadge'
import { cn } from '@/lib/utils'
import RestaurantItemSkeleton from '../skeleton/RestaurantItemSkeleton'

type RestaurantItemProps = {
  restaurant: Restaurant
  isRow?: boolean
}

const FavoriteCountContent = ({ count }: { count: number }) => (
  <div className={flexRowICenter('gap-0.5')}>
    <Bookmark
      size={15}
      color="black"
      strokeWidth={3}
    />
    <div className="text-[13px] font-semibold text-black">
      {count}
    </div>
  </div>
)

const TagsList = ({ restaurant }: { restaurant: Restaurant }) => (
  <div className={flexRowICenter('gap-1', 'flex-wrap')}>
    <RestaurantBadge
      isOutline={false}
      content={`구장에서 ${formatDistance(restaurant.distance)}`}
    />
    {restaurant.home_recommend_count > 0 && (
      <RestaurantBadge
        isOutline
        content={`홈팬 ${restaurant.home_recommend_count}명이 추천`}
      />
    )}
  </div>
)

function RestaurantItem({ restaurant, isRow }: RestaurantItemProps) {
  const router = useRouter()

  const handleRestaurantClick = () => {
    router.push(`/restaurant/${restaurant.id}`)
  }

  if (!restaurant) return <RestaurantItemSkeleton />
  return (
    <div
      className={cn('w-full', 'flex', 'gap-3', {
        'flex-row items-start cursor-pointer': isRow,
        'flex-col items-center justify-center': !isRow,
      })}
      onClick={isRow ? handleRestaurantClick : undefined}
    >
      <CategoryImage
        url={restaurant.restaurant_category.image_url}
        size={48}
      />

      <div
        className={flexColIJCenter(
          'w-full',
          'gap-3',
          isRow && 'items-start',
        )}
      >
        <div
          className={flexColIJCenter(
            'w-full',
            isRow && 'items-start gap-1',
          )}
        >
          <div
            className={flexRowIJCenter(
              'w-full',
              isRow && 'justify-between',
            )}
          >
            <div className="text-[15px] font-bold text-black">
              {restaurant.name}
            </div>
            {isRow && (
              <FavoriteCountContent
                count={restaurant.user_favorite_count}
              />
            )}
          </div>
          <ScoreRating
            isShort
            score={restaurant.review_average_score || 0}
            restaurant={restaurant}
          />
        </div>
        <TagsList restaurant={restaurant} />
      </div>
    </div>
  )
}

export default RestaurantItem
