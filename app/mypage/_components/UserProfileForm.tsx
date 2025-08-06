'use client'
import { Button } from '@/components/ui/button'
import { flexColICenter } from '@/style/custom'
import { Stadium } from '@/types/stadium'
import { useState, useCallback, useEffect } from 'react'
import { updateUser } from '@/services/user'
import { useModalContext } from '@/contexts/ModalContext'
import { useRouter } from 'next/navigation'
import Nickname from './edit/Nickname'
import HomeStadium from './edit/HomeStadium'
import { useUser } from '@/hooks/useUser'
import { mutate } from 'swr'

function UserProfileForm() {
  const router = useRouter()
  const { data: loggedInUser } = useUser()
  const { openModal } = useModalContext()

  const [nickname, setNickname] = useState<string>('')
  const [selectedStadium, setSelectedStadium] =
    useState<Stadium | null>(null)

  useEffect(() => {
    if (loggedInUser?.favorite_team)
      setSelectedStadium(loggedInUser.favorite_team)
  }, [loggedInUser])

  const showSuccessModal = useCallback(() => {
    openModal({
      title: '정보 수정 완료',
      description:
        '정보가 성공적으로 수정되었습니다.\n마이페이지로 이동합니다.',
      actionBtnText: '확인',
      onAction: () => router.push('/mypage'),
    })
  }, [openModal, router])

  const showErrorModal = useCallback(
    (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.'

      openModal({
        title: '정보 수정 실패',
        description: errorMessage,
        actionBtnText: '확인',
        onAction: () => {},
      })
    },
    [openModal],
  )

  const handleEditButtonClick = useCallback(async () => {
    try {
      const updatedUser = await updateUser({
        ...(nickname.trim() !== '' && { nickname: nickname.trim() }),
        favorite_team_id: selectedStadium?.id || 1,
      })

      await mutate('/user/me', updatedUser, false)

      showSuccessModal()
    } catch (error) {
      showErrorModal(error)
    }
  }, [
    nickname,
    selectedStadium?.id,
    showSuccessModal,
    showErrorModal,
  ])

  return (
    <div
      className={flexColICenter('w-full', 'justify-start', 'gap-9')}
    >
      <Nickname
        nickname={nickname}
        onChange={setNickname}
      />
      <HomeStadium
        selectedStadium={selectedStadium}
        onChange={setSelectedStadium}
      />
      <Button
        className="sticky bottom-4 w-full p-6 z-10 font-semibold"
        onClick={handleEditButtonClick}
      >
        수정하기
      </Button>
    </div>
  )
}

export default UserProfileForm
