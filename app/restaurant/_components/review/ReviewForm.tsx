'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useModalContext } from '@/contexts/ModalContext'
import { useRestaurant } from '@/hooks/useRestaurant'
import { createReview } from '@/services/review'
import { flexCol, stickyButton } from '@/style/custom'
import { Button } from '@/components/ui/button'
import RestaurantReviewFormSkeleton from '../skeleton/RestaurantReviewFormSkeleton'
import ReviewFormContent from './ReviewFormContent'
import ReviewFormImages from './ReviewFormImages'
import ReviewFormScore from './ReviewFormScore'
import ReviewFormTitle from './ReviewFormTitle'
import {
  trackImageUploaded,
  trackImageUploadFailed,
  trackReviewSubmitted,
} from '@/utils/analytics'

function ReviewFormWithSearchParams() {
  const searchParams = useSearchParams()
  const restaurantId = parseInt(
    searchParams.get('restaurantId') as string,
  )

  return <ReviewForm restaurantId={restaurantId} />
}

function ReviewForm({ restaurantId }: { restaurantId: number }) {
  const router = useRouter()
  const { openModal } = useModalContext()
  const { data: restaurant } = useRestaurant(restaurantId)
  const [score, setScore] = useState<number>(0)
  const [images, setImages] = useState<File[]>([])
  const [content, setContent] = useState<string>('')

  const handleDeleteImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleAddImage = (files: File[]) => {
    setImages((prev) => [...prev, ...files])

    // 이미지 업로드 성공 이벤트 추적
    if (restaurant) {
      trackImageUploaded(restaurant.id.toString(), Date.now())
    }
  }

  const handleReviewSubmit = async () => {
    try {
      await createReview(
        restaurantId,
        {
          content,
          score,
        },
        images,
      )

      // 리뷰 제출 성공 이벤트 추적
      if (restaurant) {
        trackReviewSubmitted(
          restaurant.id.toString(),
          restaurant.name,
          images.length > 0,
        )
      }

      openModal({
        title: '리뷰 작성 완료',
        description: '리뷰가 성공적으로 작성되었습니다.',
        actionBtnText: '확인',
        onAction: () => router.replace(`/restaurant/${restaurantId}`),
      })
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '리뷰 작성에 실패했습니다. 다시 시도해주세요.'

      // 이미지 업로드 실패 이벤트 추적
      if (restaurant) {
        trackImageUploadFailed(
          restaurant.id.toString(),
          'review_submission_error',
          errorMessage,
        )
      }

      openModal({
        title: '리뷰 작성 실패',
        description: errorMessage,
        actionBtnText: '확인',
      })
    }
  }

  if (!restaurant) {
    return <RestaurantReviewFormSkeleton />
  }

  return (
    <div className={flexCol('w-full', 'gap-12')}>
      <div className={flexCol('w-full', 'gap-3')}>
        <ReviewFormTitle restaurantName={restaurant.name} />
        <ReviewFormScore
          score={score}
          onChange={setScore}
        />
      </div>
      <ReviewFormImages
        images={images}
        onAddImage={(files) => handleAddImage(files)}
        onRemoveImage={(idx) => handleDeleteImage(idx)}
        restaurantId={restaurant.id.toString()}
      />
      <ReviewFormContent
        content={content}
        onChange={setContent}
      />
      <Button
        className={stickyButton()}
        onClick={handleReviewSubmit}
        disabled={score === 0 || content.length < 10}
      >
        리뷰 작성하기
      </Button>
    </div>
  )
}

export default ReviewFormWithSearchParams
