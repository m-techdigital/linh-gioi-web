# LGO Web FE News Control Tower Real UI Layout Report v1.177

Task: WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/web-program-control-tower` page was completed as a real browser UI/UX Layout slice. The page now uses the shared compact service/detail base and News Detail visual theme from `packages/ui/src/service-layout.css`, with no new route CSS in `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected detail page still used raw article-detail presentation: generic WEB v1.9 labels, English boundary markers, stale detail section labels and no compact public-news-detail layout. The first RED e2e run against the rendered page failed on the missing Vietnamese public article badge and current-page compact classes.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 448.91px, depth top 459.78px, first depth card top 602.69px, related top 834.30px, next steps top 1183.02px, scrollHeight 1836px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 439.22px, depth top 449.13px, first depth card top 588.41px, related top 1036.95px, next steps top 1552.05px, scrollHeight 2460px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-control-tower-real-ui-layout-v1177.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `python3 tools/validate_web_fe_news_control_tower_real_ui_layout_v1177.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/news-control-tower-desktop-v1177.png`, `/tmp/news-control-tower-mobile-v1177.png`

Base First decision: the route composes `lgo-service-compact-proof-page`, `lgo-detail-hero-card`, `lgo-service-proof-card-grid`, detail section helpers and News Detail selectors in the shared UI package only. The rendered shell keeps the existing header, menu and footer; no design-only batch was created because the current target was sufficient for comparison.

NO_ACCEPTED_BACKEND_CONTRACT retained.
