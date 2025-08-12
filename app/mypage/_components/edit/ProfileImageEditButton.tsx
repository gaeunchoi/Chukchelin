import { useUser } from '@/hooks/useUser'
import { randomProfileImage } from '@/services/user'
import { useModalContext } from '@/contexts/ModalContext'
import { Button } from '@/components/ui/button'
import { Loader2Icon, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

function ProfileImageEditButton() {
  const { mutate: mutateUser } = useUser()
  const { openModal } = useModalContext()
  const [isLoading, setIsLoading] = useState(false)
  const showErrorModal = (error: unknown) => {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '프로필 이미지 변경 중 오류가 발생했습니다. 다시 시도해주세요.'

    openModal({
      title: '프로필 이미지 변경 실패',
      description: errorMessage,
      actionBtnText: '확인',
      onAction: () => {},
    })
  }

  const onClickChangeButton = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      await randomProfileImage()
      mutateUser()
    } catch (error) {
      showErrorModal(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      className="absolute bottom-0.5 right-0.5 rounded-full border-2 border-white"
      style={{ padding: '8px' }}
      onClick={onClickChangeButton}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2Icon
          className="animate-spin"
          size={14}
          color="white"
        />
      ) : (
        <RefreshCcw
          size={14}
          color="white"
        />
      )}
    </Button>
  )
}

export default ProfileImageEditButton
