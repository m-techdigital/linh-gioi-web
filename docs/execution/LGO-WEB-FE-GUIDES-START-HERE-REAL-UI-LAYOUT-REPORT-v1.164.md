# LGO WEB FE Guides Start Here Real UI Layout Report v1.164

Task: `WEB-FE-GUIDES-START-HERE-REAL-UI-LAYOUT-v1.164`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/start-here-content-hub-guide`
Baseline commit: `6bc35c1`

## Result

The Start Here guide now renders as a compact, Vietnamese first-reading route-selection guide-flow page. It uses the shared compact guide-flow base and a route-specific start-hub theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: generic guide badge, mixed English copy, no compact guide-flow class, 3 steps, h1 51.2px, hero bottom 488.16px, detail top 501.27px, action band top 3216.58px, scrollHeight 4117px, overflow 0.
- Mobile: generic guide badge, mixed English copy, no compact guide-flow class, 3 steps, hero bottom 751.72px, first step top 989.98px, action band top 5708.14px, scrollHeight 7209px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Bắt đầu đọc web Linh Giới`, badge `Bắt đầu đọc web`, hero bottom 424.38px, detail top 436.84px, world CTA top 861.22px, route CTA top 1013.27px, action band top 2160.52px, scrollHeight 2877px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-start-here-real-ui-layout-v1164.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-start-here-desktop-v1164.png`, `/tmp/guides-start-here-mobile-v1164.png`.
- Source validator: `tools/validate_web_fe_guides_start_here_real_ui_layout_v1164.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim backend recommendations, CMS navigation, real account routing, production auth, download artifact, entitlement, support ticket backend or production deployment.
