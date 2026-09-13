# WEB-FE-PORTAL-SECURITY-LCP-IMAGE-v1.48

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by fixing the browser-reported Portal `/account/security` LCP image loading hint. The route already uses real game-art fixture images; the WORLD_CONCEPT image must be eager-loaded while the route remains fixture-only.

## Locked requirements

- Portal `/account/security` WORLD_CONCEPT image uses explicit `loading="eager"` through a route-level expression.
- Non-WORLD_CONCEPT visual panels remain lazy-loaded.
- Browser/e2e verifies the image alt, loading attribute, loaded dimensions, keyboard-safe route rendering, typography caps and horizontal overflow on desktop/mobile.
- The security route still communicates fixture boundaries and `NO_ACCEPTED_BACKEND_CONTRACT`.
- No backend, no form, no fake fetch and no real security/auth/session mutation is introduced.
- Keyboard/navigation evidence remains in scope through the existing workspace shell and route tests.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No production auth/session/token lifecycle.
- No backend/API route.
- No image pipeline change beyond the selected route loading hint.
- No layout redesign or new game asset ingestion.
