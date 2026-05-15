# Trustabl Design System

Root-level Next.js implementation of the Trustabl design system.

This repo is not a generic `create-next-app` starter anymore. It contains the Trustabl token layer, reusable UI components, pattern components, a visual verification route, and a developer reference route.

## Stack

- Next.js 16 app router with root `app/` routes
- React 19 and TypeScript
- Tailwind CSS v4 using CSS variables from `app/globals.css`
- `lucide-react` icons only
- `focus-trap-react` for modal focus containment
- Inter and JetBrains Mono through `next/font/google`

Do not add shadcn, Radix, Headless UI, Heroicons, React Icons, or catch-all primitive files.

## Source Of Truth

- `AGENTS.md` is the short execution contract for agents working in this repo.
- `AGENT.md` is the long-form implementation guide and phase checklist.
- `cf-design-system.md` is the long-form visual/component/token specification.
- `docs/` contains the normalized local governance summaries used during day-to-day work.
- `app/globals.css` is the active token implementation.

If the long-form MD files contradict each other, follow the normalized rule in `AGENTS.md` and update docs in the same change.

## Routes

- `/` redirects to `/ui-preview`.
- `/ui-preview` is the visual contract route for rendered component and pattern states.
- `/ui-docs` is the Storybook-style developer reference with specs, states, and prop notes.

## Component Inventory

UI components live in `components/ui/` and export through `components/ui/index.ts`.

Pattern components live in `components/patterns/` and are imported directly by path.

Current pattern layer:

- `Sidebar`
- `Toolbar`
- `FormLayout`
- `EmptyState`

## Token Rules

- Components use semantic tokens such as `--color-bg-surface`, not primitive tokens.
- Raw hex is allowed only in token definitions inside `app/globals.css`.
- Radius must use `--radius-sharp`, `--radius-base`, `--radius-card`, or `--radius-pill`.
- Z-index must use CSS variables through inline style, not Tailwind `z-*` classes.
- Interactive transitions should use explicit transition properties, not `transition-all`.

## Verification

Run these before considering governance or component work complete:

```bash
npm run lint
npm run build
```

Recommended static checks:

```bash
rg -n "transition-all|ease-\\[ease\\]|\\bz-(10|20|30|40|50)\\b" components app
rg -n "aria-haspopup=.|role=.button" components app/ui-docs app/ui-preview
rg -n "#[0-9A-Fa-f]{3,6}" components app
```

Browser-check `/ui-preview` and `/ui-docs` after UI changes. Build passing is necessary, but it does not prove the preview contract is visually complete.
