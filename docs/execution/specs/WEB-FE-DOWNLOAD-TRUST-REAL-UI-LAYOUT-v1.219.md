# WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219

Status: WEB_CLOSED

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

Scope: close only `/download/trust` as a real browser UI/UX Layout page slice. The existing Vietnamese Public Download Trust design target was usable as a comparison guardrail; work focused on the rendered browser page, trust-gate first-flow, owner evidence density, checksum/provenance hierarchy, disclosure of secondary proof boards and shared Base CSS ownership.

Implementation:
- Kept the page order as hero → trust gate board → why/trust heading → release readiness and owner gate → release evidence → download status depth → trust CTA → collapsed secondary evidence.
- Converted the oversized secondary proof chain into one shared disclosure so guidance, route continuity, performance, roadmap and tester support remain available without pushing the primary trust flow below the fold.
- Moved active Download Trust layout ownership into `packages/ui/src/service-layout.css` under the v1.219 shared download trust block.
- Removed stale `/download/trust` v1.126/v1.141 layout blocks from `apps/web/src/app/globals.css` so old app-local CSS cannot override the shared Base layout.
- Kept the design target Vietnamese and scenario-correct as a guardrail only; no batch design, text-only or validator-only progress was used.

Evidence:
- RED baseline browser metrics before Base compaction: desktop scrollHeight 13079px, designBoardTop 5529.48px, releaseEvidenceTop 6280.86px, statusDepthTop 7055.61px; mobile scrollHeight 28482px, h1 39.55px, trustGateTop 815.89px, trustGateBottom 3652.78px, firstGatesTop 3969.92px, releaseEvidenceTop 14298.64px, one-column trust/owner/evidence flow.
- GREEN browser/e2e: `pnpm exec playwright test tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts tests/e2e/fe-download-trust-real-ui-layout-v1219.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Final desktop metrics: overflow 0, desktop scrollHeight 2209px, h1/max font 35.2px, heroBottom 393px, trustGateTop 401.33px, trustGateBottom 690.83px, firstGatesTop 812.17px, ownerGateTop 812.17px, releaseEvidenceTop 1112.06px, statusDepthTop 1317.91px, secondaryTop 1876.55px, designBandTop 2012.45px, 6 trust columns, 2 first-gate columns, 4 owner-gate columns and 4 release-evidence columns.
- Final mobile metrics: overflow 0, mobile scrollHeight 3204px, h1 26.37px, max font 32px, heroBottom 369.67px, trustGateTop 378.63px, trustGateBottom 855.66px, firstGatesTop 888.66px, ownerGateTop 1145.08px, releaseEvidenceTop 1511.92px, statusDepthTop 1820.23px, secondaryTop 2768.45px, designBandTop 2946.92px, 2 trust columns, 2 owner-gate columns and 2 release-evidence columns.
- Screenshots reviewed by browser output: `/tmp/download-trust-desktop-v1219.png`, `/tmp/download-trust-mobile-v1219.png`.
- Source validator: `tools/validate_web_fe_download_trust_real_ui_layout_v1219.py`.
- Typecheck/build/current-state closure validators are required before commit.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, real SHA256 artifact or public download promise.
