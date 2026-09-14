# HANDOFF-LGO-WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-BEGINNER-TRAINING-LOOP-REAL-UI-LAYOUT-v1.159.

Closure tags: Real Browser UI/UX Layout First; Base First; browser/e2e.

Closed page: `/guides/beginner-training-loop-guide`.

What changed:

- Replaced the Beginner Training Loop placeholder first-flow with Vietnamese onboarding/training scenario copy necessary for browser layout comparison.
- Added four current-page guide steps covering Cổng Linh, Gate Keeper, Training Stone and status/download trust.
- Added guide-flow composition classes to the shared guide detail route for compact guide variants.
- Extended `packages/ui/src/service-layout.css` with a reusable compact guide-flow base and a current-page training theme.
- Added Playwright desktop/mobile coverage for layout metrics, overflow, focus navigation and screenshot capture.
- Updated project state, task ledger, next action and this handoff.

Evidence:

- Browser/e2e desktop/mobile: `tests/e2e/fe-guides-beginner-training-loop-real-ui-layout-v1159.spec.ts` passed 2/2.
- Screenshots: `/tmp/guides-beginner-training-loop-desktop-v1159.png`, `/tmp/guides-beginner-training-loop-mobile-v1159.png`.
- Source validator: `tools/validate_web_fe_guides_beginner_training_loop_real_ui_layout_v1159.py`.
- Web/UI typecheck passed; Web build passed; clean current-state validator passed.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.160`, selecting only `/guides/download-readiness-guide` until that page is fully closed with browser/e2e/screenshot/validator/build/docs/commit/push.

Non-claims retained: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, no production download, no launcher, no combat/reward/inventory progression, NO_ACCEPTED_BACKEND_CONTRACT.
