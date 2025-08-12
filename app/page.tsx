'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { header, page } from '@/style/custom'
import HomeHeader from './_components/HomeHeader'
import EmptyMainStadium from './_components/EmptyMainStadium'
import { SelectedScheduleProvider } from '@/contexts/SelectedScheduleContext'
import ScheduleList from './_components/ScheduleList'
import RestaurantList from './_components/RestaurantList'

export default function Home() {
  const searchParams = useSearchParams()
  const mainStadiumId = searchParams.get('mainStadiumId')

  useEffect(() => {
    if (mainStadiumId) {
      const currentParams = new URLSearchParams(
        searchParams.toString(),
      )
      currentParams.set('mainStadiumId', mainStadiumId.toString())

      const newUrl = `?${currentParams.toString()}`
      window.history.pushState(null, '', newUrl)
    }
  }, [mainStadiumId])

  return (
    <SelectedScheduleProvider>
      <div className={page()}>
        <Suspense fallback={<div className={header()} />}>
          <HomeHeader />
        </Suspense>

        {!mainStadiumId ? (
          <EmptyMainStadium />
        ) : (
          <>
            <ScheduleList />
            <RestaurantList />
          </>
        )}
      </div>
    </SelectedScheduleProvider>
  )
}
