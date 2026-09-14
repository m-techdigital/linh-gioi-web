# LGO Web FE Support Help Real UI Layout Report v1.147

Task: WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147.
Status: WEB_CLOSED.
Page: `/support/help`.

## Result

`/support/help` now follows Real Browser UI/UX Layout First. The visible first-flow is a compact Vietnamese FAQ hub: `FAQ nhanh` hero, registered support-help target board, FAQ route map, discovery groups and issue routing. The page no longer presents stale `Design Target First` or English `Public Support Help` labels in the first-flow.

Base First was applied. Reusable support/help route-map density, FAQ discovery board and issue-category board styles live in `packages/ui/src/service-layout.css`. The stale page-local support-help CSS block was removed from `apps/web/src/app/globals.css`, keeping CSS managed by owner/role and preventing route-specific file growth.

## Visual and browser evidence

RED browser metrics showed the old layout was too deep: desktop hero 493.266, board 494.063–756.438, routes top 926.625, discovery top 1169.484; mobile hero 955.344, board bottom 1489.75, routes top 1855.188, discovery top 3809.844.

GREEN browser metrics after repair: desktop overflow 0, h1 34.816px, hero bottom 400.75, board top 396.109, board bottom 587.859, route board top 616.813, route board bottom 883.453, discovery top 902.0, issue top 1322.109; mobile overflow 0, h1 39px, hero bottom 531.547, board top 539.547, board bottom 879.859, route board top 911.047, route board bottom 1474.328, discovery top 1489.516, issue top 2745.391.

screenshot review used `/tmp/support-help-desktop-after3-v1147.png` and `/tmp/support-help-mobile-after3-v1147.png` against the registered design target `support-help-detailed-design-target-v1132.png`. The comparison covered hero composition, board position, route-card density, FAQ group order, mobile overflow and first-fold reach.

## Verification

- browser/e2e: support-help desktop/mobile specs for v1.132 and v1.147.
- source validators: v1.132 regression validator and v1.147 real UI layout validator.
- package checks: content tests, UI typecheck, web typecheck, web production build.
- current-state closure validator on a clean copy.

## Boundaries

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit. Fixture content remains provisional and is not a canonical backend contract.
