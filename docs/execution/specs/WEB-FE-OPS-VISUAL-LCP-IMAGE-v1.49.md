# WEB-FE-OPS-VISUAL-LCP-IMAGE-v1.49

Status: WEB_CLOSED.

## Scope

Continue the FE accessibility/interaction audit by fixing Ops WORLD_CONCEPT visual loading hints on the reviewed Ops visual routes. Ops home, Control Center and Security & Governance use real game-art fixture images; the WORLD_CONCEPT panel must eager-load while secondary visual panels remain lazy.

## Locked requirements

- Ops home, `/control-center` and `/security-governance` WORLD_CONCEPT images use explicit `loading="eager"` through route-level expressions.
- Non-WORLD_CONCEPT visual panels remain lazy-loaded.
- Browser/e2e verifies image alt, loading attribute, decoded dimensions, typography caps and horizontal overflow on desktop/mobile.
- Routes keep keyboard-safe workspace rendering and fixture boundaries.
- No backend, no form, no fake fetch and no real Ops/Admin mutation is introduced.
- Fixtures remain provisional: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remains active.

## Non-scope

- No production RBAC, audit, scheduler, support or game operation integration.
- No backend/API route.
- No image pipeline change beyond selected route loading hints.
- No layout redesign or new game asset ingestion.
