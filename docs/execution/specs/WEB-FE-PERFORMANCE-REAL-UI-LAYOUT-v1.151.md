# WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.151

Status: WEB_CLOSED.

Scope: close `/performance` as a Real Browser UI/UX Layout First slice. The registered Public Service target remained sufficient as a guardrail, so no new design batch was created. Work focused on the rendered page: Vietnamese first-flow, compact hero, HUD board, performance budget steps, mobile density and Base First CSS ownership.

Implementation: `/performance` now starts with `Hiệu năng và ngân sách nội dung`, a compact Vietnamese boundary, the HUD reference board and a three-step performance budget board. The old page-local `lgo-performance-design-board` CSS was removed from `apps/web/src/app/globals.css` and rebuilt in `packages/ui/src/service-layout.css` with shared `lgo-performancepage-stack`, design board and route-step classes.

Evidence: browser/e2e desktop and mobile passed for `tests/e2e/fe-performance-real-ui-layout-v1151.spec.ts` and the historical v1.76 performance-board test. Screenshots were captured at `/tmp/performance-desktop-v1151.png` and `/tmp/performance-mobile-v1151.png`. Source validator, typecheck, build and current-state closure are required before final commit.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT. No production monitoring, Lighthouse certification, image CDN or official Core Web Vitals PASS is added.
