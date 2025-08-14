'use client'
import { useRouter } from 'next/navigation'
import { flexRowICenter, header } from '@/style/custom'
import { ChevronLeft, Share2 } from 'lucide-react'
import { Restaurant } from '@/types/restaurant'
import BookMark from '@/components/common/BookMark'
import { useBookmark } from '@/hooks/useBookmark'

type RestaurantHeaderProps = {
  restaurantId: number
}

function RestaurantHeader({ restaurantId }: RestaurantHeaderProps) {
  const router = useRouter()
  const { restaurant } = useBookmark(restaurantId)

  const handleBack = () => {
    router.back()
  }

  const handleShare = async (restaurant: Restaurant) => {
    if (!restaurant) return

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `[${restaurant.restaurant_category.name}] ${restaurant.name}`,
          description: restaurant.address,
          link: {
            webUrl: `${process.env.NEXT_PUBLIC_APP_URL}/restaurant/${restaurant.id}`,
            mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}/restaurant/${restaurant.id}`,
          },
        },
        social: {
          likeCount: restaurant.user_favorite_count || 0,
        },
      })
    } catch (error) {
      console.error('공유 처리 중 오류가 발생했습니다:', error)
    }
  }

  return (
    <div className={header('justify-between')}>
      <ChevronLeft
        size={18}
        color="black"
        strokeWidth={3}
        onClick={handleBack}
      />
      <div className={flexRowICenter('gap-4')}>
        <div
          onClick={restaurant && (() => handleShare(restaurant))}
          className="cursor-pointer"
        >
          <Share2
            size={18}
            color="black"
            strokeWidth={3}
          />
        </div>
        <BookMark restaurantId={restaurantId} />
      </div>
    </div>
  )
}

export default RestaurantHeader
