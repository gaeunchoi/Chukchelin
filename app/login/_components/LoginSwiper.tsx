'use client'

import { useStadiums } from '@/hooks/useStadiums'
import { useState, useCallback, useEffect } from 'react'
import { Stadium } from '@/types/stadium'
import { flexColIJCenter } from '@/style/custom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import LogoImage from '@/components/image/LogoImage'
import 'swiper/css'

function LoginSwiper() {
  const { data: stadiums } = useStadiums()
  const [currentTeam, setCurrentTeam] = useState<string>('구단')
  const [isChanging, setIsChanging] = useState<boolean>(false)

  useEffect(() => {
    if (stadiums && stadiums.length > 0) {
      const initialIndex = Math.min(1, stadiums.length - 1)
      setCurrentTeam(stadiums[initialIndex].team[0].short_name)
    }
  }, [stadiums])

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      if (!stadiums || stadiums.length === 0) return

      const currentIndex = swiper.realIndex
      const currentStadium = stadiums[currentIndex]

      if (currentStadium?.team?.[0]?.short_name) {
        setIsChanging(true)
        setTimeout(() => {
          setCurrentTeam(currentStadium.team[0].short_name)
          setIsChanging(false)
        }, 150)
      }
    },
    [stadiums],
  )

  const swiperOptions = {
    modules: [Autoplay],
    slidesPerView: 3,
    spaceBetween: 20,
    centeredSlides: true,
    initialSlide: 1,
    grabCursor: false,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: stadiums && stadiums.length > 3,
    onSlideChange: handleSlideChange,
  }

  const GradientOverlay = () => (
    <>
      <div className="absolute left-0 top-0 bottom-0 w-30 bg-gradient-to-r from-white/90 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-30 bg-gradient-to-l from-white/90 to-transparent z-10" />
    </>
  )

  const renderSwiper = () => {
    if (!stadiums || stadiums.length === 0) {
      return (
        <>
          {Array.from({ length: 3 }).map((_, idx) => (
            <SwiperSlide
              key={`placeholder-${idx}`}
              className="transition-all duration-300"
            >
              <LogoImage
                url={`/logo/placeholder/placeholder${idx + 1}.png`}
                size={120}
              />
            </SwiperSlide>
          ))}
        </>
      )
    }

    return (
      <>
        {stadiums.map((stadium: Stadium) => (
          <SwiperSlide
            key={stadium.id}
            className="transition-all duration-300"
          >
            {stadium?.team?.[0] && (
              <LogoImage
                url={stadium.team[0].logo_image_url}
                size={200}
              />
            )}
          </SwiperSlide>
        ))}
      </>
    )
  }

  const TeamNameDisplay = () => (
    <div className={flexColIJCenter('text-xl')}>
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
        <span className="font-extrabold">축슐랭</span>에서 찾아보세요
      </div>
    </div>
  )

  return (
    <div className={flexColIJCenter('w-full', 'gap-5')}>
      <div className="w-full max-w-md relative overflow-hidden min-h-[130px]">
        <GradientOverlay />
        <Swiper {...swiperOptions}>{renderSwiper()}</Swiper>
      </div>
      <TeamNameDisplay />
    </div>
  )
}

export default LoginSwiper
