# WEB-FE-PUBLIC-START-DESIGN-BOARD-v1.79

Status: WEB_CLOSED

## SELECT

The selected v1.79 scope is a public FE start/onboarding visual slice after v1.78. Browser audit showed `/start` is the first player onboarding route but lacked a real reference-art image near the hero. The game repo contains a small `core-gameplay-loop.svg` design-board asset, so this slice uses that art as a tutorial loop visual for the start route.

## SPEC_LOCK

Scope is public web UI only. `/start` must render a real tutorial gameplay-loop reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around public download, login/account backend, entitlement flow, production auth and accepted backend contracts. No backend, account API, entitlement API, DTO, form or public build claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/core-gameplay-loop.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/start-tutorial-gameplay-loop.svg`.
- Rendered the board on `apps/web/src/app/start/page.tsx` with alt `Start tutorial gameplay loop board`.
- Added responsive `.lgo-start-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-start-design-board-v179.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_start_design_board_v179.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, entitlement form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-start-design-board-v179.spec.ts --project=chromium-desktop` failed because image `Start tutorial gameplay loop board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-start-design-board-v179.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/start`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.79 public start design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.80`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
