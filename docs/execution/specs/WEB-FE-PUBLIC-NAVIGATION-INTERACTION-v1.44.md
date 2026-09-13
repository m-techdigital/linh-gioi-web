# WEB-FE-PUBLIC-NAVIGATION-INTERACTION-v1.44

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by aligning the public website header with the workspace navigation behavior added in v1.43. The selected issue is route continuity and keyboard-readable active state on public navigation.

## Locked requirements

- Public navigation links must expose active route state with `aria-current="page"` and `data-current="page"`.
- Section routes such as `/classes` must keep the related primary nav item current for nested descendants.
- The `/download` play/status CTA must use exact active matching.
- Active public nav styling must be visible on desktop and mobile without horizontal overflow.
- Public skip link keyboard behavior must remain covered by browser/e2e.
- Shared route matching should live in `packages/ui`, not as a page-local duplicate.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No backend/API/auth/session/RBAC/audit implementation.
- No independent business backend.
- No route/content expansion beyond navigation interaction polish.
- No fake download, account, support ticket or mutation flow.
