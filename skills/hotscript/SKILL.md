---
name: hotscript
description: Keep `hostscript.ts` written against the project's existing ExtendScript utility imports instead of reintroducing raw ES3-style helper code inline.
---

# Hotscript

## Overview
Use this skill when editing `ts/hostscript.ts`. The goal is to keep hostscript code focused on After Effects commands and reuse the project's existing ExtendScript utility imports instead of reintroducing inline ES3-style compatibility helpers.

## When to Use
Use this skill when:

- editing `ts/hostscript.ts`
- adding hostscript-side helpers or data shapes
- introducing AE context checks, selection guards, or common panel behavior
- deciding whether logic belongs in `hostscript.ts` or under `ts/library/extendscript/`

## Instructions
1. Assume these `hostscript.ts` imports are intentional and should be reused before writing new helpers:
   - `./library/extendscript/object`
   - `./library/extendscript/string`
   - `./library/extendscript/array`
   - `./library/extendscript/json`
   - `./library/extendscript/library` as `lib`
2. Do not hand-write ES3 polyfills in `hostscript.ts`.
3. Do not reimplement common array, string, object, or JSON helpers locally if the imported modules already provide them.
4. Prefer imported helpers such as:
   - Arrays: `map`, `filter`, `forEach`, `includes`, `some`, `fill`, `find`
   - Strings: `includes`, `replaceAll`
   - Objects: `Object.keys`, `Object.values`
   - JSON: `JSON.stringify`
5. Prefer `lib` helpers for AE context checks and common panel behavior before adding new hostscript boilerplate. Check `ts/library/extendscript/library.ts` for helpers such as:
   - `lib.active_comp()`
   - `lib.time()`
   - `lib.selected_layers()`
   - `lib.selected_layer()`
   - `lib.all_layers()`
   - `lib.has_active_comp()`
   - `lib.has_layers()`
   - `lib.has_selected_layer()`
   - `lib.has_single_selected_layer()`
   - `lib.is_text_layer()`
   - `lib.is_text_layer_empty()`
   - `lib.check_error(...)`
   - `lib.error_message(name)`
6. Keep AE-specific operations in `hostscript.ts`, but move reusable generic utility behavior into `ts/library/extendscript/`.
7. If a needed helper does not exist:
   - add generic ExtendScript compatibility helpers to `ts/library/extendscript/object.ts`, `string.ts`, `array.ts`, or `json.ts`
   - add AE-specific reusable helpers to `ts/library/extendscript/library.ts`
   - then import and use that helper from `hostscript.ts`
8. When a new interface or type is needed for hostscript-side work, prefer creating it under `ts/library/extendscript/` instead of inside TSX files.
9. Follow these style defaults unless the surrounding file already has a strong pattern:
   - use semicolons
   - prefer arrow functions over regular function declarations
   - use `snake_case` for variables, state names, and functions
   - prefer objects, lookup maps, or `if` chains over `switch` statements

## Output Format
Responses and edits should reflect these outcomes:

- `hostscript.ts` uses existing imported helpers instead of local compatibility code
- reusable helpers are added to the appropriate `ts/library/extendscript/` file when needed
- shared ExtendScript-facing types live under `ts/library/extendscript/`
- AE-specific command flow stays in `hostscript.ts`

## Examples
Input: Add logic that transforms an array of layer names in `hostscript.ts`.
Output: Use `items.map(...)` instead of a manual `for` loop if the goal is mapping.

Input: Add a guard that requires an active comp and a selected layer.
Output: Prefer `if (lib.check_error([lib.has_active_comp, lib.has_selected_layer])) return;`.

Input: Return hostscript data back to the panel.
Output: Prefer `return JSON.stringify(result);` over custom JSON string assembly.

Input: Add a reusable helper that is not currently available.
Output: Add it under `ts/library/extendscript/` first, then import it into `hostscript.ts` instead of embedding a one-off version inline.

## Notes
- Avoid local `for` loop utilities whose only purpose is `map`, `filter`, `find`, or `some` behavior.
- Avoid local `stringContains`, `replaceAll`, `keys`, `values`, or JSON serializer helpers when the shared imports already cover them.
- Avoid repeated "get active comp / selected layers / selected layer" boilerplate when `lib` already provides it.
- Do not place hostscript data models in TSX files unless the type is truly local to one UI-only component.
