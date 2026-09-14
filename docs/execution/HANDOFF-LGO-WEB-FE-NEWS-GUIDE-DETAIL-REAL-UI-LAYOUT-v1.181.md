# HANDOFF LGO Web FE News Guide Detail Real UI Layout v1.181

Task: WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/news-guide-detail-pages-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the news/guide detail article.
- Converted the stale WEB v1.9 fixture body into Vietnamese player-facing public detail-page copy while retaining backend-contract boundaries.
- Added two compact detail sections for the page in `packages/content/src/fixtures.ts` and removed the stale duplicate detail block for the same slug.
- Recorded the design sync guardrail: any design target used for comparison must share the accepted header, footer, menu, shell and navigation; if not, only the current-page target area may be minimally corrected before browser layout work resumes.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Guide Detail real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-guide-detail-desktop-v1181.png`, `/tmp/news-guide-detail-mobile-v1181.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.182`, selecting `/news/status-download-trust-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend or backend production data claim was added.
