# WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148

Status: WEB_CLOSED.

Scope: close `/support/safety` as one page slice under Real Browser UI/UX Layout First. The existing Vietnamese Public Support Safety target was usable, so this task did not regenerate the target. The target was used as a comparison guardrail while the real browser page became the deliverable.

## Decisions

- Keep `/support/safety` as the only page slice.
- Replace stale `Design Target First` first-flow label with `Board tham chiếu`.
- Localize the design reference scope to `Hỗ trợ an toàn`.
- Compact the safe-reporting first-flow: hero, design board, safety checklist, principles and issue routing.
- Apply Base First by moving support/safety board and density styles into `packages/ui/src/service-layout.css` instead of growing `apps/web/src/app/globals.css`.
- Keep guidance static and FE-only: no production auth, ticket backend, account lookup, moderation backend or private-data intake.

## Evidence plan

- Source validator: `python3 tools/validate_web_fe_support_safety_real_ui_layout_v1148.py`.
- Regression guard: `python3 tools/validate_web_fe_support_safety_design_target_density_v1133.py`.
- browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts tests/e2e/fe-support-safety-real-ui-layout-v1148.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Package checks: content tests, UI typecheck, web typecheck and production web build.
- Visual review: screenshots `/tmp/support-safety-desktop-after1-v1148.png` and `/tmp/support-safety-mobile-after1-v1148.png` compared against `apps/web/public/design-reference/support-safety-detailed-design-target-v1133.png`.

## Browser comparison notes

RED before layout repair: desktop hero bottom 456.406, board bottom 719.578, checklist bottom 1034.938, principles top 1060.531, issue top 1641.672; mobile hero bottom 899.922, board bottom 1431.859, checklist bottom 3100.203, principles top 3156.203, issue top 5020.328.

GREEN after layout repair: desktop overflow 0, h1 34.816px, hero bottom 368.953, board top 368.313, board bottom 560.063, heading top 590.609, checklist bottom 845.625, principles top 864.172, issue top 1329.75; mobile overflow 0, h1 39px, hero bottom 516.547, board top 524.547, board bottom 821.625, heading top 852.813, checklist bottom 1425.188, principles top 1440.375, issue top 2524.813.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
