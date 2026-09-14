# LGO WEB FE JOURNEY DESIGN TARGET DENSITY REPORT v1.123

Task: WEB-FE-JOURNEY-DESIGN-TARGET-DENSITY-v1.123
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/journey` now has its own `Public Journey` design target and runtime attachment. The page now follows the target hierarchy by showing a compact player-journey hero, visible route-flow board and session-loop continuation near the first board.

## What changed

- Added `apps/web/public/design-reference/journey-detailed-design-target-v1123.png` and docs mirror `docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png`.
- Registered `Public Journey` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/journey` from the broad Public Core applies-to list.
- Routed `/journey` to the new target in `PublicDesignTargetReference`.
- Added `lgo-journeypage-stack` to `/journey` and scoped desktop density CSS for the hero, journey cycle, route-flow board and session-loop cards.
- Added browser/e2e coverage in `tests/e2e/fe-journey-design-target-density-v1123.spec.ts`.
- Added validator `tools/validate_web_fe_journey_design_target_density_v1123.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Journey` target.
- RED browser/e2e: desktop/mobile `/journey` could not find `Public Journey` target because route still used the broad Public Core target.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-journey-design-target-density-v1123.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_journey_design_target_density_v1123.py`.
- Closure validation PASS: py_compile for v1.123/v1.122/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/journey` changes must compare against `Public Journey`; if the journey page direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing journey sections were reused; page-local CSS is scoped to `/journey` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No live guild, party, inventory, reward, progression or production backend is claimed.

Verification marker: fold density.
