'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useModalContext } from '@/contexts/ModalContext'
import { login } from '@/services/auth'
import { useUser } from '@/hooks/useUser'
import { flexColICenter, flexColIJCenter } from '@/style/custom'
import { track } from '@amplitude/analytics-browser'

function ProviderPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state') // 원래 페이지 URL
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const { openModal } = useModalContext()
  const { mutate: mutateUser } = useUser()

  const showErrorModal = useCallback(
    (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'

      openModal({
        title: '로그인 실패',
        description: errorMessage,
        actionBtnText: '다시 시도',
        onAction: () => router.push('/login'),
      })
    },
    [openModal, router],
  )

  const handleLogin = useCallback(async () => {
    track('Auth | Login Started')

    if (!code) {
      track('Auth | Login Failed', {
        error: 'No code provided',
      })
      return
    }

    try {
      const { accessToken } = await login({
        code,
        redirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      })
      setAccessToken(accessToken)
      const loggedInUser = await mutateUser()

      track('Auth | Login Completed')

      if (loggedInUser) {
        if (state) {
          const originalUrl = decodeURIComponent(state)
          router.push(originalUrl)
        } else {
          router.push(
            loggedInUser.favorite_team ? '/' : '/mypage/edit',
          )
        }
      }
    } catch (error) {
      showErrorModal(error)
    }
  }, [router, code, state, setAccessToken, mutateUser])

  useEffect(() => {
    if (code) {
      handleLogin()
    }
  }, [code])

  return (
    <div className={flexColIJCenter('min-h-screen', 'bg-slate-100')}>
      <div className={flexColICenter('gap-6')}>
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold text-gray-800">
            로그인 진행중
          </h2>
          <p className="text-gray-600 text-sm">잠시만 기다려주세요</p>
        </div>
        <LoadingSpinner width={200} />
      </div>
    </div>
  )
}

export default ProviderPage
