'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { flexColIJCenter } from '@/style/custom'

function EmptyMainStadium() {
  const router = useRouter()

  return (
    <div
      className={flexColIJCenter(
        'w-full',
        'h-full',
        'flex-1',
        'text-sm',
        'text-gray-500',
        'gap-6',
        'my-auto',
      )}
    >
      <div className={flexColIJCenter('gap-2', 'text-center')}>
        <p className="text-lg font-semibold mb-2 text-center">
          왼쪽 상단에서 구장을 선택해주세요
        </p>
        <div className={flexColIJCenter('gap-0', 'text-center')}>
          <p>마이페이지에서 좋아하는 팀을 설정하면</p>
          <p>해당 구장 인근의 맛집을 바로 확인할 수 있습니다.</p>
        </div>
      </div>

      <Button
        onClick={() => router.push('/mypage/edit')}
        className="text-[16px] font-semibold p-7"
      >
        좋아하는 팀 설정하기
      </Button>
    </div>
  )
}

export default EmptyMainStadium
