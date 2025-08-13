import { flexRowICenter } from '@/style/custom'
import { Bookmark } from 'lucide-react'

type BookMarkProps = {
  isMarked: boolean
  count: number
  onClick?: () => void
}

const BookMark = ({ isMarked, count, onClick }: BookMarkProps) => {
  return (
    <div
      className={flexRowICenter('gap-0.5')}
      onClick={() => onClick?.()}
    >
      <Bookmark
        size={18}
        color="black"
        fill={isMarked ? 'black' : 'white'}
        strokeWidth={3}
      />
      <div className="text-[16px] font-semibold text-black">
        {count}
      </div>
    </div>
  )
}

export default BookMark
