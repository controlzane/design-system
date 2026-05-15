# Trustabl Design System Foundations

This document is the concise local summary of the token and styling rules from `AGENT.md` and `cf-design-system.md`.

## Token Layers

The system is layered:

```text
Primitive -> Semantic -> Component -> Pattern -> Page
```

Primitive tokens define raw values in `app/globals.css`. Components must use semantic tokens and must not reference primitives directly.

## Color Intent

- `--color-bg-page`: page background.
- `--color-bg-surface`: cards, sidebars, and panels.
- `--color-bg-overlay`: dropdowns, menus, and modal content.
- `--color-bg-raised`: hover states and active fills.
- `--color-border-muted`: default borders.
- `--color-border-focus`: focus rings and selected/active borders.
- `--color-accent-default`: primary actions only.
- Semantic colors are for state and intent, not decoration.

Raw hex belongs in token definitions only.

## Spacing

Use the 4px grid:

- `--space-tight`: 4px, tight icon gaps.
- `--space-inner`: 8px, component internals.
- `--space-base`: 16px, default spacing.
- `--space-section`: 24px, between components.
- `--space-layout`: 48px, between page sections.
- `--space-page`: 64px, page-level margins.

Avoid off-scale spacing such as `gap-7`, `gap-9`, and `gap-11`. `gap-1.5` is allowed only for compact tab or toolbar icon/text spacing.

## Radius

- `--radius-sharp`: inputs, dropdowns, nav items, tags, icon buttons, table wrappers.
- `--radius-base`: buttons, toast, popovers, toolbar, tabs container, pagination container.
- `--radius-card`: cards, modals, panels, sidebar, form layout, empty state icon wrap.
- `--radius-pill`: badges, avatars, toggles, progress bars.

Do not use Tailwind named radius classes such as `rounded-xl`, `rounded-lg`, or `rounded-md`.

## Typography

- `text-[11px]`: captions, hints, errors, table headers, small badges.
- `text-xs`: form labels and medium badges.
- `text-sm`: nav, dropdown, card body, and tab labels.
- `text-[15px]`: modal and form layout titles.
- `text-2xl`: page headings.

Use at most two type sizes per component.

## Motion And Z-Index

Interactive elements should use explicit transitions such as `transition-[background,border-color,color] duration-150 ease`.

Use z-index variables through inline styles:

- `--z-overlay`: sticky headers.
- `--z-dropdown`: dropdowns, popovers, tooltips.
- `--z-modal`: modals.
- `--z-toast`: toasts and sticky pagination.
