# HANDOFF — WEB-FE-DESIGN-TARGET-CUE-SPACING-v1.108

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-CUE-SPACING-v1.108 adds spacing between Design Target First link labels and the visible `↗` cue.

What changed:

- Public design-target links now use `gap: .4rem`.
- Workspace design-target links now use `gap: .4rem`.
- Base UI/UX Layout stays shared; no page-local overrides were added.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.109.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
