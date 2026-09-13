# WEB-FE-WORKSPACE-NAV-SCROLL-REGION-v1.61

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: shared workspace navigation scroll-region accessibility. This FE-only Base First slice makes the horizontally scrollable Portal/Ops workspace navigation keyboard-readable on mobile while preserving existing route-aware links and blocked fixture semantics.

Acceptance:
- `packages/ui/src/workspace-navigation.tsx` owns the shared workspace navigation behavior.
- `.lgo-workspace-nav` keeps its accessible navigation label and renders with `tabIndex={0}`.
- `.lgo-workspace-nav:focus-visible` has visible focus styling.
- Browser/e2e verifies mobile Portal `/` and Ops `/support` navigation is visible, focusable, horizontally scrollable, has no page-level overflow, and keeps nav font sizes capped.
- No forms, fetches, server actions, backend routes, Portal integration or Ops/Admin mutation are introduced.

Evidence:
- RED browser/e2e reproduced mobile Portal/Ops workspace nav `tabIndex === -1` while the nav had horizontal overflow.
- GREEN browser/e2e passed after the shared `WorkspaceNavigation` and focus CSS changes.
- Source validator locks shared ownership, e2e coverage, docs and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
