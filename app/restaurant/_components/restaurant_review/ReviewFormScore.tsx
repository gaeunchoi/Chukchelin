'use client'
import { useState } from 'react'
import { Star } from 'lucide-react'
import { flexRowICenter } from '@/style/custom'
import { cn } from '@/lib/utils'

type ReviewFormScoreProps = {
  score: number
  onChange: (score: number) => void
}

function ReviewFormScore({ score, onChange }: ReviewFormScoreProps) {
  const [hover, setHover] = useState<number | null>(null)

  return (
    <div className={flexRowICenter()}>
      <div className={flexRowICenter('gap-1')}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFill =
            hover !== null ? star <= hover : star <= score
          return (
            <Star
              key={star}
              fill={isFill ? 'black' : 'gray'}
              stroke={isFill ? 'black' : 'gray'}
              size={20}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onChange(star)}
              className={cn(
                'cursor-pointer',
                'transition-colors',
                'duration-300',
              )}
            />
          )
        })}
      </div>
      <div className="text-[16px] text-black font-bold">{score}</div>
    </div>
  )
}

export default ReviewFormScore
