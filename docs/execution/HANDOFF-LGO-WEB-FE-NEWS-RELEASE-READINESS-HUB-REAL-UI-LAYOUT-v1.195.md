# HANDOFF LGO Web FE News Release Readiness Hub Real UI Layout v1.195

Task: WEB-FE-NEWS-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.195

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/release-readiness-hub-polish-started`.

What changed:

- Refined the current article title/body for release readiness hub expectations in Vietnamese.
- Refined two current detail sections for release gates and surface alignment promises.
- Preserved current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx`.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Reviewed screenshots against public core design target for margin, padding, font-size, card density and shared shell coherence.
- Recorded AXIRO only as a code-organization reference for base/layout/style separation; no AXIRO code was copied.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Release Readiness Hub real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-release-readiness-hub-desktop-v1195.png`, `/tmp/news-release-readiness-hub-mobile-v1195.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.198`, selecting `/events` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, copied AXIRO code, independent business backend, public download, open beta, entitlement, ticket support, checksum placeholder, release backend or production SLA claim was added.
