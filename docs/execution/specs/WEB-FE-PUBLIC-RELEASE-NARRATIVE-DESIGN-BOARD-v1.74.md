# WEB-FE-PUBLIC-RELEASE-NARRATIVE-DESIGN-BOARD-v1.74

Status: WEB_CLOSED

## SELECT

The selected v1.74 scope is a public FE release narrative visual slice after v1.73. Browser audit showed `/release` was the central player-trust route for staged release messaging, but the hero area still relied on text and existing UI boards without a real reference-art image. The game repo contains a small `m0-to-m1-gate.svg` design-board asset, so this slice uses that art to ground the M0-to-M1 gate narrative.

## SPEC_LOCK

Scope is public web UI only. `/release` must render a real M0-to-M1 gate reference board with a meaningful accessible image name, keep mobile overflow at zero, keep typography capped, and preserve non-claims around public builds, open beta, entitlement funnel, production auth and backend acceptance. No backend, account entitlement API, download API, DTO, form or public build claim is added.

## IMPLEMENT

- Copied `docs/reference-art/design-boards/m0-to-m1-gate.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/release-narrative-m0-to-m1-gate.svg`.
- Rendered the board on `apps/web/src/app/release/page.tsx` with alt `Release narrative M0 to M1 gate board`.
- Added responsive `.lgo-release-narrative-design-board` CSS in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-release-narrative-design-board-v174.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_release_narrative_design_board_v174.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter, entitlement form or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-release-narrative-design-board-v174.spec.ts --project=chromium-desktop` failed because image `Release narrative M0 to M1 gate board` was missing.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-release-narrative-design-board-v174.spec.ts --project=chromium-desktop` PASS.
- Mobile/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect `/release`. The SVG loads with non-zero natural dimensions, uses eager loading for the route visual, keeps horizontal overflow <= 0, keeps visible typography within the public route cap, and keeps caption typography readable.

## HANDOFF

Closed as FE-only v1.74 public release narrative design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.75`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
