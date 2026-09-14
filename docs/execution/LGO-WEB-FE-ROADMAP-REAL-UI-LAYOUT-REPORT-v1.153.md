# LGO-WEB-FE-ROADMAP-REAL-UI-LAYOUT-REPORT-v1.153

Status: WEB_CLOSED.

Task: WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.153.

The `/roadmap` page now opens with a compact Vietnamese roadmap flow: hero, roadmap board, gate steps and then deeper readiness/roadmap content. The change followed Real Browser UI/UX Layout First: the existing board was used as the design target, then browser measurements drove typography, spacing, first-fold density and mobile stacking.

Base First decision: reusable roadmap layout, board density, step grid and responsive rules were placed in `packages/ui/src/service-layout.css`. `apps/web/src/app/globals.css` no longer owns the roadmap board CSS.

browser/e2e evidence:

- `pnpm exec playwright test tests/e2e/fe-roadmap-real-ui-layout-v1153.spec.ts tests/e2e/fe-public-roadmap-design-board-v170.spec.ts --project=chromium-desktop --project=chromium-mobile` — 4/4 passed.
- Desktop visual metrics: no horizontal overflow; h1 <= 58px; hero, board, gate steps and readiness CTA remain in the expected order/density.
- Mobile visual metrics: no horizontal overflow; h1 <= 42px; board and gate steps stack into one column.
- Screenshots reviewed: `/tmp/roadmap-desktop-v1153.png`, `/tmp/roadmap-mobile-v1153.png`.

Verification completed: source validator, historical roadmap-board validator, heading-priority validator, Web/content/UI typecheck, Web production build and clean current-state closure validator.

Non-claims retained: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
