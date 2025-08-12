import { useRouter } from 'next/navigation'
import { Stadium } from '@/types/stadium'
import { flexColIJCenter } from '@/style/custom'
import StadiumItem from '../stadium/StadiumItem'
import MapContainer from './MapContainer'

type StadiumWithMapProps = {
  stadium: Stadium
}

function StadiumWithMap({ stadium }: StadiumWithMapProps) {
  const router = useRouter()
  const handleStadiumClick = (stadiumId: number) => {
    router.push(`/?mainStadiumId=${stadiumId}`)
  }

  return (
    <div
      className={flexColIJCenter('gap-3')}
      key={stadium.id}
    >
      <StadiumItem
        stadium={stadium}
        onClick={handleStadiumClick}
      />
      <MapContainer stadium={stadium} />
    </div>
  )
}

export default StadiumWithMap
