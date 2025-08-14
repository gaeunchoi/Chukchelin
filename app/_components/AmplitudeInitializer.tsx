'use client'

import { useEffect } from 'react'
import { initializeAmplitude } from '@/utils/analytics'

export default function AmplitudeInitializer() {
  useEffect(() => {
    console.log('initializeAmplitude')
    initializeAmplitude()
  }, [])

  return null
}
