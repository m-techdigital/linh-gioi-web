# WEB-FE-PUBLIC-CLOSED-TESTER-DESIGN-BOARD-v1.77

Status: WEB_CLOSED

## SELECT

The selected v1.77 scope is a public FE closed tester information visual slice after v1.76. Browser audit showed `/release/tester-pack` explains safe closed-test preparation but lacked a real reference-art image near the hero. The game repo contains a small `production-board.svg` design-board asset, so this slice uses that art to ground the tester checklist in a production-readiness mental model.

## SPEC_LOCK

Scope is public web UI only. `/release/tester-pack` must render a real production-board reference image with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around live intake, sign-up forms, guaranteed tester slots, production auth, backend collection and sensitive data intake. No backend, intake API, account entitlement API, DTO, form or tester-slot claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/production-board.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/closed-tester-production-board.svg`.
- Rendered the board on `apps/web/src/app/release/tester-pack/page.tsx` with alt `Closed tester information production board`.
- Added responsive `.lgo-closed-tester-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-closed-tester-design-board-v177.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_closed_tester_design_board_v177.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, intake form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-closed-tester-design-board-v177.spec.ts --project=chromium-desktop` failed because image `Closed tester information production board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-closed-tester-design-board-v177.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/release/tester-pack`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.77 public closed tester design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.78`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
