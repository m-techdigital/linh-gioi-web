# HANDOFF — WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.147

Status: WEB_CLOSED.

Closed page: `/support/help`. Real Browser UI/UX Layout First was the governing delivery rule.

## What changed

- Used the existing Vietnamese support-help design target as a guardrail and focused implementation on the real browser UI/UX Layout.
- Tightened the hero to `FAQ nhanh`, localized the target scope to `Trung tâm trợ giúp`, and replaced stale design-first copy with `Board tham chiếu`.
- Reworked the FAQ route-map flow so desktop and mobile reach the route board and FAQ sections earlier.
- Moved reusable layout styles to `packages/ui/src/service-layout.css` under Base First and removed the old support-help route block from `apps/web/src/app/globals.css`.
- Kept content/demo data FE-only with no fake backend search, ticket system, account lookup or production mutation.

## Evidence

browser/e2e and screenshot review covered `/support/help` desktop/mobile. RED before repair: desktop hero 493.266, board 494.063–756.438, routes top 926.625, discovery top 1169.484; mobile hero 955.344, board bottom 1489.75, routes top 1855.188, discovery top 3809.844. GREEN after repair: desktop overflow 0, h1 34.816px, hero bottom 400.75, board top 396.109, board bottom 587.859, route board top 616.813, route board bottom 883.453, discovery top 902.0, issue top 1322.109; mobile overflow 0, h1 39px, hero bottom 531.547, board top 539.547, board bottom 879.859, route board top 911.047, route board bottom 1474.328, discovery top 1489.516, issue top 2745.391.

Expected verification set:

- `python3 tools/validate_web_fe_support_help_design_target_density_v1132.py`
- `python3 tools/validate_web_fe_support_help_real_ui_layout_v1147.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-support-help-design-target-density-v1132.spec.ts tests/e2e/fe-support-help-real-ui-layout-v1147.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- clean-copy `python3 tools/validate_web_current_state.py`

## Next allowed step

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.148 may select `/support/safety` as the next single active page. Do not move there until v1.147 is committed and pushed.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
