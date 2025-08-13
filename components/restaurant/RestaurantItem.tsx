import {
  flexColIJCenter,
  flexRowIJCenter,
  flexRowICenter,
} from '@/style/custom'
import { useRouter } from 'next/navigation'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { Restaurant, SavedRestaurant } from '@/types/restaurant'
import CategoryImage from '../image/CategoryImage'
import formatDistance from '@/utils/formatDistance'
import ScoreRating from '../common/ScoreRating'
import RestaurantBadge from './RestaurantBadge'
import { cn } from '@/lib/utils'
import RestaurantItemSkeleton from '../skeleton/RestaurantItemSkeleton'
import BookMark from '../common/BookMark'
import { trackRestaurantViewed } from '@/utils/analytics'

type RestaurantItemProps = {
  restaurant: Restaurant
  isRow?: boolean
}

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
  const { data: savedRestaurant } = useSavedRestaurants(
    restaurant?.stadium_id,
  )

  const isMarked = savedRestaurant?.some(
    (saved: SavedRestaurant) => saved.restaurant_id === restaurant.id,
  )

  const handleRestaurantClick = () => {
    // 맛집 조회 이벤트 추적
    trackRestaurantViewed(
      restaurant.id.toString(),
      restaurant.name,
      restaurant.restaurant_category.name,
      restaurant.stadium?.name || 'Unknown',
    )

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
              <BookMark
                isMarked={isMarked}
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
