import { flexRowICenter } from '@/style/custom'
import { Star } from 'lucide-react'

type StarScoreProps = {
  score: number
}

function ScoreRating({ score }: StarScoreProps) {
  return (
    <div className={flexRowICenter('gap-1')}>
      <div className={flexRowICenter('gap-0.5')}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star
            key={idx}
            size={14}
            fill={idx < score ? 'black' : '#ccc'}
            strokeWidth={0}
          />
        ))}
      </div>
      <div className="text-[14px] font-bold text-black">{score}</div>
    </div>
  )
}

export default ScoreRating
