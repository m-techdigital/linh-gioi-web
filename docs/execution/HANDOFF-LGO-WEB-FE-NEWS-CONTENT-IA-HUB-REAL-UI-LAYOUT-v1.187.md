# HANDOFF LGO Web FE News Content IA Hub Real UI Layout v1.187

Task: WEB-FE-NEWS-CONTENT-IA-HUB-REAL-UI-LAYOUT-v1.187

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/content-ia-hub-polish-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the content IA hub article.
- Refined the WEB v1.12 fixture body so browser evidence is framed as layout proof, not product/backend content.
- Expanded the content IA detail depth from one card to two compact cards and converted stale English non-claims to Vietnamese.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Content IA Hub real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-content-ia-hub-desktop-v1187.png`, `/tmp/news-content-ia-hub-mobile-v1187.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.188`, selecting `/news/community-roadmap-onboarding-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, live personalization, account-aware recommendation backend, portal account or backend suggestion model was added.
