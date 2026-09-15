# HANDOFF LGO Web FE Release Real UI Layout v1.220

Status: WEB_CLOSED

Task ID: WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220

Closed page: `/release`.

Base First/CSS owner decision:
- Reused `WebAppShell`, `Stack`, `GameCard`, `LinkButton`, `StatusBadge`, `ReleaseNarrativeStageBoard`, `ReleaseReadinessHubCta` and shared service disclosure.
- Moved active Release layout CSS into `packages/ui/src/service-layout.css` in the v1.220 shared release narrative block.
- Removed stale Release v1.127/v1.142 blocks from `apps/web/src/app/globals.css`.
- Kept page code focused on composition and the route-specific M0→M1 visual board; reusable density, grids, typography and CTA rhythm are owned by the shared UI package.

Closure evidence:
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts tests/e2e/fe-release-real-ui-layout-v1220.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots: `/tmp/release-desktop-v1220.png`, `/tmp/release-mobile-v1220.png`.
- Final browser metrics: desktop scrollHeight 1510px, heroBottom 360.92px, boardTop 349.08px, stagesTop 549.38px, readinessTop 1031.03px, disclosureTop 1207.33px; mobile scrollHeight 3095px, heroBottom 546.94px, boardTop 618.94px, stagesTop 1184.13px, readinessTop 2127.41px, disclosureTop 2676.08px.
- Source validator: `tools/validate_web_fe_release_real_ui_layout_v1220.py`.
- Required before commit: Web typecheck, UI typecheck, Web build and current-state validator.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221.
Next single page: `/release/readiness`.

Continue Real Browser UI/UX Layout First, Runtime Layout Gate and Base First. Use design target only as comparison guardrail. Do not move past `/release/readiness` before browser/e2e, screenshot review, validator, build/typecheck, docs, commit and push.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, open beta or public download promise.
