# HANDOFF — WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.148

Status: WEB_CLOSED.

Closed page: `/support/safety`. Real Browser UI/UX Layout First was the governing delivery rule.

## What changed

- Used the existing Vietnamese support-safety design target as a guardrail and focused implementation on the real browser UI/UX Layout.
- Tightened the hero to `Báo lỗi an toàn`, localized target scope to `Hỗ trợ an toàn`, and replaced stale design-first copy with `Board tham chiếu`.
- Reworked the safe-reporting flow so desktop and mobile reach the board, checklist, principles and issue routing earlier.
- Moved reusable layout styles to `packages/ui/src/service-layout.css` under Base First and removed support/safety route blocks from `apps/web/src/app/globals.css`.
- Kept content/demo data FE-only with no fake ticket, account lookup, moderation backend or production private-data intake.

## Evidence

browser/e2e and screenshot review covered `/support/safety` desktop/mobile. RED before repair: desktop hero bottom 456.406, board bottom 719.578, checklist bottom 1034.938, principles top 1060.531, issue top 1641.672; mobile hero bottom 899.922, board bottom 1431.859, checklist bottom 3100.203, principles top 3156.203, issue top 5020.328. GREEN after repair: desktop overflow 0, h1 34.816px, hero bottom 368.953, board top 368.313, board bottom 560.063, heading top 590.609, checklist bottom 845.625, principles top 864.172, issue top 1329.75; mobile overflow 0, h1 39px, hero bottom 516.547, board top 524.547, board bottom 821.625, heading top 852.813, checklist bottom 1425.188, principles top 1440.375, issue top 2524.813.

Expected verification set:

- `python3 tools/validate_web_fe_support_safety_design_target_density_v1133.py`
- `python3 tools/validate_web_fe_support_safety_real_ui_layout_v1148.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts tests/e2e/fe-support-safety-real-ui-layout-v1148.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- clean-copy `python3 tools/validate_web_current_state.py`

## Next allowed step

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.149 may select `/community` as the next single active page. Do not move there until v1.148 is committed and pushed.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
