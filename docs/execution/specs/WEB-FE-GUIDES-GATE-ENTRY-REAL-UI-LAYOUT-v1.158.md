# WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158

Status: WEB_CLOSED.

Scope: close only `/guides/gate-entry-guide` as the current page from `WEB-NEXT-ACTION`. The page must use Real Browser UI/UX Layout First, with design target only as a comparison guardrail and Base First before any local CSS/component work.

Implementation requirements:

- Render `/guides/gate-entry-guide` with a Vietnamese Cổng Linh scenario instead of placeholder English, limited to the current page because the placeholder blocked meaningful browser comparison.
- Keep the generic guide detail route and reuse the shared detail layout. Add only a slug composition class for Gate Entry.
- Put reusable density/spacing/card/CTA layout in `packages/ui/src/service-layout.css`.
- Do not add Gate Entry route CSS to `apps/web/src/app/globals.css`.
- Fix any browser-discovered mobile overflow in the existing app-shell owner without creating route-specific nav hacks.
- Verify desktop and mobile layout with browser/e2e metrics, screenshot evidence, source validator, typecheck, build and current-state validator.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth, no DB persistence, no real Portal/Ops integration, no public build, no launcher, no ticket support, no accepted backend contract.
