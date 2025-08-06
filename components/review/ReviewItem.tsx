import { flexCol, flexRowICenter } from '@/style/custom'
import { Review } from '@/types/review'
import StarScore from './StarScore'
import { formatDate } from '@/utils/formatDate'
import CategoryImage from '../image/CategoryImage'

type ReviewItemProps = {
  review: Review
}

function ReviewItem({ review }: ReviewItemProps) {
  return (
    <div
      className={flexCol(
        'w-full',
        'gap-4',
        'shadow-sm',
        'rounded-md',
        'p-4',
      )}
    >
      <div className={flexCol('w-full')}>
        {review.review_image.length > 0 &&
          review.review_image.map((img, idx) => (
            <div
              key={idx}
              className="w-30 h-30 rounded-md overflow-hidden"
            >
              <img
                src={img}
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
          ))}

        <div className={flexRowICenter()}>
          <StarScore score={review.score} />
          {' · '}
          <div className="text-[14px] font-medium text-gray-400">
            {formatDate(review.created_at)}
          </div>
        </div>
        <div className={flexCol('gap-3')}>
          <div className="text-[14px] font-medium whitespace-pre-wrap">
            {review.content}
          </div>
          <div className="flex flex-row items-center gap-2 bg-[#F7F7F7] rounded-md p-1">
            <CategoryImage
              size={48}
              url={review.restaurant.restaurant_category.image_url}
            />
            <div className="flex flex-col gap-1">
              <div className="text-[12px] font-bold">
                {review.restaurant.name}
              </div>
              <div className="text-[12px] font-medium text-gray-400">
                {review.restaurant.restaurant_category.name}
                {' · '}
                {review.restaurant.stadium?.name}의 맛집
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
