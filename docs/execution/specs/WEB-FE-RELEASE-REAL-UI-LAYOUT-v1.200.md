# WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200

Evidence tokens: WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.200; WEB_CLOSED; Real Browser UI/UX Layout First; Base First; browser/e2e; NO_ACCEPTED_BACKEND_CONTRACT.

Status: WEB_CLOSED.

Scope: close the current `/release` page from `WEB-NEXT-ACTION` as a real browser UI/UX Layout slice. The page must use its registered Public Release design target as a comparison guardrail, keep Vietnamese/game-scenario release boundaries, and prioritize the rendered browser layout.

Base First lock:

- `/release` now composes `lgo-service-compact-proof-page` for shared compact hero rhythm.
- Long secondary proof boards are grouped in the shared `lgo-service-disclosure-stack` / `lgo-service-disclosure-body` pattern from `packages/ui/src/service-layout.css`.
- The source still keeps release readiness/player trust boards available, but the real browser first-flow no longer forces every secondary board into the visible page height.
- No new route-local CSS was added to `apps/web/src/app/globals.css`.

Runtime/browser closure requirements (browser/e2e):

- Playwright desktop/mobile for `/release`.
- Screenshot visual review against the Public Release design target and shared header/footer/menu.
- Font scale, spacing, stage-card density, focus navigation, overflow and disclosure behavior recorded.
- Source validator and current-state validator pass before commit.

Backend boundary: FE-only. NO_ACCEPTED_BACKEND_CONTRACT retained. No public build, open beta, entitlement, production backend, auth, DB, CMS or release launcher claim.
