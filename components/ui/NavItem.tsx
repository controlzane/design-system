interface NavItemProps {
  label: string
  icon?: React.ElementType
  count?: number
  subItems?: { label: string; value?: string; active?: boolean; onClick?: () => void }[]
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

export function NavItem({ label, icon: Icon, count, subItems, active, disabled, onClick }: NavItemProps) {
  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={onClick}
        disabled={disabled}
        aria-current={active ? 'page' : undefined}
        className={[
          'box-border flex h-[36px] w-full items-center gap-2 rounded-[var(--radius-sharp)] px-2.5 text-[13px] font-medium',
          'transition-[background,color] duration-150',
          'disabled:opacity-40 disabled:cursor-not-allowed',
          active
            ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
            : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-secondary)]',
        ].filter(Boolean).join(' ')}
      >
        {Icon && <Icon size={15} aria-hidden="true" className="flex-shrink-0" />}
        <span className="min-w-0 flex-1 truncate text-left">{label}</span>
        {typeof count === 'number' && (
          <span className="flex h-4 min-w-4 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-bg-overlay)] px-1.5 text-[10px] font-semibold text-[var(--color-text-tertiary)]">
            {count}
          </span>
        )}
      </button>

      {subItems && subItems.length > 0 && (
        <div className="flex flex-col gap-0.5 pl-4">
          {subItems.map((child) => (
            <button
              key={child.value ?? child.label}
              type="button"
              onClick={child.onClick}
              aria-current={child.active ? 'page' : undefined}
              className={[
                'flex h-7 w-full items-center gap-2 rounded-[var(--radius-sharp)] px-2 text-left text-xs transition-[background,color] duration-150',
                child.active
                  ? 'text-[var(--color-text-secondary)]'
                  : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-secondary)]',
              ].join(' ')}
            >
              <span className="h-1.5 w-1.5 rounded-[var(--radius-pill)] bg-[var(--color-border-focus)] opacity-50" />
              <span className="min-w-0 flex-1 truncate">{child.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
