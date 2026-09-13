# WEB-FE-OPS-BLOCKED-ACTION-KEYBOARD-v1.46

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by improving blocked Ops/Admin mutation actions on `/trust-safety`, `/content-liveops`, `/support/[id]`, `/player-operations/[id]` and `/game-operations/[id]`. These routes remain fixture-only, but high-risk blocked actions must be keyboard-readable instead of skipped by native disabled controls.

## Locked requirements

- Blocked Ops/Admin actions must expose `aria-disabled="true"` and `data-disabled="true"`.
- Blocked action controls must remain focusable so keyboard users can reach the action label and blocked reason.
- The reason must be tied with `aria-describedby` and mention `NO_ACCEPTED_BACKEND_CONTRACT`.
- The reason must also retain `NO_REAL_OPS_MUTATION` clarity for admin-risk boundaries.
- The control must not submit forms, call backend APIs, create tickets, change player state, publish content, moderate accounts or mutate game operations.
- Shared behavior must reuse the `packages/ui` `BlockedActionButton` primitive from v1.45.
- Browser/e2e must verify keyboard focus, no non-GET/HEAD requests, typography caps and horizontal overflow on desktop/mobile.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No production Ops/Admin mutation, RBAC, audit logging, support assignment, moderation, publish, rollback, drain or world operation semantics.
- No independent backend/API route.
- No real Portal integration or accepted contract claim.
- No forms, fetch calls or mutation handlers.
