'use client'
import { ModalContents } from '@/types/modal'
import { createContext, useState, useContext, ReactNode } from 'react'

type ModalContextType = {
  isOpen: boolean
  contents: ModalContents
  openModal: (contents: ModalContents) => void
  closeModal: () => void
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

  return (
    <ModalContext.Provider
      value={{ isOpen, contents, openModal, closeModal }}
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
