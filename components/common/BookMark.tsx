import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useModalContext } from '@/contexts/ModalContext'
import { useBookmark } from '@/hooks/useBookmark'
import { useEffect, useState } from 'react'
import { flexRowICenter } from '@/style/custom'
import { Bookmark } from 'lucide-react'

type BookMarkProps = {
  restaurantId: number
}

function BookMark({ restaurantId }: BookMarkProps) {
  const router = useRouter()
  const { data: loggedInUser } = useUser()
  const { openModal } = useModalContext()

  const {
    isMarked: isMarkedFromHook,
    handleBookmark,
    restaurant,
  } = useBookmark(restaurantId)

  const [bookmarkCount, setBookmarkCount] = useState<number>(
    restaurant?.user_favorite_count || 0,
  )
  const [isMarked, setIsMarked] = useState(isMarkedFromHook)

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    if (!loggedInUser) {
      return openModal({
        title: '로그인 필요',
        description: '맛집 저장은 로그인 후 이용해주세요.',
        actionBtnText: '로그인',
        onAction: () => {
          router.push('/login')
        },
      })
    }

    setIsMarked(!isMarked)
    setBookmarkCount(bookmarkCount + (!isMarked ? 1 : -1))

    handleBookmark()
  }

  useEffect(() => {
    if (restaurant?.user_favorite_count !== undefined) {
      setBookmarkCount(restaurant.user_favorite_count)
    }
    if (isMarkedFromHook !== undefined) {
      setIsMarked(isMarkedFromHook)
    }
  }, [restaurant?.user_favorite_count, isMarkedFromHook])

  return (
    <div
      className={flexRowICenter('gap-0.5', 'z-10')}
      onClick={handleBookmarkClick}
    >
      <Bookmark
        size={18}
        color="black"
        fill={isMarked ? 'black' : 'none'}
        strokeWidth={3}
      />
      <div className="text-[16px] font-semibold text-black">
        {bookmarkCount}
      </div>
    </div>
  )
}

export default BookMark
