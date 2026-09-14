# LGO-WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-REPORT-v1.156

Status: WEB_CLOSED.

Task: WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156.

The `/guides` page now renders as a real guide library index instead of a raw long list: compact Vietnamese hero, quick reading map, featured world-loop guide, primary scan grid and compressed archive grid. The change followed Real Browser UI/UX Layout First: browser measurements drove hero height, first-fold placement, mobile card density, typography scale and overflow checks.

Base First decision: reusable guide-index hero, board, card-grid, archive-grid and responsive density styles live in `packages/ui/src/service-layout.css`. The page composes shared classes and does not add route-local guide-index CSS to `apps/web/src/app/globals.css`.

browser/e2e evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-index-real-ui-layout-v1156.spec.ts --project=chromium-desktop --project=chromium-mobile` — 2/2 passed.
- Baseline before implementation: desktop hero 436px, mobile hero 541px, mobile page height about 6470px, desktop card grid below first fold.
- Final browser metrics: desktop hero about 323px; mobile hero about 475px; mobile featured card appears in the first fold; no horizontal overflow; desktop guide grid reaches the first fold.
- Screenshots reviewed: `/tmp/guides-index-desktop-v1156.png`, `/tmp/guides-index-mobile-v1156.png`.

Verification completed: source validator, Web/UI typecheck, Web production build and clean current-state closure validator.

Non-claims retained: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
