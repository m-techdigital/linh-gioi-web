# HANDOFF-LGO-WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158

Status: WEB_CLOSED.

Task ID: WEB-FE-GUIDES-GATE-ENTRY-REAL-UI-LAYOUT-v1.158.

Closure tags: Real Browser UI/UX Layout First; Base First; browser/e2e.

Closed page: `/guides/gate-entry-guide`.

What changed:

- Replaced the Gate Entry placeholder first-flow with Vietnamese Cổng Linh scenario copy that is necessary for browser layout comparison.
- Added three current-page guide steps covering Cổng Linh, Người Giữ Cổng and Đá Luyện/readiness flow.
- Added `lgo-gateentrypage-stack` and `lgo-gate-entry-hero-card` composition classes to the shared guide detail route.
- Extended `packages/ui/src/service-layout.css` for Gate Entry density, desktop three-column guide steps, mobile hero CTA grid, compact downstream CTAs and typography caps.
- Fixed mobile app-shell brand link overflow in the existing `apps/web/src/app/globals.css` shell owner.
- Added Playwright desktop/mobile coverage for layout metrics, overflow, focus navigation and screenshot capture.
- Updated project state, task ledger, next action and this handoff.

Evidence:

- Browser/e2e desktop/mobile: `tests/e2e/fe-guides-gate-entry-real-ui-layout-v1158.spec.ts` passed 2/2.
- Screenshots: `/tmp/guides-gate-entry-desktop-v1158.png`, `/tmp/guides-gate-entry-mobile-v1158.png`.
- Source validator: `tools/validate_web_fe_guides_gate_entry_real_ui_layout_v1158.py`.
- Web/UI typecheck passed; Web build passed; clean current-state validator passed.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.159`, selecting only `/guides/beginner-training-loop-guide` until that page is fully closed with browser/e2e/screenshot/validator/build/docs/commit/push.

Non-claims retained: no production auth, no DB persistence, no real Portal integration, no real Ops/Admin mutation, no production download, no launcher, no support ticket backend, NO_ACCEPTED_BACKEND_CONTRACT.
