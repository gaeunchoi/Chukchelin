import { Stadium } from '@/types/stadium'
import { flexColIJCenter } from '@/style/custom'
import StadiumItem from '../stadium/StadiumItem'
import MapContainer from './MapContainer'

type StadiumWithMapProps = {
  stadium: Stadium
}

function StadiumWithMap({ stadium }: StadiumWithMapProps) {
  return (
    <div
      className={flexColIJCenter('gap-3')}
      key={stadium.id}
    >
      <StadiumItem stadium={stadium} />
      <MapContainer stadium={stadium} />
    </div>
  )
}

export default StadiumWithMap
