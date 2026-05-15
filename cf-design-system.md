# Trustabl Design System

> A three-layer design system for Trustabl — built for humans and AI agents alike.

---

## 1. Overview

**Trustabl Design System** is the single source of truth for all UI decisions across Trustabl and future projects built on the same foundation.

### Three-Layer Architecture

| Layer | Purpose | Used by |
|---|---|---|
| **Primitive** | Raw values — colors, sizes, radii | Semantic tokens only — never components |
| **Semantic** | Intent-based tokens | Components and patterns |
| **Component** | UI building blocks | Patterns and pages |

```
Primitive → Semantic → Component → Pattern → Page
```

All semantic tokens reference primitives. Components never reference primitives directly. This enables theming, light mode, and white-labeling without touching component code.

### Project Layers

| Layer | Purpose | Reusability |
|---|---|---|
| **Core** | Tokens, primitives, base components | Any project |
| **Trustabl Brand** | Trustabl-specific styles and patterns | Trustabl only |

All Trustabl Brand decisions extend Core. Core never depends on Trustabl Brand.

---

## 1.5 Setup & Token Wiring

### globals.css

Add all design tokens to your global CSS file. Components reference these via `var()` — if tokens aren't defined, components break.

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  /* Primitive tokens */
  --primitive-neutral-0:   #FFFFFF;
  --primitive-neutral-50:  #F0F1F5;
  --primitive-neutral-100: #9899A8;
  --primitive-neutral-200: #5C5E72;
  --primitive-neutral-300: #3A3D52;
  --primitive-neutral-400: #222536;
  --primitive-neutral-500: #1A1D27;
  --primitive-neutral-600: #161923;
  --primitive-neutral-700: #13151D;
  --primitive-neutral-800: #0F1117;

  --primitive-green-400: #2DD48F;
  --primitive-green-500: #1ABCAA;
  --primitive-teal-700: #159F93;
  --primitive-green-900: #0C2B2E;
  --primitive-teal-900: #16433F;

  --primitive-green-400: #4ADE80;
  --primitive-green-900: #0C1F12;
  --primitive-amber-400: #FBBF24;
  --primitive-amber-900: #1C160A;
  --primitive-red-400:   #F87171;
  --primitive-red-500:   #2A1010;
  --primitive-red-800:   #7F2020;
  --primitive-red-900:   #1C0F0F;

  --primitive-space-4:  4px;
  --primitive-space-8:  8px;
  --primitive-space-12: 12px;
  --primitive-space-16: 16px;
  --primitive-space-24: 24px;
  --primitive-space-32: 32px;
  --primitive-space-48: 48px;
  --primitive-space-64: 64px;

  --primitive-radius-8:    8px;
  --primitive-radius-10:   10px;
  --primitive-radius-12:   12px;
  --primitive-radius-15:   15px;
  --primitive-radius-9999: 9999px;

  /* Semantic tokens — Dark Mode (default) */
  --color-bg-page:      var(--primitive-neutral-800);
  --color-bg-surface:   var(--primitive-neutral-700);
  --color-bg-overlay:   var(--primitive-neutral-600);
  --color-bg-raised:    var(--primitive-neutral-500);

  --color-border-muted: var(--primitive-neutral-400);
  --color-border-focus: #51C1B5;

  --color-text-primary:   var(--primitive-neutral-50);
  --color-text-secondary: var(--primitive-neutral-100);
  --color-text-tertiary:  var(--primitive-neutral-200);
  --color-text-disabled:  var(--primitive-neutral-300);

  --color-accent-default: var(--primitive-green-400);
  --color-accent-hover:   var(--primitive-green-500);
  --color-accent-active:  #159F93;
  --color-accent-subtle:  #0C2826;
  --color-accent-border:  #1A4D47;
  --color-accent-active:  var(--primitive-teal-700);
  --color-accent-subtle:  var(--primitive-green-900);
  --color-accent-border:  var(--primitive-teal-900);

  --color-danger-text:   var(--primitive-red-400);
  --color-danger-bg:     var(--primitive-red-900);
  --color-danger-hover:  var(--primitive-red-500);
  --color-danger-border: var(--primitive-red-800);
  --color-success-text:  var(--primitive-green-400);
  --color-success-bg:    var(--primitive-green-900);
  --color-warning-text:  var(--primitive-amber-400);
  --color-warning-bg:    var(--primitive-amber-900);
  --color-info-text:     var(--primitive-green-400);
  --color-info-bg:       var(--primitive-green-900);
  --color-neutral-text:  var(--primitive-neutral-100);
  --color-neutral-bg:    var(--primitive-neutral-700);

  --space-tight:   var(--primitive-space-4);
  --space-inner:   var(--primitive-space-8);
  --space-base:    var(--primitive-space-16);
  --space-section: var(--primitive-space-24);
  --space-layout:  var(--primitive-space-48);
  --space-page:    var(--primitive-space-64);

  --radius-sharp: var(--primitive-radius-8);
  --radius-base:  var(--primitive-radius-12);
  --radius-card:  var(--primitive-radius-15);
  --radius-pill:  var(--primitive-radius-9999);

  --shadow-card:  0 1px 3px rgba(0,0,0,0.3);
  --shadow-float: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-modal: 0 8px 32px rgba(0,0,0,0.5);

  /* Z-index scale */
  --z-base:     0;
  --z-overlay:  10;
  --z-dropdown: 20;
  --z-modal:    30;
  --z-toast:    40;
  --z-critical: 50;

  --color-backdrop: rgba(0,0,0,0.6);   /* modal/dialog overlay */

  /* Motion tokens */
  --duration-fast:  100ms;
  --duration-base:  150ms;
  --duration-slow:  250ms;
  --duration-enter: 200ms;
  --duration-exit:  150ms;
  --ease-default: ease;
  --ease-enter:   cubic-bezier(0.2, 0, 0, 1);
  --ease-exit:    cubic-bezier(0.4, 0, 1, 1);
}

/* Light mode overrides */
[data-theme="light"] {
  --color-bg-page:      #F8F9FB;
  --color-bg-surface:   #FFFFFF;
  --color-bg-overlay:   #F4F5F8;
  --color-bg-raised:    #EDEEF2;
  --color-border-muted: #E2E4EC;
  --color-border-focus: #159F93;
  --color-text-primary:   #0F1117;
  --color-text-secondary: #5C5E72;
  --color-text-tertiary:  #9899A8;
  --color-text-disabled:  #C8CADE;
  --color-accent-default: #1A9E72;
  --color-accent-hover:   #158F68;
  --color-accent-subtle:  #E0F4FD;
  --color-accent-border:  #BAE6FD;
  --color-danger-text:   #DC2626;
  --color-danger-bg:     #FEF2F2;
  --color-danger-border: #FECACA;
  --color-success-text: #16A34A;
  --color-success-bg:   #F0FDF4;
  --color-warning-text: #D97706;
  --color-warning-bg:   #FFFBEB;
  --color-info-text: #2DD48F;
  --color-info-bg:   #D0F5EB;
  --color-backdrop:  rgba(0,0,0,0.4);  /* slightly lighter for light mode */
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}

/* Shimmer animation for Skeleton */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position:  400px 0; }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  background-color: var(--color-bg-page);
  color: var(--color-text-primary);
  font-family: 'Inter', sans-serif;
}
```

### tailwind.config.ts

In Tailwind CSS v4, the `tailwind.config.ts` file is only needed for content paths. Token configuration is done via CSS variables in `globals.css`.

```ts
// tailwind.config.ts (optional in v4)
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    // also cover non-src layout
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
} satisfies Config
```

### next.config.ts

Required for Avatar `photo` type — add `i.pravatar.cc` (or your own image domain) to `remotePatterns`. Without this, `next/image` will block external avatar URLs.

```ts
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // Add your own image CDN/storage domain here
      // { protocol: 'https', hostname: 'your-cdn.com' },
    ],
  },
}

export default nextConfig
```



### Component folder structure

```
project-root/
├── AGENT.md              ← start here — rules, phases, checklist, Figma MCP
├── cf-design-system.md   ← full spec + component code (jump to sections only)
│
├── app/
│   ├── globals.css       ← all CSS token definitions
│   ├── layout.tsx        ← ToastProvider + font setup
│   └── ui-preview/
│       └── page.tsx      ← visual verification page
│
└── components/
    ├── ui/
    │   ├── Alert.tsx
    │   ├── Avatar.tsx
    │   ├── Badge.tsx
    │   ├── Button.tsx
    │   ├── Card.tsx
    │   ├── Checkbox.tsx
    │   ├── Divider.tsx
    │   ├── Dropdown.tsx
    │   ├── ErrorBoundary.tsx
    │   ├── FileUpload.tsx
    │   ├── InputField.tsx
    │   ├── Modal.tsx
    │   ├── NavItem.tsx
    │   ├── Pagination.tsx
    │   ├── Popover.tsx
    │   ├── ProgressBar.tsx
    │   ├── Radio.tsx
    │   ├── Skeleton.tsx
    │   ├── Spinner.tsx
    │   ├── Table.tsx
    │   ├── Tabs.tsx
    │   ├── Toast.tsx
    │   ├── ToastContext.tsx
    │   ├── Toggle.tsx
    │   ├── Tooltip.tsx
    │   └── index.ts
    └── patterns/
        ├── EmptyState.tsx
        ├── FormLayout.tsx
        ├── Sidebar.tsx
        └── Toolbar.tsx
```

### Barrel Export

```ts
// components/ui/index.ts
export * from './Alert'
export * from './Avatar'
export * from './Badge'
export * from './Button'
export * from './Card'
export * from './Checkbox'
export * from './Divider'
export * from './Dropdown'
export * from './FileUpload'
export * from './InputField'
export * from './Modal'
export * from './NavItem'
export * from './Pagination'
export * from './Popover'
export * from './ProgressBar'
export * from './Radio'
export * from './Skeleton'
export * from './Spinner'
export * from './Table'
export * from './Tabs'
export * from './Toast'
export * from './Toggle'
export * from './Tooltip'
export * from './ErrorBoundary'
export * from './ToastContext'
```

Usage after barrel export:
```tsx
import { Button, InputField, Badge } from '@/components/ui'
```

---

### Toast Manager

The `Toast` component is a display-only element. Use `useToast` to trigger toasts from anywhere in the app.

```tsx
// components/ui/ToastContext.tsx
'use client'
import { createContext, useContext, useState, useCallback } from 'react'
import { Toast } from './Toast'

interface ToastItem {
  id: number
  message: string
}

interface ToastContextValue {
  toast: (message: string) => void
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} })

let _id = 0

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const toast = useCallback((message: string) => {
    const id = ++_id
    setToasts(prev => [...prev, { id, message }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container — fixed bottom-right */}
      <div className="fixed bottom-6 right-6 z-[var(--z-toast)] flex flex-col gap-2 pointer-events-none">
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto">
            <Toast message={t.message} onDismiss={() => dismiss(t.id)} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
```

Add `ToastProvider` to your root layout, combined with font setup:
```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ToastProvider } from '@/components/ui/ToastContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  )
}
```

Usage anywhere in the app:
```tsx
'use client'
import { useToast } from '@/components/ui/ToastContext'

export function PublishButton() {
  const { toast } = useToast()

  const handlePublish = async () => {
    await publishComponent()
    toast('Component published successfully.')
  }

  return <Button onClick={handlePublish}>Publish</Button>
}
```

---

### Modal Focus Trap

The Modal component requires focus to be trapped inside while open. Install `focus-trap-react`:

```bash
npm install focus-trap-react
```

Updated Modal with focus trap:

```tsx
// components/ui/Modal.tsx
'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'
import FocusTrap from 'focus-trap-react'

interface ModalProps {
  open:      boolean
  onClose:   () => void
  title:     string
  children:  React.ReactNode
  footer?:   React.ReactNode
  variant?:  'default' | 'warning' | 'danger'
}

export function Modal({ open, onClose, title, children, footer, variant = 'default' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    // Prevent background scroll
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
          className="w-full max-w-[440px] mx-4 rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-modal)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-[18px] border-b border-[var(--color-border-muted)]">
            <h2 id="modal-title" className="text-[15px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]"
            >
              <X size={16} />
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
```

---

### Error Boundary

Wrap sections of your UI to prevent full-page crashes when a component throws.

```tsx
// components/ui/ErrorBoundary.tsx
'use client'
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center gap-3 p-12 text-center border border-[var(--color-border-muted)] rounded-[15px] bg-[var(--color-bg-surface)]">
          <div className="w-12 h-12 rounded-[var(--radius-base)] bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)] flex items-center justify-center">
            <span className="text-[var(--color-danger-text)] text-lg">!</span>
          </div>
          <p className="text-sm font-semibold text-[var(--color-text-primary)]">Something went wrong</p>
          <p className="text-xs text-[var(--color-text-secondary)]">This section failed to load. Try refreshing the page.</p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="text-xs text-[var(--color-accent-default)] underline underline-offset-2"
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
```

Usage — wrap any section that might throw:
```tsx
// Wrap Table (network data, parsing errors)
<ErrorBoundary>
  <Table columns={columns} data={data} />
</ErrorBoundary>

// Wrap FileUpload (browser API issues)
<ErrorBoundary fallback={<Alert title="File upload unavailable" />}>
  <FileUpload accept=".pdf" />
</ErrorBoundary>
```

Export from barrel:
```ts
// Add to components/ui/index.ts
export * from './ErrorBoundary'
export * from './ToastContext'
```

---

### Pattern Code

#### Sidebar Pattern

**Sizes:** Expanded: 220px. Collapsed: 52px. Transition: width 250ms ease. Header: px-2.5 py-3. Nav items: px-2 py-1, gap-0.5. Toggle button: w-7 h-7 (28px). Footer: px-2.5 py-2.5.

```tsx
// components/patterns/Sidebar.tsx
'use client'
import { useState } from 'react'
import { PanelLeft, Plus } from 'lucide-react'
import { NavItem } from '@/components/ui'

interface SidebarItem {
  label: string
  value: string
  icon?: React.ElementType
}

interface SidebarProps {
  items: SidebarItem[]
  activeValue: string
  onNavigate: (value: string) => void
  onNewComponent?: () => void
  onCollapse?:     (collapsed: boolean) => void
  brand?: string
  username?: string
}

export function Sidebar({
  items, activeValue, onNavigate, onNewComponent, onCollapse, brand = 'Trustabl', username,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const toggle = (v: boolean) => { setCollapsed(v); onCollapse?.(v) }

  return (
    <div
      className="flex flex-col h-screen bg-[var(--color-bg-surface)] border-r border-[var(--color-border-muted)] overflow-hidden overflow-x-hidden transition-[width] duration-[250ms] ease"
      style={{ width: collapsed ? 52 : 220, minWidth: collapsed ? 52 : 220 }}
    >
      {/* Header — fixed 52px height, flex items-center always */}
      <div className="h-[52px] flex-shrink-0 flex items-center border-b border-[var(--color-border-muted)] overflow-hidden px-2.5">
        {!collapsed && (
          <>
            <div className="w-7 h-7 min-w-[28px] rounded-[var(--radius-pill)] bg-[var(--color-accent-default)] flex items-center justify-center text-[11px] font-bold text-[var(--color-bg-page)]">T</div>
            <span className="text-sm font-semibold text-[var(--color-text-primary)] truncate flex-1 ml-2">{brand}</span>
          </>
        )}
        {collapsed && <div className="flex-1" />}
        <button
          onClick={() => toggle(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="w-7 h-7 min-w-[28px] flex-shrink-0 rounded-[var(--radius-sharp)] bg-[var(--color-bg-raised)] border border-[var(--color-border-muted)] flex items-center justify-center text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-[color] duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]"
        >
          <PanelLeft size={14} aria-hidden="true" />
        </button>
      </div>

      {/* New Component */}
      <div className={['px-2 pt-2 overflow-hidden', collapsed ? 'flex justify-center' : ''].join('')}>
        <button
          onClick={onNewComponent}
          className={[
            'flex items-center gap-2.5 h-9 rounded-[var(--radius-sharp)] text-sm font-medium text-[var(--color-text-secondary)]',
            'hover:bg-[var(--color-bg-overlay)] hover:text-[var(--color-text-primary)] transition-[background,color] duration-150',
            collapsed ? 'w-9 justify-center' : 'w-full px-3',
          ].join(' ')}
        >
          <Plus size={16} />
          {!collapsed && 'New Component'}
        </button>
      </div>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border-muted)] mx-2 my-1" />

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-0.5 px-2 py-1 overflow-y-auto overflow-x-hidden">
        {items.map(item => (
          collapsed ? (
            <button
              key={item.value}
              onClick={() => onNavigate(item.value)}
              aria-label={item.label}
              aria-current={activeValue === item.value ? 'page' : undefined}
              className={[
                'w-9 h-9 flex items-center justify-center rounded-[var(--radius-sharp)] transition-[background,color] duration-150',
                activeValue === item.value
                  ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
                  : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-secondary)]',
              ].join(' ')}
            >
              {item.icon && <item.icon size={16} />}
            </button>
          ) : (
            <NavItem
              key={item.value}
              label={item.label}
              icon={item.icon}
              active={activeValue === item.value}
              onClick={() => onNavigate(item.value)}
            />
          )
        ))}
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
```

Usage:
```tsx
import { Home, Grid, GitFork, Globe } from 'lucide-react'
import { Sidebar } from '@/components/patterns/Sidebar'

const navItems = [
  { label: 'Home', value: 'home', icon: Home },
  { label: 'Catalog', value: 'catalog', icon: Grid },
  { label: 'Requests', value: 'requests', icon: GitFork },
  { label: 'Community', value: 'community', icon: Globe },
]

<Sidebar
  items={navItems}
  activeValue={currentRoute}
  onNavigate={(value) => router.push(`/${value}`)}
  onNewComponent={() => setNewComponentOpen(true)}
  username="zanexflores-5155"
/>
```

---

#### Toolbar Pattern

**Sizes:** Container: p-1, radius = `--radius-base`. Tab pill: h-8 px-3.5, radius = `--radius-sharp`. Icon button: w-8 h-8, radius = `--radius-sharp`. Divider: w-px h-5 mx-1.

```tsx
// components/patterns/Toolbar.tsx
import { Divider } from '@/components/ui'

interface ToolbarTab {
  label: string
  value: string
  icon?: React.ElementType
  badge?: number
}

interface ToolbarAction {
  icon?: React.ElementType
  label?: string
  onClick: () => void
  active?: boolean
  'aria-label'?: string
}

interface ToolbarProps {
  tabs?: ToolbarTab[]
  activeTab?: string
  onTabChange?: (value: string) => void
  actions?: ToolbarAction[]
  primaryAction?: { label: string; onClick: () => void }
}

export function Toolbar({ tabs, activeTab, onTabChange, actions, primaryAction }: ToolbarProps) {
  return (
    <div className="flex items-center gap-1 p-1 rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] w-fit">
      {/* Tabs */}
      {tabs?.map(tab => {
        const Icon = tab.icon
        const isActive = tab.value === activeTab
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange?.(tab.value)}
            className={[
              'flex items-center gap-1.5 h-8 px-3.5 rounded-[var(--radius-sharp)] text-sm font-medium transition-[background,color] duration-150', /* gap-1.5 = 6px intentional for compact tab icon+text */ /* gap-1.5 = 6px intentional for compact tab icon+text */
              isActive
                ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
                : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]',
            ].join(' ')}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={['text-[11px] font-medium px-1.5 py-px rounded-full border', isActive ? 'text-[var(--color-text-primary)] bg-[var(--color-border-muted)] border-[var(--color-border-focus)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)] border-[var(--color-border-muted)]'].join(' ')}>
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}

      {/* Divider before actions */}
      {tabs && actions && <Divider orientation="vertical" className="mx-1" />}

      {/* Icon actions */}
      {actions?.map((action, i) => {
        const Icon = action.icon
        return (
          <button
            key={i}
            onClick={action.onClick}
            aria-label={action['aria-label'] ?? action.label}
            className={[
              'w-8 h-8 flex items-center justify-center rounded-[var(--radius-sharp)] text-sm font-medium transition-[background,color] duration-150',
              action.active
                ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
                : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-raised)] hover:text-[var(--color-text-primary)]',
            ].join(' ')}
          >
            {Icon ? <Icon size={16} /> : action.label}
          </button>
        )
      })}

      {/* Text action */}
      {primaryAction && (
        <>
          {(tabs || actions) && <Divider orientation="vertical" className="mx-1" />}
          <button
            onClick={primaryAction.onClick}
            className="flex items-center h-8 px-3 rounded-[var(--radius-sharp)] text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-raised)] hover:text-[var(--color-text-primary)] transition-[background,color] duration-150"
          >
            {primaryAction.label}
          </button>
        </>
      )}
    </div>
  )
}
```

Usage:
```tsx
import { List, Zap, Upload, Trash2, LayoutGrid, AlignJustify, Filter } from 'lucide-react'
import { Toolbar } from '@/components/patterns/Toolbar'

<Toolbar
  tabs={[
    { label: 'All', value: 'all', icon: List, badge: 374 },
    { label: 'Generated', value: 'generated', icon: Zap, badge: 138 },
    { label: 'Published', value: 'published', icon: Upload, badge: 201 },
  ]}
  activeTab={activeTab}
  onTabChange={setActiveTab}
  actions={[
    { icon: LayoutGrid, onClick: () => setView('grid'), active: view === 'grid', 'aria-label': 'Grid view' },
    { icon: AlignJustify, onClick: () => setView('list'), active: view === 'list', 'aria-label': 'List view' },
    { icon: Filter, onClick: openFilters, 'aria-label': 'Open filters' },
  ]}
/>
```

---

#### Form Layout Pattern

**Sizes:** max-width 640px, radius = `--radius-card` (15px). Header: px-5 py-[18px], title text-[15px] font-semibold. Body: px-5 py-5, field gap-4. Footer: px-5 py-3.5, justify-end gap-2.

```tsx
// components/patterns/FormLayout.tsx
interface FormSectionProps {
  title: string
  description?: string
  children: React.ReactNode
}

interface FormLayoutProps {
  title: string
  onSubmit: (e: React.FormEvent) => void
  footer: React.ReactNode
  children: React.ReactNode
  maxWidth?: number
}

export function FormSection({ title, description, children }: FormSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">{title}</p>
        {description && <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{description}</p>}
      </div>
      <div className="h-px bg-[var(--color-border-muted)]" />
      {children}
    </div>
  )
}

export function FormLayout({ title, onSubmit, footer, children, maxWidth = 640 }: FormLayoutProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] overflow-hidden"
      style={{ maxWidth }}
    >
      {/* Header */}
      <div className="px-5 py-[18px] border-b border-[var(--color-border-muted)]">
        <h2 className="text-[15px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
      </div>

      {/* Body */}
      <div className="px-5 py-5 flex flex-col gap-4">
        {children}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border-muted)]">
        {footer}
      </div>
    </form>
  )
}
```

Usage:
```tsx
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
import { InputField, Button, Toggle } from '@/components/ui'

<FormLayout
  title="Edit Profile"
  onSubmit={handleSubmit}
  footer={
    <>
      <Button variant="ghost" type="button" onClick={handleDiscard}>Discard</Button>
      <Button type="submit">Save Changes</Button>
    </>
  }
>
  <FormSection title="General">
    <InputField label="Username" required value={username} onChange={e => setUsername(e.target.value)} />
    <InputField label="Bio" optional placeholder="Tell us about yourself" />
  </FormSection>
  <div className="h-px bg-[var(--color-border-muted)]" />
  <FormSection title="Preferences">
    <Toggle checked={notifications} onChange={setNotifications} label="Email notifications" />
  </FormSection>
</FormLayout>
```

---

#### Empty State Pattern

**Sizes:** px-8 py-12. Icon wrap: w-14 h-14 (56px), radius = `--radius-card`. Icon: 24px. Description: max-w-[280px]. Normal wrap: `--color-bg-raised` + `--color-border-muted`. Danger wrap: `--color-danger-bg` + `--color-danger-border`.

```tsx
// components/patterns/EmptyState.tsx
import { Button } from '@/components/ui'

interface EmptyStateProps {
  icon: React.ElementType
  title: string
  description: string
  action?: { label: string; onClick: () => void; variant?: 'primary' | 'ghost' }
  danger?: boolean
}

export function EmptyState({ icon: Icon, title, description, action, danger }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-8 py-12 text-center rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)]">
      <div className={[
        'w-14 h-14 rounded-[var(--radius-card)] flex items-center justify-center',
        danger
          ? 'bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)]'
          : 'bg-[var(--color-bg-raised)] border border-[var(--color-border-muted)]',
      ].join(' ')}>
        <Icon size={24} className={danger ? 'text-[var(--color-danger-text)]' : 'text-[var(--color-text-tertiary)]'} />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
        <p className="text-xs text-[var(--color-text-secondary)] max-w-[280px] leading-relaxed">{description}</p>
      </div>
      {action && (
        <Button variant={action.variant ?? 'primary'} size="sm" onClick={action.onClick} className="mt-1">
          {action.label}
        </Button>
      )}
    </div>
  )
}
```

Usage:
```tsx
import { Grid, Search, Star, AlertCircle } from 'lucide-react'
import { EmptyState } from '@/components/patterns/EmptyState'

// No components
<EmptyState
  icon={Grid}
  title="No components yet"
  description="Create your first component to get started with the catalog."
  action={{ label: 'New Component', onClick: () => setOpen(true) }}
/>

// No search results
<EmptyState
  icon={Search}
  title="No results found"
  description='No components match your filters. Try adjusting or clearing them.'
  action={{ label: 'Clear filters', onClick: clearFilters, variant: 'ghost' }}
/>

// Error
<EmptyState
  icon={AlertCircle}
  title="Failed to load"
  description="Something went wrong. Please try again."
  action={{ label: 'Retry', onClick: refetch, variant: 'ghost' }}
  danger
/>
```

---

## 2. Design Principles

1. **Functional over decorative** — Every element earns its place.
2. **Precision over personality** — Consistent spacing, color, and type over expressive variation.
3. **Dark mode first** — All components are designed and tested in dark mode before light.
4. **Unambiguous** — Component names, prop names, and usage rules must be clear to both humans and AI agents.
5. **Composable** — Components are designed to work independently and in combination.

---

## 3. Foundations (Core Layer)

### 3.0 Primitive Tokens

Primitive tokens are raw values — the bottom of the token hierarchy. They are **never used directly in components**. They exist only to be referenced by semantic tokens.

#### Color Primitives

```css
/* Neutrals */
--primitive-neutral-0:    #FFFFFF;
--primitive-neutral-50:   #F0F1F5;
--primitive-neutral-100:  #9899A8;
--primitive-neutral-200:  #5C5E72;
--primitive-neutral-300:  #3A3D52;
--primitive-neutral-400:  #222536;
--primitive-neutral-500:  #1A1D27;
--primitive-neutral-600:  #161923;
--primitive-neutral-700:  #13151D;
--primitive-neutral-800:  #0F1117;
--primitive-neutral-900:  #000000;

/* Teal (Brand accent) */
--primitive-Teal-300:      #7DD3FC;
--primitive-green-400:      #2DD48F;
--primitive-green-500:      #1ABCAA;
--primitive-teal-700:      #159F93;
--primitive-green-900:      #0C2B2E;
--primitive-teal-900:      #16433F;

/* Success */
--primitive-green-400:    #4ADE80;
--primitive-green-900:    #0C1F12;

/* Warning */
--primitive-amber-400:    #FBBF24;
--primitive-amber-900:    #1C160A;

/* Danger */
--primitive-red-400:      #F87171;
--primitive-red-500:      #2A1010;   /* danger hover bg */
--primitive-red-800:      #7F2020;
--primitive-red-900:      #1C0F0F;
```

#### Spacing Primitives

```css
--primitive-space-4:   4px;
--primitive-space-8:   8px;
--primitive-space-12:  12px;
--primitive-space-16:  16px;
--primitive-space-24:  24px;
--primitive-space-32:  32px;
--primitive-space-48:  48px;
--primitive-space-64:  64px;
```

#### Radius Primitives

```css
--primitive-radius-4:     4px;
--primitive-radius-8:     8px;
--primitive-radius-10:    10px;
--primitive-radius-12:    12px;
--primitive-radius-15:    15px;
--primitive-radius-9999:  9999px;
```

#### How Primitives Map to Semantic Tokens

```css
/* Example mapping — semantic references primitive */
--color-bg-page        → var(--primitive-neutral-800)
--color-bg-surface     → var(--primitive-neutral-700)
--color-accent-default → var(--primitive-green-400)
--color-danger-text    → var(--primitive-red-400)
--space-base           → var(--primitive-space-16)
--radius-card          → var(--primitive-radius-15)
```

**Rule:** When adding a new semantic token, always reference a primitive. Never hardcode a raw value in a semantic token.

---

### 3.1 Color

#### Naming Convention
All color tokens use **semantic naming**, not raw values.

```
--color-[role]-[variant]
```

#### Dark Mode Palette (Primary)

**Backgrounds**

| Token | Primitive | Hex | Use |
|---|---|---|---|
| `--color-bg-page` | `--primitive-neutral-800` | `#0F1117` | Page background |
| `--color-bg-surface` | `--primitive-neutral-700` | `#13151D` | Cards, sidebars |
| `--color-bg-overlay` | `--primitive-neutral-600` | `#161923` | Modals, dropdowns, popovers |
| `--color-bg-raised` | `--primitive-neutral-500` | `#1A1D27` | Hover states, subtle fills |

**Borders**

| Token | Primitive | Hex | Use |
|---|---|---|---|
| `--color-border-muted` | `--primitive-neutral-400` | `#222536` | Dividers, card edges, resting state |
| `--color-border-focus` | `--primitive-neutral-300` (approx) | `#51C1B5` | Focus rings, active inputs, selected states |

**Text**

| Token | Primitive | Hex | Use |
|---|---|---|---|
| `--color-text-primary` | `--primitive-neutral-50` | `#F0F1F5` | Primary readable text |
| `--color-text-secondary` | `--primitive-neutral-100` | `#9899A8` | Supporting, subdued text |
| `--color-text-tertiary` | `--primitive-neutral-200` | `#5C5E72` | Placeholder, metadata |
| `--color-text-disabled` | `--primitive-neutral-300` | `#3A3D52` | Disabled text |

**Accent (Brand)**

| Token | Primitive | Hex | Use |
|---|---|---|---|
| `--color-accent-default` | `--primitive-green-400` | `#2DD48F` | Primary interactive, CTAs |
| `--color-accent-hover` | `--primitive-green-500` | `#1ABCAA` | Hover state |
| `--color-accent-active` | `--primitive-teal-700` | `#159F93` | Active/pressed state |
| `--color-accent-subtle` | `--primitive-green-900` | `#0C2B2E` | Low-emphasis accent backgrounds |
| `--color-accent-border` | `--primitive-teal-900` | `#16433F` | Accent-tinted borders |

**Semantic**

| Token | Primitive | Hex | Use |
|---|---|---|---|
| `--color-danger-text` | `--primitive-red-400` | `#F87171` | Errors, destructive actions |
| `--color-danger-bg` | `--primitive-red-900` | `#1C0F0F` | Error backgrounds |
| `--color-danger-hover` | `--primitive-red-500` | `#2A1010` | Danger hover background |
| `--color-danger-border` | `--primitive-red-800` | `#7F2020` | Error borders |
| `--color-success-text` | `--primitive-green-400` | `#4ADE80` | Success states |
| `--color-success-bg` | `--primitive-green-900` | `#0C1F12` | Success backgrounds |
| `--color-warning-text` | `--primitive-amber-400` | `#FBBF24` | Warnings |
| `--color-warning-bg` | `--primitive-amber-900` | `#1C160A` | Warning backgrounds |
| `--color-info-text` | `--primitive-green-400` | `#2DD48F` | Informational |
| `--color-info-bg` | `--primitive-green-900` | `#0C2B2E` | Info backgrounds |
| `--color-neutral-text` | `--primitive-neutral-100` | `#9899A8` | Neutral, inactive, default states |
| `--color-neutral-bg` | `--primitive-neutral-700` | `#13151D` | Neutral backgrounds |

#### Rules
- Never use raw hex values in components. Always reference a token.
- Avoid pure `#000000` and `#FFFFFF` — use near-blacks and off-whites for depth.
- Accent color (`--color-accent-default`) is reserved for **primary interactive elements only** — not decoration.
- Semantic colors (danger, success, warning) communicate **state**, not style. Do not repurpose them.

---

### 3.1.1 Token Governance

Tokens are the contract between design and code. Without governance, tokens proliferate and lose meaning.

#### Adding a New Token

A new semantic token is justified only when **both** conditions are met:
1. It cannot be represented by any existing semantic token
2. It has at least 2 distinct use cases across the system

**Process:**
```
1. Check existing tokens — can this be expressed with what exists?
2. If not → define a primitive value first
3. Then create a semantic token that references it
4. Document: name, primitive reference, hex, use cases
5. Require naming review before merging
```

**Bad example** — token added without justification:
```css
--color-bg-surface-2    /* ❌ what is this? surface is already defined */
--color-bg-card-alt     /* ❌ use --color-bg-overlay instead */
```

**Good example** — token with clear justification:
```css
--color-danger-hover    /* ✅ 2 uses: Button danger hover, destructive row hover */
```

#### Token Naming Rules

```
--[category]-[role]-[variant?]

category: color, space, radius, shadow, z, text
role:     bg, text, border, accent, danger, etc.
variant:  hover, active, muted, focus, subtle, etc.
```

#### Deprecating a Token

1. Mark it in the doc with `[DEPRECATED]` and the replacement
2. Replace all usages within 2 releases
3. Remove the token after 2 releases
4. Never remove a token that still has active usages

#### Rules
- Token names must be self-documenting — a dev should understand purpose without context
- Never prefix tokens with component names (`--button-bg`) — tokens are system-level, not component-level
- AI agents: always use the most semantically appropriate token — do not use `--color-bg-raised` to mean "hover background" when a hover token exists

---

### 3.1.2 Theming Strategy

Trustabl supports dark mode (default), light mode, and future white-labeling for enterprise clients.

#### What Can Be Overridden

| Category | Allowed | Reason |
|---|---|---|
| Accent tokens | ✅ Yes | Brand color is per-client |
| Background tokens | ✅ Yes | Surface depth can shift |
| Semantic tokens (danger, success) | ❌ No | These communicate meaning |
| Spacing scale | ❌ No | Layout must stay consistent |
| Typography scale | ❌ No | Readability must stay consistent |
| Border radius | ⚠️ With care | Changing radius changes brand feel significantly |

#### How to Apply a Theme

Use `data-theme` attribute on the root element:

```tsx
// app/layout.tsx
<html data-theme="light">   // or "dark" (default)
```

For white-label enterprise:
```css
[data-theme="enterprise-acme"] {
  --color-accent-default: #E84A2F;   /* Acme brand red */
  --color-accent-hover:   #C73D25;
  --color-accent-active:  #A83020;
  --color-accent-subtle:  #2D1510;
  --color-accent-border:  #6B2018;
}
```

#### Theme Contract Rules

- White-label themes must maintain contrast ratios — test every accent against `--color-bg-page`
- Never override semantic color meaning — `--color-danger-text` must always mean danger
- Spacing and typography are not part of the theme contract — they are fixed
- When applying a new theme, run contrast checks on all 5 accent tokens before shipping

---

### 3.2 Typography

#### Font
- **Primary:** Inter
- **Mono:** JetBrains Mono — used for code, component names, API references

#### Icon Library
- **Library:** Lucide React (`lucide-react`)
- All icons across all components must use Lucide. No custom SVGs unless Lucide doesn't have it.
- Default icon size: `16px` for inline, `20px` for standalone
- Icon color always inherits from the parent text color token

#### Scale

| Token | Size | Weight | Line Height | Use |
|---|---|---|---|---|
| `--text-caption` | 11px | 400 | 1.4 | Labels, metadata, timestamps |
| `--text-label` | 13px | 400 | 1.5 | Body small, secondary text |
| `--text-body` | 14px | 400 | 1.5 | Default body text |
| `--text-body-lg` | 16px | 500 | 1.5 | Emphasized body, intro text |
| `--text-heading-sm` | 18px | 600 | 1.2 | Card titles, section headings |
| `--text-heading-md` | 24px | 600 | 1.2 | Page headings |
| `--text-heading-lg` | 32px | 700 | 1.1 | Hero headings |

#### Role Context — When to Use Each

| Token | Real use cases |
|---|---|
| `--text-caption` | Timestamps, byte sizes, tag labels, table header labels, field hints |
| `--text-label` | Secondary descriptions, card metadata, sidebar nav labels, badge text |
| `--text-body` | Modal body text, form descriptions, paragraph content, list items |
| `--text-body-lg` | Page intro paragraphs, empty state descriptions |
| `--text-heading-sm` | Card titles, section headings inside pages, modal titles |
| `--text-heading-md` | Page titles (h1 equivalent per view) |
| `--text-heading-lg` | Hero / landing sections only |

**Max heading levels per page:** 2. Never use more than `heading-md` + `heading-sm` on a single page. Treat `heading-lg` as landing-only.

#### Text Color by Context

| Context | Token |
|---|---|
| Primary content (headings, labels) | `--color-text-primary` |
| Supporting content (descriptions, hints) | `--color-text-secondary` |
| Metadata, timestamps, placeholders | `--color-text-tertiary` |
| Disabled fields, inactive states | `--color-text-disabled` |

**Rule:** Never use `--color-text-tertiary` for anything the user needs to read. Use it for context only.

#### Typography in Dense UI

| Context | Rule |
|---|---|
| Table cells | `--text-label` (13px), single line, `text-ellipsis` overflow |
| Card body | `--text-body` (14px), max 2 lines, truncate beyond |
| Sidebar nav | `--text-label` (13px), single line, no wrap |
| Form labels | `12px font-medium` — slightly smaller than body for hierarchy |
| Dashboard numbers | `--text-heading-sm` or `--text-heading-md` for emphasis |

#### Rules
- Line height: `1.5` for body, `1.2` for headings.
- Letter spacing: `-0.01em` for headings, `0` for body.
- Max 2 type sizes per component — enforce hierarchy, not variety.
- Never let text overflow without `text-ellipsis` or defined max lines.

---

### 3.3 Spacing

Uses a **4px base unit**. Only use defined tokens — no arbitrary values.

| Token | Primitive | Value | Use |
|---|---|---|---|
| `--space-tight` | `--primitive-space-4` | 4px | Icon gaps, badge padding |
| `--space-inner` | `--primitive-space-8` | 8px | Component internal padding |
| `--space-base` | `--primitive-space-16` | 16px | Default spacing |
| `--space-section` | `--primitive-space-24` | 24px | Between components |
| `--space-layout` | `--primitive-space-48` | 48px | Between page sections |
| `--space-page` | `--primitive-space-64` | 64px | Page margins |

**Rule:** Never use arbitrary spacing values. Always map to a token.

---

### 3.4 Border Radius

| Token | Primitive | Value | Use |
|---|---|---|---|
| `--radius-sharp` | `--primitive-radius-8` | 8px | Inputs, tags, small elements |
| `--radius-base` | `--primitive-radius-12` | 12px | Buttons, dropdowns |
| `--radius-card` | `--primitive-radius-15` | 15px | Cards, panels, modals |
| `--radius-pill` | `--primitive-radius-9999` | 9999px | Badges, pills, avatars |

---

### 3.5 Elevation, Shadows & Z-index

#### Elevation Layers

Every surface sits on a defined elevation level. Never use the same background color for a container and its child.

```
Level 0 — Page          --color-bg-page      #0F1117   z-index: 0
Level 1 — Surface       --color-bg-surface   #13151D   z-index: 0
Level 2 — Overlay       --color-bg-overlay   #161923   z-index: 10–19
Level 3 — Raised        --color-bg-raised    #1A1D27   z-index: 0 (inline)
Level 4 — Float         (dropdown, popover)            z-index: 20–29
Level 5 — Modal         (modal, drawer)                z-index: 30–39
Level 6 — Toast         (notification)                 z-index: 40–49
Level 7 — Critical      (alerts blocking UI)           z-index: 50+
```

**Rule:** A child element must always be one level higher than its parent.

#### Shadow Tokens

| Token | Value | Elevation Level | Use |
|---|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(0,0,0,0.3)` | Level 1 | Cards, subtle lift |
| `--shadow-float` | `0 4px 12px rgba(0,0,0,0.4)` | Level 4 | Dropdowns, popovers, tooltips |
| `--shadow-modal` | `0 8px 32px rgba(0,0,0,0.5)` | Level 5 | Modals, dialogs |

#### Z-index System

```css
--z-base:     0;
--z-overlay:  10;   /* sticky headers, banners */
--z-dropdown: 20;   /* dropdowns, popovers, tooltips */
--z-modal:    30;   /* modals, drawers */
--z-toast:    40;   /* toast notifications */
--z-critical: 50;   /* blocking alerts, onboarding overlays */
```

Add to `globals.css`:
```css
--z-base:     0;
--z-overlay:  10;
--z-dropdown: 20;
--z-modal:    30;
--z-toast:    40;
--z-critical: 50;
```

#### Stacking Rules

- Dropdown (`z-20`) always renders above cards and surface-level content
- Modal (`z-30`) always renders above dropdowns — a dropdown inside a modal uses `z-20` relative to the modal's stacking context
- Toast (`z-40`) always renders above modals — never obscured by modal backdrop
- Never manually assign a z-index outside the defined scale

Shadows use low opacity and cool tones to stay consistent in dark mode.

---

### 3.6 Grid & Layout

#### Breakpoints

| Name | Token | Width | Target |
|---|---|---|---|
| `mobile` | `--bp-mobile` | 0 – 767px | Mobile phones |
| `tablet` | `--bp-tablet` | 768px – 1199px | Tablets, small laptops |
| `desktop` | `--bp-desktop` | 1200px – 1919px | Laptops, monitors |
| `wide` | `--bp-wide` | 1920px+ | Large monitors, 1920×1080 |

#### Grid System

| Property | Mobile | Tablet | Desktop | Wide |
|---|---|---|---|---|
| Columns | 4 | 8 | 12 | 12 |
| Gutter | 16px | 16px | 24px | 24px |
| Margin | 16px | 24px | 32px | auto |
| Max content width | 100% | 100% | 1280px | 1440px |

**Rule:** On `wide` screens, content is centered with `max-width: 1440px` and `margin: 0 auto`. Never stretch content edge to edge on 1920px+.

---

#### Layout Patterns

**1. App Shell (Primary Trustabl layout)**
```
┌─────────────────────────────────────────┐
│  Topbar (fixed, full width, 56px)       │
├──────────┬──────────────────────────────┤
│ Sidebar  │  Main Content               │
│ 240px    │  flex: 1                    │
│ (fixed)  │  padding: 24px              │
│          │  max-width: 1440px          │
└──────────┴──────────────────────────────┘
```

- Topbar: `height: 56px`, `background: --color-bg-surface`, `border-bottom: --color-border-muted`
- Sidebar expanded: `width: 240px`
- Sidebar collapsed: `width: 56px`
- Main content: `padding: --space-section` (24px)

---

**2. Catalog / Card Grid**
```
Desktop (1200px+):  4 columns
Tablet  (768px+):   2 columns
Mobile  (<768px):   1 column
```

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);   /* desktop */
  gap: var(--space-section);               /* 24px */
}

@media (max-width: 1199px) {
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 767px) {
  .card-grid { grid-template-columns: 1fr; }
}
```

---

**3. Form Layout**
```
Label
[Input field — full width]
[Input field — full width]

[Cancel]  [Submit]  ← right aligned
```

- Labels above inputs, never inline
- Inputs always full width within their container
- Form max-width: `640px` — never let forms stretch full page width
- Button group: right-aligned, `gap: --space-inner` (8px)
- Vertical spacing between fields: `--space-base` (16px)

---

**4. Page Header**
```
[Page title]          [Action button]
[Breadcrumb / tabs]
[Divider]
[Content]
```

- Title: `--text-heading-md` (24px)
- Action button: right aligned, `variant="primary"`
- Vertical spacing below header: `--space-section` (24px)

---

#### Spacing Behavior Across Screen Sizes

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Page margin | 16px | 24px | 32px |
| Card padding | 14px | 14px | 16px |
| Section gap | 16px | 24px | 24px |
| Modal width | 100% – 32px | 480px | 480px |

---

### 3.7 Component Composition Rules

Components are designed to work individually and in combination. These rules prevent layout drift at the composition layer.

#### Spacing Between Components

| Composition | Spacing |
|---|---|
| Button inside Card footer | `--space-inner` (8px) gap between buttons |
| Input + Button in a row | `--space-inner` (8px) gap, align by height (42px md) |
| Field + Field in a form | `--space-base` (16px) vertical gap |
| Card + Card in a grid | `--space-section` (24px) gap |
| Section + Section on a page | `--space-layout` (48px) gap |

#### Nesting Rules

```
Page
└── Section (--space-layout gap)
    └── Card (--space-section gap)
        └── CardBody (--space-inner internal padding)
            └── InputField, Button, Badge (--space-tight internal gaps)
```

- Never put a Card inside a Card more than 1 level deep
- Never put a Modal inside a Modal — use multi-step Modal instead
- Never use a Table inside a Card — Tables are page-level, not card-level
- Toolbar always sits directly above the content it controls — never inside a Card

#### Input + Button Group

When pairing an InputField with a Button in the same row:

```tsx
<div className="flex items-center gap-2">
  <InputField label="API Key" className="flex-1" />
  <Button size="sm" className="mt-[18px]">Save</Button>  {/* offset for label height */}
</div>
```

Height alignment:
- Input `md` (42px) + Button `sm` (36px) → Button needs `self-end` to bottom-align
- Input `md` (42px) + Button `md` (42px) → natural alignment

#### Button Group Rules

- Primary button always last (rightmost)
- Secondary/ghost button always before primary
- Max 2 buttons in a footer group — use Popover for additional actions
- Never stack buttons vertically unless on mobile

#### Card Inside Grid

```tsx
// Correct — card grid with proper gap
<div className="grid grid-cols-4 gap-[var(--space-section)]">
  <Card />
  <Card />
</div>
```

- Cards in a grid must have equal height via `h-full` or `grid` stretch
- Card min-width: 240px — never allow cards to collapse below this

---

### 3.8 Motion System

Trustabl uses a minimal motion approach — transitions for state changes, intentional animations for entry/exit.

#### Transition Tokens

```css
--duration-fast:   100ms;   /* micro-interactions: checkbox, toggle */
--duration-base:   150ms;   /* standard: hover, focus, color changes */
--duration-slow:   250ms;   /* layout: sidebar collapse, drawer open */
--duration-enter:  200ms;   /* component entering: modal, dropdown open */
--duration-exit:   150ms;   /* component exiting: modal, dropdown close */

--ease-default: ease;
--ease-enter:   cubic-bezier(0.2, 0, 0, 1);    /* decelerate — feels like landing */
--ease-exit:    cubic-bezier(0.4, 0, 1, 1);    /* accelerate — feels like leaving */
```

> These are already defined in `globals.css` (section 1.5). Do not redefine.

#### State Change Transitions (Always on)

| Property | Duration | Easing | Elements |
|---|---|---|---|
| `background-color` | `--duration-base` | `--ease-default` | Buttons, cards, nav items |
| `border-color` | `--duration-base` | `--ease-default` | Inputs, dropdowns |
| `color` | `--duration-base` | `--ease-default` | Text, icons |
| `opacity` | `--duration-fast` | `--ease-default` | Disabled states |
| `width` | `--duration-slow` | `--ease-default` | Sidebar collapse |

```css
/* Apply globally in Tailwind */
transition-[background,border-color,color] duration-150 ease
```

#### Entry / Exit Animations

| Component | Enter | Exit |
|---|---|---|
| Modal | Fade in + scale from 95% → 100% | Fade out |
| Dropdown/Popover | Fade in + translate-y -4px → 0 | Fade out |
| Toast | Slide in from bottom-right | Fade out |
| Sidebar collapse | Width transition `250ms ease` | — |
| Skeleton | Shimmer loop `1.5s linear infinite` | Instant remove |

```tsx
// Modal entry/exit with Tailwind (use data-state or class toggling)
// Enter: opacity-0 scale-95 → opacity-100 scale-100
// Exit:  opacity-100 → opacity-0

// Dropdown entry
// Enter: opacity-0 -translate-y-1 → opacity-100 translate-y-0
```

#### Rules

- Never animate layout properties (`width`, `height`) unless for intentional UI transitions (sidebar)
- Never animate on page load — no entrance animations for static content
- Respect `prefers-reduced-motion` — disable all animations when set:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- AI agents: always apply `transition-[background,border-color,color] duration-150 ease` to interactive elements. Never use `transition-all` — it is too broad and causes janky animations.

---

## 3.9 Accessibility

Accessibility is non-negotiable. This section defines the rules that ensure Trustabl works for all users and passes automated audits.

### Contrast Ratios

All text and interactive elements must meet **WCAG AA minimum** (4.5:1 for text, 3:1 for UI components).

| Token Pair | Contrast | Passes |
|---|---|---|
| `--color-text-primary` on `--color-bg-page` | ~12.5:1 | ✅ AAA |
| `--color-text-secondary` on `--color-bg-page` | ~5.8:1 | ✅ AA |
| `--color-text-tertiary` on `--color-bg-page` | ~3.1:1 | ✅ UI only |
| `--color-accent-default` on `--color-bg-page` | ~7.2:1 | ✅ AA |
| `--color-danger-text` on `--color-bg-page` | ~6.8:1 | ✅ AA |
| `--color-success-text` on `--color-bg-page` | ~9.0:1 | ✅ AAA |
| `--color-warning-text` on `--color-bg-page` | ~9.8:1 | ✅ AAA |
| `--color-text-primary` on `--color-accent-default` | ~7.2:1 | ✅ AA |

**Rule:** Never use `--color-text-tertiary` for body text — only for placeholders, metadata, and decorative labels.

---

### Keyboard Navigation

Every interactive component must be fully operable via keyboard.

| Component | Keys |
|---|---|
| Button | `Tab` to focus, `Enter` or `Space` to activate |
| InputField | `Tab` to focus, type to fill |
| Dropdown | `Tab` to focus, `Enter`/`Space` to open, `↑↓` to navigate, `Enter` to select, `Esc` to close |
| Modal | `Tab` cycles focus within modal, `Esc` to close, focus trapped inside |
| Toggle | `Tab` to focus, `Space` to toggle |
| Checkbox | `Tab` to focus, `Space` to check/uncheck |
| Radio | `Tab` to focus group, `↑↓` or `←→` to select within group |
| Tabs | `Tab` to reach tab list, `←→` to switch tabs |
| NavItem | `Tab` to focus, `Enter` to activate |
| Tooltip | Appears on focus (keyboard) and hover (mouse) |
| Popover | `Tab` to trigger, `Enter`/`Space` to open, `Esc` to close |

---

### Focus Management

- **Focus ring:** Always visible on keyboard navigation. Never `outline: none` without a custom replacement.
- **Focus indicator:** Use `--color-border-focus` as the focus outline color. 2px solid, 2px offset.
- **Modal:** On open, move focus to first focusable element inside. On close, return focus to the trigger.
- **Dropdown:** On open, move focus to the menu. On close, return focus to the trigger.
- **Popover:** Same as Dropdown.
- **Toast:** Does not receive focus — it is non-interactive.
- **Skeleton:** Not focusable — it is decorative.

```css
/* Standard focus ring — apply to all interactive elements */
:focus-visible {
  outline: 2px solid var(--color-border-focus);
  outline-offset: 2px;
}
```

---

### ARIA Patterns

| Component | Required ARIA |
|---|---|
| Button (icon-only) | `aria-label="Action name"` |
| InputField | `aria-label` or `<label>` linked via `htmlFor` |
| InputField (error) | `aria-invalid="true"`, `aria-describedby` pointing to error message |
| Dropdown | `aria-expanded`, `aria-haspopup="menu"` |
| Modal | `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title |
| Toast | `role="status"`, `aria-live="polite"` |
| Alert | `role="alert"`, `aria-live="assertive"` |
| Toggle | `role="switch"`, `aria-checked` |
| Tabs | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` |
| NavItem | `aria-current="page"` on active item |
| Skeleton | `aria-hidden="true"` |
| ProgressBar | `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Spinner | `role="status"`, `aria-label="Loading"` |

---

### AI Agent Rules for Accessibility

- Always include `aria-label` on icon-only Buttons — never leave them unlabeled
- Always link InputField labels using `htmlFor` — never use placeholder as the only label
- Never remove focus styles — if design requires custom focus, implement it properly
- Always set `aria-invalid` and `aria-describedby` when showing an error state on InputField
- Modal focus trap is required — never let keyboard focus escape an open modal
- Toast must use `aria-live="polite"` — never `assertive` (too disruptive)
- Alert must use `aria-live="assertive"` — it requires immediate attention

---


---

## 4. Components

#### Naming
- Components use **PascalCase**: `Button`, `InputField`, `ComponentCard`
- Variants use **kebab-case** in tokens, **camelCase** in props: `variant="danger"`
- Files follow component name: `Button.tsx`, `InputField.tsx`

#### Doc Format
Every component is documented with: **Purpose**, **Do not use when**, **Props table**, **States**, **Code**, **Usage**.

---

## 3.8 Interaction States

Every interactive component has defined states. This section maps exact token values to each state so there is no ambiguity for devs or AI agents.

### State Timing

| Interaction | Duration | Easing |
|---|---|---|
| Hover | Immediate | — |
| Focus | Immediate | — |
| Active/Press | Immediate | — |
| Loading spinner | Continuous | `linear` |
| Transition (bg, border, color) | `150ms` | `ease` |

---

### Button States

| State | Background | Border | Text | Other |
|---|---|---|---|---|
| **Default — primary** | `--color-accent-default` | none | `--color-bg-page` | — |
| **Hover — primary** | `--color-accent-hover` | none | `--color-bg-page` | — |
| **Active — primary** | `--color-accent-active` | none | `--color-bg-page` | — |
| **Default — secondary** | `--color-bg-raised` | `--color-border-muted` | `--color-text-primary` | — |
| **Hover — secondary** | `--color-bg-overlay` | `--color-border-focus` | `--color-text-primary` | — |
| **Default — ghost** | transparent | `--color-border-muted` | `--color-text-primary` | — |
| **Hover — ghost** | `--color-bg-surface` | `--color-border-focus` | `--color-text-primary` | — |
| **Default — danger** | `--color-danger-bg` | `--color-danger-border` | `--color-danger-text` | — |
| **Hover — danger** | `--color-danger-hover` | `--color-danger-border` | `--color-danger-text` | — |
| **Default — text** | transparent | none | `--color-text-secondary` | — |
| **Hover — text** | `--color-bg-surface` | none | `--color-text-primary` | — |
| **Disabled — text** | transparent | none | `--color-text-secondary` | `opacity: 40%` |
| **Loading — all** | same as default | same as default | same as default | Spinner shown, `cursor: not-allowed` |
| **Focus — all** | same as hover | `--color-border-focus` | same as hover | 2px outline offset |

---

### InputField States

| State | Background | Border | Text | Other |
|---|---|---|---|---|
| **Default** | `--color-bg-surface` | `--color-border-muted` | — | Placeholder: `--color-text-tertiary` |
| **Focus** | `--color-bg-surface` | `--color-border-muted` | `--color-text-primary` | 2px outline `--color-border-focus`, 2px offset |
| **Filled** | `--color-bg-surface` | `--color-border-muted` | `--color-text-primary` | — |
| **Error** | `--color-bg-surface` | `--color-danger-text` | `--color-text-primary` | Error msg below: `--color-danger-text` |
| **Disabled** | `--color-bg-surface` | `--color-border-muted` | `--color-text-disabled` | `opacity: 40%`, `cursor: not-allowed` |

---

### Dropdown States

| State | Background | Border | Other |
|---|---|---|---|
| **Closed — default** | `--color-bg-surface` | `--color-border-muted` | Chevron: `--color-text-tertiary` |
| **Closed — hover** | `--color-bg-surface` | `--color-border-focus` | — |
| **Open** | `--color-bg-surface` | `--color-text-primary` | Chevron flips, menu appears |
| **Disabled** | `--color-bg-surface` | `--color-border-muted` | `opacity: 40%`, `cursor: not-allowed` |
| **Menu item — default** | transparent | — | — |
| **Menu item — hover** | `--color-bg-raised` | — | — |
| **Menu item — selected** | transparent | — | Checkmark shown |

---

### Toggle States

| State | Track | Thumb | Other |
|---|---|---|---|
| **Off** | `--color-border-muted` | `--color-text-primary` | Thumb left |
| **On** | `--color-text-primary` | `--color-bg-page` | Thumb right |
| **Disabled** | same as state | same as state | `opacity: 40%`, `cursor: not-allowed` |

---

### Checkbox States

| State | Background | Border | Other |
|---|---|---|---|
| **Unchecked** | transparent | `--color-border-focus` | — |
| **Checked** | `--color-text-primary` | `--color-text-primary` | Checkmark: `--color-bg-page` |
| **Indeterminate** | `--color-text-primary` | `--color-text-primary` | Dash: `--color-bg-page` |
| **Disabled** | same as state | same as state | `opacity: 40%` |

---

### Radio States

| State | Background | Border | Other |
|---|---|---|---|
| **Unselected** | transparent | `--color-border-focus` | — |
| **Selected** | `--color-text-primary` | `--color-text-primary` | Dot: `--color-bg-page` |
| **Disabled** | same as state | same as state | `opacity: 40%` |

---

### Card States

| State | Background | Border | Other |
|---|---|---|---|
| **Default** | `--color-bg-surface` | `--color-border-muted` | — |
| **Hover (interactive only)** | `--color-bg-overlay` | `--color-border-focus` | `transition: 150ms ease` |

---

### NavItem States

| State | Background | Border | Text | Other |
|---|---|---|---|---|
| **Default** | transparent | none | `--color-text-tertiary` | — |
| **Hover** | `--color-bg-surface` | none | `--color-text-secondary` | — |
| **Active** | `--color-bg-raised` | `--color-border-muted` | `--color-text-primary` | — |
| **Disabled** | transparent | none | `--color-text-tertiary` | `opacity: 40%` |

---

### Tab States

| State | Text | Border/Indicator | Other |
|---|---|---|---|
| **Default** | `--color-text-tertiary` | none | — |
| **Hover** | `--color-text-secondary` | none | — |
| **Active** | `--color-text-primary` | `--color-text-primary` 2px | — |
| **Disabled** | `--color-text-tertiary` | none | `opacity: 40%` |

---

### 3.8 General Interaction Rules

- `transition: 150ms ease` applies to `background`, `border-color`, and `color` on all interactive elements
- `opacity: 40%` is the standard disabled treatment — never change background or border for disabled
- `cursor: not-allowed` always accompanies disabled state
- Focus state must always be visually distinct — never remove focus styling
- Loading state always disables interaction — treat as disabled visually

---

## 4. Components

### 4.0 Conventions

**Naming:** PascalCase for components (`Button`, `InputField`). Variants use camelCase in props (`variant="danger"`). Files match component name (`Button.tsx`).

**Each component is documented with:** Purpose · Do not use when · Props · Sizes & Specs · States · Code · Usage

---

### 4.1 Core Components (Priority Order)

#### Button

**Purpose:** Triggers an action or event.  
**Do not use when:** Navigating to a URL — use a `Link` instead.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `primary` \| `secondary` \| `ghost` \| `danger` \| `text` | `primary` | Visual style |
| `size` | `sm` \| `md` \| `lg` | `md` | `sm` = h-[36px] px-3, `md` = h-[42px] px-4, `lg` = h-[46px] px-5 |
| `disabled` | `boolean` | `false` | Disables interaction |
| `loading` | `boolean` | `false` | Shows loading spinner, disables interaction |
| `icon` | `LucideIcon` | `undefined` | Lucide icon displayed on the left |
| `iconOnly` | `boolean` | `false` | Renders square icon-only button, inherits variant |

**States:** Default, Hover, Focus, Active, Disabled, Loading  
**Notes:** `loading` and `disabled` are mutually exclusive. AI agents should use `variant="primary"` for the single primary CTA per surface only.

```tsx
// components/ui/Button.tsx
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'text'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  icon?: React.ElementType
  iconOnly?: boolean
  children?: React.ReactNode
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:   'bg-[var(--color-accent-default)] text-[var(--color-bg-page)] hover:bg-[var(--color-accent-hover)] active:bg-[var(--color-accent-active)]',
  secondary: 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)] hover:bg-[var(--color-bg-overlay)] hover:border-[var(--color-border-focus)]',
  ghost:     'bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-muted)] hover:bg-[var(--color-bg-surface)] hover:border-[var(--color-border-focus)]',
  danger:    'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)] border border-[var(--color-danger-border)] hover:bg-[var(--color-danger-hover)]',
  text:      'bg-transparent text-[var(--color-text-secondary)] border-none hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-[36px] px-3 text-xs',
  md: 'h-[42px] px-4 text-sm',
  lg: 'h-[46px] px-5 text-sm',
}

const iconOnlySizeStyles: Record<ButtonSize, string> = {
  sm: 'w-[36px] h-[36px] p-0',
  md: 'w-[42px] h-[42px] p-0',
  lg: 'w-[46px] h-[46px] p-0',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon: Icon,
  iconOnly = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={[
        'inline-flex items-center justify-center gap-[var(--space-tight)] rounded-[var(--radius-base)] font-medium',
        'transition-[background,border-color,color] duration-150 ease',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        variantStyles[variant],
        iconOnly ? iconOnlySizeStyles[size] : sizeStyles[size],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" aria-hidden="true" />
      ) : Icon ? (
        <Icon size={16} aria-hidden="true" />
      ) : null}
      {loading && <span className="sr-only">Loading</span>}
      {!iconOnly && children}
    </button>
  )
}
```

**Usage:**
```tsx
// Primary
<Button>Publish</Button>

// With icon
<Button icon={Plus}>New Component</Button>

// Icon only
<Button icon={Trash2} iconOnly variant="danger" aria-label="Delete component" />

// Loading
<Button loading>Saving...</Button>

// Secondary sm
<Button variant="secondary" size="sm">View</Button>
```

---

#### InputField

**Purpose:** Accepts user text input.  
**Do not use when:** Selecting from a predefined list — use `Select`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | required | Field label |
| `placeholder` | `string` | `""` | Placeholder text |
| `type` | `text` \| `password` \| `email` \| `number` | `text` | Input type |
| `error` | `string` | `undefined` | Error message |
| `hint` | `string` | `undefined` | Hint text below input |
| `required` | `boolean` | `false` | Shows `*` next to label |
| `optional` | `boolean` | `false` | Shows `(optional)` next to label |
| `disabled` | `boolean` | `false` | Disables interaction |
| `iconLeft` | `LucideIcon` | `undefined` | Lucide icon on the left |
| `iconRight` | `LucideIcon` | `undefined` | Lucide icon on the right |

**Sizes:** `md` = h-[42px] px-3, `lg` = h-[46px] px-3 — always matches Dropdown height.
**States:** Default, Focus, Filled, Error, Disabled
**Notes:** Always include a `label`. Never use `placeholder` as the only label — it disappears on input.

```tsx
// components/ui/InputField.tsx
import { AlertCircle } from 'lucide-react'
import { useId } from 'react'

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  required?: boolean
  optional?: boolean
  iconLeft?: React.ElementType
  iconRight?: React.ElementType
}

export function InputField({
  label,
  error,
  hint,
  required,
  optional,
  iconLeft: IconLeft,
  iconRight: IconRight,
  disabled,
  className,
  ...props
}: InputFieldProps) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`

  return (
    <div className="flex flex-col gap-[var(--space-tight)]">
      {/* Label */}
      <label htmlFor={id} className="text-xs font-medium text-[var(--color-text-primary)]">
        {label}
        {required && <span className="text-[var(--color-danger-text)] ml-0.5">*</span>}
        {optional && <span className="text-[var(--color-text-tertiary)] font-normal ml-1 text-[11px]">(optional)</span>}
      </label>

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {IconLeft && (
          <IconLeft
            size={16}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none"
          />
        )}
        <input
          id={id}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={[error ? errorId : '', hint ? hintId : ''].filter(Boolean).join(' ') || undefined}
          className={[
            'h-[42px] w-full rounded-[var(--radius-sharp)] border bg-[var(--color-bg-surface)]',
            'px-3 text-sm text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-tertiary)]',
            'outline-none transition-[border-color] duration-150 ease',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            error
              ? 'border-[var(--color-danger-text)]'
              : 'border-[var(--color-border-muted)]',
            IconLeft ? 'pl-9' : '',
            IconRight ? 'pr-9' : '',
            className,
          ].filter(Boolean).join(' ')}
          {...props}
        />
        {IconRight && (
          <IconRight
            size={16}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)] pointer-events-none"
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p id={errorId} className="flex items-center gap-1 text-[11px] text-[var(--color-danger-text)]">
          <AlertCircle size={12} />
          {error}
        </p>
      )}

      {/* Hint */}
      {hint && !error && (
        <p id={hintId} className="text-[11px] text-[var(--color-text-tertiary)]">
          {hint}
        </p>
      )}
    </div>
  )
}
```

**Usage:**
```tsx
// Basic
<InputField label="API Key" placeholder="sk-ant-api03-••••" required />

// With error
<InputField
  label="Email"
  type="email"
  defaultValue="zane@#!"
  error="Enter a valid email address."
  required
/>

// With icons
<InputField label="Search" iconLeft={Search} placeholder="Search components..." />
<InputField label="Password" type="password" iconRight={Eye} required />

// Optional field
<InputField label="Bio" optional placeholder="Tell us about yourself" />

// With hint
<InputField
  label="Password"
  type="password"
  hint="Use at least 8 characters with a number."
  required
/>
```

---

#### Card

**Purpose:** Groups related content into a contained surface.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `default` \| `interactive` | `default` | Visual style |
| `icon` | `LucideIcon` | `undefined` | Optional icon in top left |
| `actions` | `ReactNode[]` | `undefined` | Configurable action buttons shown on hover |

**Structure:** Header · Body · Footer — all slots optional.
**Sizes:** radius = `--radius-card` (15px), header/footer = px-4 py-3, body = p-4, border = `--color-border-muted`.
**Notes:** Do not nest cards more than one level deep. Interactive variant adds hover state — only use for clickable cards.

```tsx
// components/ui/Card.tsx
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
  return (
    <div
      onClick={onClick}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.() } } : undefined}
      className={[
        'rounded-[var(--radius-card)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] overflow-hidden flex flex-col',
        isInteractive
          ? 'cursor-pointer transition-[border-color,background] duration-150 hover:border-[var(--color-border-focus)] hover:bg-[var(--color-bg-overlay)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]'
          : '',
        className,
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={['flex items-center justify-between px-4 py-3 border-b border-[var(--color-border-muted)]', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function CardBody({ children, className }: CardBodyProps) {
  return (
    <div className={['p-4 text-sm text-[var(--color-text-secondary)] flex-1', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={['flex items-center justify-between px-4 py-3 border-t border-[var(--color-border-muted)]', className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
```

**Usage:**
```tsx
<Card variant="interactive" onClick={() => router.push('/component/api-gateway')}>
  <CardHeader>
    <span className="text-sm font-medium text-[var(--color-text-primary)]">API Gateway</span>
    <Badge variant="info">Active</Badge>
  </CardHeader>
  <CardBody>Routes requests to the appropriate agent component.</CardBody>
  <CardFooter>
    <span className="text-[11px] text-[var(--color-text-tertiary)]">2h ago</span>
    <Button variant="ghost" size="sm">View</Button>
  </CardFooter>
</Card>
```

---

#### ProgressBar

**Purpose:** Displays progress of a task or quota usage.

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` (0-100) | required | Progress percentage |
| `label` | `string` | `undefined` | Optional label above bar |
| `showValue` | `boolean` | `false` | Shows percentage value |

**Sizes:** h-[6px] fixed, radius = `--radius-pill`. Track = `--color-border-muted`, fill = `--color-text-primary`. Single color only — no semantic variants.

```tsx
// components/ui/ProgressBar.tsx
interface ProgressBarProps {
  value: number
  label?: string
  showValue?: boolean
  className?: string
}

export function ProgressBar({ value, label, showValue, className }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value))

  return (
    <div className={['flex flex-col gap-[var(--space-inner)]', className].filter(Boolean).join(' ')}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>}
          {showValue && <span className="text-xs text-[var(--color-text-primary)]">{clampedValue}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className="h-[6px] w-full rounded-[var(--radius-pill)] bg-[var(--color-border-muted)] overflow-hidden"
      >
        <div
          className="h-full rounded-[var(--radius-pill)] bg-[var(--color-text-primary)] transition-[width] duration-300"
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  )
}
```

**Usage:**
```tsx
<ProgressBar value={65} label="Storage used" showValue />
<ProgressBar value={100} label="Complete" />
```

---

#### Spinner

**Purpose:** Indicates a loading or processing state.

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `sm` \| `md` | `md` | Size of the spinner |

**Sizes:** `sm` = w-[14px] h-[14px] border-2 (inside buttons), `md` = w-[20px] h-[20px] border-2 (standalone). Track = `--color-border-muted`, arc = `--color-text-primary`. Animation: spin 0.7s linear.

```tsx
// components/ui/Spinner.tsx
interface SpinnerProps {
  size?: 'sm' | 'md'
  className?: string
}

const sizeStyles = {
  sm: 'w-[14px] h-[14px] border-2',
  md: 'w-[20px] h-[20px] border-2',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={[
        'rounded-[var(--radius-pill)] border-[var(--color-border-muted)] border-t-[var(--color-text-primary)] animate-spin',
        sizeStyles[size],
        className,
      ].filter(Boolean).join(' ')}
    />
  )
}
```

**Usage:**
```tsx
<Spinner />
<Spinner size="sm" />
```

---

#### Radio

**Purpose:** Allows selection of a single option from a group. Always group with same `name` prop.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Selected state |
| `onChange` | `function` | required | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | `undefined` | Optional label beside radio |
| `value` | `string` | required | Value of the radio option |
| `name` | `string` | required | Group name for radio buttons |

**Sizes:** w-4 h-4, radius = `--radius-pill`. Inner dot: 6px. Unselected: transparent + `--color-border-focus` border. Selected: `--color-text-primary` fill + dot = `--color-bg-page`.

```tsx
// components/ui/Radio.tsx
import { useId } from 'react'

interface RadioProps {
  value: string
  name: string
  checked: boolean
  onChange: (value: string) => void
  label?: string
  disabled?: boolean
}

export function Radio({ value, name, checked, onChange, label, disabled }: RadioProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={[
        'flex items-center gap-2.5 cursor-pointer',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="relative flex items-center justify-center">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <div className={[
          'w-4 h-4 rounded-full border transition-[background,border-color] duration-150',
          checked
            ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]'
            : 'bg-transparent border-[var(--color-border-focus)]',
        ].join(' ')}>
          {checked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-bg-page)]" />
            </div>
          )}
        </div>
      </div>
      {label && <span className="text-sm text-[var(--color-text-primary)]">{label}</span>}
    </label>
  )
}
```

**Usage:**
```tsx
const [platform, setPlatform] = useState('langflow')

<Radio name="platform" value="langflow" checked={platform === 'langflow'} onChange={setPlatform} label="Langflow" />
<Radio name="platform" value="autogen" checked={platform === 'autogen'} onChange={setPlatform} label="Autogen" />
```

---

#### Checkbox

**Purpose:** Allows selection of one or more items from a list. Use indeterminate when only some children are selected.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Partial selection state |
| `onChange` | `function` | required | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | `undefined` | Optional label beside checkbox |

**Sizes:** w-4 h-4, radius = rounded-[4px]. Checkmark: 9px stroke-2.5. Unchecked: transparent + `--color-border-focus`. Checked/indeterminate: `--color-text-primary` fill, icon = `--color-bg-page`.

```tsx
// components/ui/Checkbox.tsx
'use client'
import { Check, Minus } from 'lucide-react'
import { useId, useEffect, useRef } from 'react'

interface CheckboxProps {
  checked: boolean
  indeterminate?: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Checkbox({ checked, indeterminate, onChange, label, disabled }: CheckboxProps) {
  const id = useId()
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])

  return (
    <label
      htmlFor={id}
      className={[
        'flex items-center gap-2.5 cursor-pointer',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={[
          'w-4 h-4 rounded-[4px] border flex items-center justify-center transition-[background,border-color] duration-150',
          checked || indeterminate
            ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]'
            : 'bg-transparent border-[var(--color-border-focus)]',
        ].join(' ')}>
          {indeterminate
            ? <Minus size={9} strokeWidth={2.5} className="text-[var(--color-bg-page)]" />
            : checked
            ? <Check size={9} strokeWidth={2.5} className="text-[var(--color-bg-page)]" />
            : null}
        </div>
      </div>
      {label && <span className="text-sm text-[var(--color-text-primary)]">{label}</span>}
    </label>
  )
}
```

**Usage:**
```tsx
<Checkbox checked={checked} onChange={setChecked} label="Select all" />
<Checkbox checked={someChecked} indeterminate={!allChecked && someChecked} onChange={handleSelectAll} />
```

---

#### Toggle

**Purpose:** Switches a setting or feature on or off. For binary on/off only — use Radio for multiple options.

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | `false` | On/off state |
| `onChange` | `function` | required | Change handler |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | `undefined` | Optional label beside toggle |

**Sizes:** Track: w-9 h-5. Thumb: w-3.5 h-3.5, top-[3px]. Off: thumb left-[3px], track = `--color-border-muted`. On: thumb left-[18px] bg = `--color-bg-page`, track = `--color-text-primary`.

```tsx
// components/ui/Toggle.tsx
import { useId } from 'react'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, label, disabled }: ToggleProps) {
  const id = useId()

  return (
    <label
      htmlFor={id}
      className={[
        'flex items-center gap-2.5 cursor-pointer',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].filter(Boolean).join(' ')}
    >
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div className={[
          'w-9 h-5 rounded-full transition-[background] duration-150',
          checked
            ? 'bg-[var(--color-text-primary)]'
            : 'bg-[var(--color-border-muted)] border border-[var(--color-border-focus)]',
        ].join(' ')}>
          <div className={[
            'absolute top-[3px] w-3.5 h-3.5 rounded-full transition-[left] duration-150',
            checked
              ? 'left-[18px] bg-[var(--color-bg-page)]'
              : 'left-[3px] bg-[var(--color-text-primary)]',
          ].join(' ')} />
        </div>
      </div>
      {label && <span className="text-sm text-[var(--color-text-primary)]">{label}</span>}
    </label>
  )
}
```

**Usage:**
```tsx
<Toggle checked={enabled} onChange={setEnabled} label="Email notifications" />
<Toggle checked={isPublic} onChange={setIsPublic} label="Public profile" />
```



---

#### Dropdown

**Purpose:** Allows selection from a list of options. Available as single select or multi-select.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `single` \| `multi` | `single` | Selection mode |
| `options` | `{ label: string, value: string }[]` | required | List of options |
| `value` | `string \| string[]` | `undefined` | Selected value(s) |
| `onChange` | `function` | required | Change handler |
| `placeholder` | `string` | `""` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables interaction |
| `label` | `string` | `undefined` | Optional label above dropdown |

**Specs:**
- Trigger height: `md` = 42px, `lg` = 46px — matches InputField sizes
- Trigger padding: `--space-base` (16px) horizontal
- Menu item padding: 12px all sides
- Trigger radius: `--radius-sharp`
- Menu radius: 10px
- Menu bg: `--color-bg-overlay`
- Menu shadow: `--shadow-float`
- Menu item hover: `--color-bg-raised`

**Multi-select:**
- Selected values shown as removable tags inside trigger
- Tags use `--color-bg-raised` bg, `--color-border-focus` border

**Sizes:** Trigger: h-[42px] (md) / h-[46px] (lg), px-3, radius = `--radius-sharp` (8px). Menu: radius = `--radius-base` (10px approx), max-h-[300px] overflow-y-auto. Menu item: px-3 py-3 text-sm.
**States:** Default, Open, Selected, Disabled
**Notes:** Single select for one choice, multi-select for multiple. Always include a label.

```tsx
// components/ui/Dropdown.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Check, X } from 'lucide-react'

interface Option { label: string; value: string }

interface DropdownProps {
  options: Option[]
  value?: string | string[]
  onChange: (value: string | string[]) => void
  type?: 'single' | 'multi'
  placeholder?: string
  label?: string
  disabled?: boolean
}

export function Dropdown({
  options, value, onChange, type = 'single',
  placeholder = 'Select...', label, disabled,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const selected = type === 'multi'
    ? (value as string[] ?? [])
    : (value as string ?? null)

  const handleSelect = (val: string) => {
    if (type === 'multi') {
      const arr = selected as string[]
      onChange(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val])
    } else {
      onChange(val)
      setOpen(false)
    }
  }

  const selectedLabels = type === 'multi'
    ? options.filter(o => (selected as string[]).includes(o.value))
    : options.find(o => o.value === selected)

  return (
    <div className="flex flex-col gap-1.5">
      {label && <span className="text-xs font-medium text-[var(--color-text-primary)]">{label}</span>}
      <div ref={ref} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-haspopup="menu"
          className={[
            'flex items-center gap-2 w-full h-[42px] px-3 rounded-[var(--radius-sharp)] border text-sm',
            'bg-[var(--color-bg-surface)] transition-[border-color] duration-150',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]',
            'disabled:opacity-40 disabled:cursor-not-allowed',
            open
              ? 'border-[var(--color-text-primary)]'
              : 'border-[var(--color-border-muted)]',
          ].join(' ')}
        >
          {type === 'multi' && (selected as string[]).length > 0 ? (
            <div className="flex flex-wrap gap-1 flex-1 min-w-0">
              {(selectedLabels as Option[]).map(o => (
                <span key={o.value} className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-bg-raised)] border border-[var(--color-border-focus)] text-xs text-[var(--color-text-primary)]">
                  {o.label}
                  <X size={10} onClick={(e) => { e.stopPropagation(); handleSelect(o.value) }} className="cursor-pointer" />
                </span>
              ))}
            </div>
          ) : (
            <span className={['flex-1 text-left truncate', !selected || (Array.isArray(selected) && selected.length === 0) ? 'text-[var(--color-text-tertiary)]' : 'text-[var(--color-text-primary)]'].join(' ')}>
              {Array.isArray(selectedLabels) || !selectedLabels ? placeholder : (selectedLabels as Option).label}
            </span>
          )}
          {open ? <ChevronUp size={16} className="text-[var(--color-text-tertiary)] flex-shrink-0" /> : <ChevronDown size={16} className="text-[var(--color-text-tertiary)] flex-shrink-0" />}
        </button>

        {open && (
          <ul
            role="menu"
            className="absolute w-full mt-1 rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-overlay)] shadow-[var(--shadow-float)] overflow-y-auto max-h-[300px]"
          style={{ zIndex: 'var(--z-dropdown)' }}
          >
            {options.map(option => {
              const isSelected = type === 'multi'
                ? (selected as string[]).includes(option.value)
                : selected === option.value
              return (
                <li
                  key={option.value}
                  role={type === 'multi' ? 'menuitemcheckbox' : 'menuitemradio'}
                  aria-checked={isSelected}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center justify-between px-3 py-3 text-sm text-[var(--color-text-primary)] cursor-pointer hover:bg-[var(--color-bg-raised)] transition-[background] duration-150"
                >
                  {type === 'multi' && (
                    <div className={['w-4 h-4 rounded-[4px] border flex items-center justify-center mr-2.5 flex-shrink-0', isSelected ? 'bg-[var(--color-text-primary)] border-[var(--color-text-primary)]' : 'border-[var(--color-border-focus)]'].join(' ')}>
                      {isSelected && <Check size={9} strokeWidth={2.5} className="text-[var(--color-bg-page)]" />}
                    </div>
                  )}
                  <span className="flex-1">{option.label}</span>
                  {type === 'single' && isSelected && <Check size={16} className="text-[var(--color-text-primary)]" />}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
```

**Usage:**
```tsx
// Single
<Dropdown label="Platform" options={platforms} value={platform} onChange={setPlatform} />

// Multi
<Dropdown type="multi" label="Tags" options={tags} value={selectedTags} onChange={setSelectedTags} />
```

---

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `underline` \| `pill` | `underline` | Tab style |
| `tabs` | `{ label, value, icon?, badge?, disabled? }[]` | required | Tab items |
| `value` | `string` | required | Active tab value |
| `onChange` | `function` | required | Change handler |

**Variants:**
- `underline` — horizontal list with bottom border indicator, height 40px
- `pill` — contained pill group, height 32px

**Content options per tab:**
- Icon + Badge + Label
- Icon + Label
- Label only

**Colors:**
- Active: `--color-text-primary`
- Inactive: `--color-text-tertiary`
- Underline active indicator: `--color-text-primary`, 2px
- Badge: pill shape, no bg on inactive, `--color-bg-raised` on active

**Notes:** Always use Lucide icons. Badge count should reflect real data. Disabled tabs are non-interactive at 40% opacity.

---

#### Tabs

**Purpose:** Switches between related views or sections. Use `underline` for page-level navigation, `pill` for in-page filtering.

**Sizes:** Underline tab: h-10 px-3.5, border-b-2. Pill container: p-1, radius = `--radius-base`. Pill tab: h-8 px-3.5, radius = `--radius-sharp`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `underline` \| `pill` | `underline` | Tab style |
| `tabs` | `{ label, value, icon?, badge?, disabled? }[]` | required | Tab items |
| `value` | `string` | required | Active tab value |
| `onChange` | `function` | required | Change handler |

```tsx
// components/ui/Tabs.tsx

interface Tab {
  label: string
  value: string
  icon?: React.ElementType
  badge?: number
  disabled?: boolean
}

interface TabsProps {
  tabs: Tab[]
  value: string
  onChange: (value: string) => void
  variant?: 'underline' | 'pill'
}

export function Tabs({ tabs, value, onChange, variant = 'underline' }: TabsProps) {
  if (variant === 'pill') {
    return (
      <div role="tablist" className="flex items-center gap-0.5 p-1 rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon
          const isActive = tab.value === value
          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              disabled={tab.disabled}
              onClick={() => onChange(tab.value)}
              className={[
                'flex items-center gap-1.5 h-8 px-3.5 rounded-[var(--radius-sharp)] text-sm font-medium',
                'transition-[background,color] duration-150',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                isActive
                  ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
                  : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]',
              ].filter(Boolean).join(' ')}
            >
              {Icon && <Icon size={14} />}
              {tab.label}
              {tab.badge !== undefined && (
                <span className={['text-[11px] font-medium px-1.5 py-0.5 rounded-full border', isActive ? 'text-[var(--color-text-primary)] bg-[var(--color-border-muted)] border-[var(--color-border-focus)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-surface)] border-[var(--color-border-muted)]'].join(' ')}>
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div role="tablist" className="flex items-center border-b border-[var(--color-border-muted)]">
      {tabs.map(tab => {
        const Icon = tab.icon
        const isActive = tab.value === value
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            disabled={tab.disabled}
            onClick={() => onChange(tab.value)}
            className={[
              'flex items-center gap-1.5 h-10 px-3.5 text-sm font-medium -mb-px',
              'border-b-2 transition-[color,border-color] duration-150',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              isActive
                ? 'text-[var(--color-text-primary)] border-[var(--color-text-primary)]'
                : 'text-[var(--color-text-tertiary)] border-transparent hover:text-[var(--color-text-secondary)]',
            ].filter(Boolean).join(' ')}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
            {tab.badge !== undefined && (
              <span className={['text-[11px] font-medium px-1.5 py-0.5 rounded-full border', isActive ? 'text-[var(--color-text-primary)] bg-[var(--color-border-muted)] border-[var(--color-border-focus)]' : 'text-[var(--color-text-secondary)] bg-[var(--color-bg-raised)] border-[var(--color-border-muted)]'].join(' ')}>
                {tab.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
```

**Usage:**
```tsx
const tabs = [
  { label: 'All', value: 'all', icon: List, badge: 374 },
  { label: 'Generated', value: 'generated', icon: Zap, badge: 138 },
  { label: 'Published', value: 'published', icon: Upload, badge: 201 },
  { label: 'Trash', value: 'trash', icon: Trash2, badge: 7, disabled: true },
]

<Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
<Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pill" />
```

---

#### Badge

**Purpose:** Displays a status, category, or count.

**Sizes:** `sm` = px-2 py-0.5 text-[11px], `md` = px-3 py-1 text-xs. Shape `pill` = rounded-full, `sharp` = rounded-[var(--radius-sharp)].

```tsx
// components/ui/Badge.tsx
type BadgeVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral'
type BadgeShape = 'pill' | 'sharp'
type BadgeSize = 'sm' | 'md'

interface BadgeProps {
  variant?: BadgeVariant
  shape?: BadgeShape
  size?: BadgeSize
  children: React.ReactNode
}

const variantStyles: Record<BadgeVariant, string> = {
  info:    'bg-[var(--color-info-bg)] text-[var(--color-info-text)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]',
  danger:  'bg-[var(--color-danger-bg)] text-[var(--color-danger-text)]',
  neutral: 'bg-[var(--color-neutral-bg)] text-[var(--color-neutral-text)] border border-[var(--color-border-muted)]',
}

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
}

export function Badge({ variant = 'neutral', shape = 'pill', size = 'md', children }: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center font-medium',
      shape === 'pill' ? 'rounded-[var(--radius-pill)]' : 'rounded-[var(--radius-sharp)]',
      variantStyles[variant],
      sizeStyles[size],
    ].join(' ')}>
      {children}
    </span>
  )
}
```

**Usage:**
```tsx
<Badge variant="info">Active</Badge>
<Badge variant="success" size="sm" shape="sharp">Published</Badge>
<Badge variant="danger">Error</Badge>
```

---

#### Avatar

**Purpose:** Represents a user visually — via icon, initials, or photo.

**Sizes:** `sm` = w-6 h-6 (24px) text-[9px], `md` = w-8 h-8 (32px) text-xs. Radius = `--radius-pill`. bg = `--color-bg-raised`, border = `--color-border-muted`. Initials: font-semibold. Photo: object-cover fill.

```tsx
// components/ui/Avatar.tsx
import { User } from 'lucide-react'
import Image from 'next/image'

interface AvatarProps {
  type?: 'icon' | 'initials' | 'photo'
  size?: 'sm' | 'md'
  initials?: string
  src?: string
  alt?: string
}

const sizeStyles = {
  sm: 'w-6 h-6 text-[9px]',
  md: 'w-8 h-8 text-xs',
}

const iconSize = { sm: 14, md: 18 }

export function Avatar({ type = 'icon', size = 'md', initials, src, alt }: AvatarProps) {
  const base = 'rounded-full bg-[var(--color-bg-raised)] border border-[var(--color-border-muted)] flex items-center justify-center overflow-hidden flex-shrink-0'

  if (type === 'photo' && src) {
    return (
      <div className={[base, sizeStyles[size], 'relative'].join(' ')}>
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          sizes={size === 'sm' ? '24px' : '32px'}
          className="object-cover rounded-full"
          onError={() => {}}
        />
      </div>
    )
  }

  if (type === 'initials' && initials) {
    return (
      <div className={[base, sizeStyles[size], 'font-semibold text-[var(--color-text-primary)]'].join(' ')}>
        {initials.slice(0, 2).toUpperCase()}
      </div>
    )
  }

  return (
    <div className={[base, sizeStyles[size]].join(' ')}>
      <User size={iconSize[size]} className="text-[var(--color-text-tertiary)]" />
    </div>
  )
}
```

**Usage:**
```tsx
<Avatar type="icon" />
<Avatar type="initials" initials="ZA" size="md" />
<Avatar type="photo" src="/avatar.jpg" alt="Zane Aldric" />
```

---

#### NavItem

**Purpose:** A single navigation item used inside sidebars or nav menus.

**Sizes:** h-9 (36px), px-3, gap-2.5, radius = `--radius-sharp` (8px), icon = 16px.

```tsx
// components/ui/NavItem.tsx

interface NavItemProps {
  label: string
  icon?: React.ElementType
  active?: boolean
  disabled?: boolean
  onClick: () => void
}

export function NavItem({ label, icon: Icon, active, disabled, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-current={active ? 'page' : undefined}
      className={[
        'flex items-center gap-2.5 h-9 w-full px-3 rounded-[var(--radius-sharp)] text-sm font-medium',
        'transition-[background,color] duration-150',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        active
          ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]'
          : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-secondary)]',
      ].filter(Boolean).join(' ')}
    >
      {Icon && <Icon size={16} />}
      {label}
    </button>
  )
}
```

**Usage:**
```tsx
<NavItem label="Trending" icon={TrendingUp} active onClick={() => router.push('/trending')} />
<NavItem label="Fresh Forks" icon={GitFork} onClick={() => router.push('/forks')} />
```

---

#### Divider

**Purpose:** Visually separates content.

**Sizes:** Horizontal = h-px w-full. Vertical = w-px h-6. Color = `--color-border-muted`.

```tsx
// components/ui/Divider.tsx
interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return <div className={['w-px h-6 bg-[var(--color-border-muted)] flex-shrink-0', className].filter(Boolean).join(' ')} />
  }
  return <hr className={['border-none h-px bg-[var(--color-border-muted)] w-full', className].filter(Boolean).join(' ')} />
}
```

**Usage:**
```tsx
<Divider />
<Divider orientation="vertical" />
```

---

#### Toast

**Purpose:** Short, auto-dismissing feedback after an action.

**Sizes:** px-4 py-3.5, radius = `--radius-base` (12px), max-w-[360px]. Auto-dismiss: 4000ms. Position: fixed bottom-6 right-6 z-[--z-toast].

```tsx
// components/ui/Toast.tsx
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
    if (duration === 0) return // duration=0 disables auto-dismiss (use in static previews)
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
      <button onClick={onDismiss} aria-label="Dismiss notification" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]">
        <X size={14} />
      </button>
    </div>
  )
}
```

**Usage:**
```tsx
// Typically used with a toast manager/context
<Toast message="Component published successfully." onDismiss={() => dismissToast(id)} />
```

---

#### Alert

**Purpose:** Inline persistent feedback that requires user attention.

**Sizes:** px-4 py-3.5, radius = `--radius-base` (12px), border-left 3px solid. Icon: 16px. Title: text-sm font-semibold. Description: text-xs.

**Dismissibility:** Close icon renders only when `onDismiss` is passed — it is not controlled by `variant`. Any variant can be dismissible or non-dismissible. In the ui-preview, always pass `onDismiss` on all 4 variants so the close icon is consistently visible across the set.

```tsx
// components/ui/Alert.tsx
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react'

type AlertVariant = 'info' | 'success' | 'warning' | 'danger'

interface AlertProps {
  variant?: AlertVariant
  title: string
  description?: string
  onDismiss?: () => void
}

const icons: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  danger: XCircle,
}

export function Alert({ variant = 'info', title, description, onDismiss }: AlertProps) {
  const Icon = icons[variant]

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-3 px-4 py-3.5 rounded-[var(--radius-base)] border-l-[3px] border-l-[var(--color-border-muted)] bg-[var(--color-bg-surface)] w-full"
    >
      <Icon size={16} className="text-[var(--color-text-primary)] flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</p>
        {description && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{description}</p>}
      </div>
      {onDismiss && (
        <button onClick={onDismiss} aria-label="Dismiss alert" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]">
          <X size={16} />
        </button>
      )}
    </div>
  )
}
```

**Usage:**
```tsx
// Dismissible alerts — all 4 variants with onDismiss (shows close icon)
<Alert title="API quota almost full" description="You've used 80% of your free tier." onDismiss={handleDismiss} />
<Alert variant="success" title="Component published" description="Now visible in the community catalog." onDismiss={handleDismiss} />
<Alert variant="danger" title="API key invalid" description="Generate a new key to continue." onDismiss={handleDismiss} />
<Alert variant="warning" title="Breaking change detected" description="This update may affect existing workflows." onDismiss={handleDismiss} />

// Non-dismissible alert — no onDismiss (no close icon rendered)
<Alert variant="danger" title="Build failed" description="Fix all errors before deploying." />
```

---

#### Tooltip

**Purpose:** Shows contextual information on hover. Triggered on hover and focus.

**Sizes:** px-2.5 py-1.5, radius = `--radius-sharp` (8px), text-xs font-medium. Arrow: 6px CSS triangle. bg = `--color-text-primary`, text = `--color-bg-page`.

```tsx
// components/ui/Tooltip.tsx
'use client'
import { useState } from 'react'

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

interface TooltipProps {
  content:   string
  position?: TooltipPosition
  children:  React.ReactNode
}

// Arrow is a CSS ::after pseudo-element integrated into the bubble.
// The arrow sits at the edge of the bubble closest to the trigger.
const wrapperStyles: Record<TooltipPosition, string> = {
  top:    'flex flex-col items-center gap-3',
  bottom: 'flex flex-col-reverse items-center gap-3',
  left:   'flex flex-row items-center gap-3',
  right:  'flex flex-row-reverse items-center gap-3',
}

const arrowStyles: Record<TooltipPosition, React.CSSProperties> = {
  top:    { position:'absolute', bottom:-5, left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderTop:'6px solid var(--color-text-primary)' },
  bottom: { position:'absolute', top:-5,   left:'50%', transform:'translateX(-50%)', width:0, height:0, borderLeft:'6px solid transparent', borderRight:'6px solid transparent', borderBottom:'6px solid var(--color-text-primary)' },
  left:   { position:'absolute', right:-5, top:'50%',  transform:'translateY(-50%)', width:0, height:0, borderTop:'6px solid transparent', borderBottom:'6px solid transparent', borderLeft:'6px solid var(--color-text-primary)' },
  right:  { position:'absolute', left:-5,  top:'50%',  transform:'translateY(-50%)', width:0, height:0, borderTop:'6px solid transparent', borderBottom:'6px solid transparent', borderRight:'6px solid var(--color-text-primary)' },
}

export function Tooltip({ content, position = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div
      className={['relative inline-flex', wrapperStyles[position]].join(' ')}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {visible && (
        <div
          role="tooltip"
          className="relative px-2.5 py-1.5 rounded-[var(--radius-sharp)] bg-[var(--color-text-primary)] text-[var(--color-bg-page)] text-xs font-medium whitespace-nowrap"
        >
          {content}
          <span style={arrowStyles[position]} aria-hidden="true" />
        </div>
      )}
      {children}
    </div>
  )
}
```

**Usage:**
```tsx
<Tooltip content="Delete this component" position="top">
  <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
</Tooltip>
```

---

#### Skeleton

**Purpose:** Placeholder loading state that mimics the shape of content before it loads.

**Sizes:** Line: h-[14px] (body), h-[11px] (caption). Circle: match avatar (24/32px). Rect: match card. Animation: shimmer 1.5s infinite.

```tsx
// components/ui/Skeleton.tsx
interface SkeletonProps {
  variant?: 'line' | 'circle' | 'rect'
  width?: string | number
  height?: string | number
  className?: string
}

export function Skeleton({ variant = 'line', width = '100%', height = 14, className }: SkeletonProps) {
  const radiusMap = {
    line: 'rounded-[var(--radius-sharp)]',
    circle: 'rounded-[var(--radius-pill)]',
    rect: 'rounded-[var(--radius-base)]',
  }

  return (
    <div
      aria-hidden="true"
      className={[
        'animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-[var(--color-bg-surface)] via-[var(--color-bg-raised)] to-[var(--color-bg-surface)] bg-[length:800px_100%]',
        radiusMap[variant],
        className,
      ].filter(Boolean).join(' ')}
      style={{ width, height }}
    />
  )
}
```

Add to `globals.css`:
```css
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
```

**Usage:**
```tsx
<Skeleton width="60%" height={14} />
<Skeleton variant="circle" width={32} height={32} />
<Skeleton variant="rect" width="100%" height={120} />
```

---

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `content` \| `menu` | `content` | Popover style |
| `trigger` | `ReactNode` | required | Element that triggers the popover |
| `title` | `string` | `undefined` | Popover heading (content type only) |
| `description` | `string` | `undefined` | Supporting text (content type only) |
| `items` | `{ label, icon?, onClick, danger? }[]` | `undefined` | Menu items (menu type only) |
| `position` | `top` \| `bottom` \| `left` \| `right` | `bottom` | Popover position |

**Specs:**
- bg: `--color-bg-overlay`
- border: `--color-border-muted`
- shadow: `--shadow-float`
- radius: `--radius-base`
- content padding: 16px
- menu item padding: 10px 14px
- arrow: 6px integrated CSS triangle

**Types:**
- `content` — title + description + optional footer buttons
- `menu` — list of action items with optional icons and danger state

**Notes:** Popover is triggered by **click**, not hover (use Tooltip for hover). Close on outside click. Danger menu items use `--color-danger-text` and always go at the bottom separated by a divider.

---

#### Popover

**Purpose:** A small floating panel triggered by click — richer than Tooltip. Can contain text, buttons, or a menu.

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `content` \| `menu` | `content` | Popover style |
| `trigger` | `ReactNode` | required | Element that triggers the popover |
| `title` | `string` | `undefined` | Popover heading (content type only) |
| `description` | `string` | `undefined` | Supporting text (content type only) |
| `items` | `{ label, icon?, onClick, danger? }[]` | `undefined` | Menu items (menu type only) |
| `position` | `top` \| `bottom` \| `left` \| `right` | `bottom` | Popover position |

**Specs:**
- bg: `--color-bg-overlay`
- border: `--color-border-muted`
- shadow: `--shadow-float`
- radius: `--radius-base`
- content padding: 16px
- menu item padding: 10px 14px
- arrow: 6px integrated CSS triangle

**Types:**
- `content` — title + description + optional footer buttons
- `menu` — list of action items with optional icons and danger state

**Sizes:** min-w-[180px], radius = `--radius-base` (12px). Content padding: p-4. Menu item: px-3.5 py-2.5. z-index: `--z-dropdown`.
**Notes:** Click-triggered (not hover). Closes on outside click. Danger items always at bottom, separated by Divider.

```tsx
// components/ui/Popover.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { Divider } from './Divider'

interface MenuItem {
  label: string
  icon?: React.ElementType
  onClick: () => void
  danger?: boolean
}

interface PopoverProps {
  trigger: React.ReactNode
  type?: 'content' | 'menu'
  title?: string
  description?: string
  footer?: React.ReactNode
  items?: MenuItem[]
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export function Popover({ trigger, type = 'content', title, description, footer, items = [], position = 'bottom' }: PopoverProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const normalItems = items.filter(i => !i.danger)
  const dangerItems = items.filter(i => i.danger)

  return (
    <div ref={ref} className="relative inline-flex">
      <div onClick={() => setOpen(v => !v)}>{trigger}</div>

      {open && (
        <div className={[
          'absolute min-w-[180px] rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-overlay)] shadow-[var(--shadow-float)] overflow-hidden',
          position === 'bottom' ? 'top-full mt-2 left-0' : '',
          position === 'top' ? 'bottom-full mb-2 left-0' : '',
          position === 'left' ? 'right-full mr-2 top-0' : '',
          position === 'right' ? 'left-full ml-2 top-0' : '',
        ].filter(Boolean).join(' ')}
        style={{ zIndex: 'var(--z-dropdown)' }}>
          {type === 'content' && (
            <div className="p-4">
              {title && <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-1.5">{title}</p>}
              {description && <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">{description}</p>}
              {footer}
            </div>
          )}
          {type === 'menu' && (
            <div>
              {normalItems.map(item => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    onClick={() => { item.onClick(); setOpen(false) }}
                    className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-[var(--color-text-primary)] hover:bg-[var(--color-bg-raised)] transition-[background] duration-150"
                  >
                    {Icon && <Icon size={16} />}
                    {item.label}
                  </button>
                )
              })}
              {dangerItems.length > 0 && (
                <>
                  <Divider />
                  {dangerItems.map(item => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.label}
                        onClick={() => { item.onClick(); setOpen(false) }}
                        className="flex items-center gap-2.5 w-full px-3.5 py-2.5 text-sm text-[var(--color-danger-text)] hover:bg-[var(--color-bg-raised)] transition-[background] duration-150"
                      >
                        {Icon && <Icon size={16} />}
                        {item.label}
                      </button>
                    )
                  })}
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
```

**Usage:**
```tsx
// Menu
<Popover
  type="menu"
  trigger={<Button icon={MoreHorizontal} iconOnly variant="ghost" aria-label="More options" />}
  items={[
    { label: 'Edit', icon: Pencil, onClick: handleEdit },
    { label: 'Fork', icon: GitFork, onClick: handleFork },
    { label: 'Delete', icon: Trash2, onClick: handleDelete, danger: true },
  ]}
/>

// Content
<Popover
  type="content"
  trigger={<Button>Publish</Button>}
  title="Confirm publish"
  description="This will make your component visible to the community."
  footer={
    <div className="flex gap-2">
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button size="sm">Publish</Button>
    </div>
  }
/>
```

---

#### Modal

**Purpose:** A focused overlay for forms, confirmations, and workflows.

**Sizes:** max-w-[440px], radius = `--radius-card` (15px). Header: px-5 py-[18px]. Body: px-5 py-5. Footer: px-5 py-3.5. Title: text-[15px] font-semibold.

**Divider:** All variants use `border-b border-[var(--color-border-muted)]` — structural, never changes by variant. Communicate warning/danger intent through the title text, body copy, and action button variant instead.

```tsx
// components/ui/Modal.tsx
'use client'
import { useEffect } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open:      boolean
  onClose:   () => void
  title:     string
  children:  React.ReactNode
  footer?:   React.ReactNode
  variant?:  'default' | 'warning' | 'danger'
}

export function Modal({ open, onClose, title, children, footer, variant = 'default' }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-backdrop)', zIndex: 'var(--z-modal)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="w-full max-w-[440px] mx-4 rounded-[15px] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-modal)] overflow-hidden"
      >
        {/* Header — structural divider, same across all variants */}
        <div className="flex items-center justify-between px-5 py-[18px] border-b border-[var(--color-border-muted)]">
          <h2 id="modal-title" className="text-[15px] font-semibold text-[var(--color-text-primary)]">{title}</h2>
          <button onClick={onClose} aria-label="Close modal" className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5 text-sm text-[var(--color-text-secondary)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-[var(--color-border-muted)]">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
```

**Usage:**
```tsx
<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Add API Key"
  footer={
    <>
      <Button variant="secondary" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleSave}>Save Key</Button>
    </>
  }
>
  <InputField label="API Key" placeholder="sk-ant-api03-••••" required />
</Modal>
```

---

#### FileUpload

**Purpose:** Allows users to upload files via drag and drop or file browser.

**Sizes:** Dropzone: px-6 py-8, radius = `--radius-card` (15px), border-dashed 1.5px. File item: px-3 py-2.5, radius = `--radius-sharp` (8px). Icon wrap: w-8 h-8.

```tsx
// components/ui/FileUpload.tsx
'use client'
import { useState, useRef } from 'react'
import { Upload, File, X, CheckCircle, AlertCircle } from 'lucide-react'

type FileState = 'uploading' | 'complete' | 'error'

interface UploadedFile {
  id: string
  name: string
  size: number
  state: FileState
  errorMessage?: string
}

interface FileUploadProps {
  accept?: string
  maxSize?: number
  multiple?: boolean
  onChange?: (files: File[]) => void
}

export function FileUpload({ accept, maxSize, multiple, onChange }: FileUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [files, setFiles] = useState<UploadedFile[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (newFiles: FileList) => {
    const fileArr = Array.from(newFiles)
    onChange?.(fileArr)
    let counter = Date.now()
    const mapped: UploadedFile[] = fileArr.map(f => ({
      id: `file-${counter++}`,
      name: f.name,
      size: f.size,
      state: maxSize && f.size > maxSize ? 'error' : 'uploading',
      errorMessage: maxSize && f.size > maxSize ? 'File exceeds size limit.' : undefined,
    }))
    setFiles(prev => [...prev, ...mapped])
    // Simulate upload completion
    mapped.filter(f => f.state === 'uploading').forEach(f => {
      setTimeout(() => setFiles(prev => prev.map(p => p.id === f.id ? { ...p, state: 'complete' } : p)), 1500)
    })
  }

  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id))

  return (
    <div className="flex flex-col gap-3">
      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        className={[
          'flex flex-col items-center gap-2 px-6 py-8 rounded-[var(--radius-card)] border-[1.5px] border-dashed cursor-pointer text-center',
          'transition-[border-color,background] duration-150',
          dragOver
            ? 'border-[var(--color-text-primary)] bg-[var(--color-bg-surface)]'
            : 'border-[var(--color-border-muted)] hover:border-[var(--color-border-focus)] hover:bg-[var(--color-bg-surface)]',
        ].join(' ')}
      >
        <Upload size={24} className="text-[var(--color-text-tertiary)]" />
        <p className="text-sm font-medium text-[var(--color-text-primary)]">
          {dragOver ? 'Release to upload' : 'Drop files here'}
        </p>
        <p className="text-xs text-[var(--color-text-tertiary)]">
          {accept ? `${accept} ` : ''}
          {maxSize ? `up to ${Math.round(maxSize / 1024 / 1024)}MB` : ''}
        </p>
      </div>
      <input ref={inputRef} type="file" accept={accept} multiple={multiple} className="sr-only" onChange={(e) => e.target.files && handleFiles(e.target.files)} />

      {/* File list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-2">
          {files.map(file => (
            <div key={file.id} className="flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-sharp)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)]">
              <div className="w-8 h-8 rounded-[var(--radius-sharp)] border border-[var(--color-border-muted)] bg-[var(--color-bg-raised)] flex items-center justify-center flex-shrink-0">
                <File size={16} className={file.state === 'error' ? 'text-[var(--color-danger-text)]' : file.state === 'complete' ? 'text-[var(--color-success-text)]' : 'text-[var(--color-text-tertiary)]'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[var(--color-text-primary)] truncate">{file.name}</p>
                <p className={['text-[11px]', file.state === 'error' ? 'text-[var(--color-danger-text)]' : file.state === 'complete' ? 'text-[var(--color-success-text)]' : 'text-[var(--color-text-secondary)]'].join(' ')}>
                  {file.state === 'uploading' ? 'Uploading...' : file.state === 'complete' ? 'Complete' : file.errorMessage}
                </p>
              </div>
              <button onClick={() => removeFile(file.id)} aria-label={`Remove ${file.name}`} className="text-[var(--color-text-tertiary)] hover:text-[var(--color-danger-text)]">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

**Usage:**
```tsx
<FileUpload accept=".pdf,.png,.jpg" maxSize={10 * 1024 * 1024} multiple onChange={handleFiles} />
```

---

#### Table

**Purpose:** Displays structured data in rows and columns with sorting and selection.

**Sizes:** Wrap: radius = `--radius-base` (12px). Header: px-4 py-2.5, text-[11px] uppercase tracking-wide. Cell: px-4 py-3 text-sm. Row hover = `--color-bg-surface`. Row selected = `--color-bg-overlay`.

```tsx
// components/ui/Table.tsx
import { ChevronUp, ChevronDown } from 'lucide-react'
import { Checkbox } from './Checkbox'

interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string  // e.g. 'w-[120px]' or 'w-[40%]' — use with table-fixed
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface TableProps<T extends { id: string }> {
  columns: Column<T>[]
  data: T[]
  selectable?: boolean
  selectedRows?: string[]
  onSelect?: (ids: string[]) => void
  sortKey?: keyof T
  sortDirection?: 'asc' | 'desc'
  onSort?: (key: keyof T) => void
}

export function Table<T extends { id: string }>({
  columns, data, selectable, selectedRows = [], onSelect, sortKey, sortDirection, onSort,
}: TableProps<T>) {
  const allSelected = data.length > 0 && selectedRows.length === data.length
  const someSelected = selectedRows.length > 0 && !allSelected

  const toggleAll = () => onSelect?.(allSelected ? [] : data.map(r => r.id))
  const toggleRow = (id: string) => onSelect?.(selectedRows.includes(id) ? selectedRows.filter(r => r !== id) : [...selectedRows, id])

  return (
    <div className="rounded-[var(--radius-base)] border border-[var(--color-border-muted)] overflow-hidden">
      <table className="w-full border-collapse table-fixed">
        <thead>
          <tr className="bg-[var(--color-bg-surface)] border-b border-[var(--color-border-muted)]">
            {selectable && (
              <th className="w-10 pl-4 py-2.5">
                <Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} />
              </th>
            )}
            {columns.map(col => (
              <th
                key={String(col.key)}
                onClick={() => col.sortable && onSort?.(col.key)}
                className={['px-4 py-2.5 text-[11px] font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide text-left', col.sortable ? 'cursor-pointer hover:text-[var(--color-text-secondary)]' : '', col.width ?? ''].filter(Boolean).join(' ')}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    sortDirection === 'asc'
                      ? <ChevronUp size={12} className="text-[var(--color-text-primary)]" />
                      : <ChevronDown size={12} className="text-[var(--color-text-primary)]" />
                  )}
                  {col.sortable && sortKey !== col.key && (
                    <ChevronUp size={12} className="opacity-30" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            const isSelected = selectedRows.includes(row.id)
            return (
              <tr
                key={row.id}
                className={['border-b border-[var(--color-border-muted)] last:border-0 transition-[background] duration-100', isSelected ? 'bg-[var(--color-bg-overlay)]' : 'hover:bg-[var(--color-bg-surface)]'].join(' ')}
              >
                {selectable && (
                  <td className="w-10 pl-4 py-3">
                    <Checkbox checked={isSelected} onChange={() => toggleRow(row.id)} />
                  </td>
                )}
                {columns.map(col => (
                  <td key={String(col.key)} className="px-4 py-3 text-sm text-[var(--color-text-primary)]">
                    {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
```

**Usage:**
```tsx
// IMPORTANT: Table is a controlled component.
// Parent MUST manage sortKey and sortDirection state — Table does not sort data internally.
// onSort fires when a sortable column header is clicked.
// Parent is responsible for re-sorting data and updating sortKey/sortDirection.

const [sortKey, setSortKey] = useState<keyof MyRow>('name')
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

const handleSort = (key: keyof MyRow) => {
  if (key === sortKey) {
    setSortDirection(d => d === 'asc' ? 'desc' : 'asc')
  } else {
    setSortKey(key)
    setSortDirection('asc')
  }
}

const sortedData = [...data].sort((a, b) => {
  const mult = sortDirection === 'asc' ? 1 : -1
  return String(a[sortKey]).localeCompare(String(b[sortKey])) * mult
})

<Table
  columns={[
    { key: 'name', label: 'Component', sortable: true },
    { key: 'status', label: 'Status', render: (v) => <Badge variant="success">{String(v)}</Badge> },
    { key: 'downloads', label: 'Downloads', sortable: true },
  ]}
  data={sortedData}
  selectable
  selectedRows={selected}
  onSelect={setSelected}
  sortKey={sortKey}
  sortDirection={sortDirection}
  onSort={handleSort}
/>
```

---

#### Pagination

**Purpose:** Navigates through paginated content.

**Sizes:** Page button: w-8 h-8 (32px), radius = `--radius-sharp`. Active page: bg = `--color-bg-raised`, border = `--color-border-muted`. Inline container: px-4 py-3, radius = `--radius-base`. Sticky: fixed bottom-0, border-top only.

```tsx
// components/ui/Pagination.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  variant?: 'inline' | 'sticky'
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  pageSizeOptions?: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

function getPages(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 3) return [1, 2, 3, '...', total]
  if (current >= total - 2) return [1, '...', total - 2, total - 1, total]
  return [1, '...', current - 1, current, current + 1, '...', total]
}

export function Pagination({
  variant = 'inline', currentPage, totalPages, totalItems, pageSize,
  pageSizeOptions = [10, 20, 50, 100], onPageChange, onPageSizeChange,
}: PaginationProps) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)
  const pages = getPages(currentPage, totalPages)

  const content = (
    <>
      {/* Left — page size + range */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          Rows per page
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            className="h-8 pl-2 pr-6 rounded-[var(--radius-sharp)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] text-sm text-[var(--color-text-primary)] outline-none appearance-none cursor-pointer"
          >
            {pageSizeOptions.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">
          Showing <span className="text-[var(--color-text-primary)]">{start}–{end}</span> of <span className="text-[var(--color-text-primary)]">{totalItems}</span>
        </span>
      </div>

      {/* Right — pages */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sharp)] border border-[var(--color-border-muted)] text-[var(--color-text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-bg-raised)]"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map((page, i) =>
          page === '...' ? (
            <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-sm text-[var(--color-text-tertiary)]">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={['w-8 h-8 flex items-center justify-center rounded-[var(--radius-sharp)] text-sm font-medium transition-[background] duration-150', currentPage === page ? 'bg-[var(--color-bg-raised)] text-[var(--color-text-primary)] border border-[var(--color-border-muted)]' : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-raised)]'].join(' ')}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 flex items-center justify-center rounded-[var(--radius-sharp)] border border-[var(--color-border-muted)] text-[var(--color-text-secondary)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-bg-raised)]"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </>
  )

  if (variant === 'sticky') {
    return (
      <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 bg-[var(--color-bg-surface)] border-t border-[var(--color-border-muted)]">
        {content}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 rounded-[var(--radius-base)] border border-[var(--color-border-muted)] bg-[var(--color-bg-surface)]">
      {content}
    </div>
  )
}
```

**Usage:**
```tsx
<Pagination
  currentPage={page}
  totalPages={Math.ceil(total / pageSize)}
  totalItems={total}
  pageSize={pageSize}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>

// Sticky footer
<Pagination variant="sticky" ... />
```

---

#### Skeleton

---

**Purpose:** Shows contextual information on hover. Replaces the `hint` prop on InputField.

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | required | Tooltip text |
| `position` | `top` \| `bottom` \| `left` \| `right` | `top` | Tooltip position |
| `children` | `ReactNode` | required | Element that triggers the tooltip |

**Specs:**
- bg: `--color-text-primary` (white)
- text: `--color-bg-page` (dark)
- padding: 6px 10px
- radius: `--radius-sharp`
- arrow: 6px integrated CSS triangle
- gap between trigger and tooltip: 12px

**Notes:** Tooltip is shown on hover only — never on click. Keep tooltip text short (under 10 words). Use to replace `hint` text on form fields.

---

**Purpose:** Allows users to upload files via drag and drop or file browser.

| Prop | Type | Default | Description |
|---|---|---|---|
| `accept` | `string` | `undefined` | Accepted file types (e.g. `.pdf,.png`) |
| `maxSize` | `number` (bytes) | `undefined` | Maximum file size |
| `multiple` | `boolean` | `false` | Allow multiple files |
| `disabled` | `boolean` | `false` | Disables interaction |
| `onChange` | `function` | required | File change handler |

**Drop Zone Specs:**
- Border: 1.5px dashed `--color-border-muted`
- Drag over: border `--color-border-focus`, bg `--color-bg-surface`
- Radius: `--radius-card`
- Padding: 32px vertical, 24px horizontal

**File Item States:**
- Uploading — file name + "Uploading..." status text, no progress bar
- Complete — file name + "Complete" in `--color-success-text`
- Error — file name + error message in `--color-danger-text`

**Notes:** Always show accepted file types and max size in the drop zone. File items use `--radius-sharp`. Remove button always visible on each file item.

---

**Specs:**
- Horizontal: `height: 1px`, `width: 100%`, color `--color-border-muted`
- Vertical: `width: 1px`, `height` stretches to parent, color `--color-border-muted`

**Notes:** Always use the Divider component — never hardcode `border` or `background` directly. Margin handled by parent context using spacing tokens.

---

**Purpose:** Short status labels, counts, or categories.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `info` \| `success` \| `warning` \| `danger` \| `neutral` | `neutral` | Color intent |
| `size` | `sm` \| `md` | `md` | Size |
| `shape` | `pill` \| `sharp` | `pill` | Border radius style |

---


#### Toast

**Purpose:** Transient feedback messages. Non-blocking.

| Prop | Type | Default | Description |
|---|---|---|---|
| `message` | `string` | required | Content |
| `duration` | `number` (ms) | `4000` | Auto-dismiss time |

**Notes:** Single style — no variants. Message text communicates intent. Neutral dot icon. Appears bottom-right by default. Always auto-dismisses.

---

## 5. Patterns

Patterns are reusable combinations of components that solve a repeated design problem.

| Pattern | Components Used | Description |
|---|---|---|

---

### CommunityCard

**Purpose:** Displays a published component in the community/marketplace catalog.

**Sizes:** Card padding 14px, icon wrap 40px × radius 10px, icon 20px. Avatar 24px. Internal gaps 16px between all sections.

**Variants:**

| Variant | Title format | Stats shown |
|---|---|---|
| `default` | `component-name` | star rating, forks, comments, downloads |
| `forked` | `username / component-name` (username in accent color) | star rating, comments, downloads |

**Structure (top to bottom):**
1. Icon (40px wrap) + title
2. Description text
3. Tags row — category tags + vertical divider + Community Verified badge (outlined green)
4. Stats row — star (filled amber), forks, comments, downloads icons + counts
5. Horizontal divider
6. Footer — avatar + author name (left) + platform badge (right, neutral sharp sm)

**Usage:**
```tsx
// Container MUST use items-stretch so cards match height
// Each card has h-full + flex flex-col so it fills the row and pushes footer to bottom
<div className="grid grid-cols-2 gap-4 items-stretch">
  <CommunityCard ... />
  <CommunityCard variant="forked" ... />
</div>
```

// Default
<CommunityCard
  title="payment-bridge"
  description="Simplify global transactions with a unified interface for credit cards and digital wallets."
  tags={['AI Agents']}
  verified
  stats={{ rating: 4.8, forks: 12, comments: 27, downloads: 99 }}
  author={{ name: 'Parker Solis', initials: 'PS' }}
  platform="n8n"
  icon={Monitor}
  onClick={() => router.push('/community/payment-bridge')}
/>

// Forked
<CommunityCard
  variant="forked"
  title="payment-bridge"
  username="parker-solis"
  description="Simplify global transactions with a unified interface for credit cards and digital wallets."
  tags={['AI Agents']}
  verified
  stats={{ rating: 4.8, comments: 27, downloads: 99 }}
  author={{ name: 'Parker Solis', initials: 'PS' }}
  platform="n8n"
  icon={GitFork}
/>
```

---

## 6. Figma Structure

```
Trustabl Design System
├── 📖 Getting Started
│   └── How to use this system, naming, governance
├── 🎨 Core Tokens
│   ├── Color
│   ├── Typography
│   ├── Spacing
│   ├── Radius & Shadows
│   └── Grid
├── 🧩 Components
│   ├── Inputs (Button, InputField, Select, Checkbox, Toggle)
│   ├── Display (Card, Badge, Avatar, Divider)
│   ├── Feedback (Modal, Toast, Alert, Skeleton)
│   └── Navigation (Tabs, Breadcrumb, Sidebar)
├── 🔁 Patterns
│   └── ComponentCard, CommunityCard, APIKeyEntry, EmptyState, FormLayout, etc.
├── 🧪 Sandbox
│   └── Experimental — not canonical
└── 🗑️ Archive
    └── Deprecated components
```

---

## 7. Governance

### Ownership

| Area | Owner |
|---|---|
| Core Tokens | Lead Designer (Zane) |
| Core Components | Lead Designer sign-off required |
| Trustabl Brand layer | Any designer, reviewed in design sync |
| Patterns | Any designer, reviewed in design sync |

### Adding a New Component

1. Check if an existing component covers the need.
2. Propose in design sync with use case and props defined.
3. Build in Sandbox first.
4. Review with at least one designer + one dev.
5. Move to Components once approved.
6. Document before shipping.

### Modifying an Existing Component

1. Never edit a Main Component without flagging the team.
2. Assess impact — how many instances does this affect?
3. If breaking change: notify devs before updating.
4. Update documentation in the same PR/commit.

### Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `InputField` |
| Props | camelCase | `isDisabled` |
| Tokens | kebab-case | `--color-bg-page` |
| Figma layers | kebab-case | `button/primary/default` |
| Files | PascalCase | `Button.tsx` |

---

## 8. AI Agent Usage Notes

Since devs use MCP-based vibe coding, this section ensures AI agents use the system correctly.

### Core Rules

- **Always use a token, never a raw value.** (`--color-accent-default`, not `#2DD48F`)
- **Component variants are exhaustive.** If the variant you need doesn't exist, flag it — don't create a one-off style.
- **One primary Button per surface.** Use `variant="secondary"` or `variant="ghost"` for all other actions.
- **Modal is a last resort.** Prefer inline patterns when possible.
- **Semantic color intent matters.** Use `--color-danger-text` only for irreversible actions. Don't use it for warnings.
- **Spacing is token-only.** No arbitrary `margin: 13px` or `padding: 7px`.

---

### Color Usage

**Backgrounds — use the right layer:**
```
Page background        → --color-bg-page       (#0F1117)
Cards, sidebars        → --color-bg-surface     (#13151D)
Modals, dropdowns      → --color-bg-overlay     (#161923)
Hover states           → --color-bg-raised      (#1A1D27)
```

**Text — match the hierarchy:**
```
Primary content        → --color-text-primary   (#F0F1F5)
Supporting text        → --color-text-secondary (#9899A8)
Placeholders, metadata → --color-text-tertiary  (#5C5E72)
Disabled elements      → --color-text-disabled  (#3A3D52)
```

**Borders — use intent:**
```
Default card edges     → --color-border-muted   (#222536)
Focus rings, selected  → --color-border-focus   (#51C1B5)
```

**Accent — primary actions only:**
```
CTAs, links, interactive → --color-accent-default (#2DD48F)
Hover state              → --color-accent-hover   (#1ABCAA)
Active/pressed           → --color-accent-active  (#159F93)
Tinted backgrounds       → --color-accent-subtle  (#0C2B2E)
```

**Semantic — state only, never style:**
```
Danger text    → --color-danger-text   use for: delete, revoke, errors
Danger bg      → --color-danger-bg     use for: danger button bg, error surfaces
Success text   → --color-success-text  use for: published, completed states
Success bg     → --color-success-bg    use for: success badge backgrounds
Warning text   → --color-warning-text  use for: cautionary states, not errors
Warning bg     → --color-warning-bg    use for: warning badge backgrounds
Info text      → --color-info-text     same as accent — informational only
Neutral text   → --color-neutral-text  use for: inactive, default badge states
```

---

### Typography Usage

```
Metadata, timestamps   → --text-caption     (11px/400)
Labels, tags           → --text-label       (13px/400)
Default body           → --text-body        (14px/400)
Emphasized body        → --text-body-lg     (16px/500)
Section headings       → --text-heading-sm  (18px/600)
Page headings          → --text-heading-md  (24px/600)
Hero headings          → --text-heading-lg  (32px/700)
```

---

### Spacing Usage

```
Icon gaps, badge padding     → --space-tight    (4px)
Component internal padding   → --space-inner    (8px)
Default spacing              → --space-base     (16px)  ← card internals use this
Between components           → --space-section  (24px)
Between page sections        → --space-layout   (48px)
Page margins                 → --space-page     (64px)
```

---

### Border Radius Usage

```
Inputs, tags, small elements → --radius-sharp  (8px)
Buttons, dropdowns           → --radius-base   (12px)
Cards, panels, modals        → --radius-card   (15px)
Badges, pills, avatars       → --radius-pill   (9999px)
```

---

### Component Quick Reference

**Button — pick one variant per action:**
```
Primary CTA (one per surface)  → variant="primary"
Secondary action               → variant="secondary"
Low-emphasis action            → variant="ghost"
Destructive action             → variant="danger"
Icon-only button               → iconOnly={true} + inherit variant
```

**Badge — semantic only:**
```
Status: informational  → variant="info"    shape="pill"
Status: success        → variant="success" shape="pill"
Status: warning        → variant="warning" shape="pill"
Status: danger         → variant="danger"  shape="pill"
Platform/category tag  → variant="neutral" shape="sharp" size="sm"
```

**Modal — use the right variant:**
```
Forms, data entry      → variant="default"   footer: secondary + primary
Delete, revoke         → variant="danger"    footer: secondary + danger
Disable, downgrade     → variant="warning"   footer: secondary + warning
```

**Card — use the right state:**
```
Static display         → variant="default"
Clickable              → variant="interactive"
```

**ComponentCard — use the right state:**
```
Own published          → state="published-own"    (4 stats, no actions)
Forked published       → state="published-forked" (3 stats, no forks, no actions)
Own generated          → state="generated-own"    (no stats, hint text, no actions)
Forked generated       → state="generated-forked" (no stats, hint text, no actions)
Own trashed            → state="trashed-own"      (checkbox, restore + delete actions)
Forked trashed         → state="trashed-forked"   (checkbox, restore + delete actions)
```

**CommunityCard — use the right variant:**
```
Original component     → variant="default"  (4 stats including forks)
Forked component       → variant="forked"   (3 stats, no forks)
```

---

## 9. Changelog

| Version | Date | Changes |
|---|---|---|
| `0.4.0` | 04/28/26 | Full token audit — replaced all hardcoded `rounded-*` Tailwind classes with `var(--radius-*)` tokens across all components; removed duplicate Dropdown spec, orphaned ProgressBar/Spinner/Radio/Checkbox/Toggle specs, exposed doc template, duplicate barrel exports; fixed `aria-haspopup` in ARIA table; added ErrorBoundary and ToastContext to barrel; removed redundant light mode token block from section 3.0; added prompting guide to AGENT.md |
| `0.3.0` | 04/28/26 | Token governance, theming strategy, component composition rules, motion system, typography role context, z-index system, focus consistency, prefers-reduced-motion, barrel export, Toast manager, Modal focus trap, Error boundary, pattern code (Sidebar, Toolbar, FormLayout, EmptyState), all remaining gap fixes |
| `0.2.0` | 04/27/26 | Added primitive token layer, state definitions, accessibility section, layout system, interaction patterns, light mode tokens, code blocks for all 22 components + Pagination |
| `0.1.0` | 04/24/26 | Initial system — Core tokens + 22 components + 8 patterns |

---

*Trustabl Design System — maintained by the Trustabl design team.*
