'use client'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, onDismiss, duration = 4000 }: ToastProps) {
  useEffect(() => {
    if (duration === 0) return
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-between gap-3 px-4 py-3.5 rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-float)] max-w-[360px]"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-[var(--color-text-tertiary)] text-sm">•</span>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">{message}</span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]"
      >
        <X size={14} />
      </button>
    </div>
  )
}
