'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import EmptyMainStadium from './EmptyMainStadium'
import ScheduleList from './ScheduleList'
import RestaurantList from './RestaurantList'

function HomeContent() {
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
  }, [mainStadiumId, searchParams])

  if (!mainStadiumId) {
    return <EmptyMainStadium />
  }

  return (
    <>
      <ScheduleList />
      <RestaurantList />
    </>
  )
}

export default HomeContent
