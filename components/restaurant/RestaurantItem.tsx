import {
  badge,
  flexCol,
  flexRow,
  flexRowICenter,
} from '@/style/custom'
import { Restaurant } from '@/types/restaurant'
import { Bookmark, Star } from 'lucide-react'
import CategoryImage from '../image/CategoryImage'
import { useRouter } from 'next/navigation'
import formatDistance from '@/utils/formatDistance'

type RestaurantItemProps = {
  restaurant: Restaurant
}

const RatingContent = ({
  restaurant,
}: {
  restaurant: Restaurant
}) => (
  <div className={flexRowICenter('gap-1')}>
    <Star
      size={15}
      fill="black"
    />
    <div className="text-[13px] font-bold text-black">
      {restaurant.review_average_score?.toFixed(1) || '0.0'}
    </div>
    <div className="text-[13px] font-medium text-gray-400">
      · {restaurant.restaurant_category.name} ·{' '}
      {restaurant.review_count}개의 리뷰
    </div>
  </div>
)

const FavoriteCountContent = ({ count }: { count: number }) => (
  <div className={flexRowICenter('gap-0.5')}>
    <Bookmark
      size={15}
      color="black"
    />
    <div className="text-[13px] font-semibold text-black">
      {count}
    </div>
  </div>
)

const TagsList = ({ restaurant }: { restaurant: Restaurant }) => (
  <div className={flexRowICenter('gap-1')}>
    <div className={badge('text-white', 'bg-black', 'bodrer-black')}>
      구장에서 {formatDistance(restaurant.distance)}
    </div>
    <div
      className={badge(
        'text-gray-900',
        'bg-white',
        'border-gray-200',
      )}
    >
      홈팬 2명이 추천(수정 예정)
    </div>
  </div>
)

function RestaurantItem({ restaurant }: RestaurantItemProps) {
  const router = useRouter()

  const handleRestaurantClick = () => {
    router.push(`/restaurant/${restaurant.id}`)
  }

  return (
    <div
      className={flexRow('w-full', 'gap-3', 'items-start')}
      onClick={handleRestaurantClick}
    >
      <CategoryImage
        url={restaurant.restaurant_category.image_url}
        size={48}
      />

      <div className={flexCol('w-full', 'gap-3')}>
        <div className={flexCol('w-full', 'gap-1')}>
          <div
            className={flexRowICenter('w-full', 'justify-between')}
          >
            <div className="text-[15px] font-bold text-black">
              {restaurant.name}
            </div>
            <FavoriteCountContent
              count={restaurant.user_favorite_count}
            />
          </div>
          <RatingContent restaurant={restaurant} />
        </div>
        <TagsList restaurant={restaurant} />
      </div>
    </div>
  )
}

export default RestaurantItem
