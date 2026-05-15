<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes. APIs, conventions, and file structure may differ from older Next.js versions. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Trustabl Design System Agent Contract

Work from the repo, not memory. This project is a root-level Next.js app using `app/` and `components/`; do not create a nested `cf-app`.

## Source Order

1. `AGENTS.md` is the short local execution contract.
2. `AGENT.md` is the long implementation and verification guide.
3. `cf-design-system.md` is the long token, visual, and component spec.
4. `docs/` is the normalized local summary.
5. Existing component code wins only when it is intentionally documented.

If the long guides conflict, keep the normalized rule in this file and update docs in the same change.

## Stack Rules

- Next.js 16 app router, root `app/` directory.
- Tailwind CSS v4 with tokens via CSS variables in `app/globals.css`.
- Icons: `lucide-react` only.
- Fonts: Inter and JetBrains Mono through `next/font/google`.
- Modal focus containment: `focus-trap-react`.
- Never install shadcn, Radix, Headless UI, Heroicons, React Icons, or broad primitive utility libraries unless the user explicitly changes the system.

## Token Rules

- Raw color values belong in `app/globals.css` token definitions only.
- Components and patterns must use semantic tokens such as `--color-bg-surface`, `--color-text-primary`, and `--color-border-muted`.
- Components must not reference primitive tokens directly.
- Keep the `[data-theme="light"]` block even when light mode is not active.
- Keep accent tokens; `--color-accent-default` is required for primary actions.

## Layout And Styling Rules

- Use radius tokens only: `--radius-sharp`, `--radius-base`, `--radius-card`, `--radius-pill`.
- Do not use `rounded-xl`, `rounded-lg`, `rounded-md`, `rounded-2xl`, or `rounded-3xl`.
- Use the 4px spacing grid. Avoid off-scale values such as `gap-7`, `gap-9`, and `gap-11`.
- Use z-index CSS variables through inline style: `--z-overlay`, `--z-dropdown`, `--z-modal`, `--z-toast`.
- Do not use Tailwind `z-10`, `z-20`, `z-30`, `z-40`, or `z-50`.
- Interactive transitions must target explicit properties. Do not use `transition-all` or `ease-[ease]`.

## Accessibility Rules

- Icon-only buttons need an `aria-label`.
- Input fields need `htmlFor`, generated ids, `aria-invalid`, and `aria-describedby` when relevant.
- Modal uses `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, Escape close, backdrop close, body scroll lock, and focus trap.
- Dropdown currently follows the project guide's menu-style trigger rule: `aria-haspopup="menu"`. Do not document a different composite ARIA pattern unless its keyboard behavior is implemented.
- Do not use clickable `div` cards with `role="button"` as the default pattern. Use a real `button` root for clickable cards, or use a non-interactive shell with explicit buttons/links inside.

## Preview And Docs Rules

- `/ui-preview` is the visual verification contract. Every required component, state, and pattern variant must be visibly represented.
- `/ui-docs` is the developer reference. Keep prop tables and spec annotations aligned with actual component APIs.
- User-facing docs and preview copy should not contain mojibake or stale copied guide contradictions.

## Verification

Run after component or governance changes:

```bash
npm run lint
npm run build
```

Also run targeted searches for forbidden classes, stale ARIA docs, clickable `div` wrappers, and raw hex outside token files.
