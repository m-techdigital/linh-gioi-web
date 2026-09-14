# LGO Web FE News Route Continuity Real UI Layout Report v1.186

Task: WEB-FE-NEWS-ROUTE-CONTINUITY-REAL-UI-LAYOUT-v1.186

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/route-continuity-conversion-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e review found the selected detail page rendered the shared article layout, but the current article h1/body/non-claims were still English and the page had no current-slug detail title mapping. The source update was limited to current-route fixture/detail copy and article detail title support, then the page was rechecked in browser.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 449px, depth top 460px, first depth card top 603px, related top 820px, next steps top 1155px, scrollHeight 1808px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 454px, depth top 464px, first depth card top 622px, related top 1071px, next steps top 1586px, scrollHeight 2494px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-route-continuity-real-ui-layout-v1186.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot review: `/tmp/news-route-continuity-desktop-v1186.png`, `/tmp/news-route-continuity-mobile-v1186.png`
- `python3 tools/validate_web_fe_news_route_continuity_real_ui_layout_v1186.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.186 adds current-slug article title support and current-route fixture/detail content only; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
