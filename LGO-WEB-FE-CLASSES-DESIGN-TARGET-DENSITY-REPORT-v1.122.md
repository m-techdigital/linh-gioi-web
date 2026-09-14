# LGO WEB FE CLASSES DESIGN TARGET DENSITY REPORT v1.122

Task: WEB-FE-CLASSES-DESIGN-TARGET-DENSITY-v1.122
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/classes` now has its own `Public Classes` design target and runtime attachment. The page now follows the target hierarchy by showing a compact five-path hero and making the first class-card row visible in the first fold.

## What changed

- Added `apps/web/public/design-reference/classes-detailed-design-target-v1122.png` and docs mirror `docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png`.
- Registered `Public Classes` in `docs/design/DESIGN-TARGET-REGISTRY.md` and removed `/classes` from the broad Public Core applies-to list.
- Routed `/classes` to the new target in `PublicDesignTargetReference`.
- Added `lgo-classespage-stack` to `/classes` and scoped desktop density CSS for the hero, first class-card section, class cards and identity/art continuation.
- Added browser/e2e coverage in `tests/e2e/fe-classes-design-target-density-v1122.spec.ts`.
- Added validator `tools/validate_web_fe_classes_design_target_density_v1122.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Classes` target.
- RED browser/e2e: desktop/mobile `/classes` could not find `Public Classes` target because route still used the broad Public Core target.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-classes-design-target-density-v1122.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_classes_design_target_density_v1122.py`.
- Closure validation PASS: py_compile for v1.122/v1.121/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/classes` changes must compare against `Public Classes`; if the class page direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing class sections were reused; page-local CSS is scoped to `/classes` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No playable class balance, account character creation, inventory, combat data or production backend is claimed.

Verification marker: fold density.
