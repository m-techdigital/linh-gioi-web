# WEB-FE-PUBLIC-JOURNEY-DESIGN-BOARD-v1.80

Status: WEB_CLOSED

## SELECT

The selected v1.80 scope is a public FE journey visual slice after v1.79. Browser audit showed `/journey` has a CSS-only cycle visual, but no real LinhGioiOnline reference-art image near the hero. The game repo contains a small `roadmap-flow.svg` design-board asset, so this slice uses that art as a session route-flow board for the journey route.

## SPEC_LOCK

Scope is public web UI only. `/journey` must render a real session route-flow reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live guild, party, inventory, account persistence, production auth and accepted backend contracts. No backend, guild API, account API, inventory API, DTO, form or live multiplayer claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/roadmap-flow.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/journey-session-route-flow.svg`.
- Rendered the board on `apps/web/src/app/journey/page.tsx` with alt `Journey session route flow board`.
- Added responsive `.lgo-journey-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-journey-design-board-v180.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_journey_design_board_v180.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, account/guild form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-journey-design-board-v180.spec.ts --project=chromium-desktop` failed because image `Journey session route flow board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-journey-design-board-v180.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/journey`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.80 public journey design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.81`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
