import ReviewItem from '@/components/review/ReviewItem'
import { useWriteReviews } from '@/hooks/useWriteReviews'
import { Review } from '@/types/review'

function TabForReview() {
  const { data: writeReviews } = useWriteReviews()

  return (
    <div className="w-full flex flex-col items-start gap-4">
      {writeReviews?.map((review: Review) => (
        <ReviewItem
          key={review.id}
          review={review}
        />
      ))}
    </div>
  )
}

export default TabForReview
