'use client'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { header } from '@/style/custom'

function ReviewHeader() {
  const router = useRouter()

  const handleCloseButtonClick = () => {
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
