# LGO Web FE News Public Game Info Real UI Layout Report v1.180

Task: WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/public-game-info-depth-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected detail page rendered the shared hero but lacked current-slug article depth and still exposed stale WEB v1.8 English fixture body. After adding current page depth, a stale duplicate detail block made the page render three cards, so the old block was removed and the page returned to the two-card compact rhythm used by accepted News Detail pages.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 448.91px, depth top 459.78px, first depth card top 602.69px, related top 820.48px, next steps top 1154.94px, scrollHeight 1808px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 439.22px, depth top 449.13px, first depth card top 588.41px, related top 1036.95px, next steps top 1552.05px, scrollHeight 2460px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-public-game-info-real-ui-layout-v1180.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Regression check for v1.179 News Detail page after shared wording cleanup
- `python3 tools/validate_web_fe_news_public_game_info_real_ui_layout_v1180.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/news-public-game-info-desktop-v1180.png`, `/tmp/news-public-game-info-mobile-v1180.png`

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.180 adds current-slug article depth content and extends the reusable article detail title map in the shared detail component owner; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
