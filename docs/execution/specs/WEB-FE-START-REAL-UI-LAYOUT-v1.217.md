# WEB-FE-START-REAL-UI-LAYOUT-v1.217

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

Scope: close only `/start` as a real browser UI/UX Layout page slice. The existing Vietnamese Public Start design target was usable as a comparison guardrail; work focused on the rendered browser page, first-flow density, onboarding board rhythm, real screenshot gallery, compact class/route follow-up and shared Base CSS ownership.

Implementation:
- Kept the page order as hero → tutorial design board → real Đông Môn screenshots → compact Năm Lộ grid → world route.
- Moved Start page layout ownership from stale `apps/web/src/app/globals.css` blocks into one consolidated shared block in `packages/ui/src/service-layout.css`.
- Removed stale v1.90/v1.124/v1.139 Start page-local layout blocks from `globals.css` so old validators cannot pull the page back to app-local CSS.
- Compacted the public design-reference band so it remains a development comparison affordance but no longer dominates the real public page layout.
- Applied AXIRO only as code-organization inspiration: shared base first, page composition second, CSS owner clarity, no copied code or design.

Evidence:
- RED baseline browser metrics before Base compaction: desktop scrollHeight 3071px, heroBottom 527px, classGridTop 1722.14px; mobile scrollHeight 7113px, heroBottom 1178.78px, one-column screenshot/class flow.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-start-design-target-density-v1124.spec.ts tests/e2e/fe-start-vietnamese-design-match-v1139.spec.ts tests/e2e/fe-public-start-design-board-v179.spec.ts tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts tests/e2e/fe-start-real-ui-layout-v1217.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Final desktop metrics: overflow 0, scrollHeight 2050px, h1/max font 44.8px, heroBottom 463px, sceneHeight 328.41px, designBoardTop 475.48px, screenshotPanelTop 752.66px, classGridTop 1273.17px, routeTop 1586.44px, 3 screenshot columns, 5 class columns.
- Final mobile metrics: overflow 0, scrollHeight 3080px, h1/max font 37.08px, heroBottom 624.56px, sceneHeight 164px, designBoardTop 649.83px, screenshotPanelTop 912.64px, classGridTop 1522.19px, routeTop 2327.77px, 2 screenshot columns, 2 class columns.
- Screenshots reviewed by browser output: `/tmp/start-desktop-v1217.png`, `/tmp/start-mobile-v1217.png`.
- Source validator: `tools/validate_web_fe_start_real_ui_layout_v1217.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
