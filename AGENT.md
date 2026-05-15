# Trustabl Design System — Agent & Developer Guide

> **Two files. One prompt. That's it.**
> - `AGENT.md` — this file: implementation rules, 7 phases, checklist, Figma guide
> - `cf-design-system.md` — visual identity + component code: jump to sections only, never read top to bottom

---

## Single Prompt — Copy and Paste Into Claude Code or Codex

```
Read AGENT.md completely, then execute all phases in Part 1 from start to finish.

Rules:
- Complete and verify each phase before starting the next
- If a verification fails, fix it before proceeding — never skip
- Work autonomously through all phases without waiting for input
- After each phase: report "✅ Phase X complete" then immediately start the next
- In Phase 6: implement the ui-preview page exactly as specified in AGENT.md Part 5 — every component, every state, every variant listed must be present and correct per the specs in AGENT.md Part 2 and cf-design-system.md
- When all phases are done: report "✅ Trustabl Design System fully implemented"
- Phase 8 creates /ui-docs — a Storybook-style developer reference. Phase 6 /ui-preview is for visual verification only.
```

---

## Part 1 — Implementation Phases

### Phase 1 — Project Setup
**Read:** Nothing yet. Just run the commands.

**Option A — Starting from scratch (empty folder):**
```bash
# Run this inside your project folder — uses . so no cf-app subfolder is created
npx create-next-app@latest . --typescript --tailwind --app
npm install lucide-react focus-trap-react
```

**Option B — Already have a Next.js project:**
```bash
# Just install dependencies
npm install lucide-react focus-trap-react
```

> **Never run** `npx create-next-app@latest cf-app` — this creates an unwanted `cf-app/` subfolder. Always use `.` to scaffold into the current directory.

> **Before running any commands:** place `AGENT.md` and `cf-design-system.md` in the project root first. Future agent runs need these files locally to reference specs without re-downloading.

**Detect project structure after scaffolding:**
```bash
ls src 2>/dev/null && echo "SRC LAYOUT" || echo "ROOT LAYOUT"
```

**If SRC LAYOUT** (`src/app` and `src/components` exist):
```bash
mkdir -p src/components/ui src/components/patterns src/app/ui-preview
```

**If ROOT LAYOUT** (`app/` and `components/` at root):
```bash
mkdir -p components/ui components/patterns app/ui-preview
```

All imports use `@/components/ui` — works for both layouts as long as `tsconfig.json` paths are correct (`./src/*` for src layout, `./*` for root layout). Verify after scaffolding.

**Windows / PowerShell note:** Avoid regex with `\U` escape sequences. Use `-like` for path matching instead.

**Verify before continuing:**
```bash
npm run dev
# Must start on http://localhost:3000 with no errors
# Kill with Ctrl+C before proceeding
```
✅ Done when dev server runs clean and folder structure exists.

---

### Phase 2 — CSS Token Setup
**Read:** `cf-design-system.md` → jump to `## 1.5 Setup & Token Wiring` only.

Copy these 3 code blocks from that section into your project:
1. `globals.css` → replaces `app/globals.css`
2. `tailwind.config.ts` → replaces your config
3. `layout.tsx` → replaces `app/layout.tsx`

**Also create `next.config.ts`** with `images.remotePatterns` — see `cf-design-system.md` section 1.5 for the exact block. Required for Avatar photo type to load external images.

**Verify in browser DevTools console:**
```js
getComputedStyle(document.documentElement).getPropertyValue('--color-accent-default')
// Must return: " #2DD48F"
getComputedStyle(document.documentElement).getPropertyValue('--color-bg-page')
// Must return: " #0F1117"
getComputedStyle(document.documentElement).getPropertyValue('--radius-card')
// Must return: " 15px"
```
✅ Done when all 3 values return correctly. Page background must be dark (#0F1117).

---

### Phase 3 — Read Rules (Once)
**Read:** `AGENT.md` Part 2 (Rules) and Part 3 (Known Fixes) — right now, completely, before writing any component code.

✅ Done when you can answer from memory:
- What border radius do buttons use?
- What transition string goes on all interactive elements?
- Which 3 components need `focus-trap-react`?

---

### Phase 4 — Implement Components (One at a Time)
**Read:** For each component, jump to `#### ComponentName` in `cf-design-system.md` section 4.1. Read that section only. Copy the code. Apply fixes from Part 3. Run the per-file check from Part 4. Move to the next.

**Use this exact prompt for every component in Claude Code / Codex:**
```
Read cf-design-system.md → find "#### [ComponentName]" in section 4.1.

Implement rules (non-negotiable):
1. Copy the code block EXACTLY — do not rewrite, simplify, or improve it
2. Apply ONLY the known fixes from AGENT.md Part 3 for this component
3. Do not add, remove, or rename any props
4. Do not change any className values
5. Do not change any token references — var(--color-*), var(--radius-*) etc must remain
6. Save to components/ui/[ComponentName].tsx
7. Run the AGENT.md Part 4 per-file checklist — confirm each item passes before done
```

**Order (each group depends on the previous):**

```
Group A — No dependencies
  Divider · Spinner · Badge · Avatar

Group B — Form primitives  
  Toggle · Checkbox · Radio · ProgressBar

Group C — Input controls
  InputField · Dropdown

Group D — Interactive
  Button · Tabs · NavItem

Group E — Feedback
  Skeleton · Toast · ToastContext · Alert · Tooltip

Group F — Overlays
  Popover · Modal

Group G — Data
  Table · FileUpload · Pagination

Group H — Utility
  Card · ErrorBoundary
```

After all components → create `components/ui/index.ts` barrel export:

> Note: `CommunityCard` is a **pattern** (`components/patterns/CommunityCard.tsx`), not a UI component — it is NOT in the barrel export.

**Extraction warnings — read before copying any component:**
- `ToastContext` and `ErrorBoundary` — in `## 1.5 Setup` section only, not in `## 4 Components`
- `Modal` — after applying fixes, verify exactly ONE `style={{...}}` on the backdrop div
- Any `value="..."` on input without `onChange` — replace with `defaultValue="..."`

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
export * from './ErrorBoundary'
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
export * from './ToastContext'
export * from './Toggle'
export * from './Tooltip'
```

**Verify:**
```bash
npm run build
# Zero TypeScript errors, zero build errors
```
✅ Done when build passes clean with all 25 files in `components/ui/`.

---

### Phase 5 — Implement Patterns
**Read:** Jump to `## 5. Patterns` in `cf-design-system.md`. Read each pattern section only.

**Use this exact prompt for every pattern:**
```
Read cf-design-system.md → find "#### [PatternName] Pattern" in section 5.

Implement rules (non-negotiable):
1. Copy the code block EXACTLY — do not rewrite, simplify, or improve it
2. Do not change any className values or token references
3. Save to components/patterns/[PatternName].tsx
4. Run the AGENT.md Part 4 per-file checklist before confirming done
```

```
Sidebar       → components/patterns/Sidebar.tsx
Toolbar       → components/patterns/Toolbar.tsx
FormLayout    → components/patterns/FormLayout.tsx
EmptyState    → components/patterns/EmptyState.tsx
```

Run per-file check (Part 4) after each pattern.

**Verify:**
```bash
npm run build && npm run lint
# Zero errors, zero lint warnings
```

**Browser verification (required — build passing is not enough):**
- Visit `http://localhost:3000/ui-preview` after `npm run dev`
- Open DevTools console — zero React warnings required
- Check Network tab — zero 404s, no blocked image requests

✅ Done when build, lint, and browser console all pass clean.

---

### Phase 6 — Visual Verification
**Read:** Part 5 of this file completely.

Create `app/ui-preview/page.tsx` using the layout structure and component list from Part 5.

**Visual checklist — verify against the specs in cf-design-system.md and AGENT.md Part 2:**
```
Layout
✓ Sidebar fixed left 220px — never scrolls
✓ Topbar fixed at top
✓ Content scrolls independently
✓ Sticky pagination fixed at bottom, left edge at 220px

All sections present and correct:
✓ Button — NO icons on variant row (text only), sizes, states
✓ NavItem — standalone section, all 4 states shown
✓ InputField — required, optional, error, icon, hint
✓ Dropdown — closed + open with checkmark
✓ Card — default + interactive
✓ ComponentCard pattern — published own, published forked, generated own, generated forked, trashed own (unchecked), trashed forked (checked) with restore + delete icons
✓ Badge — all 5 × pill md + sharp sm
✓ Form Controls — toggle + checkbox (incl. indeterminate) + radio
✓ Tabs — underline (incl. disabled tab) + pill
✓ Toolbar pattern
✓ Avatar + Spinner + Progress + Divider
✓ Skeleton — line + avatar+text + rect
✓ Alert — 4 variants shown, ALL with onDismiss (close icon visible on every variant), icons white (--color-text-primary), vertically centered
✓ Tooltip — bubble ABOVE arrow ABOVE button, properly stacked
✓ Popover menu + Toast
✓ FileUpload — dropzone + complete + uploading states
✓ Table — checkbox col + selected row + badge status
✓ Pagination inline
✓ Modal — Default + Warning + Danger (all 3 shown)
✓ Form Layout pattern
✓ Empty State pattern — 3 variants
✓ Sticky Pagination at bottom
```
✅ Done when every item above passes and matches the reference file.

---

### Phase 8 — UI Docs Page
**Read:** Part 8 of this file.

Create `app/ui-docs/page.tsx` using the code in Part 8. Visit `http://localhost:3000/ui-docs`.

This is a Storybook-style developer reference — each component shown with its sizing specs, token annotations, props table, and all states. It is separate from `/ui-preview` which is for visual verification only.

**Verify:**
```bash
npm run build
# Must still pass with zero errors
```
✅ Done when `/ui-docs` loads and every component section shows correct spec annotations alongside rendered components.

---

### Phase 7 — Figma MCP Integration
**Read:** Part 6 of this file.

Use this phase every time a designer shares a new Figma design.
✅ Done when every Figma element maps to a Trustabl component and build passes.

---

## Part 2 — Rules

> Read this once in Phase 3. These rules apply to every file you write.

### Stack
```
Framework:  Next.js latest (app router — app/ directory, not pages/)
Styling:    Tailwind CSS v4 — tokens via CSS vars, not theme.extend
Icons:      lucide-react ONLY
Fonts:      Inter + JetBrains Mono via next/font/google
Traps:      focus-trap-react (Modal only)
```
**Never install:** shadcn · radix-ui · headlessui · heroicons · react-icons

---

### Colors — Never Use Raw Hex
```
BACKGROUNDS (elevation order — never use same bg for parent + child)
--color-bg-page      #0F1117  →  page background
--color-bg-surface   #13151D  →  cards, sidebar, panels
--color-bg-overlay   #161923  →  dropdowns, menus, modal bg-content
--color-bg-raised    #1A1D27  →  hover states, active fills
--color-backdrop     rgba(0,0,0,0.6)  →  modal overlay

BORDERS
--color-border-muted  #222536  →  default borders on all elements
--color-border-focus  #51C1B5  →  focus rings, active inputs

TEXT
--color-text-primary    #F0F1F5  →  headings, labels, active
--color-text-secondary  #9899A8  →  body, descriptions
--color-text-tertiary   #5C5E72  →  placeholders, metadata (never for readable text)
--color-text-disabled   #3A3D52  →  disabled elements

ACCENT (brand — primary interactive elements only)
--color-accent-default  #2DD48F
--color-accent-hover    #1ABCAA
--color-accent-active   #159F93
--color-accent-subtle   #0C2B2E
--color-accent-border   #16433F

SEMANTIC
--color-danger-text    #F87171   --color-danger-bg     #1C0F0F
--color-danger-hover   #2A1010   --color-danger-border  #7F2020
--color-success-text   #4ADE80   --color-success-bg    #0C1F12
--color-warning-text   #FBBF24   --color-warning-bg    #1C160A
--color-info-text      #2DD48F   --color-info-bg       #0C2B2E
--color-neutral-text   #9899A8   --color-neutral-bg    #13151D

LIGHT MODE (data-theme="light" — same token names, different values)
--color-bg-page      #F8F9FB   --color-bg-surface   #FFFFFF
--color-bg-overlay   #F4F5F8   --color-bg-raised    #EDEEF2
--color-accent-default #0284C7  (darker for contrast)
```

---

### Spacing — 4px Grid Only
```
4px   gap-1  p-1   → --space-tight   (icon gaps, tight fills)
8px   gap-2  p-2   → --space-inner   (component internals)
12px  gap-3  p-3
16px  gap-4  p-4   → --space-base    (default spacing)
20px  gap-5  p-5
24px  gap-6  p-6   → --space-section (between components)
48px  gap-12 p-12  → --space-layout  (between page sections)
64px  gap-16 p-16  → --space-page    (page margins)

Exception: gap-1.5 (6px) — allowed only for compact tab/toolbar icon+text
Forbidden: gap-7 · gap-8 · gap-9 · gap-11 · gap-14 (off-scale)
```

---

### Border Radius — Always Use Tokens
```
--radius-sharp  8px    → rounded-[var(--radius-sharp)]
  Use: inputs · dropdowns · nav items · tags · icon buttons · table wrap

--radius-base   12px   → rounded-[var(--radius-base)]
  Use: buttons · toast · popovers · toolbar · tabs container · pagination container

--radius-card   15px   → rounded-[var(--radius-card)]
  Use: cards · modals · panels · sidebar · form layout · empty state icon wrap

--radius-pill   9999px → rounded-[var(--radius-pill)]
  Use: badges · avatars · toggles · progress bar

NEVER use: rounded-xl · rounded-lg · rounded-md · rounded-2xl · rounded-3xl
```

---

### Component Exact Sizes
```
BUTTON
  sm  h-[36px] px-3  text-xs   font-medium  rounded-[var(--radius-base)]
  md  h-[42px] px-4  text-sm   font-medium  rounded-[var(--radius-base)]
  lg  h-[46px] px-5  text-sm   font-medium  rounded-[var(--radius-base)]
  icon-only: aspect-square px-0 (square)
  icon size: 16px · gap: gap-[var(--space-tight)]

INPUT / DROPDOWN
  md  h-[42px] px-3  text-sm   rounded-[var(--radius-sharp)]
  lg  h-[46px] px-3  text-sm   rounded-[var(--radius-sharp)]
  label: text-xs font-medium · gap to input: gap-1.5
  error/hint: text-[11px] below input

BADGE
  sm  px-2  py-0.5  text-[11px]  pill or sharp
  md  px-3  py-1    text-xs      pill or sharp

AVATAR
  sm  w-6 h-6  (24px)  text-[11px]  rounded-[var(--radius-pill)]
  md  w-8 h-8  (32px)  text-xs      rounded-[var(--radius-pill)]

MODAL
  max-w-[440px] · rounded-[var(--radius-card)]
  header: px-5 py-[18px] text-[15px] font-semibold
  body:   px-5 py-5 text-sm
  footer: px-5 py-3.5 justify-end gap-2

CARD
  rounded-[var(--radius-card)] · bg-[var(--color-bg-surface)]
  header/footer: px-4 py-3 · body: p-4

SIDEBAR
  expanded: 220px · collapsed: 52px
  transition: width 250ms ease
  height: h-screen or 100dvh · position: fixed left-0 top-0
  content area: must offset with ml-[220px] (expanded) or ml-[52px] (collapsed)
  header: px-2.5 py-3 · logo+brand LEFT · toggle button RIGHT (flex justify-between)
  collapsed header: toggle button centered in 52px width
  nav: px-2 py-1 gap-0.5
  toggle btn: w-7 h-7 (28px) rounded-[var(--radius-sharp)]
TOOLBAR / TABS PILL
  container: p-1 rounded-[var(--radius-base)]
  tab: h-8 (32px) px-3.5 rounded-[var(--radius-sharp)]
  icon btn: w-8 h-8 (32px) rounded-[var(--radius-sharp)]

NAV ITEM
  h-9 (36px) · px-3 · gap-2.5 · rounded-[var(--radius-sharp)]

TABLE
  wrap: rounded-[var(--radius-base)]
  header: px-4 py-2.5 text-[11px] uppercase tracking-wide
  cell:   px-4 py-3 text-sm

PAGINATION
  page btn: w-8 h-8 (32px) rounded-[var(--radius-sharp)]
  container (inline): px-4 py-3 rounded-[var(--radius-base)]
  container (sticky): fixed bottom-0 border-top only

TOAST
  px-4 py-3.5 · rounded-[var(--radius-base)] · max-w-[360px]
  position: fixed bottom-6 right-6 z-[var(--z-toast)]
  auto-dismiss: 4000ms

PROGRESS BAR    h-[6px] · rounded-[var(--radius-pill)]
SPINNER         sm: w-[14px] h-[14px] · md: w-[20px] h-[20px] · border-2
TOOLTIP         px-2.5 py-1.5 · rounded-[var(--radius-sharp)] · text-xs
EMPTY STATE     px-8 py-12 · icon wrap: w-14 h-14 rounded-[var(--radius-card)]
FORM LAYOUT     max-w-640px · header: px-5 py-[18px] · body: px-5 py-5 gap-4
```

---

### Typography
```
text-[11px] → captions · hints · errors · table headers · badge-sm
text-xs     → form labels (12px) · badge-md
text-sm     → nav · dropdown · card body · tab labels (13-14px)
text-[15px] → modal title · form layout title
text-base   → emphasized body (16px)
text-lg     → section headings (18px, use sparingly)
text-2xl    → page headings (24px)
text-3xl    → hero only (32px)

font-normal   → body text
font-medium   → buttons · labels
font-semibold → headings · titles
font-bold     → hero headings only

Max 2 type sizes per component.
Never use: text-xl · text-4xl · text-5xl · text-[10px]
```

---

### Transitions
```
// All interactive elements — copy exactly:
'transition-[background,border-color,color] duration-150 ease'

// Focus — all interactive elements:
'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]'

// Disabled — all interactive elements:
'disabled:opacity-40 disabled:cursor-not-allowed'

// NEVER use: transition-all  or  ease-[ease]  (both invalid/too broad)
```

---

### Z-index — CSS Vars Only
```tsx
style={{ zIndex: 'var(--z-overlay)' }}   // 10 — sticky headers
style={{ zIndex: 'var(--z-dropdown)' }}  // 20 — dropdowns · popovers · tooltips
style={{ zIndex: 'var(--z-modal)' }}     // 30 — modals
style={{ zIndex: 'var(--z-toast)' }}     // 40 — toasts · sticky pagination

NEVER use: z-10 · z-20 · z-30 · z-40 · z-50 Tailwind classes
```

---

### `use client` Directive
```
Required:   Dropdown · Modal · Popover · Tooltip · FileUpload
            Toast · ToastContext · Checkbox (useRef) · Sidebar
Not needed: Button · InputField · Card · Badge · NavItem · Tabs
            Toggle · Radio · Divider · Spinner · ProgressBar
            Alert · Avatar · Skeleton · Toolbar · FormLayout · EmptyState
```

---

### Accessibility
```
Icon-only buttons     → aria-label="Action name"
InputField            → <label> via htmlFor + useId()
InputField error      → aria-invalid="true" + aria-describedby
Modal                 → role="dialog" aria-modal="true" aria-labelledby
Active NavItem        → aria-current="page"
Toggle                → role="switch" aria-checked
Spinner               → role="status" aria-label="Loading"
Skeleton              → aria-hidden="true"
ProgressBar           → role="progressbar" aria-valuenow aria-valuemin aria-valuemax
Dropdown              → aria-expanded aria-haspopup="menu"
Alert                 → role="alert" aria-live="assertive"
Toast                 → role="status" aria-live="polite"
Focus trap required inside open modals (focus-trap-react)
```

---

### Imports
```tsx
// Always use barrel — never direct file path
import { Button, InputField, Badge } from '@/components/ui'
import { Sidebar } from '@/components/patterns/Sidebar'
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
```

### Token Authority

`cf-design-system.md` is the single source of truth for all tokens. If any local direction contradicts the MD — **the MD wins**:
- `--color-accent-default` is required for primary actions — never remove
- All semantic tokens must stay in `globals.css` even if unused in a specific view
- `[data-theme="light"]` block must remain even if light mode is not active

---

### Never Use
```
rounded-xl · rounded-lg · rounded-md · rounded-2xl · rounded-3xl
ease-[ease] · transition-all
z-10 · z-20 · z-30 · z-40 · z-50 (as Tailwind classes)
bg-white · bg-black · text-white · text-black
#hex directly in className
gap-7 · gap-9 · gap-11 (off-scale)
shadcn · radix-ui · heroicons · react-icons · headlessui
value="..." on input without onChange — use defaultValue instead
primitives.tsx or utils.tsx catch-all files — every component gets its own file
```

---

## Part 3 — Known Code Fixes

> Apply these when copying component code from `cf-design-system.md`. These are bugs in the source that must be corrected.

| Component | Fix |
|---|---|
| **Button iconOnly** | Never use `aspect-square px-0` for icon-only buttons — Tailwind conflicts with explicit padding from `sizeStyles`. Use a separate `iconOnlySizeStyles` map with explicit `w-[N]px h-[N]px p-0` per size: sm=36px · md=42px · lg=46px |
| **InputField / all inputs** | Never use `value="..."` with a hardcoded string without an `onChange` handler — React will warn about read-only fields. Use `defaultValue="..."` for uncontrolled display, or pair `value` with `onChange` for controlled inputs | `style={{ backgroundColor: 'var(--color-backdrop)', zIndex: 'var(--z-modal)' }}` · Add `variant?: 'default' \| 'warning' \| 'danger'` prop — header border changes per variant |
| **Card** | Add `flex flex-col` to Card root className · Add `flex-1` to CardBody className — ensures equal height when cards are in a grid |
| **Alert** | Close icon is controlled by `onDismiss`, not by variant. In the ui-preview, all 4 Alert variants must pass `onDismiss` so the close icon is consistently visible. Dismissibility is a behavior state — any variant can be dismissible or not |
| **Table** | Sorting is controlled — parent MUST manage `sortKey` + `sortDirection` state and sort `data` before passing. See usage example in cf-design-system.md section 4.1 Table |
| **Pagination** | Select element: use `pl-2 pr-6 appearance-none` for correct chevron spacing |
| **ui-preview page** | Double scroll fix: root div must be `h-screen w-screen overflow-hidden` · right side must have `min-w-0` · main must be `overflow-y-auto overflow-x-hidden` · add `useEffect` to lock `document.documentElement` and `document.body` overflow on mount |
| **CommunityCard** | Remove all `-mt-2` negative margins — use consistent `gap-3` on parent flex container instead |
| **ToastContext / ErrorBoundary** | These live in `## 1.5 Setup` section, not in `## 4 Components`. Copy from there — they are NOT in the section 4.1 component list |
| **Checkbox** | Add `'use client'` at top — missing, causes hooks error |
| **Sidebar** | Add `h-screen` to root div className — without it sidebar collapses to content height |
| **All components** | Replace `duration-[var(--duration-*)]` with hardcoded values — Tailwind v4 purges arbitrary CSS var duration classes: `--duration-base` → `duration-150`, `--duration-slow` → `duration-[250ms]`, `--duration-fast` → `duration-[100ms]` |
| **All components** | `LucideIcon` type → `React.ElementType` · Remove `import { type LucideIcon } from 'lucide-react'` |
| **Tooltip** | Arrow uses inline `style` object (not separate div) — see cf-design-system.md for exact code |
| **CommunityCard** | Pattern file — `components/patterns/CommunityCard.tsx` — see cf-design-system.md section 5 |
| **Button** | `ease-[ease]` → `ease` · `rounded-xl` → `rounded-[var(--radius-base)]` · `gap-1.5` → `gap-[var(--space-tight)]` |
| **InputField** | Icon position: use `top-1/2 -translate-y-1/2` (not `top-50% transform:`) |
| **Dropdown** | Use `aria-haspopup="menu"` on the trigger · Add `style={{ zIndex: 'var(--z-dropdown)' }}` to menu `<ul>` · Add `max-h-[300px] overflow-y-auto` to menu |
| **Modal** | Add `document.body.style.overflow = 'hidden'` in useEffect · backdrop: `style={{ backgroundColor: 'var(--color-backdrop)', zIndex: 'var(--z-modal)' }}` · Header divider is always `border-b border-[var(--color-border-muted)]` across all variants — structural, never changes. Communicate warning/danger through title, body copy, and action button variant only |
| **FileUpload** | ID: `` `file-${Date.now()}-${Math.random().toString(36).substr(2,9)}-${i}` `` |
| **Pagination** | Use `page` as React key, not index `i` |
| **Avatar** | `onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}` · Add `sizes` prop to Image |
| **Spinner** | `rounded-full` → `rounded-[var(--radius-pill)]` |
| **Toast container** | `z-40` → `style={{ zIndex: 'var(--z-toast)' }}` |

---

## Part 4 — Per-File Checklist

> Run this on every `.tsx` file you create or modify. No exceptions.

```
COLORS
□ Zero raw hex (#RRGGBB) in className or style
□ Zero bg-white · bg-black · text-white · text-black
□ Modal backdrop uses style={{ backgroundColor: 'var(--color-backdrop)' }}

RADIUS
□ Zero rounded-xl · rounded-lg · rounded-md · rounded-2xl · rounded-3xl
□ Inputs/dropdowns/nav → rounded-[var(--radius-sharp)]
□ Buttons/toast/popovers → rounded-[var(--radius-base)]
□ Cards/modals/panels → rounded-[var(--radius-card)]
□ Badges/avatars/toggles → rounded-[var(--radius-pill)]

SPACING
□ Zero off-scale: gap-7 · gap-9 · gap-11 · gap-14
□ All spacing on 4px grid (4/8/12/16/20/24/48/64px)

TYPOGRAPHY
□ Zero off-scale: text-xl · text-4xl · text-[10px]
□ Font weights: normal · medium · semibold · bold only

TRANSITIONS
□ Zero transition-all · ease-[ease]
□ Interactive elements have duration-150 ease

Z-INDEX
□ Zero z-20 · z-30 · z-40 · z-50 Tailwind classes
□ Floating elements use style={{ zIndex: 'var(--z-*)' }}

ACCESSIBILITY
□ Every icon-only button has aria-label
□ Every InputField has label via htmlFor + useId()
□ Error inputs have aria-invalid + aria-describedby
□ Active NavItem has aria-current="page"

USE CLIENT
□ Present on: Dropdown · Modal · Popover · Tooltip · FileUpload · Toast · ToastContext · Checkbox · Sidebar
□ Absent on: Button · InputField · Card · Badge · NavItem · Tabs · Toggle · Radio · Divider

IMPORTS
□ UI components from @/components/ui only
□ Icons from lucide-react only
□ Zero shadcn · radix-ui · heroicons · react-icons
```

---

## Part 5 — UI Preview Page

> Create this in Phase 6. Implement from the spec in this section — no reference files needed.

**File:** `app/ui-preview/page.tsx`
**Route:** `http://localhost:3000/ui-preview`

### What the agent must implement

```
Layout
  ✓ Sidebar fixed left — 220px, never scrolls, always visible
  ✓ Main area right of sidebar — header + scrollable content
  ✓ Sticky pagination at bottom — fixed, left edge starts at sidebar edge (left: 220px)
  ✓ Overall: h-screen, overflow-hidden, flex row

Sidebar (top to bottom)
  ✓ Header — toggle button + Trustabl logo (green teal pill) + brand name
  ✓ New Component button — with plus icon, full width
  ✓ Divider
  ✓ Nav items — Home (active), Catalog, Community, Settings — all 4 states shown
  ✓ Footer — avatar (initials) + username + chevrons icon

Topbar
  ✓ Title "Trustabl Design System" + subtitle "v0.4.0 - UI Preview"
  ✓ "All components" success badge on the right

Button section
  ✓ variant row — NO icons — text only: Primary, Secondary, Ghost, Danger, Text
  ✓ size row — Small 36px, Medium 42px, Large 46px
  ✓ states row — Loading (with spinner), Disabled, icon-only add, icon-only delete

NavItem section (standalone, not in sidebar)
  ✓ Active state — blue bg, white text, border
  ✓ Hover state — slightly lighter bg
  ✓ Default state — muted text
  ✓ Disabled state — 40% opacity

InputField
  ✓ Required (asterisk), Optional label, Error (red border + message), Icon left, Hint text

Dropdown
  ✓ Closed state, Open state with selected item and checkmark

Card
  ✓ Default card — header + badge + body + footer with meta + button
  ✓ Interactive card — hover state visible

Community / Marketplace Card (CommunityCard pattern)
  ✓ 40px icon wrap (radius 10px) + component title
  ✓ Description text
  ✓ Tags + vertical divider + Community Verified badge (outlined green)
  ✓ Stats row: star rating (amber filled), forks, comments, downloads
  ✓ Horizontal divider
  ✓ Footer: avatar + author name + platform badge (neutral sharp sm)
  ✓ Forked variant: title = "username / name" with username in accent color, no forks stat

Badge — all 5 variants × pill md + sharp sm

Form Controls
  ✓ Toggle — on, off, disabled
  ✓ Checkbox — checked, unchecked, indeterminate, disabled
  ✓ Radio — selected, unselected, disabled

Tabs — underline (with disabled tab) + pill variants with badges

Toolbar pattern — tabs + divider + icon buttons

Avatar + Spinner + Progress + Divider — all in one row

Skeleton — line, avatar+text, rect

Alert — all 4 variants with onDismiss (close icon visible on all), WHITE icons (not colored), vertically centered

Tooltip — bubble above, arrow pointing down, button below — properly stacked

Popover menu — Edit, Fork, divider, Delete (danger color)

Toast — bullet + message + dismiss

FileUpload — dropzone + complete file + uploading file

Table — checkbox col, component col, status badges, downloads, selected row

Pagination inline — rows per page select + range text + page buttons

Modal — show all 3: Default (Add API Key), Warning (Unsaved Changes), Danger (Delete)

Form Layout pattern — header + 2 form sections with dividers + footer

Empty State pattern — 3 variants: no-content, no-results, error (danger icon)
```

### Layout code structure

The ui-preview page must lock the viewport. Only `<main>` scrolls — nothing else.

```tsx
// app/ui-preview/page.tsx — lock body scroll in useEffect
useEffect(() => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  return () => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }
}, [])
```

```tsx
// app/ui-preview/page.tsx — layout skeleton
return (
  // Root: full viewport, no overflow — prevents double scroll
  <div className="flex h-screen w-screen bg-[var(--color-bg-page)] overflow-hidden">

    {/* Sidebar — fixed left, does not scroll */}
    <div className="flex-shrink-0 overflow-hidden">
      <Sidebar ... />
    </div>

    {/* Right side — locked height, no overflow bleed */}
    <div className="flex-1 flex flex-col overflow-hidden min-w-0">

      {/* Topbar — fixed height, never scrolls */}
      <div className="flex-shrink-0 border-b border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] px-8 py-4" style={{ zIndex: 'var(--z-overlay)' }}>
        ...
      </div>

      {/* Content — ONLY this element scrolls */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-8 flex flex-col gap-12 pb-24">
        ...all sections...
      </main>

    </div>

    {/* Sticky pagination — fixed bottom */}
    <Pagination variant="sticky" ... />
  </div>
)
```

**Rules that prevent double scroll:**
- Root div: `h-screen w-screen overflow-hidden` — locks the viewport
- Sidebar: `flex-shrink-0 overflow-hidden` — no scroll, no shrink
- Right side: `flex-1 flex flex-col overflow-hidden min-w-0` — `min-w-0` prevents flex overflow bleed
- Main: `flex-1 overflow-y-auto overflow-x-hidden` — single scroll axis
- useEffect: locks `html` + `body` overflow while page is mounted
- Never add `overflow-y-auto` or `overflow-scroll` to the root div, html, or body

### Visual checklist — verify against AGENT.md Part 2 specs

```
Colors
✓ Page bg = #0F1117 dark near-black
✓ Primary button = #2DD48F green teal, dark text on it
✓ Cards = #13151D slightly lighter than page
✓ Danger = #F87171 red — success = #4ADE80 green
✓ Alert icons = white (#F0F1F5) — not colored

Sizing
✓ Button sm=36px · md=42px · lg=46px
✓ Input height = 42px — matches button md
✓ Sidebar = 220px wide
✓ Pagination buttons = 32×32px
✓ NavItem = 36px height

Radius
✓ Buttons = 12px (not pill, not square)
✓ Inputs = 8px (sharper than buttons)
✓ Cards/Modal = 15px
✓ Badges = pill (fully rounded)

Layout
✓ Sidebar never moves when scrolling
✓ Sticky pagination always at bottom
✓ Topbar always at top
✓ Content scrolls independently

Buttons
✓ Variant row has NO icons — text only
✓ Size row uses secondary variant for clarity
✓ Icon-only buttons are square

NavItem
✓ Shown as standalone section, not only in sidebar
✓ All 4 states visible

Community Card
✓ Has icon, name, author, badge in header
✓ Has stats + action in footer
✓ Forked variant shown

Alert
✓ All icons are white/--color-text-primary
✓ Icons vertically centered with text

Tooltip
✓ Bubble above button, arrow pointing down to button
✓ Not overlapping with other elements

Modals
✓ Default modal shown
✓ Warning modal shown (same muted header divider — intent shown via title + button)
✓ Danger modal shown (same muted header divider — intent shown via title + danger button)
```

```tsx
'use client'

import { useState, useEffect } from 'react'
import {
  Button, InputField, Card, CardHeader, CardBody, CardFooter,
  Badge, Modal, Toast, Divider, Spinner, ProgressBar,
  Toggle, Checkbox, Radio, FileUpload, Tooltip, Avatar,
  Tabs, NavItem, Table, Skeleton, Alert, Popover, Pagination,
  Dropdown,
} from '@/components/ui'
import { Sidebar } from '@/components/patterns/Sidebar'
import { Toolbar } from '@/components/patterns/Toolbar'
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  Plus, Trash2, Edit, Search, Eye, Upload,
  Home, Grid, Globe, Settings, Filter, LayoutGrid,
  AlignJustify, Zap, List, AlertCircle,
} from 'lucide-react'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-[11px] font-semibold text-[var(--color-accent-default)] uppercase tracking-widest">{title}</h2>
        <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
      </div>
      {children}
    </section>
  )
}

function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <p className="text-[11px] text-[var(--color-text-tertiary)] font-mono">{label}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function UIPreview() {
  // Lock html+body scroll — prevents double scrollbar
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [])

  const [modalOpen, setModalOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [toggle, setToggle] = useState(true)
  const [checkbox, setCheckbox] = useState(true)
  const [radio, setRadio] = useState('langflow')
  const [activeTab, setActiveTab] = useState('all')
  const [activePillTab, setActivePillTab] = useState('all')
  const [activeNav, setActiveNav] = useState('home')
  const [dropdown, setDropdown] = useState<string>('langflow')
  const [multiDropdown, setMultiDropdown] = useState<string[]>(['langflow'])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selected, setSelected] = useState<string[]>([])
  const [activeToolbarTab, setActiveToolbarTab] = useState('all')
  const [view, setView] = useState('grid')

  const tabs = [
    { label: 'All', value: 'all', icon: List, badge: 374 },
    { label: 'Generated', value: 'generated', icon: Zap, badge: 138 },
    { label: 'Published', value: 'published', icon: Upload, badge: 201 },
  ]

  const navItems = [
    { label: 'Home', value: 'home', icon: Home },
    { label: 'Catalog', value: 'catalog', icon: Grid },
    { label: 'Community', value: 'community', icon: Globe },
    { label: 'Settings', value: 'settings', icon: Settings },
  ]

  const tableData = [
    { id: '1', name: 'api-gateway', status: 'Published', downloads: '1,204' },
    { id: '2', name: 'smart-recruiter', status: 'Generated', downloads: 'N/A' },
    { id: '3', name: 'payment-bridge', status: 'Draft', downloads: '98' },
  ]

  const dropdownOptions = [
    { label: 'Langflow', value: 'langflow' },
    { label: 'Autogen', value: 'autogen' },
    { label: 'Dify', value: 'dify' },
    { label: 'CrewAI', value: 'crewai' },
  ]

  return (
    <div className="flex h-screen w-screen bg-[var(--color-bg-page)] overflow-hidden">

      {/* Sidebar — never scrolls, no shrink */}
      <div className="flex-shrink-0 overflow-hidden">
        <Sidebar items={navItems} activeValue={activeNav} onNavigate={setActiveNav} onNewComponent={() => setModalOpen(true)} username="zanexflores" onCollapse={setSidebarCollapsed} />
      </div>

      {/* Right side — min-w-0 prevents flex overflow bleed */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header — flex-shrink-0 so it never scrolls */}
        <div className="flex-shrink-0 border-b border-[var(--color-border-muted)] bg-[var(--color-bg-surface)] px-8 py-4" style={{ zIndex: 'var(--z-overlay)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[15px] font-semibold text-[var(--color-text-primary)]">Trustabl Design System</h1>
              <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">v0.4.0 - UI Preview</p>
            </div>
            <Badge variant="success">All components</Badge>
          </div>
        </div>

        {/* ONLY this element scrolls — overflow-x-hidden prevents horizontal scroll */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden px-8 py-8 flex flex-col gap-12 pb-24">

          <Section title="Button">
            <Row label="variant">
              <Button variant="primary" icon={Plus}>Primary</Button>
              <Button variant="secondary" icon={GitFork}>Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger" icon={Trash2}>Danger</Button>
              <Button variant="text">Text</Button>
            </Row>
            <Row label="size">
              <Button size="sm">Small 36px</Button>
              <Button size="md">Medium 42px</Button>
              <Button size="lg">Large 46px</Button>
            </Row>
            <Row label="states">
              <Button loading>Loading</Button>
              <Button disabled>Disabled</Button>
              <Button icon={Plus} iconOnly aria-label="Add" />
              <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
            </Row>
          </Section>

          <Divider />

          <Section title="InputField">
            <Row label="default">
              <div className="w-64"><InputField label="Username" placeholder="Enter username" required /></div>
              <div className="w-64"><InputField label="Bio" placeholder="Tell us about yourself" optional /></div>
            </Row>
            <Row label="states">
              <div className="w-64"><InputField label="Email" type="email" defaultValue="zane@#!" error="Enter a valid email address." required /></div>
              <div className="w-64"><InputField label="Password" type="password" hint="Min. 8 characters." required /></div>
            </Row>
            <Row label="with icons">
              <div className="w-64"><InputField label="Search" iconLeft={Search} placeholder="Search components..." /></div>
              <div className="w-64"><InputField label="Password" type="password" iconRight={Eye} required /></div>
            </Row>
          </Section>

          <Divider />

          <Section title="Dropdown">
            <Row label="single select">
              <div className="w-64"><Dropdown label="Platform" options={dropdownOptions} value={dropdown} onChange={v => setDropdown(v as string)} /></div>
            </Row>
            <Row label="multi select">
              <div className="w-72"><Dropdown type="multi" label="Platforms" options={dropdownOptions} value={multiDropdown} onChange={v => setMultiDropdown(v as string[])} /></div>
            </Row>
          </Section>

          <Divider />

          <Section title="Card">
            <Row>
              <Card className="w-60">
                <CardHeader>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Default Card</span>
                  <Badge variant="info" size="sm">Active</Badge>
                </CardHeader>
                <CardBody>Routes requests to the appropriate agent component.</CardBody>
                <CardFooter>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">2h ago</span>
                  <Button variant="ghost" size="sm">View</Button>
                </CardFooter>
              </Card>
              <Card variant="interactive" className="w-60">
                <CardHeader>
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">Interactive Card</span>
                  <Badge variant="success" size="sm">Stable</Badge>
                </CardHeader>
                <CardBody>Hover me — interactive state with border and background change.</CardBody>
                <CardFooter>
                  <span className="text-[11px] text-[var(--color-text-tertiary)]">4h ago</span>
                  <Button size="sm">Use</Button>
                </CardFooter>
              </Card>
            </Row>
          </Section>

          <Divider />

          <Section title="Badge">
            <Row label="pill md">
              <Badge variant="info">Info</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </Row>
            <Row label="sharp sm">
              <Badge variant="info" shape="sharp" size="sm">Info</Badge>
              <Badge variant="success" shape="sharp" size="sm">Success</Badge>
              <Badge variant="warning" shape="sharp" size="sm">Warning</Badge>
              <Badge variant="danger" shape="sharp" size="sm">Danger</Badge>
            </Row>
          </Section>

          <Divider />

          <Section title="Form Controls">
            <Row label="toggle">
              <Toggle checked={toggle} onChange={setToggle} label="Email notifications" />
              <Toggle checked={false} onChange={() => {}} label="Off state" />
              <Toggle checked={true} onChange={() => {}} label="Disabled" disabled />
            </Row>
            <Row label="checkbox">
              <Checkbox checked={checkbox} onChange={setCheckbox} label="Checked" />
              <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
              <Checkbox checked={true} indeterminate onChange={() => {}} label="Indeterminate" />
              <Checkbox checked={false} onChange={() => {}} label="Disabled" disabled />
            </Row>
            <Row label="radio">
              <Radio name="platform" value="langflow" checked={radio === 'langflow'} onChange={setRadio} label="Langflow" />
              <Radio name="platform" value="autogen" checked={radio === 'autogen'} onChange={setRadio} label="Autogen" />
              <Radio name="platform" value="dify" checked={radio === 'dify'} onChange={setRadio} label="Dify" disabled />
            </Row>
          </Section>

          <Divider />

          <Section title="Tabs">
            <Row label="underline"><Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} /></Row>
            <Row label="pill"><Tabs tabs={tabs} value={activePillTab} onChange={setActivePillTab} variant="pill" /></Row>
          </Section>

          <Divider />

          <Section title="NavItem">
            <Row>
              <div className="flex flex-col gap-1 w-52">
                <NavItem label="Home" icon={Home} active onClick={() => {}} />
                <NavItem label="Catalog" icon={Grid} onClick={() => {}} />
                <NavItem label="Community" icon={Globe} onClick={() => {}} />
                <NavItem label="Settings" icon={Settings} onClick={() => {}} disabled />
              </div>
            </Row>
          </Section>

          <Divider />

          <Section title="Avatar">
            <Row label="md">
              <Avatar type="icon" size="md" />
              <Avatar type="initials" initials="ZA" size="md" />
              <Avatar type="photo" src="https://i.pravatar.cc/32" alt="User" size="md" />
            </Row>
            <Row label="sm">
              <Avatar type="icon" size="sm" />
              <Avatar type="initials" initials="ZA" size="sm" />
            </Row>
          </Section>

          <Divider />

          <Section title="Spinner · ProgressBar · Divider">
            <Row label="spinner"><Spinner size="sm" /><Spinner size="md" /></Row>
            <Row label="progress">
              <div className="w-64"><ProgressBar value={65} label="Storage used" showValue /></div>
              <div className="w-64"><ProgressBar value={100} label="Complete" showValue /></div>
            </Row>
            <Row label="divider">
              <div className="w-64"><Divider /></div>
              <div className="flex items-center gap-2 h-8">
                <span className="text-sm text-[var(--color-text-secondary)]">Left</span>
                <Divider orientation="vertical" />
                <span className="text-sm text-[var(--color-text-secondary)]">Right</span>
              </div>
            </Row>
          </Section>

          <Divider />

          <Section title="Alert">
            {/* All 4 variants with onDismiss — consistent close icon across the set */}
            <Alert title="API quota almost full" description="You've used 80% of your free tier." onDismiss={() => {}} />
            <Alert variant="success" title="Component published" description="Now visible in the community catalog." onDismiss={() => {}} />
            <Alert variant="danger" title="API key invalid" description="Generate a new key to continue." onDismiss={() => {}} />
            <Alert variant="warning" title="Breaking change detected" description="This update may affect existing workflows." onDismiss={() => {}} />
          </Section>

          <Divider />

          <Section title="Tooltip">
            <Row>
              <Tooltip content="Delete component" position="top"><Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" /></Tooltip>
              <Tooltip content="Edit component" position="right"><Button icon={Edit} iconOnly variant="ghost" aria-label="Edit" /></Tooltip>
              <Tooltip content="Fork component" position="bottom"><Button icon={GitFork} iconOnly variant="ghost" aria-label="Fork" /></Tooltip>
              <Tooltip content="Upload" position="left"><Button icon={Upload} iconOnly aria-label="Upload" /></Tooltip>
            </Row>
          </Section>

          <Divider />

          <Section title="Popover">
            <Row label="menu">
              <Popover type="menu" trigger={<Button variant="ghost" size="sm">Open menu ↓</Button>} items={[
                { label: 'Edit', icon: Edit, onClick: () => {} },
                { label: 'Fork', icon: GitFork, onClick: () => {} },
                { label: 'Delete', icon: Trash2, onClick: () => {}, danger: true },
              ]} />
            </Row>
            <Row label="content">
              <Popover type="content" trigger={<Button size="sm">Publish ↓</Button>} title="Confirm publish" description="This will make your component visible to the community." footer={
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">Cancel</Button>
                  <Button size="sm">Publish</Button>
                </div>
              } />
            </Row>
          </Section>

          <Divider />

          <Section title="Skeleton">
            <Row label="lines">
              <div className="flex flex-col gap-2 w-64">
                <Skeleton width="80%" height={14} />
                <Skeleton width="60%" height={14} />
                <Skeleton width="90%" height={11} />
              </div>
            </Row>
            <Row label="avatar + rect">
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" width={32} height={32} />
                <div className="flex flex-col gap-1.5">
                  <Skeleton width={120} height={13} />
                  <Skeleton width={80} height={11} />
                </div>
              </div>
              <Skeleton variant="rect" width={200} height={100} />
            </Row>
          </Section>

          <Divider />

          <Section title="FileUpload">
            <div className="max-w-md"><FileUpload accept=".pdf,.png,.jpg" maxSize={10 * 1024 * 1024} multiple /></div>
          </Section>

          <Divider />

          <Section title="Table">
            <Table
              columns={[
                { key: 'name' as const, label: 'Component', sortable: true },
                { key: 'status' as const, label: 'Status', render: (v: string) => <Badge variant={v === 'Published' ? 'success' : v === 'Generated' ? 'info' : 'neutral'}>{v}</Badge> },
                { key: 'downloads' as const, label: 'Downloads', sortable: true },
              ]}
              data={tableData}
              selectable
              selectedRows={selected}
              onSelect={setSelected}
            />
          </Section>

          <Divider />

          <Section title="Pagination — Inline">
            <Pagination currentPage={page} totalPages={24} totalItems={234} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
          </Section>

          <Divider />

          <Section title="Modal">
            <Row><Button onClick={() => setModalOpen(true)}>Open Modal</Button></Row>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add API Key" footer={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button onClick={() => setModalOpen(false)}>Save Key</Button>
              </>
            }>
              <InputField label="API Key" placeholder="sk-ant-api03-••••" required />
            </Modal>
          </Section>

          <Divider />

          <Section title="Pattern — Toolbar">
            <Toolbar tabs={tabs} activeTab={activeToolbarTab} onTabChange={setActiveToolbarTab} actions={[
              { icon: LayoutGrid, onClick: () => setView('grid'), active: view === 'grid', 'aria-label': 'Grid view' },
              { icon: AlignJustify, onClick: () => setView('list'), active: view === 'list', 'aria-label': 'List view' },
              { icon: Filter, onClick: () => {}, 'aria-label': 'Filters' },
            ]} />
          </Section>

          <Divider />

          <Section title="Pattern — FormLayout">
            <FormLayout title="Edit Profile" onSubmit={(e) => e.preventDefault()} footer={
              <>
                <Button variant="ghost" type="button">Discard</Button>
                <Button type="submit">Save Changes</Button>
              </>
            }>
              <FormSection title="General">
                <InputField label="Username" defaultValue="zanexflores" required />
                <InputField label="Bio" placeholder="Tell us about yourself" optional />
              </FormSection>
              <Divider />
              <FormSection title="Preferences">
                <Toggle checked={toggle} onChange={setToggle} label="Email notifications" />
              </FormSection>
            </FormLayout>
          </Section>

          <Divider />

          <Section title="Pattern — EmptyState">
            <div className="grid grid-cols-3 gap-4">
              <EmptyState icon={Package} title="No components yet" description="Create your first component to get started." action={{ label: 'New Component', onClick: () => {} }} />
              <EmptyState icon={Search} title="No results found" description="Try adjusting or clearing your filters." action={{ label: 'Clear filters', onClick: () => {}, variant: 'ghost' }} />
              <EmptyState icon={AlertCircle} title="Failed to load" description="Something went wrong. Please try again." action={{ label: 'Retry', onClick: () => {}, variant: 'ghost' }} danger />
            </div>
          </Section>

          <Divider />

          <Section title="Toast — static preview">
            <div className="max-w-sm">
              <Toast message="Component published successfully." onDismiss={() => {}} duration={0} />
            </div>
          </Section>

          <div className="h-20" />
        </main>
      </div>

      {/* Sticky Pagination — left offset syncs with sidebar width */}
      <div className="fixed bottom-0 right-0" style={{ zIndex: 'var(--z-toast)', left: sidebarCollapsed ? 52 : 220 }}>
        <Pagination variant="sticky" currentPage={page} totalPages={24} totalItems={234} pageSize={pageSize} onPageChange={setPage} onPageSizeChange={setPageSize} />
      </div>
    </div>
  )
}
```

---

## Part 6 — Figma MCP Integration

> Use this every time a designer shares a new Figma design. Run steps in order.

### Step 1 — Extract design elements
```
Using the Figma MCP tool, read the design at [figma-node-id].

List every UI element:
- Type (button, input, card, table, etc.)
- Size (width × height px)
- Colors (hex values)
- Spacing between elements (px)
- Border radius (px)
- Typography (size px, weight)
- Icon names if visible

Do not implement anything yet.
```

### Step 2 — Map to Trustabl components
```
Map each element from Step 1 to a Trustabl Design System component:
Button · InputField · Card · Badge · Modal · Toast · Divider · Spinner
ProgressBar · Toggle · Checkbox · Radio · FileUpload · Tooltip · Avatar
Tabs · NavItem · Table · Skeleton · Alert · Popover · Pagination · Dropdown
Sidebar (pattern) · Toolbar (pattern) · FormLayout (pattern) · EmptyState (pattern)

For each element:
1. Trustabl component name + props/variants to use
2. Flag any element with NO match

Do not implement yet.
```

### Step 3 — Check token alignment
```
Given these values from the Figma design:
Colors:  [hex values from Step 1]
Spacing: [px values from Step 1]
Radius:  [px values from Step 1]

Map each to Trustabl Design System tokens from AGENT.md Part 2.
Flag any value that does not map to an existing token — these need design review.
```

### Step 4 — Implement
```
Implement the Figma design using only Trustabl components mapped in Step 2.
Follow AGENT.md Part 2 rules exactly.
After each file, run the Part 4 per-file checklist.
```

### Step 5 — Verify
- `npm run build` → zero errors
- Visit the page, compare against Figma side by side
- Run Part 4 checklist on every new file

### Figma → Trustabl Quick Map
```
CTA button              → Button variant="primary"
Secondary action        → Button variant="secondary" or "ghost"
Destructive action      → Button variant="danger"
Text link button        → Button variant="text"
Text input / field      → InputField
Select / picker         → Dropdown
Content container       → Card
Status label / tag      → Badge
Dialog / overlay        → Modal
Notification            → Toast
Inline feedback         → Alert
Loading spinner         → Spinner (inline) / Skeleton (content placeholder)
Progress bar            → ProgressBar
On/off switch           → Toggle
Multi-select boxes      → Checkbox
Single-select circles   → Radio
File picker / dropzone  → FileUpload
Hover info bubble       → Tooltip
Click info bubble       → Popover
User avatar / photo     → Avatar
Navigation tabs         → Tabs
Sidebar menu item       → NavItem
Data grid / list        → Table
Page navigator          → Pagination
Left navigation panel   → Sidebar (pattern)
Filter / view toolbar   → Toolbar (pattern)
Settings / edit form    → FormLayout (pattern)
No data / empty state   → EmptyState (pattern)
Separator line          → Divider
```

### Flags requiring design review before implementation
```
❌ Color in Figma not in Trustabl token system → add token or use nearest
❌ Spacing not on 4px grid → round to nearest allowed value
❌ Border radius not matching any --radius-* token → align to token
❌ Font size not in Trustabl scale → use nearest scale value
❌ Component has no Trustabl equivalent → evaluate:
   must have 2+ distinct use cases AND cannot be composed from existing components
```

---

## Part 7 — How to Prompt

### Claude Code (project files in repo root)
Place `AGENT.md` and `cf-design-system.md` in your project root. Claude Code reads `AGENT.md` automatically.

**Starting prompt:**
```
Read AGENT.md completely before writing any code.
Then follow the phases in Part 1 starting from [phase number].
Confirm you've read it by stating: the accent color, the button radius token, and the correct transition string.
```

**Per-component prompt:**
```
Read AGENT.md Part 2 and Part 3.
Then read the #### [ComponentName] section in cf-design-system.md section 4.1.
Implement the component, apply all fixes from Part 3, then run the Part 4 checklist.
```

### Codex (paste into system prompt)
```
You are implementing the Trustabl Design System. Rules (non-negotiable):

RADIUS: never rounded-xl/lg/md — use rounded-[var(--radius-sharp/base/card/pill)]
  sharp(8px)=inputs,nav · base(12px)=buttons,toast · card(15px)=cards,modals · pill=badges,avatars

SPACING: 4px grid only — gap-1/2/3/4/5/6/12/16
TRANSITIONS: transition-[background,border-color,color] duration-150 ease
FOCUS: focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]
DISABLED: disabled:opacity-40 disabled:cursor-not-allowed
COLORS: all via var(--color-*) — zero raw hex, zero bg-white/black/text-white/black
Z-INDEX: style={{ zIndex: 'var(--z-dropdown/modal/toast)' }} — zero z-20/30/40/50 classes
ICONS: lucide-react only · 16px inline · 24px standalone
STACK: Next.js app router · Tailwind v4 · no shadcn/radix/heroicons

KEY SIZES:
Button sm=h-[36px] md=h-[42px] lg=h-[46px] · Input md=h-[42px] · Modal max-w-[440px]
Sidebar expanded=220px collapsed=52px · NavItem h-9 · Pagination btn w-8 h-8
```

### Quick verification (paste into Claude Code after implementation)
```
Scan all files in components/ui/ and components/patterns/ for:
1. rounded-xl · rounded-lg · rounded-md · rounded-2xl
2. ease-[ease] · transition-all
3. z-20 · z-30 · z-40 · z-50 (as Tailwind classes)
4. bg-white · bg-black · text-white · text-black
5. Raw hex (#RRGGBB) in className strings
6. Import from @radix-ui · shadcn · @heroicons · react-icons
7. Dropdown trigger missing aria-haspopup="menu"
8. Icon-only button without aria-label
9. InputField without a label prop

Report: file name · violation type · suggested fix.
```

---

*Trustabl Design System v0.4.0 — 04/28/26*

## Part 8 — UI Docs Page (Storybook-style Reference)

> A developer reference page at `/ui-docs`. Shows every component with its props, sizes, tokens, and states annotated. Separate from `/ui-preview` which is for visual verification only.

**File:** `app/ui-docs/page.tsx`
**Route:** `http://localhost:3000/ui-docs`

### Setup — helper components

```tsx
// app/ui-docs/page.tsx
'use client'
import { useState } from 'react'
import {
  Button, Badge, InputField, Card, CardHeader, CardBody, CardFooter,
  Divider, Spinner, ProgressBar, Toggle, Checkbox, Radio,
  Tabs, NavItem, Avatar, Skeleton, Alert, Tooltip, Popover,
  Pagination, Dropdown, Table, FileUpload, Modal, Toast,
} from '@/components/ui'
import { Toolbar } from '@/components/patterns/Toolbar'
import { FormLayout, FormSection } from '@/components/patterns/FormLayout'
import { EmptyState } from '@/components/patterns/EmptyState'
import {
  Plus, Trash2, Search, Home, Grid, Globe, Settings,
  Monitor, Eye, Filter, LayoutGrid, AlignJustify,
} from 'lucide-react'

// ── Doc layout helpers ──────────────────────────────────────────────────────

function DocPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page)] px-8 py-10 flex flex-col gap-16">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Trustabl Design System</h1>
        <p className="text-sm text-[var(--color-text-tertiary)] mt-1">Component reference — sizes, tokens, states, props</p>
      </div>
      {children}
    </div>
  )
}

function DocSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{title}</h2>
        <div className="flex-1 h-px bg-[var(--color-border-muted)]" />
      </div>
      {children}
    </section>
  )
}

function Variant({
  label, spec, children,
}: { label: string; spec?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">{label}</span>
        {spec && <span className="text-[11px] font-mono text-[var(--color-accent-default)]">{spec}</span>}
      </div>
      <div className="flex flex-wrap items-center gap-3 p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)]">
        {children}
      </div>
    </div>
  )
}

function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-[11px] font-mono border-collapse">
      <tbody>
        {rows.map(([key, val]) => (
          <tr key={key} className="border-b border-[var(--color-border-muted)] last:border-0">
            <td className="py-1.5 pr-4 text-[var(--color-text-secondary)] whitespace-nowrap">{key}</td>
            <td className="py-1.5 text-[var(--color-accent-default)]">{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function PropTable({ rows }: { rows: [string, string, string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border-muted)]">
            {['Prop','Type','Default','Description'].map(h => (
              <th key={h} className="py-2 px-3 text-left text-[var(--color-text-tertiary)] font-semibold uppercase tracking-wide">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([prop, type, def, desc]) => (
            <tr key={prop} className="border-b border-[var(--color-border-muted)] last:border-0">
              <td className="py-2 px-3 font-mono text-[var(--color-accent-default)]">{prop}</td>
              <td className="py-2 px-3 font-mono text-[var(--color-text-secondary)]">{type}</td>
              <td className="py-2 px-3 font-mono text-[var(--color-text-tertiary)]">{def}</td>
              <td className="py-2 px-3 text-[var(--color-text-secondary)]">{desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TwoCol({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-6 items-start">
      <div>{left}</div>
      <div className="p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)]">{right}</div>
    </div>
  )
}
```

### Page body — all components documented

```tsx
export default function UIDocsPage() {
  const [toggle, setToggle] = useState(true)
  const [checkbox, setCheckbox] = useState(true)
  const [radio, setRadio] = useState('a')
  const [activeTab, setActiveTab] = useState('all')
  const [dropdown, setDropdown] = useState('langflow')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<string[]>([])
  const [modal, setModal] = useState(false)

  const platformOptions = [
    { label: 'Langflow', value: 'langflow' },
    { label: 'Autogen', value: 'autogen' },
    { label: 'Dify', value: 'dify' },
  ]

  const tabs = [
    { label: 'All', value: 'all', badge: 374 },
    { label: 'Generated', value: 'generated', badge: 138 },
    { label: 'Published', value: 'published', badge: 201 },
  ]

  return (
    <DocPage>

      {/* ── BUTTON ─────────────────────────────────────────── */}
      <DocSection title="Button">
        <TwoCol
          left={
            <SpecTable rows={[
              ['height sm',   'h-[36px] px-3 text-xs'],
              ['height md',   'h-[42px] px-4 text-sm'],
              ['height lg',   'h-[46px] px-5 text-sm'],
              ['radius',      'rounded-[var(--radius-base)] — 12px'],
              ['font',        'font-medium'],
              ['transition',  'duration-150 ease'],
              ['icon size',   '16px, gap-[var(--space-tight)]'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="variant">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="text">Text</Button>
              </Variant>
              <Variant label="size" spec="sm=36px · md=42px · lg=46px">
                <Button size="sm" variant="secondary">Small</Button>
                <Button size="md" variant="secondary">Medium</Button>
                <Button size="lg" variant="secondary">Large</Button>
              </Variant>
              <Variant label="state">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button icon={Plus} iconOnly aria-label="Add" />
                <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
              </Variant>
            </div>
          }
        />
        <PropTable rows={[
          ['variant',  "'primary'|'secondary'|'ghost'|'danger'|'text'", "'primary'", 'Visual style'],
          ['size',     "'sm'|'md'|'lg'",                                 "'md'",      'Height variant'],
          ['loading',  'boolean',                                        'false',     'Shows spinner, disables button'],
          ['icon',     'React.ElementType',                              'undefined', 'Lucide icon — 16px'],
          ['iconOnly', 'boolean',                                        'false',     'Square aspect ratio, no text'],
          ['disabled', 'boolean',                                        'false',     'opacity-40, not interactive'],
        ]}/>
      </DocSection>

      <Divider />

      {/* ── BADGE ──────────────────────────────────────────── */}
      <DocSection title="Badge">
        <TwoCol
          left={
            <SpecTable rows={[
              ['size sm',   'px-2 py-0.5 text-[11px]'],
              ['size md',   'px-3 py-1 text-xs'],
              ['shape pill','rounded-[var(--radius-pill)]'],
              ['shape sharp','rounded-[var(--radius-sharp)] — 8px'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="variant · pill md">
                <Badge variant="info">Info</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="neutral">Neutral</Badge>
              </Variant>
              <Variant label="shape · sharp sm">
                <Badge variant="info" shape="sharp" size="sm">Info</Badge>
                <Badge variant="success" shape="sharp" size="sm">Success</Badge>
                <Badge variant="warning" shape="sharp" size="sm">Warning</Badge>
                <Badge variant="danger" shape="sharp" size="sm">Danger</Badge>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── INPUT FIELD ────────────────────────────────────── */}
      <DocSection title="InputField">
        <TwoCol
          left={
            <SpecTable rows={[
              ['height md',  'h-[42px] px-3'],
              ['height lg',  'h-[46px] px-3'],
              ['radius',     'rounded-[var(--radius-sharp)] — 8px'],
              ['label',      'text-xs font-medium'],
              ['error/hint', 'text-[11px] below input'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="default">
                <div className="w-56"><InputField label="Username" placeholder="Enter username" required /></div>
                <div className="w-56"><InputField label="Bio" placeholder="Optional text" optional /></div>
              </Variant>
              <Variant label="error + hint">
                <div className="w-56"><InputField label="Email" defaultValue="bad@!" error="Enter a valid email." required /></div>
                <div className="w-56"><InputField label="Password" type="password" hint="Min. 8 characters." required /></div>
              </Variant>
              <Variant label="with icon">
                <div className="w-56"><InputField label="Search" iconLeft={Search} placeholder="Search..." /></div>
                <div className="w-56"><InputField label="Password" type="password" iconRight={Eye} required /></div>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── DROPDOWN ───────────────────────────────────────── */}
      <DocSection title="Dropdown">
        <TwoCol
          left={
            <SpecTable rows={[
              ['trigger h', 'h-[42px] px-3'],
              ['radius',    'rounded-[var(--radius-sharp)] — 8px'],
              ['menu radius','rounded-[var(--radius-base)] — 12px'],
              ['menu max-h','max-h-[300px] overflow-y-auto'],
              ['z-index',   'var(--z-dropdown) — 20'],
              ['ARIA',      'aria-haspopup=menu, role=menu'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="single select">
                <div className="w-56">
                  <Dropdown label="Platform" options={platformOptions} value={dropdown} onChange={v => setDropdown(v as string)} />
                </div>
              </Variant>
              <Variant label="multi select">
                <div className="w-72">
                  <Dropdown type="multi" label="Platforms" options={platformOptions} value={[]} onChange={() => {}} />
                </div>
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── CARD ───────────────────────────────────────────── */}
      <DocSection title="Card">
        <TwoCol
          left={
            <SpecTable rows={[
              ['radius',      'rounded-[var(--radius-card)] — 15px'],
              ['bg',          'var(--color-bg-surface)'],
              ['header/footer','px-4 py-3'],
              ['body',        'p-4'],
              ['structure',   'flex flex-col (CardBody flex-1)'],
            ]}/>
          }
          right={
            <div className="grid grid-cols-2 gap-4 max-w-2xl">
              <Card>
                <CardHeader><span className="text-sm font-medium">Default</span><Badge variant="info" size="sm">Active</Badge></CardHeader>
                <CardBody>Routes requests to the appropriate agent component.</CardBody>
                <CardFooter><span className="text-[11px] text-[var(--color-text-tertiary)]">2h ago</span><Button size="sm" variant="ghost">View</Button></CardFooter>
              </Card>
              <Card variant="interactive">
                <CardHeader><span className="text-sm font-medium">Interactive</span><Badge variant="success" size="sm">Stable</Badge></CardHeader>
                <CardBody>Hover to see border + background state change.</CardBody>
                <CardFooter><span className="text-[11px] text-[var(--color-text-tertiary)]">4h ago</span><Button size="sm">Use</Button></CardFooter>
              </Card>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── AVATAR · SPINNER · PROGRESS ────────────────────── */}
      <DocSection title="Avatar · Spinner · ProgressBar">
        <div className="grid grid-cols-3 gap-6">
          <Variant label="avatar" spec="sm=24px · md=32px · radius=pill">
            <Avatar type="icon" size="md" />
            <Avatar type="initials" initials="ZA" size="md" />
            <Avatar type="icon" size="sm" />
            <Avatar type="initials" initials="ZA" size="sm" />
          </Variant>
          <Variant label="spinner" spec="sm=14px · md=20px · border-2">
            <Spinner size="sm" />
            <Spinner size="md" />
          </Variant>
          <div className="flex flex-col gap-3">
            <div className="text-xs font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">ProgressBar</div>
            <div className="text-[11px] font-mono text-[var(--color-accent-default)]">h-[6px] · radius-pill</div>
            <div className="p-4 rounded-[var(--radius-base)] bg-[var(--color-bg-surface)] border border-[var(--color-border-muted)] flex flex-col gap-3">
              <ProgressBar value={65} label="Storage" showValue />
              <ProgressBar value={100} label="Complete" showValue />
              <ProgressBar value={30} label="Upload" showValue />
            </div>
          </div>
        </div>
      </DocSection>

      <Divider />

      {/* ── FORM CONTROLS ──────────────────────────────────── */}
      <DocSection title="Toggle · Checkbox · Radio">
        <TwoCol
          left={
            <SpecTable rows={[
              ['toggle track',  'w-9 h-5 radius-pill'],
              ['toggle thumb',  'w-3.5 h-3.5 top-[3px]'],
              ['checkbox',      'w-4 h-4 rounded-[4px]'],
              ['radio',         'w-4 h-4 radius-pill'],
              ['dot (radio)',   '6px radius-pill'],
              ['checked bg',    'var(--color-text-primary)'],
            ]}/>
          }
          right={
            <div className="flex gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">toggle</span>
                <Toggle checked={toggle} onChange={setToggle} label="Enabled" />
                <Toggle checked={false} onChange={() => {}} label="Off" />
                <Toggle checked disabled onChange={() => {}} label="Disabled" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">checkbox</span>
                <Checkbox checked={checkbox} onChange={setCheckbox} label="Checked" />
                <Checkbox checked={false} onChange={() => {}} label="Unchecked" />
                <Checkbox checked indeterminate onChange={() => {}} label="Indeterminate" />
                <Checkbox checked={false} disabled onChange={() => {}} label="Disabled" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-mono text-[var(--color-accent-default)]">radio</span>
                <Radio name="doc" value="a" checked={radio === 'a'} onChange={setRadio} label="Option A" />
                <Radio name="doc" value="b" checked={radio === 'b'} onChange={setRadio} label="Option B" />
                <Radio name="doc" value="c" checked={false} disabled onChange={() => {}} label="Disabled" />
              </div>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── TABS ───────────────────────────────────────────── */}
      <DocSection title="Tabs">
        <TwoCol
          left={
            <SpecTable rows={[
              ['underline tab', 'h-10 px-3.5 border-b-2'],
              ['pill container','p-1 radius-base'],
              ['pill tab',      'h-8 px-3.5 radius-sharp'],
              ['active bg',     'var(--color-bg-raised)'],
              ['active border', 'var(--color-border-muted)'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="underline">
                <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
              </Variant>
              <Variant label="pill">
                <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} variant="pill" />
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── ALERT ──────────────────────────────────────────── */}
      <DocSection title="Alert">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',   'px-4 py-3.5'],
              ['radius',    'rounded-[var(--radius-base)] — 12px'],
              ['border-l',  '3px solid (structural, --color-border-muted)'],
              ['icon',      '16px, color: --color-text-primary (white)'],
              ['title',     'text-sm font-semibold'],
              ['desc',      'text-xs'],
              ['dismiss',   'only when onDismiss passed'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-2">
              <Alert title="API quota almost full" description="80% of free tier used." onDismiss={() => {}} />
              <Alert variant="success" title="Component published" description="Visible in community catalog." onDismiss={() => {}} />
              <Alert variant="danger" title="API key invalid" description="Generate a new key to continue." onDismiss={() => {}} />
              <Alert variant="warning" title="Breaking change detected" description="This may affect existing workflows." onDismiss={() => {}} />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── SKELETON ───────────────────────────────────────── */}
      <DocSection title="Skeleton">
        <TwoCol
          left={
            <SpecTable rows={[
              ['line',    'h-[14px] radius-sharp'],
              ['caption', 'h-[11px] radius-sharp'],
              ['circle',  'radius-pill'],
              ['rect',    'radius-base'],
              ['animation','shimmer 1.5s infinite'],
            ]}/>
          }
          right={
            <div className="flex gap-6 items-start">
              <div className="flex flex-col gap-2 w-40">
                <Skeleton width="80%" height={14} />
                <Skeleton width="60%" height={14} />
                <Skeleton width="90%" height={11} />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton variant="circle" width={32} height={32} />
                <div className="flex flex-col gap-1.5">
                  <Skeleton width={100} height={13} />
                  <Skeleton width={70} height={11} />
                </div>
              </div>
              <Skeleton variant="rect" width={120} height={80} />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── TOOLTIP + POPOVER ──────────────────────────────── */}
      <DocSection title="Tooltip · Popover">
        <TwoCol
          left={
            <SpecTable rows={[
              ['tooltip padding', 'px-2.5 py-1.5'],
              ['tooltip radius',  'radius-sharp — 8px'],
              ['tooltip bg',      'var(--color-text-primary)'],
              ['tooltip text',    'text-xs font-medium, var(--color-bg-page)'],
              ['arrow',           '6px CSS triangle, inline style object'],
              ['trigger',         'hover + focus'],
              ['popover radius',  'radius-base — 12px'],
              ['popover z',       'var(--z-dropdown) — 20'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-4">
              <Variant label="tooltip — top">
                <Tooltip content="Delete this component" position="top">
                  <Button icon={Trash2} iconOnly variant="danger" aria-label="Delete" />
                </Tooltip>
                <Tooltip content="Edit component" position="right">
                  <Button icon={Plus} iconOnly variant="ghost" aria-label="Add" />
                </Tooltip>
              </Variant>
              <Variant label="popover menu">
                <Popover type="menu" trigger={<Button variant="ghost" size="sm">Open menu</Button>} items={[
                  { label: 'Edit', icon: Plus, onClick: () => {} },
                  { label: 'Delete', icon: Trash2, onClick: () => {}, danger: true },
                ]} />
              </Variant>
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── PAGINATION ─────────────────────────────────────── */}
      <DocSection title="Pagination">
        <TwoCol
          left={
            <SpecTable rows={[
              ['page btn',   'w-8 h-8 (32px) radius-sharp'],
              ['container',  'px-4 py-3 radius-base'],
              ['select',     'pl-2 pr-6 appearance-none'],
              ['sticky',     'fixed bottom-0, left = sidebar width'],
              ['z-index',    'var(--z-toast) — 40'],
            ]}/>
          }
          right={
            <Pagination
              currentPage={page}
              totalPages={12}
              totalItems={120}
              pageSize={10}
              onPageChange={setPage}
              onPageSizeChange={() => {}}
            />
          }
        />
      </DocSection>

      <Divider />

      {/* ── MODAL ──────────────────────────────────────────── */}
      <DocSection title="Modal">
        <TwoCol
          left={
            <SpecTable rows={[
              ['max-w',    'max-w-[440px]'],
              ['radius',   'rounded-[var(--radius-card)] — 15px'],
              ['header',   'px-5 py-[18px]'],
              ['title',    'text-[15px] font-semibold'],
              ['body',     'px-5 py-5 text-sm'],
              ['footer',   'px-5 py-3.5 justify-end gap-2'],
              ['dividers', 'border-[var(--color-border-muted)] — all variants same'],
              ['backdrop', 'var(--color-backdrop) rgba(0,0,0,0.6)'],
              ['z-index',  'var(--z-modal) — 30'],
              ['focus',    'focus-trap-react, Esc closes'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-3">
              <Button onClick={() => setModal(true)}>Open Modal</Button>
              <Modal open={modal} onClose={() => setModal(false)} title="Add API Key" footer={
                <><Button variant="secondary" onClick={() => setModal(false)}>Cancel</Button><Button onClick={() => setModal(false)}>Save Key</Button></>
              }>
                <InputField label="API Key" placeholder="sk-ant-api03-..." required />
              </Modal>
              <p className="text-[11px] text-[var(--color-text-tertiary)]">Warning and danger variants use same header border — intent via title + button only.</p>
            </div>
          }
        />
        <PropTable rows={[
          ['variant', "'default'|'warning'|'danger'", "'default'", 'Intent — affects title copy + footer button only, not header border'],
          ['open',    'boolean',                       'required',  'Controlled visibility'],
          ['onClose', '() => void',                   'required',  'Esc + backdrop click + close button'],
          ['footer',  'React.ReactNode',               'undefined', 'Renders in footer — typically Cancel + action buttons'],
        ]}/>
      </DocSection>

      <Divider />

      {/* ── COMMUNITY CARD ─────────────────────────────────── */}
      <DocSection title="Pattern — CommunityCard">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',     'p-4'],
              ['radius',      'rounded-[var(--radius-card)] — 15px'],
              ['icon wrap',   'w-10 h-10, rounded-[10px]'],
              ['description', 'flex-1 line-clamp-2'],
              ['verified',    'outlined success badge'],
              ['star',        'fill-[var(--color-warning-text)] amber'],
              ['container',   'grid items-stretch for equal height'],
            ]}/>
          }
          right={
            <div className="grid grid-cols-2 gap-3 items-stretch">
              <CommunityCard
                title="payment-bridge"
                description="Simplify global transactions with a unified interface for credit cards and digital wallets."
                tags={['AI Agents']}
                verified
                stats={{ rating: 4.8, forks: 12, comments: 27, downloads: 99 }}
                author={{ name: 'Parker Solis', initials: 'PS' }}
                platform="n8n"
                icon={Package}
              />
              <CommunityCard
                variant="forked"
                title="payment-bridge"
                username="parker-solis"
                description="A forked workflow adapter for marketplace payment orchestration."
                tags={['Automation']}
                verified
                stats={{ rating: 4.8, comments: 27, downloads: 99 }}
                author={{ name: 'Parker Solis', initials: 'PS' }}
                platform="Langflow"
                icon={GitFork}
              />
            </div>
          }
        />
      </DocSection>

      <Divider />

      {/* ── COMPONENT CARD ─────────────────────────────────── */}
      <DocSection title="Pattern — ComponentCard">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',     'p-3.5'],
              ['radius',      'rounded-[var(--radius-card)] — 15px'],
              ['icon wrap',   'w-9 h-9 (36px) radius-sharp'],
              ['vdivider',    'w-px h-[14px] between badge + stats'],
              ['hdivider',    'h-px between stats + platforms'],
              ['checkbox',    'w-[15px] h-[15px] absolute top-right (trash)'],
              ['action btns', 'w-7 h-7 radius-sharp (trash only)'],
              ['trashed',     'opacity-[0.72]'],
            ]}/>
          }
          right={
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3 items-stretch">
                <ComponentCard status="published" title="nvidia-distill" timestamp="11 min ago" icon={Monitor} stats={{ forks: 53, comments: 27, rating: 4.8, downloads: 12 }} platforms={['Zapier', 'n8n']} />
                <ComponentCard status="generated" title="smart-recruiter" timestamp="3h ago" icon={Monitor} platforms={['Langflow']} />
              </div>
              <div className="grid grid-cols-2 gap-3 items-stretch">
                <ComponentCard status="published" variant="forked" title="completion-design" username="john-doe" timestamp="5 min ago" icon={Monitor} stats={{ comments: 2, rating: 4.6, downloads: 12 }} platforms={['Dify']} />
                <ComponentCard status="generated" trashed title="pdf-extractor" timestamp="Deleted 2 days ago" icon={Monitor} platforms={['n8n']} selected={false} onSelect={() => {}} onRestore={() => {}} onDelete={() => {}} />
              </div>
            </div>
          }
        />
        <PropTable rows={[
          ['status',    "'published'|'generated'",  'required',    'Controls stats vs hint text'],
          ['variant',   "'own'|'forked'",           "'own'",       'Forked shows username in accent, no forks stat'],
          ['trashed',   'boolean',                  'false',       'opacity-[0.72], checkbox + restore/delete icons'],
          ['selected',  'boolean',                  'false',       'Checkbox checked state (trashed only)'],
          ['onCollapse','(v: boolean) => void',     'undefined',   'Sidebar collapse callback — use for layout offset'],
        ]}/>
      </DocSection>

      <Divider />

      {/* ── EMPTY STATE ────────────────────────────────────── */}
      <DocSection title="Pattern — EmptyState">
        <TwoCol
          left={
            <SpecTable rows={[
              ['padding',    'px-8 py-12'],
              ['radius',     'rounded-[var(--radius-card)] — 15px'],
              ['icon wrap',  'w-14 h-14 (56px) radius-card'],
              ['icon',       '24px'],
              ['desc max-w', 'max-w-[280px]'],
              ['danger',     'danger-bg + danger-border on icon wrap'],
            ]}/>
          }
          right={
            <div className="grid grid-cols-3 gap-3">
              <EmptyState icon={Package} title="No components" description="Create your first component." action={{ label: 'New', onClick: () => {} }} />
              <EmptyState icon={Search} title="No results" description="Try adjusting filters." action={{ label: 'Clear', onClick: () => {}, variant: 'ghost' }} />
              <EmptyState icon={Trash2} title="Load failed" description="Something went wrong." action={{ label: 'Retry', onClick: () => {}, variant: 'ghost' }} danger />
            </div>
          }
        />
      </DocSection>

    </DocPage>
  )
}
```
