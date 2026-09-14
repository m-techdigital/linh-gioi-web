# WEB-FE-HOMEPAGE-VIETNAMESE-FIRST-FLOW-v1.134

Status: WEB_CLOSED.

## Scope

Sequential Page Completion starts from the homepage. This slice only changes the homepage first-flow, the shared design-target reference labels required by the homepage, and the homepage design target raster. It does not move to `/community` or any other page.

## Design target

Design Target First remains mandatory, but this slice applies Just-in-time Design: update only the active Public Homepage target needed for the current page. The homepage target remains `apps/web/public/design-reference/homepage-detailed-design-target-v1118.png`, mirrored at `docs/design/reference/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.png`, and was refreshed with built-in image_gen to replace the stale English footer label with Vietnamese visible copy.

## Implementation

- Translate homepage first-flow visible marketing copy to Vietnamese: `MMORPG hành động cộng đồng 2D`, `Bản sắc trò chơi`, `Đồ họa 2D sắc nét`, `Trung tâm cộng đồng`, `Chiến đấu hành động`, and `Sự kiện thế giới`.
- Translate the homepage design target link label to `Thiết kế chi tiết trang chủ`.
- Translate the shared design-target cue used by the homepage to `Theo design đích`, `mở trong tab mới`, and `Các design đích`.
- Translate public shell homepage-visible metadata/tagline copy from English marketing phrasing to Vietnamese.

## Base UI/UX Layout

Base UI/UX Layout changes are limited to `packages/ui/src/primitives.tsx` because the design target reference is a shared primitive rendered on the homepage. This is not a broad redesign; the change is required so the current homepage slice no longer exposes stale English design-target labels.

## Evidence

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-homepage-vietnamese-first-flow-v1134.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` failed before implementation because `Thiết kế chi tiết trang chủ` did not exist.
- GREEN browser/e2e: same command passed 2/2 after implementation.
- Final closure verification is recorded in the report and handoff.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
