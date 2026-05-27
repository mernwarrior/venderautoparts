'use client'

import { FaExclamationTriangle, FaTimes } from 'react-icons/fa'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  variant?: 'danger' | 'warning' | 'info'
}

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger',
}: ConfirmModalProps) {
  if (!isOpen) return null

  const colors = {
    danger: { icon: 'text-red-500', bg: 'bg-red-50', btn: 'bg-red-500 hover:bg-red-600' },
    warning: { icon: 'text-yellow-500', bg: 'bg-yellow-50', btn: 'bg-yellow-500 hover:bg-yellow-600' },
    info: { icon: 'text-blue-500', bg: 'bg-blue-50', btn: 'bg-blue-500 hover:bg-blue-600' },
  }

  const c = colors[variant]

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slide-up">
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <FaTimes />
        </button>
        <div className="flex flex-col items-center text-center">
          <div className={`${c.bg} p-4 rounded-full mb-4`}>
            <FaExclamationTriangle className={`text-3xl ${c.icon}`} />
          </div>
          <h3 className="text-lg font-bold text-primary-dark mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-6">{message}</p>
          <div className="flex gap-3 w-full">
            <button onClick={onCancel} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              {cancelText}
            </button>
            <button onClick={onConfirm} className={`flex-1 px-4 py-2.5 ${c.btn} text-white rounded-lg text-sm font-semibold transition`}>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
