import ReviewSortSelector from '@/components/review/ReviewSortSelector'
import { useRestaurantReviews } from '@/hooks/useRestaurantReviews'
import { flexColIJCenter, flexRowIJCenter } from '@/style/custom'
import {
  reviewSortConfig,
  ReviewSortOption,
  reviewSortLabelMap,
} from '@/constants/sortLabel'
import { useEffect, useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import ReviewItem from '@/components/review/ReviewItem'
import { Review } from '@/types/review'
import { useUser } from '@/hooks/useUser'
import RestaurantReviewListSkeleton from '../skeleton/RestaurantReviewListSkeleton'
import { deleteReview } from '@/services/review'
import { useModalContext } from '@/contexts/ModalContext'

type RestaurantReviewListProps = {
  restaurantId: number
}

function RestaurantReviewList({
  restaurantId,
}: RestaurantReviewListProps) {
  const { data: loggedInUser } = useUser()
  const [isOnlyHomeFan, setIsOnlyHomeFan] = useState<boolean>(false)
  const [sortOption, setSortOption] = useState<ReviewSortOption>(
    ReviewSortOption.REVIEW_DATE_NEW,
  )
  const { data: reviews, mutate: mutateReviews } =
    useRestaurantReviews(
      restaurantId,
      reviewSortConfig[sortOption].sortBy,
      reviewSortConfig[sortOption].sortOrder,
      isOnlyHomeFan,
    )
  const { openModal } = useModalContext()

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId)
      await mutateReviews()
      openModal({
        title: '리뷰 삭제 성공',
        description: '리뷰가 삭제되었습니다.',
      })
    } catch (error: unknown) {
      console.error(error)
      openModal({
        title: '리뷰 삭제 실패',
        description: '리뷰 삭제에 실패했습니다.',
      })
    }
  }

  useEffect(() => {
    mutateReviews()
  }, [sortOption, isOnlyHomeFan, mutateReviews])

  const sortOptions = Object.values(ReviewSortOption).map(
    (option) => ({
      value: option,
      label: reviewSortLabelMap[option],
    }),
  )

  if (!reviews) return <RestaurantReviewListSkeleton />
  return (
    <div className={flexColIJCenter('w-full', 'gap-5')}>
      <div className="w-full text-[14px] font-bold">
        리뷰 ({reviews?.length || 0})
      </div>
      <div className={flexRowIJCenter('w-full', 'justify-between')}>
        <div
          className={flexRowIJCenter()}
          onClick={() => setIsOnlyHomeFan((prev) => !prev)}
        >
          <Checkbox checked={isOnlyHomeFan} />
          <div className="text-[14px] font-medium">
            <span className="font-bold">홈팬</span> 리뷰만 보기
          </div>
        </div>
        <ReviewSortSelector
          selectedOption={reviewSortLabelMap[sortOption]}
          options={sortOptions.map((option) => option.label)}
          onSelect={(selectedLabel) => {
            const selectedOption = sortOptions.find(
              (option) => option.label === selectedLabel,
            )
            if (selectedOption) {
              setSortOption(selectedOption.value)
            }
          }}
        />
      </div>
      {reviews?.map((review: Review) => (
        <ReviewItem
          key={review.id}
          isDetailPage
          isMyReview={loggedInUser?.id === review.user.id}
          review={review}
          onDelete={handleDeleteReview}
        />
      ))}
    </div>
  )
}

export default RestaurantReviewList
