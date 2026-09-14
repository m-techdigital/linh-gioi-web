# WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-DOWNLOAD-READINESS-REAL-UI-LAYOUT-v1.160.

Scope: close only `/guides/download-readiness-guide` as the current page from `WEB-NEXT-ACTION`. The page must use Real Browser UI/UX Layout First, with design target only as a comparison guardrail and Base First before any local CSS/component work.

Implementation requirements:

- Render `/guides/download-readiness-guide` with Vietnamese proof-before-download scenario copy instead of placeholder English, limited to the current page because the placeholder blocked meaningful browser comparison.
- Keep the generic guide detail route and reuse the shared detail/guide-flow layout.
- Put reusable compact guide-flow density in `packages/ui/src/service-layout.css` and keep current-page visual treatment there.
- Do not add current-page CSS to `apps/web/src/app/globals.css`.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth, no DB persistence, no real Portal/Ops integration, no public build, no launcher, no entitlement, no open registration, no production release promise.
