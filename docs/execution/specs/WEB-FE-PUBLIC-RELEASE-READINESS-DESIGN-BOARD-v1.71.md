# WEB-FE-PUBLIC-RELEASE-READINESS-DESIGN-BOARD-v1.71

Status: WEB_CLOSED

## SELECT

The selected v1.71 scope is a public FE release-readiness visual slice after v1.70. Browser audit showed `/release/readiness` had stable mobile layout but no real image/SVG while explaining owner gates and tester expectations. The game repo contains a small `production-board.svg` reference-art board, so this slice brings that real design asset into the release readiness page.

## SPEC_LOCK

Scope is public web UI only. `/release/readiness` must render a real reference-art production board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around public build, entitlement, ticket backend and production launch. No backend, CMS, fake tester intake, DTO, form or deployment claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/production-board.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/release-readiness-production-board.svg`.
- Rendered the board on `apps/web/src/app/release/readiness/page.tsx` with alt `Release readiness production board`.
- Added responsive `.lgo-release-readiness-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-release-readiness-design-board-v171.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_release_readiness_design_board_v171.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, release promise or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-release-readiness-design-board-v171.spec.ts --project=chromium-mobile` failed because image `Release readiness production board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-release-readiness-design-board-v171.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/release/readiness`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.71 public release readiness design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.72`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
