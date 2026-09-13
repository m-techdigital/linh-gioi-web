# WEB-FE-PUBLIC-ACCESSIBILITY-DESIGN-BOARD-v1.78

Status: WEB_CLOSED

## SELECT

The selected v1.78 scope is a public FE accessibility/readability visual slice after v1.77. Browser audit showed `/accessibility` explains readability, focus order and mobile scan comfort but lacked a real reference-art image near the hero. The game repo contains a small `world-hub-wireframe.svg` design-board asset, so this slice uses that art as a route-map visual for reading paths.

## SPEC_LOCK

Scope is public web UI only. `/accessibility` must render a real readability route-map reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around formal WCAG audit, legal compliance, personal settings backend, production auth and accepted backend contracts. No backend, preference API, legal compliance surface, DTO, form or settings claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/world-hub-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/accessibility-readability-route-map.svg`.
- Rendered the board on `apps/web/src/app/accessibility/page.tsx` with alt `Accessibility readability route map board`.
- Added responsive `.lgo-accessibility-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-accessibility-design-board-v178.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_accessibility_design_board_v178.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, preference form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-accessibility-design-board-v178.spec.ts --project=chromium-desktop` failed because image `Accessibility readability route map board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-accessibility-design-board-v178.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/accessibility`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.78 public accessibility design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.79`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
