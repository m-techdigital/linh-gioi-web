# HANDOFF LGO Web FE News Public UX Real UI Layout v1.178

Task: WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/public-ux-content-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` so the page no longer inherits a control-tower/governance heading.
- Converted the stale WEB v1.6 body into Vietnamese player-facing UX/content polish copy while retaining backend-contract boundaries.
- Added two compact detail sections for the page in `packages/content/src/fixtures.ts`.
- Cleaned visible related-news wording that appeared on this page so the rendered page remains Vietnamese-first.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Public UX real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-public-ux-desktop-v1178.png`, `/tmp/news-public-ux-mobile-v1178.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.179`, selecting `/news/visual-responsive-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend or backend production data claim was added.
