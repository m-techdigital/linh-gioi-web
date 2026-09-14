# LGO-WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-REPORT-v1.137

Status: WEB_CLOSED.

Task ID: WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137.

## Result

The `/classes` page is closed as the next page in the Sequential Page Completion workflow. It now uses Vietnamese visible target/page copy and a browser-verified first-flow layout that keeps the Năm Lộ hero and first class-card row aligned to the Public Classes design target.

## Changes

- Kept the existing Public Classes raster target because it is already Vietnamese and matches the Linh Giới game scenario.
- Translated the `/classes` design target link label to `Thiết kế chi tiết Năm Lộ`.
- Replaced stale English page/component labels such as `Class philosophy`, `Class identity`, `Development art preview`, `Modular gear board`, and `production-final` with Vietnamese player-facing copy.
- Translated the class art fixture labels and boundary notes used on `/classes`.
- Compacted the desktop first-flow heading and card row so typography and spacing are less oversized and the first class card remains visible in the 1280x720 browser fold.
- Added browser/e2e coverage for Vietnamese target labels, English leak prevention, first-fold card visibility, mobile density and overflow.

## Evidence

- RED browser/e2e reproduced desktop first-fold density failure: first class card visible height 92.266px at 1280x720.
- GREEN browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS 2/2.
- Screenshot/metrics reviewed: 1280x720 hero 360.375px, class grid top 569.828, first class card visible 150.172, identity top 968.469, overflow 0.
- Dedicated validator, typecheck, build and current-state closure checks are recorded in the handoff.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Boundary

This slice does not complete `/journey`, `/start`, other public pages, Portal, Ops, backend integration, production auth, DB persistence, real Portal integration, or real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force.

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
