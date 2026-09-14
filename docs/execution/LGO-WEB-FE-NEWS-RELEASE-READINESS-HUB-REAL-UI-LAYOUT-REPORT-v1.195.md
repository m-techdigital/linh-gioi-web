# LGO Web FE News Release Readiness Hub Real UI Layout Report v1.195

Task: WEB-FE-NEWS-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.195

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/release-readiness-hub-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e RED showed the selected detail page still used mixed English release-readiness title/copy against the target. The source update was limited to current-route fixture/detail copy and current-slug title support, then the page was rechecked in browser. Screenshot review explicitly checked spacing, padding, font scale, card density and shared shell coherence against the public core target before closure.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 435.55px, depth top 446.42px, first depth card top 587.11px, related top 798.03px, next steps top 1130.27px, scrollHeight 1761px, h1/max font 37.76px, 2 related columns, overflow 0. Mobile: hero bottom 439.22px, depth top 449.13px, first depth card top 588.41px, related top 1052.08px, next steps top 1567.17px, scrollHeight 2475px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `pnpm exec playwright test tests/e2e/fe-news-release-readiness-hub-real-ui-layout-v1195.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot/design-target review: `/tmp/news-release-readiness-hub-desktop-v1195.png`, `/tmp/news-release-readiness-hub-mobile-v1195.png`
- `python3 tools/validate_web_fe_news_release_readiness_hub_real_ui_layout_v1195.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.195 uses existing current-slug article title support and current-route fixture/detail content only; no page-local CSS was added. AXIRO remains an organization reference only; no AXIRO code was copied.

NO_ACCEPTED_BACKEND_CONTRACT retained.
