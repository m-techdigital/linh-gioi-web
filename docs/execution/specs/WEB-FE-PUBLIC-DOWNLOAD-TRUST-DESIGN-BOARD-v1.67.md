# WEB-FE-PUBLIC-DOWNLOAD-TRUST-DESIGN-BOARD-v1.67

Status: WEB_CLOSED

## SELECT

The selected v1.67 scope is a public FE design-image slice after v1.66. A browser audit found `/download/trust` had stable mobile layout but rendered no real image or SVG while still explaining release trust, checksum and provenance. The user also asked to use real LinhGioiOnline images where useful, so this slice adds a small release-gate design-board asset from the game repo docs.

## SPEC_LOCK

Scope is public web UI only. The page must render a real design-board image on `/download/trust`, expose a meaningful accessible image name, keep mobile overflow at zero, keep visible typography capped, and preserve the download boundary copy. No backend, CMS, fake download link, DTO, form, or release artifact claim is added.

## IMPLEMENT

- Copied the small SVG `docs/reference-art/design-boards/m0-to-m1-gate.svg` from `/Users/minhdc/Projects/LinhGioiOnline` into `apps/web/public/game-art/design-boards/release-trust-gate.svg`.
- Added `ReleaseTrustDesignBoard` in `apps/web/src/components/PublicTrustSections.tsx`.
- Rendered the board on `apps/web/src/app/download/trust/page.tsx` before the existing trust gate content.
- Added responsive CSS for `.lgo-release-trust-board` in `apps/web/src/app/globals.css`.
- Added `tests/e2e/fe-public-download-trust-design-board-v167.spec.ts`.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_public_download_trust_design_board_v167.py` PASS.
- The asset is a small reference-art SVG, not a Unity build output, generated client artifact or backend contract.
- No independent backend, app API route, fake fetch adapter or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-public-download-trust-design-board-v167.spec.ts --project=chromium-mobile` failed because the `Release trust gate design board` image was not present.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-download-trust-design-board-v167.spec.ts --project=chromium-mobile` PASS.
- Desktop/browser, Web typecheck/build and current-state evidence are recorded in the handoff.

## VISUAL_REVIEW

Browser/e2e metrics inspect the rendered `/download/trust` page. The design board image loads with non-zero natural dimensions, uses eager loading for the above-fold visual, keeps horizontal overflow <= 0, and keeps visible typography within the route cap.

## HANDOFF

Closed as FE-only v1.67 public download trust design-board slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.68`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
