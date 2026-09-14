# LGO Web FE News Status Download Trust Real UI Layout Report v1.182

Task: WEB-FE-NEWS-STATUS-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.182

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/news/status-download-trust-polish-started` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact News Detail base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Baseline browser/e2e review found the selected detail page rendered the shared hero and two detail cards, but lacked current-slug article title mapping and still exposed stale WEB v1.10 English fixture body/non-claim copy. The fix added the current page title mapping and converted only the current visible status/download trust article copy and detail non-claims to Vietnamese while preserving the existing shared layout.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 435.55px, depth top 446.42px, first depth card top 587.11px, related top 811.84px, next steps top 1144.08px, scrollHeight 1775px, h1/max font 37.76px, 2 related columns, overflow 0. Mobile: hero bottom 454.22px, depth top 464.13px, first depth card top 622.36px, related top 1055.78px, next steps top 1570.88px, scrollHeight 2479px, h1/max font 27.52px, 1 related column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-news-status-download-trust-real-ui-layout-v1182.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot review: `/tmp/news-status-download-trust-desktop-v1182.png`, `/tmp/news-status-download-trust-mobile-v1182.png`
- `python3 tools/validate_web_fe_news_status_download_trust_real_ui_layout_v1182.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared News Detail layout created and refined in earlier slices. v1.182 adds current-slug article title support and current-route fixture/detail content only; no page-local CSS was added.

NO_ACCEPTED_BACKEND_CONTRACT retained.
