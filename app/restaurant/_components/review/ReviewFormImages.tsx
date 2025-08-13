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
              onAddImage(Array.from(e.target.files))
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
