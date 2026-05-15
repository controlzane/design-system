# Component Contracts

## General Rules

- Component styling must use semantic CSS variables from `app/globals.css`.
- Public props must be reflected in `/ui-docs`.
- Every state listed in the source guides must be visible in `/ui-preview`.
- Icon-only actions must have accessible labels.
- Components with browser APIs or stateful interactions need `'use client'`.

## Accessibility Contracts

- `Button`: native button element; loading state disables interaction and exposes loading text.
- `InputField`: generated id, visible label, error via `aria-invalid`, hint/error through `aria-describedby`.
- `Dropdown`: menu-style trigger with `aria-expanded` and `aria-haspopup="menu"`; do not document a different composite ARIA pattern unless its keyboard behavior is implemented.
- `Modal`: dialog role, `aria-modal`, labeled title, Escape close, backdrop close, body scroll lock, and focus trap.
- `Tabs`: `tablist`, `tab`, and `aria-selected`.
- `Toast`: `role="status"` and polite live region.
- `Alert`: `role="alert"` and assertive live region.
- `ProgressBar`: `role="progressbar"` with min, max, and current value.
- `Skeleton`: hidden from assistive technology.

## Card Interaction Contract

Clickable card surfaces should use real interactive elements. Use a button root when the whole card is one action and it does not contain nested buttons or links.

When a card contains multiple actions, keep the card shell non-interactive and expose each action as its own button or link. Do not add `role="button"` to a generic `div` as the primary pattern.

## Modal Variant Contract

`Modal.variant` communicates semantic intent only. The shell, divider, radius, and focus behavior remain consistent across default, warning, and danger. Intent is expressed through title, body copy, and footer action button variants.

## Preview And Docs Contract

- `/ui-preview` is the visual state matrix.
- `/ui-docs` is the implementation reference.
- Both routes must build successfully after any component change.
- If a component prop is added, removed, or changes meaning, update `/ui-docs` in the same change.
