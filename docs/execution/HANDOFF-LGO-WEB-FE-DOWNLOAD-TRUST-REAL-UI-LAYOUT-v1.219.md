# HANDOFF LGO Web FE Download Trust Real UI Layout v1.219

Status: WEB_CLOSED

Task ID: WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219

Closed page: `/download/trust`.

Base First/CSS owner decision:
- Reused `WebAppShell`, `Stack`, `GameCard`, `LinkButton`, `SectionHeading`, `StatusBadge`, `DownloadTrustGateBoard`, `OwnerReleaseGateBoard`, `ReleaseEvidenceChecklist`, `DownloadStatusDepth` and `DownloadTrustCta`.
- Moved active Download Trust layout CSS into `packages/ui/src/service-layout.css` in the v1.219 shared download trust block.
- Removed stale Download Trust v1.126/v1.141 blocks from `apps/web/src/app/globals.css`.
- Kept page code focused on composition and the route-specific disclosure placement; reusable density, grids, typography and card rhythm are owned by the shared UI package.

Closure evidence:
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts tests/e2e/fe-download-trust-real-ui-layout-v1219.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots: `/tmp/download-trust-desktop-v1219.png`, `/tmp/download-trust-mobile-v1219.png`.
- Final browser metrics: desktop scrollHeight 2209px, heroBottom 393px, trustGateTop 401.33px, firstGatesTop 812.17px, releaseEvidenceTop 1112.06px, secondaryTop 1876.55px; mobile scrollHeight 3204px, heroBottom 369.67px, trustGateTop 378.63px, firstGatesTop 888.66px, releaseEvidenceTop 1511.92px, secondaryTop 2768.45px.
- Source validator: `tools/validate_web_fe_download_trust_real_ui_layout_v1219.py`.
- Required before commit: Web typecheck, UI typecheck, Web build and current-state validator.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.220.
Next single page: `/release`.

Continue Real Browser UI/UX Layout First, Runtime Layout Gate and Base First. Use design target only as comparison guardrail. Do not move past `/release` before browser/e2e, screenshot review, validator, build/typecheck, docs, commit and push.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, real SHA256 artifact or public download promise.
