# LGO WEB FE Guides Community Roadmap Real UI Layout Report v1.163

Task: `WEB-FE-GUIDES-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.163`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/community-roadmap-onboarding-guide`
Baseline commit: `03069cf`

## Result

The Community Roadmap guide now renders as a compact, Vietnamese expectation-setting guide-flow page. It uses the shared compact guide-flow base and a route-specific community-roadmap theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: generic guide badge, no compact guide-flow class, 3 steps, h1 51.2px, hero 429.28px, detail top 549.39px, action band top 3264.70px, scrollHeight 4165px, overflow 0.
- Mobile: generic guide badge, no compact guide-flow class, 3 steps, hero 642.11px, first step top 1018.56px, action band top 5721.58px, scrollHeight 7222px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Lộ trình cộng đồng đúng kỳ vọng`, badge `Lộ trình cộng đồng`, hero bottom 464.67px, detail top 477.14px, world CTA top 901.52px, action band top 2200.81px, scrollHeight 2918px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 594.23px, detail top 604.14px, first step top 766.58px, world CTA top 1300.41px, action band top 3418.77px, scrollHeight 4448px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-community-roadmap-real-ui-layout-v1163.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-community-roadmap-desktop-v1163.png`, `/tmp/guides-community-roadmap-mobile-v1163.png`.
- Source validator: `tools/validate_web_fe_guides_community_roadmap_real_ui_layout_v1163.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim a live forum/chat/guild system, ticket backend, production account portal, real test schedule or production deployment.
