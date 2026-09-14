# LGO WEB FE STORY DESIGN TARGET DENSITY REPORT v1.121

Task: WEB-FE-STORY-DESIGN-TARGET-DENSITY-v1.121
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/story` now has its own `Public Story` design target and runtime attachment. The page now follows the target hierarchy by showing chapter cards immediately after the cinematic story hero, with the story arc before the reference-art board.

## What changed

- Added `apps/web/public/design-reference/story-detailed-design-target-v1121.png` and docs mirror `docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png`.
- Registered `Public Story` in `docs/design/DESIGN-TARGET-REGISTRY.md`.
- Routed `/story` to the new target in `PublicDesignTargetReference`.
- Added `lgo-storypage-stack` to `/story`, reordered story sections to match the target and scoped desktop density CSS.
- Added browser/e2e coverage in `tests/e2e/fe-story-design-target-density-v1121.spec.ts`.
- Added validator `tools/validate_web_fe_story_design_target_density_v1121.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Story` target.
- RED browser/e2e: desktop `/story` attached the new target but first chapter cards were not visible in the first fold.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-story-design-target-density-v1121.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_story_design_target_density_v1121.py`.
- Closure validation PASS: py_compile for v1.121/v1.120/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

Design Target First was completed before implementation. Future `/story` changes must compare against `Public Story`; if the narrative direction changes, supersede this target before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and existing story sections were reused; page-local CSS is scoped to `/story` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No live quest state, account progress, portal event simulation or production backend is claimed.


Verification marker: fold density.
