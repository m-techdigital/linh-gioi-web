# WEB-FE-PUBLIC-GAME-WORLD-DESIGN-BOARD-v1.83

Status: WEB_CLOSED

## SELECT

The selected v1.83 scope is a public FE game world visual slice after v1.82. Browser audit showed `/game` has a CSS-only cinematic world scene, but no real LinhGioiOnline reference-art image near the hero. The game repo contains a small `world-hub-wireframe.svg` design-board asset, so this slice uses that art as a world atlas hub board for the public game route.

## SPEC_LOCK

Scope is public web UI only. `/game` must render a real world atlas hub reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live map streaming, account position, quest state, production world server, production auth and accepted backend contracts. No backend, world server API, quest API, account position API, DTO, form or live open-world claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/world-hub-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/game-world-atlas-hub.svg`.
- Rendered the board on `apps/web/src/app/game/page.tsx` with alt `Game world atlas hub board`.
- Added responsive `.lgo-game-world-design-board` CSS in `apps/web/src/app/globals.css`.
- Added px-based typography caps for the public game hero and world atlas decorative numbers after desktop browser/e2e exposed oversized 92.8px atlas numerals.
- Added `tests/e2e/fe-public-game-world-design-board-v183.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_game_world_design_board_v183.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, world-state form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-game-world-design-board-v183.spec.ts --project=chromium-desktop` failed because image `Game world atlas hub board` was missing.
- Intermediate browser/e2e after image implementation caught oversized visible typography: atlas decorative numerals reached 92.8px on desktop.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-game-world-design-board-v183.spec.ts --project=chromium-desktop` PASS after px caps kept desktop max font at 64px.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/game`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, caps atlas decorative numerals at 64px desktop / 48px mobile, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.83 public game world design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.84`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
