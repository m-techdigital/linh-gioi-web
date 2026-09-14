# HANDOFF LGO Web FE News Status Download Trust Real UI Layout v1.182

Task: WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/status-download-trust-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the status/download trust article.
- Converted the stale WEB v1.10 fixture body into Vietnamese player-facing public status/download trust copy while retaining backend-contract and download-artifact boundaries.
- Converted the two current detail section non-claims to Vietnamese and kept the two-card compact News Detail rhythm.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Status Download Trust real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-status-download-trust-desktop-v1182.png`, `/tmp/news-status-download-trust-mobile-v1182.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.183`, selecting `/news/faq-search-helpfulness-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, public download artifact or entitlement backend claim was added.
