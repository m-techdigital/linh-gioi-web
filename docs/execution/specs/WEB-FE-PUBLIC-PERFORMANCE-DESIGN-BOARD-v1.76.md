# WEB-FE-PUBLIC-PERFORMANCE-DESIGN-BOARD-v1.76

Status: WEB_CLOSED

## SELECT

The selected v1.76 scope is a public FE performance visual slice after v1.75. Browser audit showed `/performance` explains copy and asset budget but lacked a real reference-art image near the hero. The game repo contains a small `hud-wireframe.svg` design-board asset, so this slice uses that art to ground the performance budget in an in-game HUD mental model.

## SPEC_LOCK

Scope is public web UI only. `/performance` must render a real HUD reference board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around Core Web Vitals PASS, Lighthouse certification, CDN deployment, production monitoring and approved image pipeline. No backend, monitoring endpoint, CDN integration, DTO, form or production performance claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/hud-wireframe.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/performance-copy-budget-hud.svg`.
- Rendered the board on `apps/web/src/app/performance/page.tsx` with alt `Performance copy budget HUD board`.
- Added responsive `.lgo-performance-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-performance-design-board-v176.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_performance_design_board_v176.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, monitoring form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-performance-design-board-v176.spec.ts --project=chromium-desktop` failed because image `Performance copy budget HUD board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-performance-design-board-v176.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/performance`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.76 public performance design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.77`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
