---
name: tsx
description: Build the CEP panel UI as a small, event-driven React interface for After Effects instead of letting `tsx/main.tsx` grow into one large component.
---

# TSX

## Overview
Use this skill when editing files under `tsx/`. The goal is to keep the CEP panel UI modular, event-driven, and easy to grow instead of letting `tsx/main.tsx` become one large component.

## When to Use
Use this skill when:

- editing files under `tsx/`
- deciding whether UI logic belongs in `main.tsx`, a component, a section, a dialog, or a hook
- adding event-based UI such as modals, prompts, confirmations, or transient editors
- creating shared panel-facing TSX types or interfaces

## Instructions
1. Treat `tsx/main.tsx` as a top-level composition entry, not the place for all UI logic.
2. Prefer a structure like:
   - `tsx/main.tsx` for top-level composition
   - `tsx/components/` for reusable UI pieces
   - `tsx/sections/` for major panel areas such as action sets, action lists, step editors, headers, footers, or sidebars
   - `tsx/dialogs/` for event-based UI such as dialogs, modals, prompts, confirms, and overlays
   - `tsx/hooks/` for reusable state and event orchestration when shared logic starts repeating
   - `tsx/models/` for shared TSX-facing types, interfaces, and constants if the panel model grows
3. Prefer small components over large components when the split improves readability.
4. Break the panel into components by UI responsibility, not just file size.
5. Keep event-based UI isolated in dedicated components instead of inlining dialog or modal markup deep inside unrelated sections.
6. Prefer passing explicit event handlers and state props over hiding important behavior inside large monolithic components.
7. Keep `main.tsx` focused on assembling sections and wiring shared state.
8. For temporary interactions such as dialog flows, modals, prompts, confirmations, and transient editors:
   - drive open and close behavior from state
   - use clearly named handler props such as `on_confirm`, `on_cancel`, `on_close`, or `on_submit`
   - lift shared state only as high as needed
   - keep dialog-specific validation close to the dialog component unless multiple sections reuse it
9. Follow these style defaults unless the surrounding file already has a strong established pattern:
   - use semicolons
   - prefer `const` over `let` when possible
   - prefer arrow functions over regular function declarations
   - use `snake_case` for variables, state names, and functions
   - prefer array methods like `map`, `filter`, `find`, and `some` over `for` loops
   - prefer objects, lookup maps, or `if` chains over `switch` statements
   - avoid `console.log` for panel diagnostics; use `alert(...)` for user-visible logging or error messages when needed in CEP
10. When a new interface or type is needed for TSX work:
   - prefer creating it under `ts/library/cep_panel/` instead of defining it directly inside a `tsx` file
   - keep shared panel-facing data shapes centralized
   - only add declarations to `ts/library/cep_panel/cs_interface.d.ts` when they are specifically related to the `CSInterface` library or its typings
   - do not place unrelated app models, UI state types, or action data types in `cs_interface.d.ts`
11. Prefer simple state shapes that mirror panel behavior.
12. Prefer `signals` functions instead of `useState` and `useEffect` whenever the same behavior can be expressed clearly with signal-based state and derived values.
13. Use `useState` or `useEffect` only when signals are not a practical fit for the interaction, lifecycle, or external integration involved.
14. Use objects for mode or view configuration when that keeps rendering logic clearer than a `switch`.
15. Use `if` statements for straightforward branching.
16. Avoid deeply nested conditional rendering; move branches into small helper components when JSX starts getting noisy.
17. Before expanding `main.tsx`, check whether the change belongs in a new component, section, dialog, or hook.
18. Keep panel responsibilities separated from hostscript responsibilities.
19. Make component names reflect the panel feature they represent.
20. Keep event names explicit and consistent.
21. Prefer reusable presentational pieces when multiple sections share layout or interaction patterns.

## Output Format
Responses and edits should reflect these outcomes:

- the TSX layer is modular and split by UI responsibility
- `main.tsx` remains focused on composition and shared wiring
- event-based UI is encapsulated in dedicated dialog-style components
- shared panel-facing types live under `ts/library/cep_panel/`
- signal-driven state is preferred over `useState` and `useEffect` when practical
- state and control flow stay readable and easy to extend

## Examples
Input: Add a confirmation flow before deleting an item from the panel.
Output: Create or extend a dialog component in `tsx/dialogs/`, drive it from state, and use explicit handlers such as `on_confirm` and `on_cancel`.

Input: `tsx/main.tsx` is growing to hold markup for several major panel areas.
Output: Move those areas into `tsx/sections/` or `tsx/components/` and keep `main.tsx` focused on composition.

Input: A new panel-facing data shape is used across multiple components.
Output: Define the shared type under `ts/library/cep_panel/` instead of inside one TSX file.

Input: Render a transformed list in the UI.
Output: Prefer array methods like `map`, `filter`, `find`, and `some` over `for` loops.

Input: Add local UI state or derived UI state in a component.
Output: Prefer signal-based state and derived signal values before reaching for `useState` or `useEffect`.

## Notes
- Avoid one large `main.tsx` component that owns nearly all panel markup and behavior.
- Avoid `switch` statements for routine UI branching when an object map or `if` chain is clearer.
- Avoid `for` loops for routine array transformations.
- Avoid defaulting to `useState` and `useEffect` when signal-based state covers the same case more simply.
- Avoid `console.log`-driven debugging in panel code.
- Avoid oversized components that combine layout, business rules, dialog flow, and list rendering all together.
- The TSX layer should feel modular, readable, and easy to grow as the After Effects actions panel gains more sections and guided interaction flows.
