# WEB-FE-START-VIETNAMESE-DESIGN-MATCH-v1.139

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/start` page under Sequential Page Completion after `/journey` v1.138 closure. It refreshes and verifies the Public Start design target in Vietnamese, then aligns the implemented first flow with the Linh Giới game scenario before moving to any other page.

## Design target

Design Target First and Just-in-time Design were applied to `/start`. The active target is `apps/web/public/design-reference/start-detailed-design-target-v1124.png`, mirrored at `docs/design/reference/WEB-FE-START-DETAILED-DESIGN-TARGET-v1.124.png`. It was refreshed with built-in imagegen to remove stale English labels and keep the scenario coherent: Đông Môn, Người Giữ Cổng, Bia Luyện, Slime Bóng Tối and Mở Linh Thành.

## Implementation

- Translated the Public Start target link label to `Thiết kế chi tiết bắt đầu`.
- Refreshed visible `/start` copy to Vietnamese and removed stale English labels such as `Move / Jump / Dash`, `Class Skill`, `Shadow Slime`, `Game reference art`, and `Real onboarding screenshots`.
- Reused the shared `CinematicWorldScene` in the hero so the page starts with a real Đông Môn/Linh Thành visual instead of a flat text block.
- Kept the first tutorial path in Vietnamese: Người Giữ Cổng, Bia Luyện, Di chuyển / Nhảy / Lướt nhanh, Kỹ năng Lộ, Slime Bóng Tối and Mở Linh Thành.
- Localized `start-tutorial-gameplay-loop.svg` so the visible board labels are Vietnamese.
- Retained fixture-only/no-backend boundaries; no download, auth or account behavior was added.

## Base UI/UX Layout

The hero uses the existing shared `ExperienceHero` and `CinematicWorldScene` primitives instead of creating a new one-off visual component. Page-scoped CSS is limited to `.lgo-startpage-stack` because the target is specific to `/start`.

## Visual/layout evidence

Browser screenshot review compared `/start` against Public Start. Runtime metrics after implementation: 1280x720 hero height 420, cinematic scene height 374.5, board top 566.031, board visible 153.969, h1 44.8px, overflow 0. Desktop 1440x1100 board visible 330.782 and overflow 0. Mobile 390x1200 hero height 1081.844, board top 1263.625 and overflow 0.

## Evidence

- RED browser/e2e: stale English target label reproduced first; after target-copy fix, the new cinematic-scene requirement failed because `/start` had no Đông Môn shared scene.
- GREEN browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-start-vietnamese-design-match-v1139.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS 2/2.
- Screenshot/metrics capture: `/tmp/lgo-start-page-v1139-fold720.png`, `/tmp/lgo-start-page-v1139-desktop.png`, and `/tmp/lgo-start-page-v1139-mobile.png` reviewed.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
