# WEB-FE-BLOCKED-ACTION-KEYBOARD-v1.45

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by improving blocked Portal access actions on `/login`, `/register` and `/recovery`. These routes are still fixture-only, but their blocked action buttons must be keyboard-readable instead of skipped by native disabled controls.

## Locked requirements

- Blocked Portal actions must expose `aria-disabled="true"` and `data-disabled="true"`.
- Blocked action controls must remain focusable so keyboard users can reach the action label and reason.
- The reason must be tied with `aria-describedby` and mention `NO_ACCEPTED_BACKEND_CONTRACT`.
- The control must not submit forms, call backend APIs, create sessions, register accounts or mutate credentials.
- Shared behavior belongs in `packages/ui` as a reusable primitive.
- Browser/e2e must verify keyboard focus, no non-GET/HEAD requests, typography caps and horizontal overflow on desktop/mobile.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No production login, registration, recovery, session or credential semantics.
- No independent backend/API route.
- No real Portal integration or accepted contract claim.
- No forms or mutation handlers.
