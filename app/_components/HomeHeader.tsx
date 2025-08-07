import { header } from '@/style/custom'
import { flexRowICenter } from '@/style/custom'
import { useMainStadiumContext } from '@/contexts/MainStadiumContext'
import StadiumSelector from '@/components/stadium/StadiumSelector'
import { Stadium } from '@/types/stadium'
import { Search, Bookmark } from 'lucide-react'
import { useRouter } from 'next/navigation'

function HomeHeader() {
  const router = useRouter()
  const { mainStadium, setMainStadium } = useMainStadiumContext()

  return (
    <div className={header('justify-between')}>
      <StadiumSelector
        onSelect={(stadium: Stadium) => {
          setMainStadium(stadium)
        }}
        selectedStadium={mainStadium}
      />
      <div className={flexRowICenter('gap-6')}>
        <Search
          size={18}
          color="black"
          onClick={() => router.push('/search')}
        />
        <Bookmark
          size={18}
          color="black"
        />
      </div>
    </div>
  )
}

export default HomeHeader
