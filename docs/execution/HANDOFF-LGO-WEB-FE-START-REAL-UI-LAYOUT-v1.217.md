# HANDOFF LGO Web FE Start Real UI Layout v1.217

Status: WEB_CLOSED

Task ID: WEB-FE-START-REAL-UI-LAYOUT-v1.217

Closed page: `/start`.

Base First/CSS owner decision:
- Reused `WebAppShell`, `Stack`, shared UI buttons/status badges, `PublicPlayerHero`, `CinematicWorldScene`, `ClassPathGrid compact` and `WorldRouteJourney`.
- Moved reusable Start overview layout CSS into `packages/ui/src/service-layout.css` in one consolidated v1.217 block.
- Removed stale Start v1.90/v1.124/v1.139 blocks from `apps/web/src/app/globals.css`.
- Kept only public shell design-reference compaction in `globals.css` because it belongs to the app public shell and prevents internal design tooling from dominating real public pages.
- AXIRO was referenced for code organization only; no code or design was copied.

Closure evidence:
- Browser/e2e: `pnpm exec playwright test tests/e2e/fe-start-design-target-density-v1124.spec.ts tests/e2e/fe-start-vietnamese-design-match-v1139.spec.ts tests/e2e/fe-public-start-design-board-v179.spec.ts tests/e2e/fe-public-start-real-onboarding-gallery-v190.spec.ts tests/e2e/fe-start-real-ui-layout-v1217.spec.ts --project=chromium-desktop --project=chromium-mobile`.
- Screenshots: `/tmp/start-desktop-v1217.png`, `/tmp/start-mobile-v1217.png`.
- Final browser metrics: desktop scrollHeight 2050px, heroBottom 463px, classGridTop 1273.17px; mobile scrollHeight 3080px, heroBottom 624.56px, classGridTop 1522.19px.
- Source validator: `tools/validate_web_fe_start_real_ui_layout_v1217.py`.
- Required before commit: Web typecheck, UI typecheck, Web build and current-state validator.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.218.
Next single page: `/download`.

Continue Real Browser UI/UX Layout First, Runtime Layout Gate and Base First. Use design target only as comparison guardrail. Do not move past `/download` before browser/e2e, screenshot review, validator, build/typecheck, docs, commit and push.

Non-claims: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
