# LGO Web FE News Player Safety Support Real UI Layout Report v1.190

Task: WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/player-safety-support-faq-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e RED showed the selected detail page missed the current detail heading/depth flow. The source update was limited to current-route fixture/detail copy and article detail title support, then the page was rechecked in browser. Screenshot review explicitly checked spacing, padding, font scale, card density and shared shell coherence against the public core target before closure.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 449px, depth top 460px, first depth card top 603px, related top 834px, next steps top 1169px, scrollHeight 1822px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 454px, depth top 464px, first depth card top 622px, related top 1071px, next steps top 1586px, scrollHeight 2494px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-player-safety-support-real-ui-layout-v1190.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot/design-target review: `/tmp/news-player-safety-support-desktop-v1190.png`, `/tmp/news-player-safety-support-mobile-v1190.png`
- `python3 tools/validate_web_fe_news_player_safety_support_real_ui_layout_v1190.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.190 adds current-slug article title support and current-route fixture/detail content only; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
