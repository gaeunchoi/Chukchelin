'use client'
import { flexCol, flexRowICenter } from '@/style/custom'
import { Stadium } from '@/types/stadium'
import LogoImage from '@/components/image/LogoImage'
import CheckSelected from '../common/CheckSelected'

type StadiumItemProps = {
  stadium: Stadium
  isSelected?: boolean
  onSelect?: (stadium: Stadium) => void
  onClick?: (stadiumId: number) => void
}

function StadiumItem({
  stadium,
  isSelected,
  onSelect,
  onClick,
}: StadiumItemProps) {
  const stadiumItemRightContents = isSelected ? (
    <CheckSelected />
  ) : (
    <div className="text-[14px] font-semibold text-[#838383]">
      주변 맛집 {stadium.restaurant_count}개
    </div>
  )

  return (
    <div
      className={flexRowICenter(
        'w-full',
        'justify-between',
        'cursor-pointer',
        'hover:bg-gray-50',
        'rounded-lg',
        'transition-colors',
      )}
      onClick={() => {
        onSelect?.(stadium)
        onClick?.(stadium.id)
      }}
    >
      <div className={flexRowICenter()}>
        <LogoImage
          url={stadium.team[0].logo_image_url}
          size={40}
        />
        <div
          className={flexCol('items-start', 'justify-start', 'gap-1')}
        >
          <div className="text-[16px] font-bold text-black">
            {stadium.name}
          </div>
          <div className="text-[14px] text-[#828282] font-medium">
            {stadium.team[0].name}
          </div>
        </div>
      </div>
      {isSelected !== undefined && stadiumItemRightContents}
    </div>
  )
}

export default StadiumItem
