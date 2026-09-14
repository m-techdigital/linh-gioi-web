# HANDOFF — WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-REDUCED-MOTION-v1.109 adds reduced-motion handling for Design Target First link focus/hover motion.

What changed:

Base UI/UX Layout stays in the shared public/workspace styles; no page-local motion override was added.

- Public design-target links disable transform and transition under `prefers-reduced-motion: reduce`.
- Workspace design-target links disable transform and transition under `prefers-reduced-motion: reduce`.
- Focus outlines remain visible.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.110.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
