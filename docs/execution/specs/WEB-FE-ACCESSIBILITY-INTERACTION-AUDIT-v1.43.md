# WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.43

Status: WEB_CLOSED.

## Scope

Audit the shared Portal/Ops workspace shell after v1.42 for browser-visible accessibility and interaction affordances. The selected slice is FE-only and owned in shared UI where reusable.

## Locked requirements

- Shared workspace navigation must expose active route state with `aria-current="page"` and a visible current style.
- Keyboard users must reach a visible skip link first and move focus to `#workspace-content`.
- Focus indicators must remain visible on workspace navigation and skip link.
- Portal `/account/security` must keep the Account nav active for nested account routes.
- Ops `/security-governance` must have direct navigation continuity through a Governance item.
- Browser/e2e must assert keyboard focus, skip link, aria-current, font-size caps and horizontal overflow on desktop/mobile.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No independent backend.
- No app API routes.
- No duplicate DTO owners.
- No forms, fake fetches, production auth/session/RBAC/audit trail, or enabled fixture mutation controls.
