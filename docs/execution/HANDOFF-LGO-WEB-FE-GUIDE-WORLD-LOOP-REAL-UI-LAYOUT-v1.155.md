# HANDOFF-LGO-WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155

Status: WEB_CLOSED.

Closed page: `/guides/world-gameplay-loop-guide`.

Execution rule: Real Browser UI/UX Layout First with Base First.

What changed:

- Reworked guide detail first-flow into a real browser UI/UX layout: compact Vietnamese hero, guide boundary and guide steps before generic CTAs.
- browser/e2e was used for closure evidence.
- Kept the design target as a minimal comparison guardrail and avoided any new design batch.
- Moved reusable guide detail CSS into `packages/ui/src/service-layout.css` under Base First ownership.
- Updated source/e2e validators so heading order, responsive metrics and Vietnamese scenario boundaries are checked.

Required evidence completed:

- Render thật trong browser: completed through Playwright desktop/mobile and screenshot review.
- E2E/browser metrics: `tests/e2e/fe-guide-world-loop-real-ui-layout-v1155.spec.ts` passed 2/2.
- Screenshot/visual review: `/tmp/guide-world-loop-desktop-v1155.png`, `/tmp/guide-world-loop-mobile-v1155.png`.
- Source validator: `tools/validate_web_fe_guide_world_loop_real_ui_layout_v1155.py` passed.
- Typecheck/build: Web/content/UI typecheck and Web production build passed.
- Current-state closure validator passed.

Next allowed task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.156. Select `/guides` as the next single page only after this commit is pushed.

NO_ACCEPTED_BACKEND_CONTRACT remains explicit.
