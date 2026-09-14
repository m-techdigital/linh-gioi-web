# LGO-WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-REPORT-v1.155

Status: WEB_CLOSED.

Task: WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155.

The `/guides/world-gameplay-loop-guide` page now opens with the guide itself: Vietnamese hero, clear non-claim boundary, compact guide steps and then deeper route CTAs. The change followed Real Browser UI/UX Layout First: browser measurements drove heading order, first-fold density, mobile stacking and typography.

Base First decision: reusable guide detail hero/steps/boundary layout moved from `apps/web/src/app/globals.css` into `packages/ui/src/service-layout.css`.

browser/e2e evidence:

- `pnpm exec playwright test tests/e2e/fe-guide-world-loop-real-ui-layout-v1155.spec.ts --project=chromium-desktop --project=chromium-mobile` — 2/2 passed.
- Desktop visual metrics: no horizontal overflow; h1 <= 56px; hero starts at the top; guide steps follow before CTAs.
- Mobile visual metrics: no horizontal overflow; h1 <= 32px; hero and guide steps remain compact.
- Screenshots reviewed: `/tmp/guide-world-loop-desktop-v1155.png`, `/tmp/guide-world-loop-mobile-v1155.png`.

Verification completed: source validator, Web/content/UI typecheck, Web production build and clean current-state closure validator.

Non-claims retained: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
