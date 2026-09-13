# WEB-FE-SHARED-DATA-TABLE-SCROLL-REGION-v1.59

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: shared `DataTable` horizontal scroll wrapper accessibility. This FE-only Base First slice makes table scroll wrappers keyboard-reachable named regions, so routes such as Ops `/support` keep wide data tables usable when they require horizontal scrolling.

Acceptance:
- `packages/ui/src/data.tsx` owns the `DataTable` scroll wrapper behavior.
- `.lgo-data-table-wrap` renders with `role="region"`, a caption-derived `aria-label`, and `tabIndex={0}`.
- Focus-visible styling is present for the data table scroll region.
- Browser/e2e verifies Ops `/support` table wrapper is visible, focusable, named, has no page-level overflow, and keeps link/button font-size capped on desktop/mobile.
- No forms, fetches, server actions, backend table queries, Portal integration or Ops mutation are introduced.

Evidence:
- RED browser/e2e reproduced missing named region for Ops `/support` `Fixture support triage rows` table wrapper.
- GREEN browser/e2e passed after the shared `DataTable` wrapper and focus CSS changes.
- Source validator locks shared ownership, e2e coverage, docs, and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
