# WEB v1.27 Shared App Shell Foundation — Design

## Goal
Create a reusable workspace shell for Player Portal and Ops/Admin while preserving each app's identity and keeping Public Web brand-specific.

## Architecture
- `packages/ui` owns generic workspace shell structure, workspace navigation and boundary notice.
- `packages/ui/shell.css` owns shared workspace shell styles and responsive behavior.
- Portal and Ops provide only identity, nav items, badge/boundary text and app-local children.
- Public Web continues to use `PublicSiteShell`; it may reuse lower-level primitives but is not forced into the workspace shell.

## Base First rules
- No new Portal/Ops shell markup if `WorkspaceAppShell` can express it.
- Portal/Ops global CSS must not duplicate shared panel/grid/shell rules.
- App-local CSS is allowed only for genuinely app-specific treatment.
- Backend/auth/RBAC contracts remain non-claimed.

## Verification
- Dedicated v1.27 structural validator must fail before implementation and pass after.
- `packages/ui`, Portal, Ops lint/typecheck must pass.
- Existing Portal/Ops/current-state validators must pass.
- Production builds are closure-only; do not rebuild after each slice.
