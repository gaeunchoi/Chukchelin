import StadiumMapSkeleton from '@/components/skeleton/StadiumMapSkeleton'
import { SavedRestaurant } from '@/types/restaurant'
import { Stadium } from '@/types/stadium'
import { useEffect, useRef } from 'react'

type StadiumMapProps = {
  stadium: Stadium | null
  restuarants?: SavedRestaurant[]
}

function StadiumMap({ stadium, restuarants }: StadiumMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stadium || !mapRef.current) return

    const stadiumPosition = new naver.maps.LatLng(
      stadium.latitude,
      stadium.longitude,
    )
    const mapOptions = {
      center: stadiumPosition,
      zoom: 14,
    }

    const map = new window.naver.maps.Map(mapRef.current, mapOptions)

    new window.naver.maps.Marker({
      position: stadiumPosition,
      map,
      title: stadium.name,
      icon: {
        url: stadium.team[0].logo_image_url,
        size: new naver.maps.Size(50, 52),
        scaledSize: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    })

    restuarants?.forEach((savedRestaurant) => {
      const restaurant = savedRestaurant.restaurant

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          restaurant.latitude,
          restaurant.longitude,
        ),
        map,
        title: restaurant.name,
        icon: {
          content: `<div class="w-7 h-7 rounded-full overflow-hidden bg-cover bg-center border-2 border-white shadow-md" style="background-image: url('${restaurant.restaurant_category.image_url}')"></div>`,
          anchor: new naver.maps.Point(15, 15),
        },
      })
    })
  }, [stadium, restuarants])

  if (!stadium) {
    return <StadiumMapSkeleton />
  }

  return (
    <div
      className="w-full h-[170px]"
      ref={mapRef}
    />
  )
}

export default StadiumMap
