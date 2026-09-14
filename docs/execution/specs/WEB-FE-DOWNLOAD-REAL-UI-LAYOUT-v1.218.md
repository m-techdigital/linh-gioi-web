# WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

Scope: close only `/download` as a real browser UI/UX Layout page slice. The existing Vietnamese Public Download design target was usable as a comparison guardrail; work focused on the rendered browser page, first-fold availability flow, release-gate density, trust/evidence rhythm, disclosure of secondary proof boards and shared Base CSS ownership.

Implementation:
- Kept the page order as hero → readiness checklist → official channels → download status depth → trust gate → release evidence → collapsed secondary evidence → design target band.
- Converted the oversized secondary proof stack into a shared disclosure pattern so support, route continuity, performance and guide proof remain available without pushing the main download flow below the fold.
- Moved active Download layout ownership into `packages/ui/src/service-layout.css` under the v1.218 shared download availability block.
- Removed stale `/download` layout blocks from `apps/web/src/app/globals.css` so old app-local CSS cannot override the shared Base layout.
- Kept the design target Vietnamese and scenario-correct as a guardrail only; no batch design, text-only or validator-only progress was used.

Evidence:
- RED baseline browser metrics before Base compaction: desktop scrollHeight 12567px, trustGateTop 1435.78px, releaseDetailTop 3502.73px; mobile scrollHeight 26690px, heroBottom 992.47px, readinessTop 1048.47px, channelTop 2556.5px, releaseDetailTop 8800.52px, one-column mobile readiness/channel flow.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-download-design-target-density-v1125.spec.ts tests/e2e/fe-download-vietnamese-design-match-v1140.spec.ts tests/e2e/fe-download-real-ui-layout-v1218.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Final desktop metrics: overflow 0, desktop scrollHeight 2074px, h1/max font 38.4px, heroBottom 451px, gateTop 163px, readinessTop 457.41px, channelTop 622.33px, statusDepthTop 767.44px, trustGateTop 991.91px, releaseChecklistTop 1485.33px, releaseDetailTop 1717.33px, designBandTop 1877.23px, 5 readiness columns and 2 channel columns.
- Final mobile metrics: overflow 0, mobile scrollHeight 2935px, h1 27.19px, max font 32px, heroBottom 552.77px, readinessTop 562.03px, channelTop 984.95px, statusDepthTop 1212.84px, trustGateTop 1574.28px, releaseChecklistTop 2132.80px, releaseDetailTop 2476.19px, designBandTop 2678.66px, 2 readiness columns and 2 channel columns.
- Screenshots reviewed by browser output: `/tmp/download-desktop-v1218.png`, `/tmp/download-mobile-v1218.png`.
- Source validator: `tools/validate_web_fe_download_real_ui_layout_v1218.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build or public download promise.
