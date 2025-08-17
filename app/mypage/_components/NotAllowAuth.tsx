'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { page, flexColICenter } from '@/style/custom'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { track } from '@amplitude/analytics-browser'

function NotAllowAuth() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    track('MyPage | Not Allow Auth', {
      page_name: 'MyPage',
      page_path: '/mypage',
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      const redirectTimer = setTimeout(() => {
        router.push('/login')
      }, 100)

      return () => clearTimeout(redirectTimer)
    }
  }, [countdown, router])

  return (
    <div className={page('text-gray-500', 'justify-center')}>
      <div className={flexColICenter('gap-4', 'text-center')}>
        <p className="text-[20px] font-bold">
          로그인이 필요한 페이지입니다.
        </p>
        <p className="text-[16px] font-medium">
          {countdown}초 후 로그인 페이지로 이동합니다.
        </p>
        <div className="mt-4">
          <LoadingSpinner width={200} />
        </div>
      </div>
    </div>
  )
}

export default NotAllowAuth
