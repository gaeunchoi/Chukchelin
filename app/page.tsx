'use client'
import { MainStadiumProvider } from '@/contexts/MainStadiumContext'
import { page } from '@/style/custom'
import HomeHeader from './_components/HomeHeader'
import ScheduleList from './_components/ScheduleList'
import RestaurantList from './_components/RestaurantList'

export default function Home() {
  return (
    <MainStadiumProvider>
      <div className={page()}>
        <HomeHeader />
        <ScheduleList />
        <RestaurantList />
      </div>
    </MainStadiumProvider>
  )
}
