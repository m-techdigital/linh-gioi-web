# HANDOFF LGO Web FE News Closed Tester Pack Real UI Layout v1.196

Task: WEB-FE-NEWS-CLOSED-TESTER-PACK-REAL-UI-LAYOUT-v1.196

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/closed-tester-information-pack-started`.

What changed:

- Refined the current article title/body for tester information pack expectations in Vietnamese.
- Refined two current detail sections for no-intake guidance and privacy-safe feedback boundaries.
- Preserved current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx`.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Reviewed screenshots against public core design target for margin, padding, font-size, card density and shared shell coherence.
- Recorded AXIRO only as a code-organization reference for base/layout/style separation; no AXIRO code was copied.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Closed Tester Pack real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-closed-tester-pack-desktop-v1196.png`, `/tmp/news-closed-tester-pack-mobile-v1196.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.197`, selecting `/news/faq-search-helpfulness-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, copied AXIRO code, independent business backend, live tester intake, tester slot guarantee, public signup, password/token/payment/personal-sensitive data collection, tester backend or account entitlement claim was added.
