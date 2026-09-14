# HANDOFF-LGO-WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93

Status: WEB_CLOSED.

Task: WEB-FE-PUBLIC-HOME-VISUAL-TARGET-v1.93. Evidence uses browser/e2e desktop and mobile route checks.

Closed scope: homepage UI/UX layout design reference and first-viewport render guardrail.

Changed behavior: the repo now stores a professional homepage visual target at `apps/web/public/design-reference/homepage-visual-target-v193.svg` and `docs/design/reference/WEB-FE-HOMEPAGE-VISUAL-TARGET-v1.93.svg`. The e2e suite verifies that the reference is available and the live homepage hero, h1, CTA and cinematic scene render with visible dimensions.

Verification required for this handoff:

- `python3 tools/validate_web_fe_public_home_visual_target_v193.py`
- `pnpm exec playwright test tests/e2e/fe-public-home-visual-target-v193.spec.ts --project=chromium-desktop`
- `pnpm exec playwright test tests/e2e/fe-public-home-visual-target-v193.spec.ts --project=chromium-mobile`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`
- `python3 tools/validate_web_current_state.py`

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.94.
