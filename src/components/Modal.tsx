'use client'

import { ReactNode, useEffect } from 'react'

type ModalProps = {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
  overlayClassName?: string
  modalClassName?: string
}

export default function Modal({
  title,
  open,
  onClose,
  children,
  overlayClassName,
  modalClassName,
}: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', esc)
    return () => document.removeEventListener('keydown', esc)
  }, [onClose])

  if (!open) return null

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 ${
          overlayClassName ?? 'z-40'
        }`}
        onClick={onClose}
      />

      {/* MODAL */}
      <div
        className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white rounded-lg shadow-lg
          max-w-3xl w-full
          max-h-[90vh] overflow-y-auto
          p-6
          ${modalClassName ?? 'z-50'}
        `}
      >
        {/* TÍTULO */}
        <h2 className="text-xl font-semibold mb-4 pr-10">
          {title}
        </h2>

        {/* FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {/* CONTEÚDO */}
        <div className="text-sm text-gray-800 space-y-4">
          {children}
        </div>
      </div>
    </>
  )
}
