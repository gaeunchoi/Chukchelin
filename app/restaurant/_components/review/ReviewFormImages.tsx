'use client'
import { Camera, X } from 'lucide-react'
import { flexColIJCenter, flexRowICenter } from '@/style/custom'

type ReviewFormImagesProps = {
  images: File[]
  onAddImage: (image: File[]) => void
  onRemoveImage: (index: number) => void
}

function ReviewFormImages({
  images,
  onAddImage,
  onRemoveImage,
}: ReviewFormImagesProps) {
  const handleImageAdd = (files: File[]) => {
    try {
      const validFiles = files.filter((file) => {
        if (file.size > 10 * 1024 * 1024) {
          return false
        }

        if (!file.type.startsWith('image/')) {
          return false
        }

        return true
      })

      if (validFiles.length > 0) {
        onAddImage(validFiles)
      }
    } catch (error) {
      console.error('Image processing error:', error)
    }
  }

  return (
    <div className={flexRowICenter('justify-start', 'gap-3')}>
      <label
        htmlFor="image-input"
        className={flexColIJCenter(
          'min-w-20',
          'min-h-20',
          'rounded-md',
          'border-2',
          'border-[#18181E]',
          'cursor-pointer',
        )}
      >
        <div
          className={flexColIJCenter(
            'min-w-6',
            'min-h-6',
            'bg-gray-300',
            'rounded-full',
          )}
        >
          <Camera
            size={16}
            color="black"
          />
        </div>
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
      </label>
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
