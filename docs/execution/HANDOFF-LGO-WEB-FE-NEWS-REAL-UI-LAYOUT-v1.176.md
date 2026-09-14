# HANDOFF LGO Web FE News Real UI Layout v1.176

Task: WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news`.

What changed:

- Replaced the raw News fixture list with a compact Vietnamese public-news layout in `apps/web/src/app/news/page.tsx`.
- Converted the visible latest news fixtures to Vietnamese player-facing public journal copy while retaining fixture-only status and backend-contract boundaries.
- Extended `packages/ui/src/service-layout.css` with News theme/density selectors that compose the shared compact service proof/card base.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-desktop-v1176.png`, `/tmp/news-mobile-v1176.png`.

Base First / CSS ownership:

- Reused shared compact service proof/card layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable service/component layout styling.
- No News selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.177`, selecting `/news/web-program-control-tower` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, live-server announcement, patch-game release or backend production data claim was added.
