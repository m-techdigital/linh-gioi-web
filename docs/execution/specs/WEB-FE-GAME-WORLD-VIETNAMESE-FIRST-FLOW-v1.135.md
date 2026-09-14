# WEB-FE-GAME-WORLD-VIETNAMESE-FIRST-FLOW-v1.135

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/game` page under Sequential Page Completion. It keeps the registered Public Game World design target, corrects the Vietnamese first-flow copy, and aligns the implemented UI/UX Layout to the target before any other page is selected.

## Design target

Design Target First remains mandatory. The active target is `apps/web/public/design-reference/game-world-detailed-design-target-v1120.png`, mirrored at `docs/design/reference/WEB-FE-GAME-WORLD-DETAILED-DESIGN-TARGET-v1.120.png`. The target was refreshed with built-in image_gen during this slice to remove stale English design labels and keep the Linh Giới scenario coherent: Linh Thành hero, route strip, world atlas cards, and Vietnamese design footer.

## Implementation

- Removed the old first-flow wireframe/reference board from `/game` product UI.
- Reordered the page so `WorldRouteJourney` follows the cinematic hero directly, matching the target route strip: Linh Thành, Đông Môn, Linh Lâm, Cổ Di Tích and Âm Giới.
- Compacted the `/game` page-scoped hero, route strip and atlas layout so the route and atlas enter the first browser flow.
- Moved the no-real-map/no-real-server boundary into a separate Vietnamese `lgo-game-world-boundary` note after the atlas.
- Translated visible game-world labels including `Thiết kế chi tiết thế giới`, `Ý tưởng thế giới · Đông Môn`, `Bản đồ thế giới`, and route-kind labels.

## Base UI/UX Layout

Base UI/UX Layout changes were limited to reusable page components already owning the game-world route and atlas sections. A small shared `worldRouteLabels` helper was added under `apps/web/src/components` so route and atlas labels stay synchronized across the current public game-world components. The page-scoped density/layout CSS is limited to `.lgo-gamepage-stack` because the current target is specific to `/game`.

## Visual/layout evidence

Browser screenshot review compared `/game` against Public Game World. Runtime metrics after implementation: hero top 107/bottom 537/height 430, route top 557.875/height 239.797, atlas top 820.141, horizontal overflow 0. This matches the target structure better than the previous wireframe flow: cinematic hero, immediate route strip, and atlas preview in the first design-led flow.

## Evidence

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts --project=chromium-desktop --reporter=line` failed before layout implementation because route gap was 347.625px after the hero.
- GREEN browser/e2e: `LGO_WEB_URL=http://127.0.0.1:3000 pnpm exec playwright test tests/e2e/fe-game-world-vietnamese-first-flow-v1135.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` passed 2/2 after implementation.
- Screenshot/metrics capture: `/tmp/lgo-game-page-after-v1135.png` reviewed with desktop viewport 1440x1000.
- Final closure verification is recorded in the report and handoff.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
