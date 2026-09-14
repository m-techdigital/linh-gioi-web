# WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147

Status: WEB_CLOSED.

Scope: close `/support/help` as one page slice under Real Browser UI/UX Layout First. The existing Vietnamese Public Support Help design target was usable, so this task did not regenerate the target. The target was used as a browser comparison aid while the real rendered page became the deliverable.

## Decisions

- Keep `/support/help` as the only edited page slice.
- Replace stale design-first surface labels with `Board tham chiếu` and Vietnamese `Trung tâm trợ giúp` target scope.
- Compact the FAQ quick route first-flow so hero, design board, route map and FAQ groups are reachable earlier in desktop/mobile browsers.
- Apply Base First by moving the reusable FAQ route-map, discovery and issue-board layout into `packages/ui/src/service-layout.css` instead of growing `apps/web/src/app/globals.css`.
- Keep fixtures provisional and do not create production auth, DB, ticket, account lookup or independent backend behavior.

## Evidence plan

- Source validator: `python3 tools/validate_web_fe_support_help_real_ui_layout_v1147.py`.
- Regression guard: `python3 tools/validate_web_fe_support_help_design_target_density_v1132.py`.
- browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-support-help-design-target-density-v1132.spec.ts tests/e2e/fe-support-help-real-ui-layout-v1147.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Package checks: content test, UI typecheck, web typecheck and production web build.
- Visual review: screenshots `/tmp/support-help-desktop-after3-v1147.png` and `/tmp/support-help-mobile-after3-v1147.png` compared against `apps/web/public/design-reference/support-help-detailed-design-target-v1132.png`.

## Browser comparison notes

RED before layout repair: desktop hero 493.266, board 494.063–756.438, routes top 926.625, discovery top 1169.484; mobile hero 955.344, board bottom 1489.75, routes top 1855.188, discovery top 3809.844.

GREEN after layout repair: desktop overflow 0, h1 34.816px, hero bottom 400.75, board top 396.109, board bottom 587.859, route board top 616.813, route board bottom 883.453, discovery top 902.0, issue top 1322.109; mobile overflow 0, h1 39px, hero bottom 531.547, board top 539.547, board bottom 879.859, route board top 911.047, route board bottom 1474.328, discovery top 1489.516, issue top 2745.391.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
