# WEB-FE-JOURNEY-VIETNAMESE-DESIGN-MATCH-v1.138

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/journey` page under Sequential Page Completion after `/classes` v1.137 closure. It refreshes the Public Journey design target to Vietnamese and aligns the implemented page against the 20-minute journey scenario.

## Design target

Design Target First and Just-in-time Design were applied to `/journey`. The active target is `apps/web/public/design-reference/journey-detailed-design-target-v1123.png`, mirrored at `docs/design/reference/WEB-FE-JOURNEY-DETAILED-DESIGN-TARGET-v1.123.png`. It was refreshed with built-in imagegen so the 20-minute loop labels are Vietnamese and the route follows Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.

## Implementation

- Translated the Public Journey target link label to `Thiết kế chi tiết hành trình`.
- Translated hero and loop labels to `Hội ngộ`, `Phiêu lưu`, `Chiến lợi`, `Mạnh hơn`.
- Moved the 20-minute session loop immediately after the hero and placed the reference board after the route as a boundary/reference section.
- Translated visible journey fixture labels such as `Rời Đông Môn`, `Khám phá Cổ Di Tích`, and `Trở về mạnh hơn`.
- Compacted desktop first-flow so the session loop appears in the first fold.

## Base UI/UX Layout

The layout changes are page-scoped to `.lgo-journeypage-stack` because the target is specific to `/journey`. Shared fixture changes are translations of existing content used by this page. No duplicate Base UI owner was introduced.

## Visual/layout evidence

Browser screenshot review compared `/journey` against Public Journey. Runtime metrics after implementation: 1280x720 hero height 400.406, session top 611.609, first session card visible 108.391, route top 930.891, reference board top 1441.344, overflow 0. Desktop 1440x900 first session card visible 230.578 and overflow 0. Mobile 393x852 hero height 772, session top 1226.406 and overflow 0.

## Evidence

- RED browser/e2e: stale English target label reproduced first; after copy fix, desktop layout failed because session top was 712.641 at 1280x720.
- GREEN browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-journey-vietnamese-design-match-v1138.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS 2/2.
- Screenshot/metrics capture: `/tmp/lgo-journey-page-v1138-fold720.png`, `/tmp/lgo-journey-page-v1138-desktop.png`, and `/tmp/lgo-journey-page-v1138-mobile.png` reviewed.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
