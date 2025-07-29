import { TEAM_LOGOS } from '@/constants/team'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import Image from 'next/image'
import 'swiper/css'

function LogoSwiper() {
  const [currentTeam, setCurrentTeam] = useState<string>('수원')
  const [isChanging, setIsChanging] = useState<boolean>(false)

  const teamLogosArray = Object.entries(TEAM_LOGOS).map(
    ([key, value]) => ({
      key,
      value,
    }),
  )

  const handleSlideChange = (swiper: SwiperType) => {
    const realIndex = swiper.realIndex
    const newTeam = teamLogosArray[realIndex].key

    if (newTeam !== currentTeam) {
      setIsChanging(true)
      setTimeout(() => {
        setCurrentTeam(newTeam)
        setTimeout(() => {
          setIsChanging(false)
        }, 150)
      }, 150)
    }
  }

  return (
    <div className="w-full flex flex-col justify-center items-center gap-5">
      <div className="w-full max-w-md relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-30 bg-gradient-to-r from-white/90 to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white/90 to-transparent z-10"></div>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={20}
          centeredSlides={true}
          grabCursor={false}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSlideChange={handleSlideChange}
        >
          {teamLogosArray.map(({ key, value }, index) => (
            <SwiperSlide
              key={key}
              className="transition-all duration-300"
            >
              <Image
                src={value}
                alt={key}
                width={200}
                height={200}
                style={{ width: 'auto', height: 'auto' }}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex flex-col justify-center items-center text-xl">
        <div className="font-extrabold">
          K리그{' '}
          <span
            className={`text-blue-600 transition-all duration-300 ${
              isChanging
                ? 'opacity-0 transform translate-y-2'
                : 'opacity-100 transform translate-y-0'
            }`}
          >
            {currentTeam}
          </span>{' '}
          맛집
        </div>
        <div className="font-semibold">
          <span className="font-extrabold">축슐랭</span>에서
          찾아보세요
        </div>
      </div>
    </div>
  )
}

export default LogoSwiper
