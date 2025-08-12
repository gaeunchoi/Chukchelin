import { flexCol, flexRowICenter } from '@/style/custom'
import { Review, ReviewImageType } from '@/types/review'
import CategoryImage from '../image/CategoryImage'
import ScoreRating from '../common/ScoreRating'
import { Restaurant } from '@/types/restaurant'
import { User } from '@/types/user'
import ProfileImage from '../image/ProfileImage'
import ReviewImage from '../image/ReviewImage'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

type ReviewItemProps = {
  isDetailPage?: boolean
  isMyReview: boolean
  review: Review
  onDelete: (reviewId: number) => void
}

const UserContent = ({ user }: { user: User }) => (
  <div className={flexRowICenter('p-1')}>
    <ProfileImage
      url={user.profile_image_url}
      size={48}
    />
    <div className={flexCol('gap-0.5')}>
      <div className="text-[14px] text-black font-bold">
        {user.nickname}
      </div>
      <div
        className={flexRowICenter(
          'gap-1',
          'text-[12px]',
          'font-medium',
          'text-[#989FA5]',
        )}
      >
        <div className="text-black">
          <span className="font-bold">
            {user.favorite_team?.short_name}
          </span>
          팬 {' · '}
        </div>
        <div>
          남긴 리뷰 {user.review_count || 0}개{' · '}
        </div>
        <div>
          평균 별점 {user.review_average_score?.toFixed(1) || 0.0}
        </div>
      </div>
    </div>
  </div>
)

const RestaurantContent = ({
  restaurant,
}: {
  restaurant: Restaurant
}) => {
  const router = useRouter()

  const handleRestaurantClick = () => {
    router.push(`/restaurant/${restaurant.id}`)
  }

  return (
    <div
      className={flexRowICenter('bg[#F7F7F7]', 'rounded-md', 'p-1')}
      onClick={handleRestaurantClick}
    >
      <CategoryImage
        size={48}
        url={restaurant.restaurant_category.image_url}
      />
      <div className={flexCol('gap-1')}>
        <div className="text-[12px] font-bold">{restaurant.name}</div>
        <div className="text-[12px] font-medium text-gray-400">
          {restaurant.restaurant_category.name}
          {' · '}
          {restaurant.stadium?.name}의 맛집
        </div>
      </div>
    </div>
  )
}

const ReviewDeleteButton = ({
  reviewId,
  onClick,
}: {
  reviewId: number
  onClick: (reviewId: number) => void
}) => {
  return (
    <Button
      variant="link"
      className="text-[14px] font-medium underline p-0"
      onClick={() => onClick(reviewId)}
    >
      삭제
    </Button>
  )
}

function ReviewItem({
  isDetailPage,
  isMyReview,
  review,
  onDelete,
}: ReviewItemProps) {
  return (
    <div className={flexCol('w-full', 'items-start', 'gap-4', 'p-4')}>
      {isDetailPage && <UserContent user={review.user} />}
      <div
        className={flexRowICenter(
          'w-full',
          'gap-2',
          'overflow-x-scroll',
          'scrollbar-hide',
        )}
      >
        {review.review_image.length > 0 &&
          review.review_image.map((image: ReviewImageType) => (
            <ReviewImage
              key={image.id}
              url={image.image_url}
              size={120}
            />
          ))}
      </div>
      <ScoreRating
        score={review.score}
        review={review}
      />
      <div className={flexCol('gap-3')}>
        <div className="text-[14px] font-medium whitespace-pre-wrap">
          {review.content}
        </div>
        {!isDetailPage && (
          <RestaurantContent restaurant={review.restaurant} />
        )}
      </div>
      {isMyReview && (
        <ReviewDeleteButton
          reviewId={review.id}
          onClick={() => onDelete(review.id)}
        />
      )}
    </div>
  )
}

export default ReviewItem
