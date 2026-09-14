# HANDOFF — WEB-FE-DESIGN-TARGET-LINK-REL-v1.103

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-LINK-REL-v1.103 updates Design Target First `_blank` links to use explicit `noopener noreferrer` across Public, Portal and Ops.

What changed:

- Shared `DesignTargetReference` primary and companion links now use `rel="noopener noreferrer"`.
- Base UI/UX Layout ownership stays in `packages/ui/src/primitives.tsx`.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.104.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
