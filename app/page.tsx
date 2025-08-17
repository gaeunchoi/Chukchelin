'use client'
import { page } from '@/style/custom'
import { SelectedScheduleProvider } from '@/contexts/SelectedScheduleContext'
import { Suspense } from 'react'
import HomeHeader from './_components/HomeHeader'
import HomeContent from './_components/HomeContent'
import { track } from '@amplitude/analytics-browser'
import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    track('Home | Main Page Viewed', {
      page_name: 'Home',
      page_path: '/',
    })
  }, [])

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
