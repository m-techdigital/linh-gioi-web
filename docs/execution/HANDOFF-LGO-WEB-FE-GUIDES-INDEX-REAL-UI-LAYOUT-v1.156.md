# HANDOFF-LGO-WEB-FE-GUIDES-INDEX-REAL-UI-LAYOUT-v1.156

Status: WEB_CLOSED.

Closed page: `/guides`.

Execution rule: Real Browser UI/UX Layout First with Base First.

What changed:

- Reworked `/guides` into a compact guide index: hero, quick reading map, featured world-loop guide, primary guide grid and archive grid.
- browser/e2e was used for closure evidence and screenshots.
- Kept the design target as a minimal comparison guardrail and avoided any new design batch.
- Moved reusable guide-index layout CSS into `packages/ui/src/service-layout.css` under Base First ownership.
- Updated source/e2e validators so card density, responsive metrics, first-flow Vietnamese labels and focus navigation are checked.

Required evidence completed:

- Render thật trong browser: completed through Playwright desktop/mobile and screenshot review.
- E2E/browser metrics: `tests/e2e/fe-guides-index-real-ui-layout-v1156.spec.ts` passed 2/2.
- Screenshot/visual review: `/tmp/guides-index-desktop-v1156.png`, `/tmp/guides-index-mobile-v1156.png`.
- Source validator: `tools/validate_web_fe_guides_index_real_ui_layout_v1156.py` passed.
- Typecheck/build: Web/UI typecheck and Web production build passed.
- Current-state closure validator passed.

Next allowed task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.157. Select `/guides/beginner` as the next single page only after this commit is pushed.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
