# WEB-FE-PUBLIC-ROADMAP-DESIGN-BOARD-v1.70

Status: WEB_CLOSED

## SELECT

The selected v1.70 scope is a public FE real-design-image slice after v1.69. A browser audit showed `/roadmap` had stable mobile layout but no image or SVG while still explaining public roadmap sequencing. The game repo contains a small `roadmap-flow.svg` reference-art board, so this slice brings that real design asset into the public roadmap page.

## SPEC_LOCK

Scope is public web UI only. `/roadmap` must render a real reference-art design board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around production auth, download, CMS and backend integration. No backend, CMS, fake release promise, DTO, form or deployment claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/roadmap-flow.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/public-roadmap-flow.svg`.
- Rendered the board on `apps/web/src/app/roadmap/page.tsx` with alt `Public roadmap flow design board`.
- Added responsive `.lgo-roadmap-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-roadmap-design-board-v170.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_roadmap_design_board_v170.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, release promise or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-roadmap-design-board-v170.spec.ts --project=chromium-mobile` failed because image `Public roadmap flow design board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-roadmap-design-board-v170.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/roadmap`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.70 public roadmap design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.71`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
