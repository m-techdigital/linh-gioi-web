# HANDOFF-LGO-WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85

Status: WEB_CLOSED

Task closed: `WEB-FE-PUBLIC-CONTENT-HEADING-ORDER-v1.85`.

Changed files of interest:

- `apps/web/src/app/events/page.tsx`
- `apps/web/src/app/patch-notes/page.tsx`
- `apps/web/src/app/news/page.tsx`
- `apps/web/src/app/status/page.tsx`
- `tests/e2e/fe-public-content-heading-order-v185.spec.ts`
- `tools/validate_web_fe_public_content_heading_order_v185.py`

Runtime finding: `/events`, `/patch-notes`, `/news` and `/status` did not start main content with a visible page-level h1. The route heading outline now starts with the page topic while keeping fixture/no-backend boundaries explicit.

Verification evidence (browser/e2e included):

- RED: `pnpm exec playwright test tests/e2e/fe-public-content-heading-order-v185.spec.ts --project=chromium-desktop` FAIL, selected routes lacked a visible first h1.
- GREEN: `pnpm exec playwright test tests/e2e/fe-public-content-heading-order-v185.spec.ts --project=chromium-desktop` PASS.
- `pnpm exec playwright test tests/e2e/fe-public-content-heading-order-v185.spec.ts --project=chromium-mobile` PASS.
- `python3 tools/validate_web_fe_public_content_heading_order_v185.py` PASS.
- `pnpm --filter @lgo-web/web typecheck` PASS.
- `pnpm --filter @lgo-web/web build` PASS.
- `python3 tools/validate_web_current_state.py` PASS from a clean copied workspace.

Next task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.86`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
