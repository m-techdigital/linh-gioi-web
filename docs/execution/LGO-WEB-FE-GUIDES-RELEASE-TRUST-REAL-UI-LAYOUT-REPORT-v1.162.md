# LGO WEB FE Guides Release Trust Real UI Layout Report v1.162

Task: `WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162`
Status: WEB_CLOSED
Process: Real Browser UI/UX Layout First; Base First.
Page: `/guides/release-trust-and-checksum-guide`
Baseline commit: `619d5a0`

## Result

The Release Trust and Checksum guide now renders as a compact, Vietnamese, proof-before-download guide-flow page. It uses the shared compact guide-flow base and a route-specific release-trust theme in `packages/ui/src/service-layout.css`; no route CSS was added to `apps/web/src/app/globals.css`.

## Browser baseline before fix

- Desktop: placeholder English title, generic badge, no compact guide-flow class, 3 steps, h1 51.2px, hero bottom 440.03px, detail top 453.14px, action band top 3136.52px, scrollHeight 4037px, overflow 0.
- Mobile: placeholder English title, generic badge, no compact guide-flow class, 3 steps, hero bottom 723.14px, first step top 961.41px, action band top 5635.89px, scrollHeight 7136px, h1 30.4px, overflow 0.

## Final browser/e2e metrics

- Desktop: title `Tin cậy phát hành và checksum`, badge `Tin cậy phát hành`, hero bottom 464.67px, detail top 477.14px, world CTA top 885.67px, route CTA top 1037.72px, action band top 2184.97px, scrollHeight 2902px, h1 42.88px, 4 steps, 4 columns, overflow 0.
- Mobile: hero bottom 594.23px, detail top 604.14px, first step top 766.58px, world CTA top 1286.86px, route CTA top 1549.45px, action band top 3405.22px, scrollHeight 4435px, h1 27.52px, 4 steps, 1 column, overflow 0.

## Evidence

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-guides-release-trust-real-ui-layout-v1162.spec.ts --project=chromium-desktop --project=chromium-mobile` — PASS 2/2.
- Screenshots: `/tmp/guides-release-trust-desktop-v1162.png`, `/tmp/guides-release-trust-mobile-v1162.png`.
- Source validator: `tools/validate_web_fe_guides_release_trust_real_ui_layout_v1162.py`.
- Closure checks passed: `pnpm --filter @lgo-web/web typecheck`, `pnpm --filter @lgo-web/ui typecheck`, `pnpm --filter @lgo-web/web build`, and clean-copy `tools/validate_web_current_state.py`.

## Boundary

NO_ACCEPTED_BACKEND_CONTRACT remains. This page does not claim a real download artifact, checksum, launcher, entitlement, ticket backend, CMS workflow or production deployment.
