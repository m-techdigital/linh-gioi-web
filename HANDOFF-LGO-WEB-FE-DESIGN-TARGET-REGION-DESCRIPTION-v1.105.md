# HANDOFF — WEB-FE-DESIGN-TARGET-REGION-DESCRIPTION-v1.105

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-REGION-DESCRIPTION-v1.105 connects Design Target First regions to their visible comparison notes.

What changed:

- Shared `DesignTargetReference` now uses `useId()` for the note paragraph.
- The region uses `aria-describedby` when a note is present.
- Base UI/UX Layout ownership stays in `packages/ui/src/primitives.tsx`.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.106.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
