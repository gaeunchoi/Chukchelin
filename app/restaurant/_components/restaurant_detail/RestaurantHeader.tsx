'use client'
import { useRestaurant } from '@/hooks/useRestaurant'
import { favoriteRestaurant } from '@/services/restaurant'
import { flexRowICenter, header } from '@/style/custom'
import { Bookmark, ChevronLeft, Share2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Restaurant } from '@/types/restaurant'
import { useEffect, useState } from 'react'

type RestaurantHeaderProps = {
  restaurantId: number
}

function RestaurantHeader({ restaurantId }: RestaurantHeaderProps) {
  const router = useRouter()
  const { data: restaurant, mutate: mutateRestaurant } =
    useRestaurant(restaurantId)
  const [kakao, setKakao] = useState<typeof window.Kakao | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.Kakao) {
      setKakao(window.Kakao)
    }
  }, [])

  const handleBack = () => {
    router.back()
  }

  const handleShare = async (restaurant: Restaurant) => {
    if (!restaurant || !kakao) return

    kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `[${restaurant.restaurant_category.name}] ${restaurant.name}`,
        description: restaurant.address,
        link: {
          webUrl: `${window.location.origin}/restaurant/${restaurant.id}`,
          mobileWebUrl: `${window.location.origin}/restaurant/${restaurant.id}`,
        },
      },
      social: {
        likeCount: restaurant.user_favorite_count || 0,
      },
    })
  }

  const handleFavorite = useDebouncedCallback(async () => {
    try {
      await favoriteRestaurant(restaurantId)
      mutateRestaurant()
    } catch (error) {
      console.error('좋아요 처리 중 오류가 발생했습니다:', error)
    }
  }, 1000)

  return (
    <div className={header('justify-between')}>
      <ChevronLeft
        size={18}
        color="black"
        strokeWidth={3}
        onClick={handleBack}
      />
      <div className={flexRowICenter('gap-4')}>
        <Share2
          size={18}
          color="black"
          strokeWidth={3}
          onClick={() => handleShare(restaurant)}
        />
        <div
          className={flexRowICenter('gap-1')}
          onClick={handleFavorite}
        >
          <Bookmark
            size={18}
            color="black"
            strokeWidth={3}
          />
          <div className="text-[16px] font-semibold text-black">
            {restaurant?.user_favorite_count || '0'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantHeader
