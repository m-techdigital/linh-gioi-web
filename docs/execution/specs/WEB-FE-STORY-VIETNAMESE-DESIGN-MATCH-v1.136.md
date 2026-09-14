# WEB-FE-STORY-VIETNAMESE-DESIGN-MATCH-v1.136

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/story` page under Sequential Page Completion after `/game` v1.135 closure. It refreshes the Public Story design target text to Vietnamese, updates `/story` visible copy, and aligns the first-flow UI/UX Layout against the registered target before selecting another page.

## Design target

Design Target First and Just-in-time Design were applied to the current page only. The active target is `apps/web/public/design-reference/story-detailed-design-target-v1121.png`, mirrored at `docs/design/reference/WEB-FE-STORY-DETAILED-DESIGN-TARGET-v1.121.png`. The target was refreshed with built-in imagegen to replace stale English labels with Vietnamese while preserving the Vết Nứt Đông Môn scenario, full cinematic story hero, opening chapter cards and `Theo design đích` footer cue.

## Implementation

- Translated Public Story target link label to `Thiết kế chi tiết cốt truyện`.
- Translated `/story` first-flow labels and art boundary copy to Vietnamese: `Cốt truyện Linh Giới`, `Ảnh ý tưởng cốt truyện`, and `không phải trạng thái nhiệm vụ thật`.
- Translated chapter labels from `Chapter 01/02/03` to `Chương 01/02/03` and cleaned visible story fixture terms such as cổng, kỹ năng, Boss Thế Giới and bang hội.
- Changed the desktop `/story` hero to a poster-style overlay so the art behaves like the design target instead of a split two-column block.
- Compacted the chapter heading/cards under `.lgo-storypage-stack` so Chương 01–03 enter the first design-led flow.

## Base UI/UX Layout

The layout changes are page-scoped to `.lgo-storypage-stack` because the target is specific to `/story`. Shared component copy changes are limited to existing public story/game components and content fixtures required by the current story page. No reusable Base UI owner was duplicated.

## Visual/layout evidence

Browser screenshot review compared `/story` against Public Story. Runtime metrics after implementation at 1440x1000: hero top 107/bottom 492.234/height 385.234, chapters top 519.594, first chapter card top 559.75, first card visible height 367.188, story board top 2806.484, horizontal overflow 0. The first-flow structure now follows the target: cinematic story hero, opening chapter strip/cards immediately below, and supporting boundary/story board after the first-flow content.

## Evidence

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-story-vietnamese-design-match-v1136.spec.ts --project=chromium-desktop --reporter=line` first failed because the Public Story target label was still English, then failed because the first chapter card had only 112.328px visible in the desktop first fold.
- GREEN browser/e2e: desktop and mobile `/story` Vietnamese design-match tests passed after implementation.
- Screenshot/metrics capture: `/tmp/lgo-story-page-v1136.png` reviewed with desktop viewport 1440x1000.
- Final closure verification is recorded in the report and handoff.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
