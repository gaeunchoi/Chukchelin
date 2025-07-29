'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import { useAuthStore } from '@/store/authStore'
import { login } from '@/services/auth'
import { useModalContext } from '@/context/ModalContext'

function ProviderPage() {
  const router = useRouter()
  const params = useSearchParams()
  const code = params.get('code')
  const userLogin = useAuthStore((state) => state.userLogin)
  const { openModal } = useModalContext()

  useEffect(() => {
    if (code) {
      const fetchToken = async () => {
        try {
          const { accessToken, user } = await login(code)

          if (accessToken && user) {
            userLogin(accessToken, user)

            openModal({
              title: '로그인 성공',
              description: !user.favoriteTeam
                ? '축슐랭에 오신 것을 환영합니다!\n마이페이지에서 좋아하는 팀을 설정해주세요.'
                : '축슐랭에 오신 것을 환영합니다!\n홈페이지로 이동합니다.',
              actionBtnText: '확인',
              onAction: () => {
                if (!user.favoriteTeam) {
                  router.push('/mypage/edit')
                } else {
                  router.push('/')
                }
              },
            })
          } else {
            throw new Error('로그인 정보를 받아오지 못했습니다.')
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : '로그인 중 오류가 발생했습니다. 다시 시도해주세요.'
          openModal({
            title: '로그인 실패',
            description: errorMessage,
            actionBtnText: '다시 로그인하러 가기',
            onAction: () => {
              router.push('/login')
            },
          })
        }
      }

      fetchToken()
    }
  }, [code])

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-4">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-bold text-gray-800">
              로그인 진행중
            </h2>
            <p className="text-gray-600 text-sm">
              잠시만 기다려주세요
            </p>
          </div>

          <div className="w-full flex items-center justify-center">
            <BarLoader
              color="#000"
              width={200}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderPage
