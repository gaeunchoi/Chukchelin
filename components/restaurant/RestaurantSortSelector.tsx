import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { flexCol, flexRowICenter } from '@/style/custom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import CheckSelected from '../common/CheckSelected'
import { track } from '@amplitude/analytics-browser'

type RestaurantSortSelectorProps = {
  selectedOption: string
  options: string[]
  onSelect: (option: string) => void
}

function RestaurantSortSelector({
  selectedOption,
  options,
  onSelect,
}: RestaurantSortSelectorProps) {
  const [open, setOpen] = useState<boolean>(false)

  const handleSortOptionSelect = (option: string) => {
    track('Home | Restaurant Sort Option Selected', {
      option,
    })
    onSelect(option)
    setOpen(false)
  }

  const triggerContent = (
    <div className={flexRowICenter('gap-1')}>
      <span className="text-[14px] font-medium">
        {selectedOption}
      </span>
      <ChevronDown
        size={16}
        strokeWidth={3}
      />
    </div>
  )

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger>{triggerContent}</DrawerTrigger>
      <DrawerContent className={flexCol('z-1000', 'pb-8')}>
        <DrawerHeader className={flexCol('gap-8', 'flex-shrink-0')}>
          <DrawerTitle
            className={flexCol(
              'items-start',
              'text-[20px]',
              'font-bold',
              'text-black',
              'mb-4',
            )}
          >
            맛집 정렬 기준
          </DrawerTitle>
          <DrawerDescription asChild>
            <div className="sr-only">
              맛집 정렬 기준을 선택할 수 있습니다.
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <div className={flexCol('w-full', 'gap-8')}>
            {options.map((option) => (
              <div
                key={option}
                className={flexRowICenter(
                  'justify-between',
                  'text-[16px]',
                  'font-bold',
                )}
                onClick={() => {
                  handleSortOptionSelect(option)
                }}
              >
                {option}
                {selectedOption === option && <CheckSelected />}
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default RestaurantSortSelector
