import { setAmplitudeUserId } from '@/utils/analytics'
import { useEffect } from 'react'
import useSWR from 'swr'

export const useUser = () => {
  const { data, ...rest } = useSWR('/user/me')

  useEffect(() => {
    if (data) {
      setAmplitudeUserId(data.id.toString().padStart(10, '0'))
    }
  }, [data])

  return { data, ...rest }
}
