# LGO Web FE News Visual Responsive Real UI Layout Report v1.179

Task: WEB-FE-NEWS-VISUAL-RESPONSIVE-REAL-UI-LAYOUT-v1.179

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/visual-responsive-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected detail page rendered the shared hero but lacked current-slug article depth and still exposed stale Runtime/browser English fixture body. The first RED e2e run failed on the missing current-page detail heading. After adding depth content, desktop hero height exposed a real layout issue for longer article titles; the fix widened the shared News Detail h1 measure to 18ch in `packages/ui` rather than adding page-local CSS.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 448.91px, depth top 459.78px, first depth card top 602.69px, related top 820.48px, next steps top 1169.20px, scrollHeight 1822px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 439.22px, depth top 449.13px, first depth card top 588.41px, related top 1036.95px, next steps top 1552.05px, scrollHeight 2460px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-visual-responsive-real-ui-layout-v1179.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Regression check for v1.177/v1.178 News Detail pages after shared base change
- `python3 tools/validate_web_fe_news_visual_responsive_real_ui_layout_v1179.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/news-visual-responsive-desktop-v1179.png`, `/tmp/news-visual-responsive-mobile-v1179.png`

Base First decision: the route reuses the shared News Detail layout created for v1.177. v1.179 adds current-slug article depth content, extends the reusable article detail title map, and refines the shared h1 measure in the UI package because the typography rhythm applies to longer News Detail titles beyond one page.

NO_ACCEPTED_BACKEND_CONTRACT retained.
