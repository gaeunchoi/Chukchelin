import { setUserId } from '@amplitude/analytics-browser'
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
