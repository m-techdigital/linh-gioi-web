# WEB-FE-PORTAL-SUPPORT-BLOCKED-ACTION-v1.56

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: Portal `/support` new-case blocked action accessibility and interaction. This FE-only slice replaces the native disabled support action with the shared `BlockedActionButton` pattern so keyboard users can focus the control, read the `NO_ACCEPTED_BACKEND_CONTRACT` reason through `aria-describedby`, and still trigger no backend write.

Acceptance:
- `/support` uses shared `BlockedActionButton` for “Mở case mới chưa khả dụng”.
- The action exposes `aria-disabled="true"`, `data-disabled="true"`, and `aria-describedby` instead of native `disabled`.
- Browser/e2e verifies keyboard focus, blocked reason copy, no non-GET/HEAD network writes, font-size cap, and no horizontal overflow on desktop/mobile.
- No forms, fetches, server actions, or support-ticket backend are introduced.

Evidence:
- RED browser/e2e reproduced the existing native disabled `<button>` without `aria-disabled` and without described-by support.
- GREEN browser/e2e verifies focusable blocked action and no writes.
- Source validator locks route usage, no backend/form markers, evidence docs, and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
