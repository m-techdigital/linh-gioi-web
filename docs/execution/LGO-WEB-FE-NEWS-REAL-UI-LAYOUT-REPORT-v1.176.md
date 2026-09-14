# LGO Web FE News Real UI Layout Report v1.176

Task: WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news` page was completed as a real browser UI/UX Layout slice. The page now uses the shared compact service proof/card base and News visual theme from `packages/ui/src/service-layout.css`, with no new route CSS in `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected page still used raw fixture presentation: generic PageHeader labels, stale Fixture entries copy, English news fixture titles and no compact public-news layout. The first RED e2e run against the rendered page failed on the missing Vietnamese h1 and current-page compact classes.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 411.69px, board top 424.80px, first card top 542.23px, action band top 796.25px, scrollHeight 1522px, h1 45.36px, 3 news columns, overflow 0. Mobile: hero bottom 432.23px, board top 442.14px, first card top 569.69px, action band top 1301.78px, scrollHeight 2156px, h1 27.52px, 1 news column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-real-ui-layout-v1176.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `python3 tools/validate_web_fe_news_real_ui_layout_v1176.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/news-desktop-v1176.png`, `/tmp/news-mobile-v1176.png`

Base First decision: the route composes `lgo-service-compact-proof-page`, `lgo-detail-hero-card`, `lgo-service-proof-card-grid`, `lgo-service-proof-card` and adds current-page News selectors in the shared UI package only. The visible board intentionally shows the three latest public news cards to preserve first-fold density and avoid turning the page into a raw fixture archive.

NO_ACCEPTED_BACKEND_CONTRACT retained.
