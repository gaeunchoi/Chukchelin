'use client'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useRestaurant } from '@/hooks/useRestaurant'
import { useSavedRestaurants } from '@/hooks/useSavedRestaurants'
import { useEffect, useState } from 'react'
import { favoriteRestaurant } from '@/services/restaurant'
import { flexRowICenter, header } from '@/style/custom'
import { ChevronLeft, Share2 } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce'
import { Restaurant, SavedRestaurant } from '@/types/restaurant'
import BookMark from '@/components/common/BookMark'

type RestaurantHeaderProps = {
  restaurantId: number
}

function RestaurantHeader({ restaurantId }: RestaurantHeaderProps) {
  const router = useRouter()
  const { data: loggedInUser } = useUser()
  const { data: restaurant, mutate: mutateRestaurant } =
    useRestaurant(restaurantId)
  const { data: savedRestaurant } = useSavedRestaurants(
    restaurant?.stadium_id,
  )

  const [isMarked, setIsMarked] = useState<boolean>(false)
  useEffect(() => {
    if (savedRestaurant && restaurant?.stadium_id) {
      setIsMarked(
        savedRestaurant?.some(
          (saved: SavedRestaurant) =>
            saved.restaurant_id === restaurantId,
        ),
      )
    }
  }, [savedRestaurant, restaurant?.stadium_id, restaurantId])

  const handleBack = () => {
    router.back()
  }

  const handleShare = async (restaurant: Restaurant) => {
    if (!restaurant) return

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
  }

  const handleFavorite = useDebouncedCallback(async () => {
    if (!loggedInUser) {
      router.push('/login')
      return
    }

    try {
      setIsMarked((prev) => !prev)
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
        <div
          onClick={() => {
            handleShare(restaurant)
          }}
          className="cursor-pointer"
        >
          <Share2
            size={18}
            color="black"
            strokeWidth={3}
          />
        </div>
        <BookMark
          isMarked={isMarked}
          count={restaurant?.user_favorite_count || 0}
          onClick={handleFavorite}
        />
      </div>
    </div>
  )
}

export default RestaurantHeader
