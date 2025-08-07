import { flexCol, flexRowICenter } from '@/style/custom'
import ScheduleCard from './ScheduleCard'
import { useMainStadiumContext } from '@/contexts/MainStadiumContext'

function ScheduleList() {
  const { mainStadium } = useMainStadiumContext()

  if (!mainStadium) return null

  return (
    <div className={flexCol('w-full', 'gap-3')}>
      <div className="text-[14px] font-bold">
        다가오는 경기(API 수정중)
      </div>
      <div
        className={flexRowICenter(
          'w-full',
          'gap-3',
          'overflow-x-scroll',
          'scrollbar-hide',
        )}
      >
        <ScheduleCard isFirst={true} />
        <ScheduleCard isFirst={false} />
        <ScheduleCard isFirst={false} />
        <ScheduleCard isFirst={false} />
      </div>
    </div>
  )
}

export default ScheduleList
