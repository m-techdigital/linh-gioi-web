# HANDOFF — LGO WEB FE GAME WORLD DESIGN TARGET DENSITY v1.120

Task: WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120
Status: WEB_CLOSED
Date: 2026-09-14

## Closed scope

`/game` now has the `Public Game World` page-specific design target and browser/e2e guardrails for first-fold density. Desktop must attach the new target, keep the world design board visible in the first fold and start the route-map section near the first target board. Mobile keeps the non-extreme hero guardrail.

## Files changed

- `apps/web/public/design-reference/game-world-detailed-design-target-v1120.png`
- `docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png`
- `docs/design/DESIGN-TARGET-REGISTRY.md`
- `apps/web/src/components/PublicDesignTargetReference.tsx`
- `apps/web/src/app/game/page.tsx`
- `apps/web/src/app/globals.css`
- `tests/e2e/fe-game-world-design-target-density-v1120.spec.ts`
- `tools/validate_web_fe_game_world_design_target_density_v1120.py`
- `docs/execution/specs/WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120.md`
- `LGO-WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-REPORT-v1.120.md`
- `HANDOFF-LGO-WEB-FE-GAME-WORLD-DESIGN-TARGET-DENSITY-v1.120.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`

## Evidence to keep

- built-in image_gen generated the `Public Game World` design target.
- RED: desktop `/game` design board started at 835px before density tuning.
- browser/e2e PASS: `pnpm exec playwright test tests/e2e/fe-game-world-design-target-density-v1120.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Source validation: `python3 tools/validate_web_fe_game_world_design_target_density_v1120.py` PASS.
- Build/type/current-state validation: `pnpm --filter @lgo-web/web typecheck` PASS; `pnpm --filter @lgo-web/web build` PASS; artifact-filtered copy `python3 tools/validate_web_current_state.py` PASS.

## Design Target First

Target: `Public Game World` / `game-world-detailed-design-target-v1120.png`. This target is active for `/game`. Do not reuse the broader Public Core target as the only `/game` design reference while this page-specific target is active.

## Base UI/UX Layout

No duplicate shared component owner was added. `lgo-gamepage-stack` is a page-level density marker for this target; reusable primitives remain in shared packages.

## Next task

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.121.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. No production deployment or live backend world integration is claimed.
