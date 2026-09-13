# WEB-FE-PUBLIC-SUPPORT-HELP-DESIGN-BOARD-v1.73

Status: WEB_CLOSED

## SELECT

The selected v1.73 scope is a public FE support/help visual slice after v1.72. Browser audit showed `/support/help` had stable mobile layout but no real image/SVG while acting as the FAQ route map. The game repo contains a small `world-hub-wireframe.svg` reference-art board, so this slice brings that real design asset into the support help page.

## SPEC_LOCK

Scope is public web UI only. `/support/help` must render a real route-map reference board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live search, ticket backend, account lookup and sensitive-data intake. No backend, search API, ticket API, DTO, form or production support claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/world-hub-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/support-help-route-map.svg`.
- Rendered the board on `apps/web/src/app/support/help/page.tsx` with alt `Support help route map board`.
- Added responsive `.lgo-support-help-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-support-help-design-board-v173.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_support_help_design_board_v173.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, search/ticket form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-support-help-design-board-v173.spec.ts --project=chromium-mobile` failed because image `Support help route map board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-support-help-design-board-v173.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/support/help`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.73 public support help design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.74`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
