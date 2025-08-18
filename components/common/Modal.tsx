'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { useModalContext } from '@/contexts/ModalContext'

function Modal() {
  const { isOpen, contents, closeModal } = useModalContext()

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={closeModal}
    >
      <AlertDialogContent className="z-1000">
        <AlertDialogHeader>
          <AlertDialogTitle>{contents.title}</AlertDialogTitle>
          <AlertDialogDescription className="whitespace-pre-line">
            {contents.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!contents.onAction && (
            <AlertDialogCancel>닫기</AlertDialogCancel>
          )}
          {contents.onAction && (
            <AlertDialogAction onClick={contents.onAction}>
              {contents.actionBtnText || '확인'}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal
