# HANDOFF LGO Web FE News Public Game Info Real UI Layout v1.180

Task: WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Closed page: `/news/public-game-info-depth-started`.

What changed:

- Added current-slug article depth title support in `apps/web/src/components/PublicDetailSections.tsx` for the public game-info news article.
- Converted the stale WEB v1.8 fixture body into Vietnamese player-facing public game-info copy while retaining backend-contract boundaries.
- Added two compact detail sections for the page in `packages/content/src/fixtures.ts` and removed the stale duplicate detail block for the same slug.
- Cleaned visible non-claim wording on the current page so the rendered article remains Vietnamese-first.
- Added browser/e2e coverage with desktop/mobile metrics, overflow checks, keyboard focus navigation and screenshot capture after returning from keyboard navigation.
- Updated project state, next action, task ledger, spec, report and handoff.

Verification summary:

- Browser/e2e desktop/mobile News Public Game Info real UI layout checks passed.
- Regression e2e for v1.179 News Detail page passed after shared wording cleanup.
- Source validator passed after docs were updated.
- Web/UI typechecks, Web build and clean current-state validator are required closure gates for the final commit.
- Screenshot review paths: `/tmp/news-public-game-info-desktop-v1180.png`, `/tmp/news-public-game-info-mobile-v1180.png`.

Base First / CSS ownership:

- Reused shared compact News Detail layout from `packages/ui/src/service-layout.css`.
- No News Detail selectors were added to `apps/web/src/app/globals.css`.
- No broad design batch was created because the existing public target and shared shell were sufficient for comparison.

Next allowed task: `WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.181`, selecting `/news/news-guide-detail-pages-started` as the single active page.

NO_ACCEPTED_BACKEND_CONTRACT retained. No production auth, DB persistence, CMS, live feed, copied game backend, independent business backend or backend production data claim was added.
