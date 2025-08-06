'use client'

import { useStadiums } from '@/hooks/useStadiums'
import { useState, useCallback } from 'react'
import { Stadium } from '@/types/stadium'
import { flexColIJCenter } from '@/style/custom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import LogoImage from '@/components/image/LogoImage'
import 'swiper/css'

function LoginSwiper() {
  const { data: stadiums, isLoading } = useStadiums()
  const [currentTeam, setCurrentTeam] = useState<string>('수원')
  const [isChanging, setIsChanging] = useState<boolean>(false)

  const handleSlideChange = useCallback(
    (swiper: SwiperType) => {
      if (!stadiums) return

      const safeIndex = swiper.realIndex % stadiums.length
      const currentStadium = stadiums[safeIndex]

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

  if (isLoading) {
    return <LoadingSpinner width={200} />
  }

  return (
    <div className={flexColIJCenter('w-full', 'gap-5')}>
      <div className="w-full max-w-md relative overflow-hidden">
        <GradientOverlay />

        <Swiper {...swiperOptions}>
          {stadiums?.map((stadium: Stadium) => (
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
        </Swiper>
      </div>

      <TeamNameDisplay />
    </div>
  )
}

export default LoginSwiper
