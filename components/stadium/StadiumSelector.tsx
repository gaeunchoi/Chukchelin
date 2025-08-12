import { usePathname } from 'next/navigation'
import { useStadiums } from '@/hooks/useStadiums'
import { useStadium } from '@/hooks/useStadium'
import { flexCol, flexRowICenter } from '@/style/custom'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ChevronDown } from 'lucide-react'

import { Stadium } from '@/types/stadium'
import { useEffect, useState } from 'react'
import StadiumItem from './StadiumItem'
import LogoImage from '../image/LogoImage'

type StadiumSelectorProps = {
  onSelect: (stadiumId: number) => void
  selectedStadiumId?: number | null
}

const TriggerContent = ({
  selectedStadium,
}: {
  selectedStadium: Stadium | null
}) => (
  <div className={flexRowICenter('gap-1')}>
    <LogoImage
      url={
        selectedStadium
          ? selectedStadium.team[0].logo_image_url
          : '/logo/kleague.png'
      }
      size={20}
    />
    <div className="text-[16px] font-bold text-black">
      {selectedStadium ? selectedStadium.name : '구장 선택'}
    </div>
    <ChevronDown
      size={16}
      color="black"
      strokeWidth={3}
      className="ml-0.5"
    />
  </div>
)

function StadiumSelector({
  onSelect,
  selectedStadiumId: propSelectedStadiumId,
}: StadiumSelectorProps) {
  const pathname = usePathname()
  const { data: stadiums } = useStadiums()
  const [selectedStadiumId, setSelectedStadiumId] = useState<
    number | null
  >(propSelectedStadiumId || null)
  const { data: selectedStadium } = useStadium(selectedStadiumId)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (propSelectedStadiumId !== undefined) {
      setSelectedStadiumId(propSelectedStadiumId)
    }
  }, [propSelectedStadiumId])

  const handleStadiumSelect = (stadiumId: number) => {
    setSelectedStadiumId(stadiumId)
  }

  const handleCancel = () => {
    setIsOpen(false)
  }

  const handleConfirm = () => {
    if (selectedStadiumId) {
      onSelect(selectedStadiumId)
      setIsOpen(false)

      const newUrl = `${pathname}?mainStadiumId=${selectedStadiumId}`
      window.history.pushState(null, '', newUrl)
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger>
        <TriggerContent selectedStadium={selectedStadium} />
      </DrawerTrigger>

      <DrawerContent className={flexCol('z-1000', 'pb-8')}>
        <DrawerHeader className={flexCol('gap-8', 'flex-shrink-0')}>
          <DrawerTitle>
            <div
              className={flexCol(
                'items-start',
                'text-[20px]',
                'font-bold',
                'text-black',
                'mb-4',
              )}
            >
              구장을 선택해주세요
            </div>
          </DrawerTitle>
          <DrawerDescription asChild>
            <div className="sr-only">
              구장 목록을 선택할 수 있습니다.
            </div>
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className={flexCol('w-full', 'gap-6')}>
            {stadiums?.map((stadium: Stadium) => (
              <StadiumItem
                key={stadium.id}
                stadium={stadium}
                isSelected={selectedStadiumId === stadium.id}
                onSelect={handleStadiumSelect}
              />
            ))}
          </div>
        </div>

        <DrawerFooter className="flex-shrink-0 w-full grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="text-[16px] font-semibold p-6"
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            className="text-[16px] font-semibold p-6"
            onClick={handleConfirm}
            disabled={!selectedStadium}
          >
            선택하기
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default StadiumSelector
