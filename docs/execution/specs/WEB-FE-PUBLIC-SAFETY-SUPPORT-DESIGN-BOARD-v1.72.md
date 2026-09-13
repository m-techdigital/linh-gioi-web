# WEB-FE-PUBLIC-SAFETY-SUPPORT-DESIGN-BOARD-v1.72

Status: WEB_CLOSED

## SELECT

The selected v1.72 scope is a public FE support/safety visual slice after v1.71. Browser audit showed `/support/safety` had stable mobile layout but no real image/SVG while explaining support reporting and safety expectations. The game repo contains a small `hud-wireframe.svg` reference-art board, so this slice brings that real design asset into the safety support page.

## SPEC_LOCK

Scope is public web UI only. `/support/safety` must render a real HUD reference board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around account lookup, moderation backend, live ticketing and production SLA. No backend, support ticket API, moderation tooling, DTO, form or production support claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/hud-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/player-safety-support-hud.svg`.
- Rendered the board on `apps/web/src/app/support/safety/page.tsx` with alt `Player safety support HUD board`.
- Added responsive `.lgo-safety-support-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-safety-support-design-board-v172.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_safety_support_design_board_v172.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, support ticket form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-safety-support-design-board-v172.spec.ts --project=chromium-mobile` failed because image `Player safety support HUD board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-safety-support-design-board-v172.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/support/safety`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.72 public safety support design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.73`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
