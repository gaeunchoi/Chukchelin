'use client'
import { useUser } from '@/hooks/useUser'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import EmptyMainStadium from './EmptyMainStadium'
import ScheduleList from './ScheduleList'
import RestaurantList from './RestaurantList'

function HomeContent() {
  const { data: loggedInUser } = useUser()
  const searchParams = useSearchParams()
  const mainStadiumId = searchParams.get('mainStadiumId')

  useEffect(() => {
    if (
      loggedInUser &&
      !mainStadiumId &&
      loggedInUser.favorite_team
    ) {
      const newUrl = `/?mainStadiumId=${loggedInUser.favorite_team.id}`
      window.history.pushState(null, '', newUrl)
    }
  }, [loggedInUser, mainStadiumId])

  useEffect(() => {
    if (mainStadiumId) {
      const newUrl = `/?mainStadiumId=${mainStadiumId.toString()}`
      window.history.pushState(null, '', newUrl)
    }
  }, [mainStadiumId])

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
