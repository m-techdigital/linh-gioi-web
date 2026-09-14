# LGO WEB FE Guides Performance Copy Budget Real UI Layout Report v1.168

Task: `WEB-FE-GUIDES-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.168`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/performance-copy-budget-guide`
Baseline commit: `287ed38`

## Result

The Performance Copy Budget guide now renders as a compact, Vietnamese nội dung ngắn → visual nhẹ → route tĩnh → ranh giới cạnh CTA guide-flow page. It uses the shared compact guide-flow base and a route-specific performance theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: generic guide badge, English title/copy labels, no compact guide-flow class, no guide detail board, h1 51.2px, hero bottom 440.03px, world CTA top 453.14px, scrollHeight 3518px, overflow 0.
- Mobile: generic guide badge, English title/copy labels, no compact guide-flow class, no guide detail board, hero bottom 723.14px, world CTA top 735.61px, action band top 5006.67px, scrollHeight 6507px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Giữ web nhẹ và rõ`, badge `Hiệu năng đọc`, hero bottom 424.38px, detail top 436.84px, world CTA top 845.38px, route CTA top 997.42px, action band top 2144.67px, scrollHeight 2862px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `pnpm exec playwright test tests/e2e/fe-guides-performance-copy-budget-real-ui-layout-v1168.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-performance-copy-budget-desktop-v1168.png`, `/tmp/guides-performance-copy-budget-mobile-v1168.png`.
- Source validator: `tools/validate_web_fe_guides_performance_copy_budget_real_ui_layout_v1168.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim production monitoring, CDN, entitlement, production auth, public build, ticket live or production deployment.
