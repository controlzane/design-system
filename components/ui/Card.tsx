interface CardProps {
  variant?: 'default' | 'interactive'
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

interface CardHeaderProps { children: React.ReactNode; className?: string }
interface CardBodyProps { children: React.ReactNode; className?: string }
interface CardFooterProps { children: React.ReactNode; className?: string }

export function Card({ variant = 'default', className, children, onClick }: CardProps) {
  const isInteractive = variant === 'interactive' && !!onClick

  const classes = [
    'rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] overflow-hidden flex flex-col',
    isInteractive
      ? 'text-left cursor-pointer transition-[border-color,background] duration-150 hover:border-[var(--color-border-focus)] hover:bg-[var(--color-bg-overlay)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]'
      : '',
    className,
  ].filter(Boolean).join(' ')

  if (isInteractive) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    )
  }

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={['flex items-center justify-between px-5 py-[18px] border-b border-[var(--color-border-muted)]', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={['px-5 py-5 text-sm text-[var(--color-text-secondary)] flex-1', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={['flex items-center justify-between gap-2 px-5 py-3.5 border-t border-[var(--color-border-muted)]', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
