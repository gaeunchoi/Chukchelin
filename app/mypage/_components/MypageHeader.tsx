'use client'
import { flexRowIJCenter, header } from '@/style/custom'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

type MypageHeaderProps = {
  isEditPage?: boolean
}
function MypageHeader({ isEditPage }: MypageHeaderProps) {
  const router = useRouter()

  return (
    <div className={header()}>
      <button
        onClick={() => router.push(isEditPage ? '/mypage' : '/')}
        className="cursor-pointer p-1 z-1"
      >
        <ChevronLeft
          size={18}
          strokeWidth={3}
          color="black"
        />
      </button>
      <div
        className={flexRowIJCenter(
          'w-full',
          'justify-center',
          'text-center',
          'text-[16px]',
          'font-bold',
          '-ml-8',
        )}
      >
        {isEditPage ? '정보 수정' : '마이페이지'}
      </div>
    </div>
  )
}

export default MypageHeader
