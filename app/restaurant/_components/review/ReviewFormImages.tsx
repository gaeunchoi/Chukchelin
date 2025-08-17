'use client'
import { Camera, X } from 'lucide-react'
import { flexColIJCenter, flexRowICenter } from '@/style/custom'
import { trackImageUploadFailed } from '@/utils/analytics'

type ReviewFormImagesProps = {
  images: File[]
  onAddImage: (image: File[]) => void
  onRemoveImage: (index: number) => void
  restaurantId?: string
}

function ReviewFormImages({
  images,
  onAddImage,
  onRemoveImage,
  restaurantId,
}: ReviewFormImagesProps) {
  const handleImageAdd = (files: File[]) => {
    try {
      // 파일 크기 및 타입 검증
      const validFiles = files.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB 제한
          if (restaurantId) {
            trackImageUploadFailed(
              restaurantId,
              'file_size_exceeded',
              '파일 크기가 10MB를 초과합니다.',
            )
          }
          return false
        }

        if (!file.type.startsWith('image/')) {
          if (restaurantId) {
            trackImageUploadFailed(
              restaurantId,
              'invalid_file_type',
              '이미지 파일만 업로드 가능합니다.',
            )
          }
          return false
        }

        return true
      })

      if (validFiles.length > 0) {
        onAddImage(validFiles)
      }
    } catch (error) {
      if (restaurantId) {
        trackImageUploadFailed(
          restaurantId,
          'file_processing_error',
          '파일 처리 중 오류가 발생했습니다.',
        )
      }
    }
  }

  return (
    <div className={flexRowICenter('justify-start', 'gap-3')}>
      <div
        className={flexColIJCenter(
          'min-w-20',
          'min-h-20',
          'rounded-md',
          'border-2',
          'border-[#18181E]',
        )}
      >
        <label
          htmlFor="image-input"
          className={flexColIJCenter(
            'min-w-6',
            'min-h-6',
            'cursor-pointer',
            'bg-gray-300',
            'rounded-full',
          )}
        >
          <Camera
            size={16}
            color="black"
          />
        </label>
        <input
          type="file"
          id="image-input"
          className="hidden"
          multiple
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              handleImageAdd(Array.from(e.target.files))
            }
          }}
        />
        <div className="text-[12px] font-medium text-[#818181]">
          <span className="font-bold text-black">
            {images.length}
          </span>
          /10
        </div>
      </div>
      <div className={flexRowICenter('gap-3', 'overflow-x-scroll')}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative min-w-20 min-h-20 w-20 h-20 rounded-md overflow-hidden"
          >
            <img
              src={URL.createObjectURL(image)}
              alt="review image"
              className="object-cover"
            />
            <div
              className={flexColIJCenter(
                'min-w-5',
                'min-h-5',
                'absolute',
                'top-1',
                'right-1',
                'rounded-full',
                'bg-black',
                'cursor-pointer',
              )}
              onClick={() => onRemoveImage(index)}
            >
              <X
                size={14}
                color="white"
                strokeWidth={3}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewFormImages
