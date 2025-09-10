'use client'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { header } from '@/style/custom'
import { track } from '@amplitude/analytics-browser'

function ReviewHeader() {
  const router = useRouter()

  const handleCloseButtonClick = () => {
    track('Restaurant | Review Write Back Button Clicked')
    router.back()
  }

  return (
    <div className={header('w-full', 'justify-end')}>
      <X
        size={18}
        color="black"
        onClick={handleCloseButtonClick}
      />
    </div>
  )
}

export default ReviewHeader
