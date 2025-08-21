'use client'

import { useEffect } from 'react'
import { init } from '@amplitude/analytics-browser'

export default function AmplitudeInitializer() {
  useEffect(() => {
    console.log('[AmplitudeInitializer] Starting initialization...')

    try {
      const AMPLITUDE_API_KEY =
        process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY
      console.log(
        '[AmplitudeInitializer] API Key found:',
        !!AMPLITUDE_API_KEY,
      )

      if (AMPLITUDE_API_KEY) {
        init(AMPLITUDE_API_KEY, undefined, {
          defaultTracking: {
            sessions: true,
          },
          minIdLength: 1,
        })
        console.log(
          '[AmplitudeInitializer] Initialization completed successfully',
        )
      } else {
        console.warn(
          '[AmplitudeInitializer] AMPLITUDE_API_KEY not found',
        )
      }
    } catch (error) {
      console.error(
        '[AmplitudeInitializer] Initialization failed:',
        error,
      )
    }
  }, [])

  return null
}
