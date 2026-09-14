# LGO Web FE News Guide Detail Real UI Layout Report v1.181

Task: WEB-FE-NEWS-GUIDE-DETAIL-REAL-UI-LAYOUT-v1.181

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/news-guide-detail-pages-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e review found the selected detail page rendered the shared hero but lacked current-slug article depth and still exposed stale WEB v1.9 English fixture body. After adding current page depth, an older duplicate detail block made the page render three cards, so the stale block was removed and the page returned to the two-card compact rhythm used by accepted News Detail pages.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 435.55px, depth top 446.42px, first depth card top 587.11px, related top 811.84px, next steps top 1144.08px, scrollHeight 1775px, h1/max font 37.76px, 2 related columns, overflow 0. Mobile: hero bottom 454.22px, depth top 464.13px, first depth card top 603.41px, related top 1051.95px, next steps top 1567.05px, scrollHeight 2475px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-guide-detail-real-ui-layout-v1181.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot review: `/tmp/news-guide-detail-desktop-v1181.png`, `/tmp/news-guide-detail-mobile-v1181.png`
- `python3 tools/validate_web_fe_news_guide_detail_real_ui_layout_v1181.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.181 adds current-slug article depth content and extends the reusable article detail title map in the shared detail component owner; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
