# Portal access v1.36 — spec and execution record

SELECT: WEB-NEXT-ACTION selects WEB-PORTAL-ACCESS-ONBOARDING-UX-DEPTH-v1.36.
SPEC_LOCK: implement the supplied access journey using an additive, presentation-only shared ProgressSteps/ProgressStep owner. Portal AccessJourney composes it with existing FormActions/LinkButton. Keep all credential and consent controls disabled. Introduce /access to distinguish a navigable fixture from authenticated access and connect account/character previews. Recovery retains CaseSummary/ActivityTimeline.

Alternatives assessed: existing timeline alone does not distinguish the current preview step from blocked future steps; app-local stepper would duplicate a reusable workflow capability. Shared progress is selected. No auth package changes are required.

IMPLEMENT: dedicated source validator first returned FAIL for absent stepper, journey, controls and route, then PASS after implementation. Shared UI and Portal lint/typecheck pass. Browser tests inspect rendered semantics, disabled controls, navigation and horizontal overflow on both viewports; production build is reused for HTTP/browser checks.

SOURCE_VERIFY / RUNTIME_VERIFY / VISUAL_REVIEW / HANDOFF / CLOSED evidence is recorded in the report and handoff. No production authentication, registration, recovery delivery, account persistence or canonical backend contract is created.
