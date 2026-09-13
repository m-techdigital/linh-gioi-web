# WEB-FE-PUBLIC-SKIP-LINK-VISUAL-v1.50

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by aligning the public website skip link with the safer workspace skip-link behavior closed in v1.47. Public pages must keep a keyboard-first skip target while avoiding overlay artifacts and horizontal overflow on mobile.

## Locked requirements

- Public skip link remains the first keyboard target and keeps `href="#main-content"`.
- Hidden public skip link uses `top: 0` plus `transform` instead of an offset top and oversized translate.
- Focused public skip link appears near the viewport top, renders above the sticky header, and keeps readable font-size and visible focus behavior.
- The skip link has a viewport max-width cap and `overflow-wrap: anywhere` so it does not create horizontal overflow on mobile.
- Browser/e2e verifies `/classes` and `/download` desktop/mobile hidden/focused behavior, keyboard skip navigation, font-size and horizontal overflow.
- This FE-only change does not affect backend contracts: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No public navigation IA change.
- No backend/API route.
- No production auth, Portal or Ops integration.
- No visual redesign beyond public skip link behavior.
