import { useRouter, useSearchParams } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useEffect } from 'react'
import { Search, Bookmark, UserCog } from 'lucide-react'
import { header, flexRowICenter } from '@/style/custom'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import { useSelectedScheduleContext } from '@/contexts/SelectedScheduleContext'
import { trackEvent } from '@/utils/analytics'

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

  useEffect(() => {
    if (loggedInUser && !mainStadiumId) {
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
          onClick={() => {
            trackEvent('search_button_clicked')
            router.push('/search')
          }}
        />
        <Bookmark
          size={18}
          strokeWidth={3}
          color="black"
          onClick={() => router.push('/mypage')}
        />
        {loggedInUser && (
          <UserCog
            size={18}
            strokeWidth={3}
            color="black"
            onClick={() => router.push('/mypage/edit')}
          />
        )}
      </div>
    </div>
  )
}

export default HomeHeader
