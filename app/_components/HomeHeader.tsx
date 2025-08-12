import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'
import { useSearchParams } from 'next/navigation'
import { useMainStadiumIdContext } from '@/contexts/MainStadiumIdContext'
import { Search, Bookmark, UserCog } from 'lucide-react'
import { header, flexRowICenter } from '@/style/custom'
import { useEffect } from 'react'
import StadiumSelector from '@/components/stadium/StadiumSelector'

function HomeHeader() {
  const router = useRouter()
  const params = useSearchParams().get('stadiumId')
  const { data: loggedInUser } = useUser()
  const { mainStadiumId, setMainStadiumId } =
    useMainStadiumIdContext()

  const handleStadiumSelect = (stadiumId: number) => {
    setMainStadiumId(stadiumId)
  }

  useEffect(() => {
    if (params) {
      setMainStadiumId(Number(params))
    } else if (loggedInUser) {
      setMainStadiumId(loggedInUser.favorite_team.id)
    }
  }, [loggedInUser, params, setMainStadiumId])

  return (
    <div className={header('justify-between')}>
      <StadiumSelector
        onSelect={handleStadiumSelect}
        selectedStadiumId={mainStadiumId}
      />
      <div className={flexRowICenter('gap-6')}>
        <Search
          size={18}
          color="black"
          strokeWidth={3}
          onClick={() => router.push('/search')}
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
