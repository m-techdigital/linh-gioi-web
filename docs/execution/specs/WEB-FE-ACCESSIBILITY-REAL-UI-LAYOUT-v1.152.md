# WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.152

Status: WEB_CLOSED.

Scope: close `/accessibility` as a Real Browser UI/UX Layout First slice. The registered Public Service target remained sufficient as a guardrail, so no new design batch was created. Work focused on the rendered page: Vietnamese first-flow, compact hero, route-map board, readability steps, mobile density and Base First CSS ownership.

Implementation: `/accessibility` now starts with `Dễ đọc và dễ thao tác`, a compact Vietnamese boundary, the route-map reference board and a three-step readability board. The old page-local `lgo-accessibility-design-board` CSS was removed from `apps/web/src/app/globals.css` and rebuilt in `packages/ui/src/service-layout.css` with shared `lgo-accessibilitypage-stack`, design board and route-step classes.

Evidence: browser/e2e desktop and mobile passed for `tests/e2e/fe-accessibility-real-ui-layout-v1152.spec.ts` plus historical v1.78 and v1.89 coverage. Screenshots were captured at `/tmp/accessibility-desktop-v1152.png` and `/tmp/accessibility-mobile-v1152.png`. Source validator, typecheck, build and current-state closure are required before final commit.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT. No formal WCAG audit, legal compliance certification or personal settings backend is added.
