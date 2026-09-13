# LGO WEB — SHARED APP SHELL FOUNDATION — REPORT v1.27

Task: `WEB-SHARED-APP-SHELL-FOUNDATION-v1.27`

Status: `LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27`

## Architecture change
Portal and Ops no longer own duplicated shell structure/styles. Shared workspace framing now lives in `packages/ui`; apps provide app-specific identity/nav/boundaries.

## Shared additions
- `WorkspaceAppShell`
- `WorkspaceNavigation`
- `WorkspaceBoundaryNotice`
- `@lgo-web/ui/shell.css`

## App migrations
- Player Portal root layout consumes shared shell.
- Ops/Admin root layout consumes shared shell.
- duplicated `.lgo-stack`, `.lgo-grid`, `.lgo-panel`, `.lgo-status-badge` rules removed from both app-local stylesheets.
- Portal/Ops direct design-token dependency ownership is explicit in package manifests and lockfile.

## Verification
- v1.27 / Base First / Shared Base / Portal / Ops / current-state validators: PASS.
- `packages/ui`, Portal, Ops targeted lint/typecheck: PASS.
- Portal production build: PASS (Next.js 16.3.4; 11 routes).
- Ops production build: PASS (Next.js 16.3.4; 11 routes).
- Portal route smoke: PASS, 5/5 HTTP 200.
- Ops route smoke: PASS, 6/6 HTTP 200.
- Browser visual review: UNVERIFIED_ENV; existing host policy blocks localhost (`ERR_BLOCKED_BY_ADMINISTRATOR`).

## Non-goals / non-claims
- No production auth or database persistence.
- No RBAC/audit/security backend contract.
- No real Ops mutation.
- Public Web brand shell is not replaced by the workspace shell.

## Build-once / evidence reuse
Public Web source did not change, so its v1.26 production build was not rerun. Portal and Ops were built only for the affected closure slice, and their build outputs were reused for route smoke.

## Final decision
`LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27`
