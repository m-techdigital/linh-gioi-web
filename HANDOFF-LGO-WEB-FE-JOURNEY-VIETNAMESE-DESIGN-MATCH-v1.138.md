# HANDOFF-LGO-WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138

Status: WEB_CLOSED.

## Handoff

`/journey` is the current completed page slice under Sequential Page Completion. Continue only after this commit is pushed. The next task advances to v1.139 and selects `/start` as the next single page slice, using its registered Public Start design target before implementation.

## What changed

- Design Target First: Public Journey raster was refreshed with built-in imagegen to remove English loop labels and align the route with Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.
- UI/UX Layout: `/journey` now renders hero → 20-minute loop → world route → reference board.
- Copy: Journey target label, hero cycle and route/session labels are Vietnamese.
- Evidence: Playwright covers target link, English leak prevention, session-card visibility, route/board order, mobile density and overflow.

## Evidence

- RED: `/journey` browser/e2e failed on stale English target label and first-flow session top 712.641px.
- GREEN: `/journey` Vietnamese design-match browser/e2e passed desktop/mobile 2/2.
- Screenshot/metrics: 1280x720 first session card visible 108.391, route top 930.891, board top 1441.344, overflow 0, screenshots reviewed at `/tmp/lgo-journey-page-v1138-*.png`.
- Dedicated validator, typecheck, production build and current-state validator should be rerun after this handoff when verifying closure.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. This slice does not add independent backend behavior.
