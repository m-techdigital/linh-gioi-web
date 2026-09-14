# WEB-FE-CLASSES-VIETNAMESE-DESIGN-MATCH-v1.137

Status: WEB_CLOSED.

## Scope

This slice completes only the active `/classes` page under Sequential Page Completion after `/story` v1.136 closure. It keeps the registered Public Classes design target because the target is already Vietnamese, coherent with the Linh Giới game scenario, and aligned with the accepted dark fantasy route from Linh Thành/Đông Môn into Năm Lộ. Implementation is limited to `/classes`, the shared public class sections it renders, and the class art fixture labels needed by this page.

## Design target

Design Target First and Just-in-time Design were applied to the current page only. The active target remains `apps/web/public/design-reference/classes-detailed-design-target-v1122.png`, mirrored at `docs/design/reference/WEB-FE-CLASSES-DETAILED-DESIGN-TARGET-v1.122.png`. The target was reviewed and retained because it uses Vietnamese visible copy, shows the Năm Lộ hero, five class cards, Võ detail band and modular art board in a coherent Linh Giới scenario.

## Implementation

- Translated the Public Classes target link label to `Thiết kế chi tiết Năm Lộ`.
- Translated stale `/classes` first-flow labels from English to Vietnamese, including `Triết lý Năm Lộ`, `Bản sắc Năm Lộ`, and Võ art labels.
- Translated class art fixture labels and boundary notes while retaining the claim that these are reference/development assets, not final gameplay or production art.
- Compacted the desktop `/classes` first-flow so the hero, Năm Lộ heading and first class-card row follow the design target without oversized typography or a long blank gap.
- Added browser/e2e coverage for Vietnamese target copy, stale English leak prevention, desktop first-fold card visibility, mobile hero density and horizontal overflow.

## Base UI/UX Layout

The layout changes are page-scoped to `.lgo-classespage-stack` because this target is specific to `/classes`. Shared component and fixture changes are translations of existing owners used by the current page. No duplicate Base UI owner was introduced.

## Visual/layout evidence

Browser screenshot review compared `/classes` against Public Classes. Runtime metrics after implementation:

- Desktop 1440x900: hero top 107/bottom 507.391/height 400.391, heading bottom 607.141, class grid top 617.047, first card visible 282.953, identity top 1036.828, overflow 0.
- Desktop fold 1280x720: hero top 107/bottom 467.375/height 360.375, heading bottom 560.625, class grid top 569.828, first card visible 150.172, identity top 968.469, overflow 0.
- Mobile 393x852: hero height 661.797, class grid top 1089.547, overflow 0.

The implemented flow now follows the target structure: Năm Lộ hero first, compact heading, five class cards in the first desktop fold, identity/detail deck after the card row, and Võ art/reference board after the first-flow content.

## Evidence

- RED browser/e2e: the first real assertion run failed because the desktop first class card had only 92.266px visible in the 1280x720 fold.
- GREEN browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts --project=chromium-desktop --project=chromium-mobile` PASS 2/2 after implementation.
- Screenshot/metrics capture: `/tmp/lgo-classes-page-v1137-fold720.png`, `/tmp/lgo-classes-page-v1137-desktop.png`, and `/tmp/lgo-classes-page-v1137-mobile.png` reviewed.
- Final closure verification is recorded in the report and handoff.

Process gates: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout were applied before closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. No independent backend was added.
