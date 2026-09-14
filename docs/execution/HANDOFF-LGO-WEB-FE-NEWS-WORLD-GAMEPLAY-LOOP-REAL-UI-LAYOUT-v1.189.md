# HANDOFF LGO Web FE News World Gameplay Loop Real UI Layout v1.189

Task: WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/world-gameplay-loop-depth-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the world gameplay loop article.
- Refined the WEB v1.13 fixture title/body and detail sections so the route explains world loop expectations in Vietnamese without English boundary non-claims.
- Converted the two current detail section non-claims to Vietnamese and kept the world loop story compact enough for shared News Detail density.
- Reused the existing design sync guardrail: design target comparison must share the accepted header, footer, menu, shell and navigation; no design batch was needed.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News World Gameplay Loop real UI layout checks passed.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-world-gameplay-loop-desktop-v1189.png`, `/tmp/news-world-gameplay-loop-mobile-v1189.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.190`, selecting `/news/player-safety-support-faq-polish-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend, combat release, economy release, quest DB, live world server or fake download CTA claim was added.
