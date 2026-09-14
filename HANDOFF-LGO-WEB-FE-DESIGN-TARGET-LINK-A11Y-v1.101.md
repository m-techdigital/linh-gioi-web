# HANDOFF — WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-LINK-A11Y-v1.101 updates the shared Design Target First link interaction so public, Portal and Ops announce new-tab behavior consistently.

What changed:

Base UI/UX Layout ownership stays in `packages/ui`; no app-local duplicate design-target link component was added.


- `DesignTargetReference` now gives primary and companion design-target links an accessible name ending with `opens in a new tab`.
- Visible design-target labels and layout remain unchanged.
- browser/e2e verifies public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.102.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
