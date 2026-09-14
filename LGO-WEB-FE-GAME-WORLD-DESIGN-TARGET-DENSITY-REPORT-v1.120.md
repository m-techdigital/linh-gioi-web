# LGO WEB FE GAME WORLD DESIGN TARGET DENSITY REPORT v1.120

Task: WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120
Status: WEB_CLOSED
Date: 2026-09-14

## Result

`/game` now has its own high-fidelity `Public Game World` design target and runtime attachment. The desktop layout was compacted so the game world design board enters the first fold and the route-map section starts near the first target board, instead of the page relying only on the broad Public Core atlas.

## What changed

- Added `apps/web/public/design-reference/game-world-detailed-design-target-v1120.png` and docs mirror `docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png`.
- Registered `Public Game World` in `docs/design/DESIGN-TARGET-REGISTRY.md`.
- Routed `/game` to the new target in `PublicDesignTargetReference`.
- Added `lgo-gamepage-stack` to `/game` and scoped desktop CSS for game hero/design-board/route fold density.
- Added browser/e2e coverage in `tests/e2e/fe-game-world-design-target-density-v1120.spec.ts`.
- Added validator `tools/validate_web_fe_game_world_design_target_density_v1120.py`.

## Evidence

- built-in image_gen produced the 1672x941 `Public Game World` target.
- RED browser/e2e: desktop `/game` attached the new target but failed because `.lgo-game-world-design-board` started at 835px, outside the target first-fold guardrail.
- PASS browser/e2e after fix: `pnpm exec playwright test tests/e2e/fe-game-world-design-target-density-v1120.spec.ts --project=chromium-desktop --project=chromium-mobile` → 2 passed.
- Dedicated source validator PASS: `python3 tools/validate_web_fe_game_world_design_target_density_v1120.py`.
- Closure validation PASS: py_compile for v1.120/v1.119/current-state validators; `pnpm --filter @lgo-web/web typecheck`; `pnpm --filter @lgo-web/web build`; browser/e2e desktop/mobile; artifact-filtered copy `python3 tools/validate_web_current_state.py`.

## Design Target First

This slice follows Design Target First: `/game` received a page-specific target before layout tuning. Future `/game` changes must compare against `Public Game World`; if the desired page direction changes, supersede this target in the same task before implementation.

## Base UI/UX Layout

Base UI/UX Layout stayed intact. Shared primitives and target reference components were reused; page-local CSS is scoped to `/game` density against the page-specific target.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No production deployment, live map streaming, account position, quest state or backend world server is claimed.
