# LGO Web FE News Community Roadmap Real UI Layout Report v1.188

Task: WEB-FE-NEWS-COMMUNITY-ROADMAP-REAL-UI-LAYOUT-v1.188

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/community-roadmap-onboarding-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e RED showed the selected detail page still rendered the route title as `Community / roadmap onboarding được làm rõ` and retained English non-claim wording. The source update was limited to current-route fixture/detail copy and article detail title support, then the page was rechecked in browser.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 449px, depth top 460px, first depth card top 603px, related top 820px, next steps top 1155px, scrollHeight 1808px, h1/max font 42.48px, 2 related columns, overflow 0. Mobile: hero bottom 454px, depth top 464px, first depth card top 622px, related top 1071px, next steps top 1586px, scrollHeight 2494px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-community-roadmap-real-ui-layout-v1188.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot review: `/tmp/news-community-roadmap-desktop-v1188.png`, `/tmp/news-community-roadmap-mobile-v1188.png`
- `python3 tools/validate_web_fe_news_community_roadmap_real_ui_layout_v1188.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.188 adds current-slug article title support and current-route fixture/detail content only; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
