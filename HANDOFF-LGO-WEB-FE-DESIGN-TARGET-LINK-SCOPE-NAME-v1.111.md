# HANDOFF — WEB-FE-DESIGN-TARGET-LINK-SCOPE-NAME-v1.111

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-LINK-SCOPE-NAME-v1.111 adds active surface scope to every Design Target First link accessible name.

What changed:

Base UI/UX Layout stays in shared `packages/ui`; no page-local accessible-name override was added.

- Primary design-target links now announce `<label> for <scope> — opens in a new tab`.
- Companion Component/state links now announce the surface scope, such as Public Core, Player Portal or Ops/Admin.
- Visible link labels and existing visual states remain unchanged.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.112.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
