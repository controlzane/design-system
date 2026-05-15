'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import FocusTrap from 'focus-trap-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
  variant?: 'default' | 'warning' | 'danger'
}

export function Modal({ open, onClose, title, children, footer, variant = 'default' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <FocusTrap>
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: 'var(--color-backdrop)', zIndex: 'var(--z-modal)' }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        aria-modal="true"
      >
        <div
          role="dialog"
          aria-labelledby="modal-title"
          data-variant={variant}
          className="w-full max-w-[440px] mx-4 rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-modal)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-[18px] border-b border-[var(--color-border-muted)]">
            <h2 id="modal-title" className="text-[15px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]"
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <div className="px-5 py-5 text-sm text-[var(--color-text-secondary)]">
            {children}
          </div>
          {footer && (
            <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border-muted)]">
              {footer}
            </div>
          )}
        </div>
      </div>
    </FocusTrap>
  )
}
