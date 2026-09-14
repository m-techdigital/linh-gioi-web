# HANDOFF LGO Web FE News Release Readiness Real UI Layout v1.184

Task: WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/closed-tester-information-pack-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the release readiness article.
- Converted the stale WEB v1.19 fixture title/body into Vietnamese player-facing release readiness copy while retaining backend-contract, download, beta, ticket and entitlement boundaries.
- Converted the two current detail section non-claims to Vietnamese and kept the two-card compact News Detail rhythm.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Release Readiness real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-release-readiness-desktop-v1184.png`, `/tmp/news-release-readiness-mobile-v1184.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.185`, selecting `/news/closed-tester-information-pack-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, public download, open beta, entitlement, fake ticket or checksum placeholder claim was added.
