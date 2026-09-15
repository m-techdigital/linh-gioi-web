# WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

Scope: close only `/release` as a real browser UI/UX Layout page slice. The existing Vietnamese Public Release design target was usable as a comparison guardrail; work focused on the rendered browser page, staged-release first-flow, M0→M1 visual board density, stage card rhythm, readiness CTA placement, disclosure behavior and shared Base CSS ownership.

Implementation:
- Kept the page order as hero → M0→M1 visual board → release narrative stages → release readiness CTA → collapsed expanded evidence.
- Preserved the already usable compact browser layout and moved its owner from stale `apps/web/src/app/globals.css` to `packages/ui/src/service-layout.css` under the v1.220 shared release narrative block.
- Tuned the shared block so desktop kept the verified compact density after cascade order changed: hero, design board and stage board remain in a short first-flow.
- Removed stale `/release` v1.127/v1.142 app-local layout blocks from `apps/web/src/app/globals.css`.
- Kept the design target Vietnamese and scenario-correct as a guardrail only; no batch design, text-only or validator-only progress was used.

Evidence:
- RED baseline/browser inspection before shared ownership move: desktop scrollHeight 1510px, heroBottom 391.5px, boardTop 379.66px, stagesTop 579.95px; mobile scrollHeight 3095px, heroBottom 546.94px, boardTop 618.94px, stagesTop 1184.13px. Layout was visually acceptable, but CSS owner was wrong.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts tests/e2e/fe-release-real-ui-layout-v1220.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Final desktop metrics: overflow 0, desktop scrollHeight 1510px, h1/max font 34.82px, heroBottom 360.92px, boardTop 349.08px, boardBottom 530.83px, stagesTop 549.38px, stagesBottom 1030.08px, readinessTop 1031.03px, disclosureTop 1207.33px, designBandTop 1313.39px, 6 stage columns and collapsed disclosure with 2 direct children.
- Final mobile metrics: overflow 0, mobile scrollHeight 3095px, h1/max font 30.28px, heroBottom 546.94px, boardTop 618.94px, boardBottom 1133.72px, stagesTop 1184.13px, stagesBottom 2071.41px, readinessTop 2127.41px, disclosureTop 2676.08px, designBandTop 2838.33px, 2 stage columns and collapsed disclosure with 2 direct children.
- Screenshots reviewed by browser output: `/tmp/release-desktop-v1220.png`, `/tmp/release-mobile-v1220.png`.
- Source validator: `tools/validate_web_fe_release_real_ui_layout_v1220.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, open beta or public download promise.
