# HANDOFF — WEB-FE-DESIGN-TARGET-ACTIONS-GROUP-v1.106

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-ACTIONS-GROUP-v1.106 names the Design Target First action-link group across Public, Portal and Ops.

What changed:

- Shared `DesignTargetReference` action wrapper now uses `role="group"`.
- The group name includes the registered surface scope: `Design targets — ${scope}`.
- Base UI/UX Layout ownership stays in `packages/ui/src/primitives.tsx`.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.107.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
