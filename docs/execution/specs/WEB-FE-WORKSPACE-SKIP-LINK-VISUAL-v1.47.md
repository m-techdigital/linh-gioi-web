# WEB-FE-WORKSPACE-SKIP-LINK-VISUAL-v1.47

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by improving the shared workspace skip link used by Portal and Ops. The skip link must remain keyboard-first and visible on focus, but its hidden state must not create screenshot overlay artifacts during browser visual review.

## Locked requirements

- The shared workspace skip link remains the first keyboard target and keeps `href="#workspace-content"`.
- Hidden skip link state uses `top: 0` plus `transform` instead of a negative top offset.
- Focused skip link appears near the viewport top with readable font-size and visible focus outline.
- The skip link has a viewport max-width cap and wrapping so it does not create horizontal overflow on mobile.
- The fix belongs in `packages/ui/src/shell.css` and applies to both Portal and Ops workspaces.
- Browser/e2e must verify Portal and Ops desktop/mobile hidden/focused behavior, keyboard skip navigation, font-size and horizontal overflow.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No app-local skip-link duplicate.
- No production auth, account, RBAC, audit or admin integration.
- No backend/API route.
- No visual redesign beyond the shared skip link behavior.
