'use client'
import { page } from '@/style/custom'
import { SelectedScheduleProvider } from '@/contexts/SelectedScheduleContext'
import { Suspense } from 'react'
import HomeHeader from './_components/HomeHeader'
import HomeContent from './_components/HomeContent'
import { useSimplePageTracking } from '@/hooks/usePageTracking'
import { trackHomeViewedPersonalized } from '@/utils/analytics'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'

export default function HomePage() {
  // 페이지 추적
  useSimplePageTracking('Home')

  // 사용자 정보가 있으면 개인화된 홈 뷰 추적
  const { data: user } = useUser()

  useEffect(() => {
    if (user?.preferredTeam) {
      trackHomeViewedPersonalized(user.preferredTeam)
    }
  }, [user?.preferredTeam])

  return (
    <SelectedScheduleProvider>
      <div className={page()}>
        <Suspense
          fallback={
            <div className="h-16 bg-white border-b border-gray-200" />
          }
        >
          <HomeHeader />
        </Suspense>

        <Suspense
          fallback={
            <div className="flex-1 flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </div>
    </SelectedScheduleProvider>
  )
}
