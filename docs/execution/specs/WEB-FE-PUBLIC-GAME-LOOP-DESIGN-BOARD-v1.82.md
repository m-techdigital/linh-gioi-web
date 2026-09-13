# WEB-FE-PUBLIC-GAME-LOOP-DESIGN-BOARD-v1.82

Status: WEB_CLOSED

## SELECT

The selected v1.82 scope is a public FE world gameplay-loop visual slice after v1.81. Browser audit showed `/game/loop` explains Spirit Gate, Gate Keeper and Training Stone expectations, but lacked a real LinhGioiOnline reference-art image near the hero. The game repo contains a small `core-gameplay-loop.svg` design-board asset, so this slice uses that art as a gameplay-loop board for the route.

## SPEC_LOCK

Scope is public web UI only. `/game/loop` must render a real gameplay-loop reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live combat, inventory persistence, party flow, account integration, production auth and accepted backend contracts. No backend, combat API, inventory API, party API, DTO, form or playable build claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/core-gameplay-loop.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/world-gameplay-loop-board.svg`.
- Rendered the board on `apps/web/src/app/game/loop/page.tsx` with alt `World gameplay loop board`.
- Added responsive `.lgo-game-loop-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-game-loop-design-board-v182.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_game_loop_design_board_v182.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, gameplay form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-game-loop-design-board-v182.spec.ts --project=chromium-desktop` failed because image `World gameplay loop board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-game-loop-design-board-v182.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/game/loop`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.82 public game loop design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.83`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
