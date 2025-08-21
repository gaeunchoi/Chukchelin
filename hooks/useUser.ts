import { setUserId, track } from '@amplitude/analytics-browser'
import { useEffect, useRef } from 'react'
import useSWR from 'swr'

export const useUser = () => {
  const { data, ...rest } = useSWR('/user/me')
  const userIdSetRef = useRef(false)

  useEffect(() => {
    if (data?.id) {
      try {
        setUserId(data.id.toString().padStart(10, '0'))
        userIdSetRef.current = true
        track('Amplitude | User ID Set', {
          user_id: data.id.toString().padStart(10, '0'),
        })
        console.log('[useUser] User ID set in Amplitude:', data.id)
      } catch (error) {
        console.error(
          '[useUser] Failed to set user ID in Amplitude:',
          error,
        )
      }
    } else {
      try {
        setUserId(undefined)
        userIdSetRef.current = false
        track('Amplitude | User ID Cleared', {
          user_id: data.id.toString().padStart(10, '0'),
        })
      } catch (error) {
        track('Amplitude | User ID Cleared', {
          error:
            error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }
  }, [data?.id])

  return { data, ...rest }
}
