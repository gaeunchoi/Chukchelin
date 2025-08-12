import MapContainerSkeleton from '@/components/skeleton/MapContainerSkeleton'
import { SavedRestaurant, Restaurant } from '@/types/restaurant'
import { Stadium } from '@/types/stadium'
import { useEffect, useRef } from 'react'

type MapContainerProps = {
  stadium: Stadium | null
  restaurants?: SavedRestaurant[] | Restaurant[]
}

const restaurantMarkerIcon = (restaurant: Restaurant) => {
  return `<div class="w-7 h-7 rounded-full overflow-hidden bg-cover bg-center border-2 border-white shadow-md" style="background-image: url('${restaurant.restaurant_category.image_url}')"></div>`
}

const markerInfomation = (restaurant: Restaurant) => {
  return `<div class="p-3 max-w-[200px] bg-white border border-gray-100">
      <div class="font-bold text-sm mb-1">${restaurant.name}</div>
      <div class="text-xs text-gray-600 mb-1">
        ${restaurant.address}
      </div>
      <div class="text-xs text-gray-600">
        ${restaurant.contact || '연락처 없음'}
      </div>
    </div>`
}

function MapContainer({ stadium, restaurants }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      !stadium ||
      !mapRef.current ||
      typeof window === 'undefined' ||
      !window.naver
    )
      return

    const stadiumPosition = new window.naver.maps.LatLng(
      stadium.latitude,
      stadium.longitude,
    )
    const mapOptions = {
      center: stadiumPosition,
      zoom: 14,
    }

    const map = new window.naver.maps.Map(mapRef.current, mapOptions)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const infoWindows: any[] = []

    new window.naver.maps.Marker({
      position: stadiumPosition,
      map,
      title: stadium.name,
      icon: {
        url: stadium.team[0]?.logo_image_url || '/logo/kleague.png',
        size: new window.naver.maps.Size(60, 60),
        scaledSize: new window.naver.maps.Size(60, 60),
        origin: new window.naver.maps.Point(0, 0),
        anchor: new window.naver.maps.Point(30, 30),
      },
    }).setZIndex(10)

    restaurants?.forEach((item: SavedRestaurant | Restaurant) => {
      const restaurant = 'restaurant' in item ? item.restaurant : item

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(
          restaurant.latitude,
          restaurant.longitude,
        ),
        map,
        title: restaurant.name,
        icon: {
          content: restaurantMarkerIcon(restaurant),
          anchor: new window.naver.maps.Point(15, 15),
        },
      })

      const infoWindow = new window.naver.maps.InfoWindow({
        content: markerInfomation(restaurant),
        anchorSize: new window.naver.maps.Size(10, 10),
        pixelOffset: new window.naver.maps.Point(0, -10),
      })

      infoWindows.push(infoWindow)

      window.naver.maps.Event.addListener(marker, 'click', () => {
        infoWindows.forEach((info) => {
          info.close()
        })

        infoWindow.open(map, marker)
      })

      window.naver.maps.Event.addListener(map, 'click', () => {
        infoWindow.close()
      })
    })
  }, [stadium, restaurants])

  if (!stadium) {
    return <MapContainerSkeleton />
  }

  return (
    <div
      className="w-full h-[200px]"
      ref={mapRef}
    />
  )
}

export default MapContainer
