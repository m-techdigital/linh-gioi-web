# HANDOFF — WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149

Status: WEB_CLOSED.

Closed page: `/community`. Real Browser UI/UX Layout First was the governing delivery rule.

## What changed

- Created the Vietnamese `/community` page target `community-detailed-design-target-v1149.png` and registered it in the design target registry.
- Added PublicDesignTargetReference routing for `/community` with scope `Cộng đồng Linh Giới`.
- Reworked the page first-flow to match the target: Cộng đồng hero → community design board → Hòa nhập/Quy tắc/Phản hồi cards → Linh Thành screenshots.
- Moved new reusable community layout rules to `packages/ui/src/service-layout.css` under Base First.
- Kept community guidance FE-only with no real trò chuyện, diễn đàn, bang hội, phiếu hỗ trợ, account lookup or moderation mutation.

## Evidence

browser/e2e and screenshot review covered `/community` desktop/mobile. RED before repair: desktop h1 64px, first-flow leaked chat/forum/guild/No CMS/Real feedback, plaza top 1055.641, onboarding top 2387.266; mobile hero bottom 15080.172 due broad stack measurement, plaza top 1891.484, onboarding top 4372.531, first-flow leaked chat/forum/guild/backend labels. GREEN after repair: desktop overflow 0, h1 34.816px, hero bottom 373.125, board top 372.484, board bottom 564.234, focus top 593.188, focus bottom 871.375, plaza top 889.922, onboarding top 1957.422; mobile overflow 0, h1 39px, hero bottom 542.797, board top 550.797, board bottom 847.875, focus top 879.063, focus bottom 1487.297, plaza top 1502.484, onboarding top 3574.563.

Expected verification set:

- `python3 tools/validate_web_fe_community_real_ui_layout_v1149.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-community-real-ui-layout-v1149.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- clean-copy `python3 tools/validate_web_current_state.py`

## Next allowed step

WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.150 may select `/community/onboarding` as the next single active page. Do not move there until v1.149 is committed and pushed.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
