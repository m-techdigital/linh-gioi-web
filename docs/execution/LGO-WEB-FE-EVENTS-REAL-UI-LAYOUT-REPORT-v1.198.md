# LGO Web FE Events Real UI Layout Report v1.198

Task: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/events` page was completed as a real browser UI/UX Layout slice. The page uses the shared compact service proof base from `packages/ui/src/service-layout.css`, with no route CSS added to `apps/web/src/app/globals.css`. The existing public core design target remained usable because its header, menu, footer, shell and navigation match the accepted common UI/UX layout; no design batch was created.

Browser/e2e review showed the selected Events page already used shared Base First layout and Vietnamese no-live-event copy. Work focused on proving the real rendered page: first-fold density, event-card rhythm, keyboard focus navigation, desktop/mobile metrics and screenshot review. No page-local CSS or component fork was needed.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 403.92px, board top 417.03px, first card top 532.95px, action top 686.09px, scrollHeight 1346px, h1/max font 37.76px, 1 event card, 3 desktop grid tracks, overflow 0. Mobile: hero bottom 424.52px, board top 434.42px, first card top 575.70px, action top 728.75px, scrollHeight 1583px, h1/max font 27.52px, 1 mobile grid column, overflow 0.

Evidence:

- `pnpm exec playwright test tests/e2e/fe-events-real-ui-layout-v1198.spec.ts --project=chromium-desktop --project=chromium-mobile`
- Screenshot/design-target review: `/tmp/events-desktop-v1198.png`, `/tmp/events-mobile-v1198.png`
- `python3 tools/validate_web_fe_events_real_ui_layout_v1198.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator

Base First decision: the route reuses the shared service proof layout used by `/news` and `/patch-notes`. v1.198 only adds evidence, docs and validators; no page-local CSS was added. AXIRO remains an organization reference only; no AXIRO code was copied.

NO_ACCEPTED_BACKEND_CONTRACT retained.
