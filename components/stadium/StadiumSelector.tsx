import { flexCol, flexRowICenter } from '@/style/custom'
import StadiumItem from './StadiumItem'
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
import { useStadiums } from '@/hooks/useStadiums'
import { useState, useEffect, useMemo } from 'react'
import LogoImage from '../image/LogoImage'

type StadiumSelectorProps = {
  onSelect: (stadium: Stadium) => void
  selectedStadium?: Stadium | null
}

function StadiumSelector({
  onSelect,
  selectedStadium: propSelectedStadium,
}: StadiumSelectorProps) {
  const { data: stadiums } = useStadiums()
  const [selectedStadium, setSelectedStadium] =
    useState<Stadium | null>(propSelectedStadium || null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setSelectedStadium(propSelectedStadium || null)
  }, [propSelectedStadium])

  const selectedStadiumInfo = useMemo(
    () => ({
      logoUrl:
        selectedStadium?.team[0].logo_image_url ||
        '/logo/kleague.png',
      name: selectedStadium?.name || '구장 선택',
    }),
    [selectedStadium],
  )

  const handleStadiumSelect = (stadium: Stadium) => {
    setSelectedStadium(stadium)
  }

  const handleCancel = () => {
    setSelectedStadium(null)
    setIsOpen(false)
  }

  const handleConfirm = () => {
    if (selectedStadium) {
      onSelect(selectedStadium)
      setIsOpen(false)
    }
  }

  const triggerContent = !selectedStadium ? (
    <div className={flexRowICenter('gap-1')}>
      <LogoImage
        url="/logo/kleague.png"
        size={20}
      />
      <div className="text-[16px] font-bold text-black">
        구장 선택
      </div>
      <ChevronDown
        size={16}
        color="black"
        className="ml-0.5"
      />
    </div>
  ) : (
    <div className={flexRowICenter('gap-1')}>
      <LogoImage
        url={selectedStadiumInfo.logoUrl}
        size={20}
      />
      <div className="text-[16px] font-bold text-black">
        {selectedStadiumInfo.name}
      </div>
      <ChevronDown
        size={16}
        color="black"
        className="ml-0.5"
      />
    </div>
  )

  return (
    <Drawer
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DrawerTrigger>{triggerContent}</DrawerTrigger>

      <DrawerContent
        className={flexCol('h-[70%]', 'z-1000', 'gap-3')}
      >
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
                isSelected={selectedStadium?.id === stadium.id}
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
