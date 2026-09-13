# LGO Web FE Shared Data Table Scroll Region Report v1.59

Task: WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59
Status: WEB_CLOSED.

Change summary:
- Updated shared `DataTable` in `packages/ui/src/data.tsx` so the overflow wrapper is a named `role="region"` with `tabIndex={0}`.
- Added focus-visible CSS for `.lgo-data-table-wrap` in `packages/ui/src/data.css`.
- Added browser/e2e coverage for Ops `/support`, the route with a horizontally scrollable support triage table.

Verification evidence:
- RED: `pnpm exec playwright test tests/e2e/fe-shared-data-table-scroll-region-v159.spec.ts --project=chromium-mobile --reporter=line --trace=off` failed because no `region` named `Fixture support triage rows` existed.
- GREEN: `pnpm exec playwright test tests/e2e/fe-shared-data-table-scroll-region-v159.spec.ts --reporter=line --trace=off` passed on desktop and mobile after the shared UI fix.
- Source validator: `python3 tools/validate_web_fe_shared_data_table_scroll_region_v159.py` expected after control docs update.
- Required closure gates to run before commit: UI typecheck, Ops typecheck, Ops production build, v1.59 Playwright desktop/mobile, v1.59 validator, current-state validator in a clean copy, and screenshot visual review.

Runtime/browser review notes:
- The e2e verifies keyboard focus on the table scroll wrapper and confirms the focus outline is visible.
- The slice is UI-only and keeps fixture tables presentation-only.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
