'use client'
import { Suspense } from 'react'
import { SelectScheduleProvider } from '@/contexts/SelectScheduleContext'
import { useMainStadiumIdContext } from '@/contexts/MainStadiumIdContext'
import { header, page } from '@/style/custom'
import HomeHeader from './_components/HomeHeader'
import EmptyMainStadium from './_components/EmptyMainStadium'
import ScheduleList from './_components/ScheduleList'
import RestaurantList from './_components/RestaurantList'

export default function Home() {
  const { mainStadiumId } = useMainStadiumIdContext()

  if (!mainStadiumId) {
    return (
      <div className={page()}>
        <Suspense fallback={<div className={header()} />}>
          <HomeHeader />
        </Suspense>
        <EmptyMainStadium />
      </div>
    )
  }

  return (
    <SelectScheduleProvider>
      <div className={page()}>
        <Suspense fallback={<div className={header()} />}>
          <HomeHeader />
        </Suspense>
        <ScheduleList />
        <RestaurantList />
      </div>
    </SelectScheduleProvider>
  )
}
