# HANDOFF LGO Web FE News Accessibility Readability Real UI Layout v1.191

Task: WEB-FE-NEWS-ACCESSIBILITY-READABILITY-REAL-UI-LAYOUT-v1.191

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/accessibility-readability-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the accessibility/readability article.
- Added two current detail sections for heading/spacing/focus rhythm and mobile/keyboard reading continuity.
- Refined article body/non-claims so the route explains accessibility/readability expectations without claiming WCAG audit certification, legal accessibility compliance, production support, backend integration, account features or assistive-device certification.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Reviewed screenshots against public core design target for margin, padding, font-size, card density and shared shell coherence.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Accessibility Readability real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-accessibility-readability-desktop-v1191.png`, `/tmp/news-accessibility-readability-mobile-v1191.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.192`, selecting `/news/performance-copy-asset-budget-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, WCAG audit certification, legal accessibility compliance, production support, account feature or assistive-device certification claim was added.
