# HANDOFF LGO Web FE News Performance Copy Budget Real UI Layout v1.192

Task: WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/performance-copy-asset-budget-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the performance/copy budget article.
- Added two current detail sections for copy budget/readability and lightweight effect/asset boundaries.
- Refined article body/non-claims so the route explains performance/copy budget expectations without claiming production Web Vitals score, operational monitoring, CDN release, bundle-analysis certification, CDN image integration, RUM production measurement, CI production budget or download entitlement.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Reviewed screenshots against public core design target for margin, padding, font-size, card density and shared shell coherence.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Performance Copy Budget real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-performance-copy-budget-desktop-v1192.png`, `/tmp/news-performance-copy-budget-mobile-v1192.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.193`, selecting `/news/route-continuity-conversion-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, production Web Vitals score, operational monitoring, CDN release, bundle-analysis certification, CDN image integration, RUM production measurement, CI production budget or download entitlement claim was added.
