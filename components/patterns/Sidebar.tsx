'use client'
import { useState } from 'react'
import Image from 'next/image'
import { PanelLeft } from 'lucide-react'
import { NavItem } from '@/components/ui'

interface SidebarItem {
  label: string
  value: string
  icon?: React.ElementType
  count?: number
  subItems?: { label: string; value?: string }[]
}

interface SidebarProps {
  items: SidebarItem[]
  activeValue: string
  onNavigate: (value: string) => void
  onCollapse?: (collapsed: boolean) => void
  brand?: string
  username?: string
}

export function Sidebar({
  items, activeValue, onNavigate, onCollapse, brand = 'Trustabl', username,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const toggleCollapsed = (v: boolean) => { setCollapsed(v); onCollapse?.(v) }

  return (
    <div
      className="flex flex-col h-screen bg-[var(--color-bg-surface)] border-r border-[var(--color-border-muted)] overflow-hidden overflow-x-hidden transition-[width] duration-[250ms] ease"
      style={{ width: collapsed ? 52 : 220, minWidth: collapsed ? 52 : 220 }}
    >
      {/* Header */}
      <div
        className={[
          'flex items-center gap-2 py-3 border-b border-[var(--color-border-muted)] overflow-hidden',
          collapsed ? 'justify-center px-0' : 'px-2.5',
        ].join(' ')}
      >
        {!collapsed && (
          <>
            <Image
              src="/teal.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="w-7 h-7 min-w-[28px] object-contain"
            />
            <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate flex-1">{brand}</span>
          </>
        )}
        <button
          onClick={() => toggleCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-7 h-7 min-w-[28px] rounded-[var(--radius-sharp)] bg-[var(--color-bg-raised)] border border-[var(--color-border-muted)] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-[color] duration-150 flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]"
        >
          <PanelLeft size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-0.5 px-2 py-2 overflow-y-auto overflow-x-hidden">
        {items.map(item => {
          const childActive = item.subItems?.some(child => (child.value ?? child.label) === activeValue) ?? false
          const active = activeValue === item.value || childActive

          return collapsed ? (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
              className={[
                'w-9 h-9 flex items-center justify-center rounded-[var(--radius-sharp)] transition-[background,color] duration-150',
                active
                  ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
                  : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-secondary)]',
              ].join(' ')}
            >
              {item.icon && <item.icon size={16} aria-hidden="true" />}
            </button>
          ) : (
            <NavItem
              key={item.value}
              label={item.label}
              icon={item.icon}
              count={item.count}
              subItems={item.subItems?.map(child => ({
                ...child,
                active: (child.value ?? child.label) === activeValue,
                onClick: () => onNavigate(child.value ?? child.label),
              }))}
              active={active}
              onClick={() => onNavigate(item.value)}
            />
          )
        })}
      </div>

      {/* Footer */}
      {username && (
        <div className="flex items-center gap-2 px-2.5 py-2.5 border-t border-[var(--color-border-muted)] overflow-hidden">
          <div className="w-7 h-7 min-w-[28px] rounded-[var(--radius-pill)] bg-[var(--color-bg-raised)] border border-[var(--color-border-muted)] flex items-center justify-center text-[11px] font-semibold text-[var(--color-text-primary)]">
            {username[0].toUpperCase()}
          </div>
          {!collapsed && <span className="text-xs text-[var(--color-text-secondary)] truncate">{username}</span>}
        </div>
      )}
    </div>
  )
}
