# LGO WEB FE Guides World Gameplay Loop Real UI Layout Report v1.165

Task: `WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/world-gameplay-loop-guide`
Baseline commit: `fb0e26e`

## Result

The World Gameplay Loop guide now renders as a compact, Vietnamese Cổng Linh → Người Gác Cổng → Đá Luyện Tập guide-flow page. It uses the shared compact guide-flow base and a route-specific world-loop theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: generic guide badge, mixed English Spirit Gate/Gate Keeper/Training Stone copy, no compact guide-flow class, h1 51.2px, hero bottom 488.16px, detail top 501.27px, action band top 3248.52px, scrollHeight 4149px, overflow 0.
- Mobile: generic guide badge, mixed English copy, no compact guide-flow class, hero bottom 751.72px, first step top 989.98px, action band top 5832.17px, scrollHeight 7333px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Vòng lặp thế giới nhập môn`, badge `Vòng lặp thế giới`, hero bottom 424.38px, detail top 436.84px, world CTA top 845.38px, route CTA top 997.42px, action band top 2144.67px, scrollHeight 2862px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `pnpm exec playwright test tests/e2e/fe-guides-world-gameplay-loop-real-ui-layout-v1165.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-world-gameplay-loop-desktop-v1165.png`, `/tmp/guides-world-gameplay-loop-mobile-v1165.png`.
- Source validator: `tools/validate_web_fe_guides_world_gameplay_loop_real_ui_layout_v1165.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim live map, combat, quest persistence, inventory, economy, public build artifact, entitlement, ticket backend, production auth or production deployment.
