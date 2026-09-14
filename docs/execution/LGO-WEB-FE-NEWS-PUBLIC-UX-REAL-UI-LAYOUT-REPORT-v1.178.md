# LGO Web FE News Public UX Real UI Layout Report v1.178

Task: WEB-FE-NEWS-PUBLIC-UX-REAL-UI-LAYOUT-v1.178

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/public-ux-content-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected detail page rendered the shared hero but lacked current-slug article depth and still exposed a stale WEB v1.6 English fixture body. The first RED e2e run failed on the missing current-page detail heading.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 448.91px, depth top 459.78px, first depth card top 602.69px, related top 820.48px, next steps top 1169.20px, scrollHeight 1822px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 439.22px, depth top 449.13px, first depth card top 588.41px, related top 1052.08px, next steps top 1567.17px, scrollHeight 2475px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-public-ux-real-ui-layout-v1178.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `python3 tools/validate_web_fe_news_public_ux_real_ui_layout_v1178.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/news-public-ux-desktop-v1178.png`, `/tmp/news-public-ux-mobile-v1178.png`

Base First decision: the route reuses the shared News Detail layout created for v1.177. v1.178 only adds current-slug article depth content and a reusable article detail title map in the shared detail component owner; the rendered shell keeps the existing header, menu and footer.

NO_ACCEPTED_BACKEND_CONTRACT retained.
