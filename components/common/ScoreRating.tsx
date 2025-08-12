import { Restaurant } from '@/types/restaurant'
import { Review } from '@/types/review'
import { Star } from 'lucide-react'
import { flexRowICenter } from '@/style/custom'
import { formatDate } from '@/utils/formatDate'

type ReviewScoreProps = {
  isShort?: boolean
  score: number
  restaurant?: Restaurant
  review?: Review
}

function ScoreRating({
  isShort,
  score,
  restaurant,
  review,
}: ReviewScoreProps) {
  if (isShort) {
    return (
      <div className={flexRowICenter('gap-1')}>
        <Star
          size={15}
          fill="black"
        />
        <div className="text-[13px] font-bold text-black">
          {score?.toFixed(1) || '0.0'}
        </div>
        <div className="text-[13px] font-medium text-gray-400">
          {' · '}
          {restaurant?.restaurant_category.name || ''} {' · '}
        </div>
        <div className="text-[13px] font-medium text-gray-400">
          {restaurant?.review_count || 0}개의 리뷰
        </div>
      </div>
    )
  }

  return (
    <div className={flexRowICenter('gap-1')}>
      <div className={flexRowICenter('gap-0.5')}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            size={14}
            fill={idx < score ? 'black' : '#ccc'}
            strokeWidth={0}
          />
        ))}
      </div>
      <div className="text-[14px] font-bold text-black">
        {score?.toFixed(1) || '0.0'}
      </div>
      <div className="text-[13px] font-medium text-gray-400">
        {formatDate(review?.created_at || '')}
      </div>
    </div>
  )
}

export default ScoreRating
