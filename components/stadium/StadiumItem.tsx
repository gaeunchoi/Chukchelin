'use client'
import { flexCol, flexRowICenter } from '@/style/custom'
import { Stadium } from '@/types/stadium'
import { Check } from 'lucide-react'
import LogoImage from '@/components/image/LogoImage'

type StadiumItemProps = {
  stadium: Stadium
  isSelected?: boolean
  onSelect: (stadium: Stadium) => void
}

function StadiumItem({
  stadium,
  isSelected,
  onSelect,
}: StadiumItemProps) {
  const stadiumItemRightContents = isSelected ? (
    <div className={flexRowICenter()}>
      <span className="text-[14px] font-semibold text-black">
        선택됨
      </span>
      <Check
        color="black"
        size={16}
      />
    </div>
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
      onClick={() => onSelect(stadium)}
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
      {isSelected && stadiumItemRightContents}
    </div>
  )
}

export default StadiumItem
