# HANDOFF LGO Web FE News Control Tower Real UI Layout v1.177

Task: WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/web-program-control-tower`.

What changed:

- Replaced the raw News Detail article presentation with a compact Vietnamese public-article layout in `apps/web/src/app/news/[slug]/page.tsx`.
- Updated shared detail helpers in `apps/web/src/components/PublicDetailSections.tsx` so article detail sections and next-step CTA use Vietnamese labels and current-page compact classes.
- Converted the web control tower fixture body and detail non-claims to Vietnamese while retaining fixture-only status and backend-contract boundaries.
- Extended `packages/ui/src/service-layout.css` with News Detail theme/density selectors that compose the shared service/detail base and preserve shell/header/menu/footer coherence.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Control Tower real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-control-tower-desktop-v1177.png`, `/tmp/news-control-tower-mobile-v1177.png`.

Base First / CSS ownership:

- Reused shared compact service/detail layout base.
- New style lives in `packages/ui/src/service-layout.css` because it is reusable service/detail layout styling.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.178`, selecting `/news/public-ux-content-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend or backend production data claim was added.
