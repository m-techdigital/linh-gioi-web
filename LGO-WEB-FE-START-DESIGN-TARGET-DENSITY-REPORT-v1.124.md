# LGO WEB FE START DESIGN TARGET DENSITY REPORT v1.124

Task: WEB-FE-START-DESIGN-TARGET-DENSITY-v1.124
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/start` now has its own `Public Start` design target and runtime attachment. The page now follows the target hierarchy by showing a compact onboarding hero, visible tutorial board and real onboarding screenshot continuation near the first board.

## What changed

- Added `apps/web/public/design-reference/start-detailed-design-target-v1124.png` and docs mirror `docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png`.
- Registered `Public Start` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/start` from the broad Public Core applies-to list.
- Routed `/start` to the new target in `PublicDesignTargetReference`.
- Added `lgo-startpage-stack` to `/start` and scoped desktop density CSS for the hero, tutorial step chips, start board and screenshot panel.
- Added browser/e2e coverage in `tests/e2e/fe-start-design-target-density-v1124.spec.ts`.
- Added validator `tools/validate_web_fe_start_design_target_density_v1124.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Start` target.
- RED browser/e2e: desktop/mobile `/start` could not find `Public Start` target because route still used the broad Public Core target.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-start-design-target-density-v1124.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_start_design_target_density_v1124.py`.
- Closure validation PASS: py_compile for v1.124/v1.123/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/start` changes must compare against `Public Start`; if the onboarding direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing start sections were reused; page-local CSS is scoped to `/start` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No public build/download, login, entitlement, tutorial state, combat progression or production backend is claimed.

Verification marker: fold density.
