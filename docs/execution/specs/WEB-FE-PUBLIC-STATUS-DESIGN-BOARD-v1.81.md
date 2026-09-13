# WEB-FE-PUBLIC-STATUS-DESIGN-BOARD-v1.81

Status: WEB_CLOSED

## SELECT

The selected v1.81 scope is a public FE status visual slice after v1.80. Browser audit showed `/status` explains public, internal and blocked status surfaces, but lacked a real LinhGioiOnline reference-art image near the status explanation. The game repo contains a small `hud-wireframe.svg` design-board asset, so this slice uses that art as a maintenance signal board for the status route.

## SPEC_LOCK

Scope is public web UI only. `/status` must render a real maintenance signal reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around CMS, production monitoring, incident backend, live server health, production auth and accepted backend contracts. No backend, CMS, monitoring API, incident API, DTO, form or server-health claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/hud-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/status-maintenance-signal-board.svg`.
- Rendered the board on `apps/web/src/app/status/page.tsx` with alt `Status maintenance signal board`.
- Added responsive `.lgo-status-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-status-design-board-v181.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_status_design_board_v181.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, monitoring form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-status-design-board-v181.spec.ts --project=chromium-desktop` failed because image `Status maintenance signal board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-status-design-board-v181.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/status`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.81 public status design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.82`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
