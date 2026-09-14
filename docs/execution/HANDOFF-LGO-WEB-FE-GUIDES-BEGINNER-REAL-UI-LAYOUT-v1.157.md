# HANDOFF-LGO-WEB-FE-GUIDES-BEGINNER-REAL-UI-LAYOUT-v1.157

Status: WEB_CLOSED.

Closed page: `/guides/beginner`.

Execution rule: Real Browser UI/UX Layout First with Base First.

What changed:

- Reworked `/guides/beginner` into a compact beginner path: hero, world-story cards, four beginner steps, download status and FAQ.
- browser/e2e was used for closure evidence and screenshots.
- Kept the design target as a minimal comparison guardrail and avoided any new design batch.
- Moved reusable v1.8 game-information depth CSS into `packages/ui/src/service-layout.css` under Base First ownership.
- Updated source/e2e validators so section density, responsive metrics, Vietnamese scenario labels and focus navigation are checked.

Required evidence completed:

- Render thật trong browser: completed through Playwright desktop/mobile and screenshot review.
- E2E/browser metrics: `tests/e2e/fe-guides-beginner-real-ui-layout-v1157.spec.ts` passed 2/2.
- Screenshot/visual review: `/tmp/guides-beginner-desktop-v1157.png`, `/tmp/guides-beginner-mobile-v1157.png`.
- Source validator: `tools/validate_web_fe_guides_beginner_real_ui_layout_v1157.py` passed.
- Typecheck/build: Web/UI typecheck and Web production build passed.
- Current-state closure validator passed.

Next allowed task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.158. Select `/guides/gate-entry-guide` as the next single page only after this commit is pushed.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
