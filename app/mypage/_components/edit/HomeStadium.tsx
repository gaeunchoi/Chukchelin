import { useStadiums } from '@/hooks/useStadiums'
import { flexCol } from '@/style/custom'
import { Stadium } from '@/types/stadium'
import StadiumItem from '@/components/stadium/StadiumItem'
import { useCallback } from 'react'
import HomeStadiumSkeleton from '../skeletons/HomeStadiumSkeleton'

type HomeStadiumProps = {
  selectedStadium: Stadium | null
  onChange: (stadium: Stadium) => void
}

function HomeStadium({
  selectedStadium,
  onChange,
}: HomeStadiumProps) {
  const { data: stadiums } = useStadiums()

  const handleStadiumSelect = useCallback((stadium: Stadium) => {
    onChange(stadium)
  }, [])

  if (!stadiums) return <HomeStadiumSkeleton />

  return (
    <div className={flexCol('w-full')}>
      <span className="text-[14px] font-semibold">홈 구장</span>
      <div className={flexCol('w-full', 'gap-6')}>
        {stadiums &&
          stadiums.map((stadium: Stadium) => (
            <StadiumItem
              key={stadium.id}
              stadium={stadium}
              isSelected={selectedStadium?.id === stadium.id}
              onSelect={handleStadiumSelect}
            />
          ))}
      </div>
    </div>
  )
}

export default HomeStadium
