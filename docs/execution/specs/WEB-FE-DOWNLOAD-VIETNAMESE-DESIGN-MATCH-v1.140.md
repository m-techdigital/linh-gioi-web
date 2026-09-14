# WEB-FE-DOWNLOAD-VIETNAMESE-DESIGN-MATCH-v1.140

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/download` page under Sequential Page Completion after `/start` v1.139 closure. It refreshes the Public Download design target to Vietnamese and aligns the first-flow layout with the sealed release-gate game scenario before moving to any other page.

## Design target

Design Target First and Just-in-time Design were applied to `/download`. The active target is `apps/web/public/design-reference/download-detailed-design-target-v1125.png`, mirrored at `docs/design/reference/WEB-FE-DOWNLOAD-DETAILED-DESIGN-TARGET-v1.125.png`. It was refreshed with built-in imagegen to replace English gate labels with Vietnamese while preserving the sealed gate, readiness checklist and official channel composition.

## Implementation

- Translated the Public Download target link label to `Thiết kế chi tiết tải game`.
- Translated first-flow `/download` hero, sealed-gate visual, release readiness checklist and channel cards to Vietnamese.
- Reworked the hero into a two-column layout so the sealed gate appears beside the release-state copy, matching the target more closely.
- Expanded readiness to five gates: gói phát hành, SHA256, phê duyệt chủ sở hữu, giới hạn đã biết and sẵn sàng hỗ trợ.
- Moved channel cards into the design-led first flow after readiness instead of leaving them deep below trust/detail sections.

## Base UI/UX Layout

The page keeps the existing shared `PublicPlayerHero`, `SectionHeading`, `Grid`, `GameCard` and `StatusBadge` primitives. Page-scoped CSS is limited to `.lgo-downloadpage-stack` and the target-specific channel/readiness composition.

## Visual/layout evidence

Browser screenshot review compared `/download` against Public Download. Runtime metrics after implementation: 1280x720 hero height 319.266, sealed gate height 250, readiness top 434.422, readiness visible 245.781, channels top 701.953, h1 44.8px, overflow 0. Desktop 1440x1100 readiness visible 252.063 and overflow 0. Mobile 390x1200 hero height 878.969, readiness top 1044.75 and overflow 0.

## Evidence

- RED browser/e2e: stale English target label reproduced first.
- GREEN browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-download-vietnamese-design-match-v1140.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS 2/2.
- Screenshot/metrics capture: `/tmp/lgo-download-page-v1140-fold720.png`, `/tmp/lgo-download-page-v1140-desktop.png`, and `/tmp/lgo-download-page-v1140-mobile.png` reviewed.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
