'use client'
import { ModalContents } from '@/types/modal'
import { createContext, useState, useContext, ReactNode } from 'react'

type ModalContextType = {
  isOpen: boolean
  contents: ModalContents
  openModal: (contents: ModalContents) => void
  closeModal: () => void
  showSuccessModal: (
    title: string,
    description: string,
    actionBtnText?: string,
    onAction?: () => void,
  ) => void
  showErrorModal: (
    title: string,
    description: string,
    actionBtnText?: string,
    onAction?: () => void,
  ) => void
  showConfirmModal: (
    title: string,
    description: string,
    onConfirm: () => void,
    confirmText?: string,
    cancelText?: string,
  ) => void
  showCustomModal: (contents: ModalContents) => void
}

const ModalContext = createContext<ModalContextType | null>(null)

export const ModalProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [contents, setContents] = useState<ModalContents>({
    title: '',
    description: '',
  })

  const openModal = (modalContents: ModalContents) => {
    setContents(modalContents)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const showSuccessModal = (
    title: string,
    description: string,
    actionBtnText: string = '확인',
    onAction?: () => void,
  ) => {
    openModal({
      title,
      description,
      actionBtnText,
      onAction: onAction || closeModal,
    })
  }

  const showErrorModal = (
    title: string,
    description: string,
    actionBtnText: string = '확인',
    onAction?: () => void,
  ) => {
    openModal({
      title,
      description,
      actionBtnText,
      onAction: onAction || closeModal,
    })
  }

  const showConfirmModal = (
    title: string,
    description: string,
    onConfirm: () => void,
    confirmText: string = '다시 시도',
    cancelText: string = '취소',
  ) => {
    openModal({
      title,
      description,
      actionBtnText: confirmText,
      onAction: () => {
        onConfirm()
        closeModal()
      },
    })
  }

  // 커스텀 모달 (완전히 커스터마이징)
  const showCustomModal = (contents: ModalContents) => {
    openModal(contents)
  }

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        contents,
        openModal,
        closeModal,
        showSuccessModal,
        showErrorModal,
        showConfirmModal,
        showCustomModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalProvider',
    )
  }
  return context
}
