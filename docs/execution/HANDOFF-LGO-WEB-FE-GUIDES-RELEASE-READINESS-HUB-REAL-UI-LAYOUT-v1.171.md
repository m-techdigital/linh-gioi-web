# HANDOFF LGO Web FE Release Readiness Hub Real UI Layout v1.171

Task: WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/guides/release-readiness-hub-guide`.

What changed:

- Added release-readiness guide composition in `apps/web/src/app/guides/[slug]/page.tsx`.
- Converted the selected guide slug and its four steps into Vietnamese, game-scenario-correct public guidance.
- Extended `packages/ui/src/service-layout.css` with release-readiness theme selectors that compose the shared compact guide-flow base.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile release readiness hub layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/guides-release-readiness-hub-desktop-v1171.png`, `/tmp/guides-release-readiness-hub-mobile-v1171.png`.

Base First / CSS ownership:

- Reused shared guide-flow layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable guide-detail component/layout styling.
- No release-readiness selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.172`, selecting `/guides/closed-tester-information-pack-guide` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, entitlement, live ticket/support, guaranteed closed-test access or production release claim was added.
