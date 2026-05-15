# Trustabl Design System Governance

## Source Of Truth

Use this order when rules disagree:

1. `AGENTS.md` for normalized local execution rules.
2. `AGENT.md` for implementation phases and checklists.
3. `cf-design-system.md` for long-form visual and component specs.
4. `docs/` for concise local summaries.
5. Existing code only when the behavior is intentionally documented.

When resolving a conflict, update docs and implementation together.

## Adding Components

- Check whether an existing component or pattern already covers the use case.
- Define props, states, accessibility behavior, and preview coverage before coding.
- Build one component per file. Do not add catch-all `primitives.tsx` or `utils.tsx` component dumps.
- Add examples to `/ui-preview` and reference coverage to `/ui-docs`.
- Export UI components through `components/ui/index.ts`; import patterns directly from `components/patterns`.

## Modifying Components

- Preserve public props unless the change is explicitly planned as breaking.
- Keep visual changes token-backed.
- Keep accessibility semantics aligned with behavior.
- Update docs in the same change when API, state, or rules change.

## Agent Rules

- Read the local Next docs in `node_modules/next/dist/docs/` before touching Next APIs.
- Prefer existing components, tokens, and patterns over one-off classes.
- Do not install forbidden UI/icon libraries.
- Do not silently weaken `/ui-preview`; every required state must stay visibly represented.
- Do not treat build success as visual verification.

## Forbidden Patterns

- Raw hex in component `className` strings.
- Primitive token references inside components.
- `transition-all`, `ease-[ease]`, and broad animation shortcuts.
- Tailwind `z-*` classes for overlay stacking.
- Clickable `div` cards with `role="button"` as a default interaction pattern.
- Stale docs that describe a different API than the component implements.
