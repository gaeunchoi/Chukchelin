type ScheduleCardProps = {
  isFirst: boolean
}

import { cn } from '@/lib/utils'
import { flexCol } from '@/style/custom'

function ScheduleCard({ isFirst }: ScheduleCardProps) {
  const mainTextColor = isFirst ? 'text-white' : 'text-black'
  const subTextColor = isFirst ? 'text-white' : 'text-[#6D6D6D]'

  const patternStyle = isFirst
    ? {
        backgroundImage: 'url(/schedule-card-pattern.png)',
        backgroundSize: 'auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.2,
      }
    : {}

  return (
    <div
      className={flexCol(
        'gap-3',
        'px-5',
        'py-4',
        'rounded-md',
        'min-w-[150px]',
        'min-h-97px',
        'relative',
        {
          'bg-black': isFirst,
          'bg-[#F9F9F9]': !isFirst,
        },
      )}
    >
      {isFirst && (
        <div
          className="absolute inset-0 rounded-md"
          style={patternStyle}
        />
      )}
      <div className={flexCol('gap-1', 'relative', 'z-10')}>
        <div className={cn('text-[14px]', 'font-bold', subTextColor)}>
          숭의 아레나 파크
        </div>
        <div
          className={cn('text-[16px]', 'font-bold', mainTextColor)}
        >
          vs 인천(AWAY)
        </div>
      </div>
      <div
        className={cn(
          'text-[14px]',
          'font-bold',
          subTextColor,
          'relative',
          'z-10',
        )}
      >
        8월 2일 17시 00분
      </div>
    </div>
  )
}

export default ScheduleCard
