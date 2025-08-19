import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { Search, Bookmark, UserCog } from 'lucide-react'
import { header, flexRowICenter } from '@/style/custom'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import { useSelectedScheduleContext } from '@/contexts/SelectedScheduleContext'
import { track } from '@amplitude/analytics-browser'

function HomeHeader() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mainStadiumId = searchParams.get('mainStadiumId')
  const { data: loggedInUser } = useUser()
  const { setSelectedSchedule } = useSelectedScheduleContext()

  const handleStadiumSelect = (stadiumId: number) => {
    setSelectedSchedule(null)

    const newUrl = `/?mainStadiumId=${stadiumId}`
    window.history.pushState(null, '', newUrl)
  }

  const handleSearchClick = () => {
    track('Home | Search Button Clicked')
    router.push('/search')
  }

  const handleBookmarkClick = () => {
    track('Home | Bookmark Button Clicked')
    router.push('/mypage')
  }

  const handleUserClick = () => {
    track('Home | User Button Clicked')
    router.push('/mypage/edit')
  }

  useEffect(() => {
    if (
      loggedInUser &&
      !mainStadiumId &&
      loggedInUser.favorite_team
    ) {
      handleStadiumSelect(loggedInUser.favorite_team.id)
    }
  }, [loggedInUser, mainStadiumId])

  return (
    <div className={header('justify-between')}>
      <StadiumSelector
        onSelect={handleStadiumSelect}
        selectedStadiumId={Number(mainStadiumId)}
      />
      <div className={flexRowICenter('gap-6')}>
        <Search
          size={18}
          color="black"
          strokeWidth={3}
          onClick={handleSearchClick}
        />
        <Bookmark
          size={18}
          strokeWidth={3}
          color="black"
          onClick={handleBookmarkClick}
        />
        {loggedInUser && (
          <UserCog
            size={18}
            strokeWidth={3}
            color="black"
            onClick={handleUserClick}
          />
        )}
      </div>
    </div>
  )
}

export default HomeHeader
