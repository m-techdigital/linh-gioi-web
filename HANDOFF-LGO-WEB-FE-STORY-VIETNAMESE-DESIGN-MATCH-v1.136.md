# HANDOFF-LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136

Status: WEB_CLOSED.

## Handoff

`/story` is the current completed page slice under Sequential Page Completion. Continue only after this commit is pushed. The next task advances to v1.137 and selects `/classes` as the next single page slice, using its registered Public Classes design target before implementation.

## What changed

- Design Target First: Public Story raster was refreshed with built-in imagegen and kept as the page target.
- UI/UX Layout: `/story` desktop hero now behaves as a poster overlay and chapter cards enter the first design-led flow.
- Copy: Story first-flow, chapter labels and boundary note are Vietnamese.
- Evidence: Playwright covers target link, English leak prevention, chapter card visibility, mobile hero height and overflow.

## Evidence

- RED: `/story` browser/e2e failed on stale English target label and insufficient chapter-card first-fold visibility.
- GREEN: `/story` Vietnamese design-match browser/e2e passed desktop/mobile 2/2.
- Screenshot/metrics: hero 385.234px, chapters top 519.594, first card top 559.75, first card visible 367.188, overflow 0, screenshot reviewed at `/tmp/lgo-story-page-v1136.png`.
- Dedicated validator, typecheck, production build and current-state validator should be rerun after this handoff when verifying closure.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. This slice does not add independent backend behavior.
