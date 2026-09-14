# LGO Web FE Community Real UI Layout Report v1.149

Task: WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149.
Status: WEB_CLOSED.
Page: `/community`.

## Result

`/community` now follows Real Browser UI/UX Layout First and has a page-specific Vietnamese design target and a real browser UI/UX Layout aligned to that target: compact Cộng đồng Linh Giới hero, Quảng trường Linh Thành board, three first-flow focus cards, real plaza screenshots, then deeper onboarding/conduct sections. The first-flow no longer exposes stale English labels such as chat/forum/guild/No CMS/Real feedback.

Base First was applied. Reusable community page density and card/layout rules live in `packages/ui/src/service-layout.css`; no new community route CSS was added to `apps/web/src/app/globals.css`.

## Visual and browser evidence

RED browser metrics showed the old layout/copy problem: desktop h1 64px, first-flow leaked chat/forum/guild/No CMS/Real feedback, plaza top 1055.641, onboarding top 2387.266; mobile hero bottom 15080.172 due broad stack measurement, plaza top 1891.484, onboarding top 4372.531, first-flow leaked chat/forum/guild/backend labels.

GREEN browser metrics after repair: desktop overflow 0, h1 34.816px, hero bottom 373.125, board top 372.484, board bottom 564.234, focus top 593.188, focus bottom 871.375, plaza top 889.922, onboarding top 1957.422; mobile overflow 0, h1 39px, hero bottom 542.797, board top 550.797, board bottom 847.875, focus top 879.063, focus bottom 1487.297, plaza top 1502.484, onboarding top 3574.563.

screenshot review used `/tmp/community-desktop-after1-v1149.png` and `/tmp/community-mobile-after1-v1149.png` against the registered design target `community-detailed-design-target-v1149.png`. The comparison covered hero composition, board placement, focus-card density, plaza screenshot order, mobile overflow and first-flow reach.

## Verification

- browser/e2e: community desktop/mobile spec v1.149.
- source validator: v1.149 real UI layout validator.
- package checks: content tests, UI typecheck, web typecheck, web production build.
- current-state closure validator on a clean copy.

## Boundaries

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. Fixture content remains provisional and is not a canonical backend contract.
