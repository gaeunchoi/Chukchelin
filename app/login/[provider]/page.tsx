'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useCallback } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useModalContext } from '@/contexts/ModalContext'
import { login } from '@/services/auth'
import { useUser } from '@/hooks/useUser'
import { User } from '@/types/user'
import { flexColICenter, flexColIJCenter } from '@/style/custom'

function ProviderPage() {
  const router = useRouter()
  const code = useSearchParams().get('code')
  const setAccessToken = useAuthStore((state) => state.setAccessToken)
  const { openModal } = useModalContext()
  const { mutate: mutateUser } = useUser()

  const showSuccessModal = useCallback(
    (loggedInUser: User) => {
      const hasFavoriteTeam = !!loggedInUser.favorite_team_id
      const description = hasFavoriteTeam
        ? '축슐랭에 오신 것을 환영합니다!\n홈페이지로 이동합니다.'
        : '축슐랭에 오신 것을 환영합니다!\n마이페이지에서 좋아하는 팀을 설정해주세요.'

      openModal({
        title: '로그인 성공',
        description,
        actionBtnText: '확인',
        onAction: () => {
          router.push(hasFavoriteTeam ? '/' : '/mypage/edit')
        },
      })
    },
    [openModal, router],
  )

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
    if (!code) return

    try {
      const { accessToken } = await login({
        code,
        redirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
      })
      setAccessToken(accessToken)
      const loggedInUser = await mutateUser()

      if (loggedInUser) {
        showSuccessModal(loggedInUser)
      }
    } catch (error) {
      showErrorModal(error)
    }
  }, [code, setAccessToken, mutateUser])

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
