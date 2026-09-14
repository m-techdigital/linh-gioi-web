# HANDOFF — WEB-FE-DESIGN-TARGET-VISIBLE-NEW-TAB-CUE-v1.107

Status: WEB_CLOSED

WEB-FE-DESIGN-TARGET-VISIBLE-NEW-TAB-CUE-v1.107 adds a visible new-tab cue to Design Target First links across Public, Portal and Ops.

What changed:

- Shared `DesignTargetReference` primary and companion links now render a visible `↗` cue.
- The cue is `aria-hidden`; the existing accessible link name still announces `opens in a new tab`.
- Base UI/UX Layout ownership stays in `packages/ui/src/primitives.tsx`.
- browser/e2e verifies Public, Portal and Ops on desktop and mobile.

Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.108.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
