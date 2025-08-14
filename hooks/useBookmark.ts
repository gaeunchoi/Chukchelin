import { useSavedRestaurants } from './useSavedRestaurants'
import { useModalContext } from '@/contexts/ModalContext'
import { useDebouncedCallback } from 'use-debounce'
import { favoriteRestaurant } from '@/services/restaurant'
import { useEffect, useState } from 'react'
import { SavedRestaurant } from '@/types/restaurant'
import { useRestaurant } from './useRestaurant'

export const useBookmark = (restaurantId: number) => {
  const { data: restaurant, mutate: mutateRestaurant } =
    useRestaurant(restaurantId)
  const { data: savedRestaurant } = useSavedRestaurants(
    restaurant?.stadium_id,
  )
  const [isMarked, setIsMarked] = useState<boolean>(false)
  const { openModal } = useModalContext()

  useEffect(() => {
    if (savedRestaurant && restaurant?.stadium_id) {
      setIsMarked(
        savedRestaurant.some(
          (saved: SavedRestaurant) =>
            saved.restaurant_id === restaurant.id,
        ),
      )
    }
  }, [savedRestaurant])

  const handleBookmark = useDebouncedCallback(async () => {
    try {
      await favoriteRestaurant(restaurant.id)

      mutateRestaurant()
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '즐겨찾기 도중 오류가 발생했습니다.'
      openModal({
        title: '즐겨찾기 실패',
        description: errorMessage,
      })
    }
  }, 1000)

  return { isMarked, handleBookmark, restaurant }
}
