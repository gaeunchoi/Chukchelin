import {
  badge,
  flexCol,
  flexRow,
  flexRowICenter,
} from '@/style/custom'
import { Restaurant } from '@/types/restaurant'
import { Bookmark, Star } from 'lucide-react'
import CategoryImage from './image/CategoryImage'

type RestaurantItemProps = {
  restaurant: Restaurant
}

function RestaurantItem({ restaurant }: RestaurantItemProps) {
  const RatingContent = () => (
    <div className={flexRowICenter('gap-1')}>
      <Star
        size={15}
        fill="black"
      />
      <div className="text-[13px] font-bold">
        {restaurant.review_average_score?.toFixed(1) || '0.0'}
      </div>
      <div className="text-[13px] font-medium text-gray-400">
        · {restaurant.restaurant_category.name} ·{' '}
        {restaurant.review_count}개의 리뷰
      </div>
    </div>
  )

  const FavoriteCountContent = () => (
    <div className={flexRowICenter('gap-0.5')}>
      <Bookmark
        size={15}
        color="black"
      />
      <div className="text-[13px] font-semibold">
        {restaurant.user_favorite_count}
      </div>
    </div>
  )

  const TagsList = () => (
    <div className={flexRowICenter('gap-1')}>
      <div
        className={badge('text-white', 'bg-black', 'bodrer-black')}
      >
        구장에서 32m(수정 예정)
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

  return (
    <div className={flexRow('w-full', 'gap-3', 'items-start')}>
      <CategoryImage
        url={restaurant.restaurant_category.image_url}
        size={48}
      />

      <div className={flexCol('w-full', 'gap-3')}>
        <div className={flexCol('w-full', 'gap-1')}>
          <div
            className={flexRowICenter('w-full', 'justify-between')}
          >
            <div className="text-[15px] font-bold">
              {restaurant.name}
            </div>
            <FavoriteCountContent />
          </div>
          <RatingContent />
        </div>
        <TagsList />
      </div>
    </div>
  )
}

export default RestaurantItem
