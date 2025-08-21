import { setUserId } from '@amplitude/analytics-browser'
import { useEffect } from 'react'
import useSWR from 'swr'

export const useUser = () => {
  const { data, ...rest } = useSWR('/user/me')

  useEffect(() => {
    if (data?.id) {
      try {
        setUserId(data.id.toString().padStart(10, '0'))
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
        console.log('[useUser] User ID cleared (anonymous)')
      } catch (error) {
        console.error(
          '[useUser] Failed to clear user ID in Amplitude:',
          error,
        )
      }
    }
  }, [data?.id])

  return { data, ...rest }
}
