# LGO Web FE News Performance Copy Budget Real UI Layout Report v1.192

Task: WEB-FE-NEWS-PERFORMANCE-COPY-BUDGET-REAL-UI-LAYOUT-v1.192

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/performance-copy-asset-budget-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e RED showed the selected detail page still used English current article copy and missed the current two-card performance/copy budget detail flow. The source update was limited to current-route fixture/detail copy and article detail title support, then the page was rechecked in browser. Screenshot review explicitly checked spacing, padding, font scale, card density and shared shell coherence against the public core target before closure.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 404px, depth top 415px, first depth card top 555px, related top 780px, next steps top 1112px, scrollHeight 1743px, h1/max font 37.76px, 2 related columns, overflow 0. Mobile: hero bottom 425px, depth top 434px, first depth card top 593px, related top 1041px, next steps top 1556px, scrollHeight 2464px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `pnpm exec playwright test tests/e2e/fe-news-performance-copy-budget-real-ui-layout-v1192.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot/design-target review: `/tmp/news-performance-copy-budget-desktop-v1192.png`, `/tmp/news-performance-copy-budget-mobile-v1192.png`
- `python3 tools/validate_web_fe_news_performance_copy_budget_real_ui_layout_v1192.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.192 adds current-slug article title support and current-route fixture/detail content only; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
