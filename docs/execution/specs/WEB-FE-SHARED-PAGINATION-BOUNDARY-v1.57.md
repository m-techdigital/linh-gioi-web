# WEB-FE-SHARED-PAGINATION-BOUNDARY-v1.57

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: shared `PaginationBar` disabled-boundary accessibility. This FE-only Base First slice replaces native disabled pagination boundary controls with focusable `aria-disabled` controls and explicit unavailable labels, so keyboard users can still reach and understand list boundaries in Portal/Ops surfaces.

Acceptance:
- `packages/ui/src/data.tsx` owns the `PaginationBar` behavior.
- Boundary controls expose `aria-disabled="true"`, `data-disabled="true"`, and `aria-label` text containing “không khả dụng”.
- Boundary controls no longer use native `disabled`, and browser/e2e verifies the native DOM `disabled` property is `false`.
- Ops `/support` pagination remains non-writing under click/Enter, preserves keyboard focus outline, has no horizontal overflow, and keeps button font-size capped on desktop/mobile.
- No forms, fetches, server actions, or backend pagination/query APIs are introduced.

Evidence:
- RED browser/e2e reproduced native `<button disabled>` without `aria-disabled` on Ops `/support` pagination.
- GREEN browser/e2e verifies `aria-disabled`, `data-disabled`, unavailable labels, native disabled false, focus, no writes, font-size, and overflow.
- Source validator locks shared ownership, e2e coverage, docs, and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
