# HANDOFF LGO Web FE News Player Trust Release Real UI Layout v1.185

Task: WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.185

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/faq-search-helpfulness-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the player trust release article.
- Converted the stale WEB v1.18 fixture title/body into Vietnamese player-facing release trust copy while retaining backend-contract, public build, beta, entitlement, ticket and SLA boundaries.
- Converted the two current detail section non-claims to Vietnamese and shortened current title/copy enough to meet the shared News Detail density budget.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Player Trust Release real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-player-trust-release-desktop-v1185.png`, `/tmp/news-player-trust-release-mobile-v1185.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.186`, selecting `/news/route-continuity-conversion-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, public build, open beta, entitlement, fake download, ticket inbox or production SLA claim was added.
