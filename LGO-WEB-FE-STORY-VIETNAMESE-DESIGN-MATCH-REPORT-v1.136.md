# LGO-WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-REPORT-v1.136

Status: WEB_CLOSED.

Task ID: WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136.

## Result

The `/story` page is closed as the next page in the Sequential Page Completion workflow. It now uses a refreshed Vietnamese Public Story design target and a browser-verified first-flow layout with a cinematic story hero and visible opening chapter cards.

## Changes

- Refreshed `story-detailed-design-target-v1121.png` with built-in imagegen and mirrored it under `docs/design/reference`.
- Translated visible story target/page labels from English to Vietnamese.
- Changed chapter labels to `Chương 01`, `Chương 02`, and `Chương 03`.
- Reworked the desktop story hero into a poster overlay and compacted the chapter card flow under `.lgo-storypage-stack`.
- Added browser/e2e coverage for Vietnamese target labels, English leak prevention, chapter-card first-flow visibility, mobile hero height and horizontal overflow.

## Evidence

- RED browser/e2e reproduced stale English target label and insufficient first-fold chapter visibility.
- GREEN browser/e2e: `LGO_WEB_URL=http://127.0.0.1:3000 pnpm exec playwright test tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` PASS 2/2.
- Existing story density e2e v1.121 desktop PASS after the update.
- Browser screenshot/metrics reviewed: `/tmp/lgo-story-page-v1136.png`; hero 385.234px, chapters top 519.594, first chapter top 559.75, first card visible 367.188, overflow 0.
- Dedicated validator, typecheck, build and current-state closure checks are recorded in the handoff.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Boundary

This slice does not complete `/classes`, `/journey`, Portal, Ops, backend integration, production auth, DB persistence, real Portal integration, or real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force.

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
