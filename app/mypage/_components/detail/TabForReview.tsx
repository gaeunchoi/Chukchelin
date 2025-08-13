import { useUser } from '@/hooks/useUser'
import { useMyReviews } from '@/hooks/useMyReviews'
import { deleteReview } from '@/services/review'
import { useModalContext } from '@/contexts/ModalContext'
import { flexColIJCenter } from '@/style/custom'
import { Review } from '@/types/review'
import ReviewItem from '@/components/review/ReviewItem'
import LoadingSpinner from '@/components/common/LoadingSpinner'

function TabForReview() {
  const { data: loggedInUser, isLoading } = useUser()
  const { data: myReviews, mutate: mutateMyReviews } = useMyReviews()
  const { openModal } = useModalContext()

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await deleteReview(reviewId)
      await mutateMyReviews()

      openModal({
        title: '리뷰 삭제 성공',
        description: '리뷰가 삭제되었습니다.',
      })
    } catch (error: unknown) {
      console.error('리뷰 삭제 실패:', error)

      openModal({
        title: '리뷰 삭제 실패',
        description: '리뷰 삭제에 실패했습니다.',
      })
    }
  }

  if (isLoading) {
    return (
      <div className={flexColIJCenter('w-full', 'py-8')}>
        <LoadingSpinner width={100} />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-start gap-4">
      {myReviews?.map((review: Review) => (
        <ReviewItem
          key={review.id}
          isMyReview={loggedInUser.id === review.user_id}
          review={review}
          onDelete={handleDeleteReview}
        />
      ))}
    </div>
  )
}

export default TabForReview
