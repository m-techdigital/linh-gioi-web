# LGO WEB FE HOMEPAGE TARGET FOLD DENSITY REPORT v1.119

Task: WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119
Status: WEB_CLOSED
Date: 2026-09-14

## Result

Public homepage fold density now follows the `Public Homepage` design target closely enough for browser/e2e review. On desktop, the first viewport no longer stops at a hero-only composition: the first pillar card enters the fold with enough visible height to compare against the design target. Mobile still passes the hero overflow guardrail.

## What changed

- Added a homepage-specific first-pillar section marker in `apps/web/src/components/PublicGameExperienceSections.tsx`.
- Added v1.119 desktop density CSS in `apps/web/src/app/globals.css` to compact hero height, scene height, h1 scale, lead text, CTA spacing, breadcrumb spacing, signal chips and the first pillar heading.
- Added browser/e2e coverage in `tests/e2e/fe-homepage-target-fold-density-v1119.spec.ts` for Public Homepage design-target attachment, horizontal overflow, h1 size, identity signal chips, CTA count and first-card fold visibility.
- Added `tools/validate_web_fe_homepage_target_fold_density_v1119.py` and closure docs.

## Evidence

- RED evidence before the fix: desktop browser/e2e reproduced hero-only density. Initial desktop runs failed because hero height/card placement left no meaningful first-card visibility in the first fold.
- Runtime DOM inspection confirmed `.lgo-home-pillar-section .lgo-experience-pillar` existed and the failure was real layout density, not a missing selector.
- Browser/e2e PASS after fix: `pnpm exec playwright test tests/e2e/fe-homepage-target-fold-density-v1119.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_homepage_target_fold_density_v1119.py`.
- Full closure checks PASS: py_compile for v1.119/v1.118/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; filtered-copy `python3 tools/validate_web_current_state.py`.

## Design Target First

The implementation is attached to the v1.118 `Public Homepage` design target. No new design target was created because the target already covers this page and specifically shows hero plus the first content cards in the first 16:9 board.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives remain in `packages/ui`; this task only tuned page-specific density around a single homepage composition and did not create duplicate primitives.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. This report does not claim production deployment or backend readiness.
