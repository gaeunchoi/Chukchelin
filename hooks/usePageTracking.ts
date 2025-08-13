import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { createPageViewTracker } from '@/utils/analytics'
import { AmplitudeEventProperties } from '@/constants/analytics'

interface UsePageTrackingOptions {
  pageName: string
  additionalProperties?: AmplitudeEventProperties
}

export const usePageTracking = ({
  pageName,
  additionalProperties,
}: UsePageTrackingOptions) => {
  const pathname = usePathname()
  const trackerRef = useRef<(() => void) | null>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // 페이지가 변경되었을 때만 추적
    if (!isInitializedRef.current || pathname !== pathname) {
      // 이전 페이지의 체류 시간 추적
      if (trackerRef.current) {
        trackerRef.current()
      }

      // 새 페이지 추적 시작
      trackerRef.current = createPageViewTracker(pageName, pathname)
      isInitializedRef.current = true
    }
  }, [pathname, pageName])

  // 컴포넌트 언마운트 시 체류 시간 추적
  useEffect(() => {
    return () => {
      if (trackerRef.current) {
        trackerRef.current()
      }
    }
  }, [])
}

// 특정 페이지에서만 사용하는 간단한 훅
export const useSimplePageTracking = (pageName: string) => {
  const pathname = usePathname()

  useEffect(() => {
    const tracker = createPageViewTracker(pageName, pathname)

    return () => {
      tracker()
    }
  }, [pageName, pathname])
}
