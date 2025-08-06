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
      <AlertDialogContent>
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
              {contents.actionBtnText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal
