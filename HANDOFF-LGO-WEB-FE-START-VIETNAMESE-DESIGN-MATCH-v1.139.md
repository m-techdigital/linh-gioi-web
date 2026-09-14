# HANDOFF-LGO-WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139

Status: WEB_CLOSED.

## Handoff

`/start` is the current completed page slice under Sequential Page Completion. Continue only after this commit is pushed. The next task advances to v1.140 and selects `/download` as the next single page slice, using its registered Public Download design target before implementation.

## What changed

- Design Target First: Public Start raster was refreshed with built-in imagegen to remove English labels and align the first tutorial path with the Linh Giới game scenario.
- UI/UX Layout: `/start` now renders a cinematic Đông Môn hero using the shared scene, then the localized tutorial board and real onboarding screenshots.
- Copy: Start target label, hero path, tutorial steps, board captions and onboarding screenshot labels are Vietnamese.
- Evidence: Playwright covers target link, English leak prevention, cinematic scene visibility, tutorial-board first-fold visibility, mobile density and overflow.

## Evidence

- RED: `/start` browser/e2e failed on stale English target label and then on missing shared Đông Môn cinematic scene.
- GREEN: `/start` Vietnamese design-match browser/e2e passed desktop/mobile 2/2.
- Screenshot/metrics: 1280x720 board top 566.031, board visible 153.969, scene height 374.5, h1 44.8px, overflow 0, screenshots reviewed at `/tmp/lgo-start-page-v1139-*.png`.
- Dedicated validator, typecheck, production build and current-state validator should be rerun after this handoff when verifying closure.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. This slice does not add independent backend behavior.
