# HANDOFF LGO Web FE Events Real UI Layout v1.174

Task: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/events`.

What changed:

- Replaced the raw Events fixture page with a compact Vietnamese event-state layout in `apps/web/src/app/events/page.tsx`.
- Converted the selected event fixture to Vietnamese game-scenario copy while retaining fixture-only status and backend-contract boundaries.
- Extended `packages/ui/src/service-layout.css` with Events theme/density selectors that compose the shared compact service proof/card base.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile Events real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/events-desktop-v1174.png`, `/tmp/events-mobile-v1174.png`.

Base First / CSS ownership:

- Reused shared compact service proof/card layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable service/component layout styling.
- No Events selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.175`, selecting `/patch-notes` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live event schedule, event registration, reward entitlement or backend scheduler claim was added.
