# LGO WEB FE Guides Accessibility Readability Real UI Layout Report v1.167

Task: `WEB-FE-GUIDES-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.167`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/accessibility-readability-guide`
Baseline commit: `6794b54`

## Result

The Accessibility Readability guide now renders as a compact, Vietnamese quét tiêu đề → trang Bắt đầu → đọc mobile theo thẻ → đọc ranh giới guide-flow page. It uses the shared compact guide-flow base and a route-specific readability theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: generic guide badge, mixed English Start hub/headings/mobile cards/safety-download boundaries/formal audit copy, no compact guide-flow class, no guide detail board, h1 51.2px, hero bottom 440.03px, world CTA top 453.14px, scrollHeight 3518px, overflow 0.
- Mobile: generic guide badge, mixed English copy, no compact guide-flow class, no guide detail board, hero bottom 723.14px, world CTA top 735.61px, action band top 5006.67px, scrollHeight 6507px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Đọc web Linh Giới dễ hơn`, badge `Dễ đọc dễ dùng`, hero bottom 424.38px, detail top 436.84px, world CTA top 861.22px, route CTA top 1013.27px, action band top 2160.52px, scrollHeight 2877px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 568.38px, detail top 578.28px, first step top 740.72px, world CTA top 1274.55px, route CTA top 1537.14px, action band top 3392.91px, scrollHeight 4422px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `pnpm exec playwright test tests/e2e/fe-guides-accessibility-readability-real-ui-layout-v1167.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-accessibility-readability-desktop-v1167.png`, `/tmp/guides-accessibility-readability-mobile-v1167.png`.
- Source validator: `tools/validate_web_fe_guides_accessibility_readability_real_ui_layout_v1167.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim formal accessibility certification, legal audit, personalization backend, production auth, public build, ticket live or production deployment.
