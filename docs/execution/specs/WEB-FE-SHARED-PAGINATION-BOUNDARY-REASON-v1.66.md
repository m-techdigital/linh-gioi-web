# WEB-FE-SHARED-PAGINATION-BOUNDARY-REASON-v1.66

Status: WEB_CLOSED

## SELECT

The selected v1.66 scope is a FE accessibility/interaction follow-up to v1.57 pagination boundary controls. A browser/e2e audit of locked fixture controls found that Ops `/support` pagination boundary buttons remained keyboard-focusable and exposed `aria-disabled`, but the unavailable reason was only embedded in each accessible label. The next useful slice is to expose the same fixture boundary reason as visible text linked with `aria-describedby`.

## SPEC_LOCK

Scope is shared UI only. `PaginationBar` must keep boundary controls keyboard-focusable, retain `aria-disabled` and `data-disabled`, add a visible unavailable reason, and connect disabled boundary buttons to that reason with `aria-describedby`. The fix must not add backend code, DTOs, route handlers, forms, or enabled fixture mutations.

## IMPLEMENT

- Updated `packages/ui/src/data.tsx` so disabled `PaginationBar` boundary buttons reference a shared `paginationReasonId` with `aria-describedby`.
- Added visible helper copy: `Pagination unavailable — không khả dụng trong fixture hiện tại`.
- Added `.lgo-pagination-reason` in `packages/ui/src/data.css` with small readable text and safe wrapping.
- Added `tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts` to verify Ops `/support` mobile layout, focusability, labels, descriptions, typography cap and overflow.

## SOURCE_VERIFY

- `python3 tools/validate_web_fe_shared_pagination_boundary_reason_v166.py` PASS.
- `PaginationBar` remains in shared `packages/ui`, preserving Base First ownership.
- No independent backend, app API route, fetch adapter or canonical DTO was added.

## RUNTIME_VERIFY

- RED: `pnpm exec playwright test tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts --project=chromium-mobile` failed because `Trang trước aria-describedby` was `null`.
- GREEN: `pnpm exec playwright test tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts --project=chromium-mobile` PASS.
- Desktop coverage: `pnpm exec playwright test tests/e2e/fe-shared-pagination-boundary-reason-v166.spec.ts --project=chromium-desktop` PASS.
- Relevant package/app typecheck and production build evidence is recorded in the handoff.

## VISUAL_REVIEW

The browser/e2e test inspects the rendered mobile Ops support page: no horizontal overflow, boundary button font-size <= 18px, focus reaches the previous button, and the visible pagination reason wraps safely under the shared pagination bar.

## HANDOFF

Closed as FE-only v1.66 shared pagination boundary reason slice. Continue FE/browser/e2e audit under `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.67`.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
