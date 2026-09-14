# HANDOFF LGO Web FE Player Trust Release Real UI Layout v1.170

Task: WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/guides/player-trust-release-guide`.

What changed:

- Added player-trust-release guide composition in `apps/web/src/app/guides/[slug]/page.tsx`.
- Converted the selected guide slug and its four steps into Vietnamese, game-scenario-correct public guidance.
- Extended `packages/ui/src/service-layout.css` with player-trust-release theme selectors that compose the shared compact guide-flow base.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile player trust release layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/guides-player-trust-release-desktop-v1170.png`, `/tmp/guides-player-trust-release-mobile-v1170.png`.

Base First / CSS ownership:

- Reused shared guide-flow layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable guide-detail component/layout styling.
- No player-trust-release selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.171`, selecting `/guides/release-readiness-hub-guide` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, entitlement, live ticket/support, guaranteed closed-test access or production release claim was added.
