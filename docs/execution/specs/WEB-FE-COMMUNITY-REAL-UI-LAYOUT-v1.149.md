# WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.149

Status: WEB_CLOSED.

Scope: close `/community` as one page slice under Real Browser UI/UX Layout First. `/community` only had the broad Public Service atlas, so this task created one Vietnamese page-specific target and immediately used it to repair the real rendered page.

## Decisions

- Create and register `community-detailed-design-target-v1149.png` as the page target for `/community`.
- Use Vietnamese community-plaza scenario: Cộng đồng Linh Giới, Quảng trường Linh Thành, Hòa nhập cộng đồng, Quy tắc ứng xử and Phản hồi an toàn.
- Replace the old first-flow that mixed English labels and backend terms.
- Apply Base First by adding shared community page layout to `packages/ui/src/service-layout.css`; page code composes shared classes instead of adding new route CSS to `apps/web/src/app/globals.css`.
- Keep community functions static and FE-only: no real trò chuyện, diễn đàn, bang hội, phiếu hỗ trợ, account lookup or moderation backend.

## Evidence plan

- Source validator: `python3 tools/validate_web_fe_community_real_ui_layout_v1149.py`.
- browser/e2e: `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-community-real-ui-layout-v1149.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Package checks: content tests, UI typecheck, web typecheck and production web build.
- Visual review: screenshots `/tmp/community-desktop-after1-v1149.png` and `/tmp/community-mobile-after1-v1149.png` compared against `apps/web/public/design-reference/community-detailed-design-target-v1149.png`.

## Browser comparison notes

RED before layout repair: desktop h1 64px, first-flow leaked chat/forum/guild/No CMS/Real feedback, plaza top 1055.641, onboarding top 2387.266; mobile hero bottom 15080.172 due broad stack measurement, plaza top 1891.484, onboarding top 4372.531, first-flow leaked chat/forum/guild/backend labels.

GREEN after layout repair: desktop overflow 0, h1 34.816px, hero bottom 373.125, board top 372.484, board bottom 564.234, focus top 593.188, focus bottom 871.375, plaza top 889.922, onboarding top 1957.422; mobile overflow 0, h1 39px, hero bottom 542.797, board top 550.797, board bottom 847.875, focus top 879.063, focus bottom 1487.297, plaza top 1502.484, onboarding top 3574.563.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
