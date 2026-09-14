# WEB-FE-JOURNEY-REAL-UI-LAYOUT-v1.216

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First and Base First.

Scope: close only `/journey` as a Real Browser UI/UX Layout page slice. The page keeps the existing Vietnamese Public Journey design target as comparison guardrail and focuses implementation on the rendered browser layout.

Implementation:
- Keep hero, 20-minute session loop, world route flow and journey design board in the main page flow.
- Compact the Journey hero visual, session beat cards, world route cards and route-flow design board so the first-flow is reviewable on desktop and mobile.
- Move the route-specific Journey layout CSS into `packages/ui/src/service-layout.css` under the shared UI owner.
- Remove stale v1.123/v1.138 Journey page-local CSS blocks from `apps/web/src/app/globals.css`.
- AXIRO was referenced only for code organization judgment: Base components first, page composition second, CSS owner clarity and no copied code.

Evidence:
- RED baseline: browser metrics showed desktop scrollHeight 2262px, mobile scrollHeight 5140px, mobile hero bottom 910.19px and one-column mobile session/route flow.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-journey-design-target-density-v1123.spec.ts tests/e2e/fe-journey-vietnamese-design-match-v1138.spec.ts tests/e2e/fe-public-journey-design-board-v180.spec.ts tests/e2e/fe-journey-real-ui-layout-v1216.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots reviewed: `/tmp/journey-desktop-v1216.png`, `/tmp/journey-mobile-v1216.png`.
- Source validator: `tools/validate_web_fe_journey_real_ui_layout_v1216.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; no production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
