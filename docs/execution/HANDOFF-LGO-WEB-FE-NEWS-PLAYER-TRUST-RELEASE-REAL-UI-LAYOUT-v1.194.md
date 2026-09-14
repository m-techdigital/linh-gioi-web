# HANDOFF LGO Web FE News Player Trust Release Real UI Layout v1.194

Task: WEB-FE-NEWS-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.194

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/player-trust-release-narrative-started`.

What changed:

- Refined the current article title/body for player trust and staged release narrative expectations.
- Refined two current detail sections for release-stage explanation and safe trust journey promises.
- Preserved current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx`.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Reviewed screenshots against public core design target for margin, padding, font-size, card density and shared shell coherence.
- Recorded AXIRO only as a code-organization reference for base/layout/style separation; no AXIRO code was copied.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Player Trust Release real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-player-trust-release-desktop-v1194.png`, `/tmp/news-player-trust-release-mobile-v1194.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.195`, selecting `/news/release-readiness-hub-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, copied AXIRO code, independent business backend, public download, beta entitlement, account flow, ticket support, release backend or production SLA claim was added.
