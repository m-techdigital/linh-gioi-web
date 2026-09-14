# HANDOFF LGO Web FE Download Real UI Layout v1.218

Status: WEB_CLOSED

Task ID: WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218

Closed page: `/download`.

Base First/CSS owner decision:
- Reused `WebAppShell`, `Stack`, `PublicPlayerHero`, `SectionHeading`, `Grid`, `GameCard`, `StatusBadge`, `DownloadStatusDepth`, `DownloadTrustGateBoard` and `ReleaseEvidenceChecklist`.
- Moved active Download availability layout CSS into `packages/ui/src/service-layout.css` in the v1.218 shared download availability block.
- Removed stale Download v1.125/v1.140 app-local layout blocks from `apps/web/src/app/globals.css`.
- Kept page code focused on composition and the route-specific disclosure placement; reusable density, grids, typography and card rhythm are owned by the shared UI package.

Closure evidence:
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-download-design-target-density-v1125.spec.ts tests/e2e/fe-download-vietnamese-design-match-v1140.spec.ts tests/e2e/fe-download-real-ui-layout-v1218.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots: `/tmp/download-desktop-v1218.png`, `/tmp/download-mobile-v1218.png`.
- Final browser metrics: desktop scrollHeight 2074px, heroBottom 451px, readinessTop 457.41px, channelTop 622.33px, releaseChecklistTop 1485.33px; mobile scrollHeight 2935px, heroBottom 552.77px, readinessTop 562.03px, channelTop 984.95px, releaseChecklistTop 2132.80px.
- Source validator: `tools/validate_web_fe_download_real_ui_layout_v1218.py`.
- Required before commit: Web typecheck, UI typecheck, Web build and current-state validator.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219.
Next single page: `/download/trust`.

Continue Real Browser UI/UX Layout First, Runtime Layout Gate and Base First. Use design target only as comparison guardrail. Do not move past `/download/trust` before browser/e2e, screenshot review, validator, build/typecheck, docs, commit and push.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build or public download promise.
