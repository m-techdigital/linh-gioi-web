# LGO Web FE Events Real UI Layout Report v1.174

Task: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

The `/events` page was completed as a real browser UI/UX Layout slice. The page now uses the shared compact service proof/card base and Events visual theme from `packages/ui/src/service-layout.css`, with no new route CSS in `apps/web/src/app/globals.css`.

Baseline browser/e2e review found the selected page still used raw fixture presentation: generic PageHeader labels, stale Local content/Fixture entries copy, English event fixture title/body and no compact Events page layout. The first RED e2e run against the rendered page failed on the missing Vietnamese h1 and current-page compact classes.

Final browser/e2e review passed for desktop and mobile. Desktop: hero bottom 411.69px, board top 424.80px, first card top 542.23px, action band top 695.38px, scrollHeight 1379px, h1 45.36px, 3 event columns, overflow 0. Mobile: hero bottom 432.23px, board top 442.14px, first card top 589.84px, action band top 742.89px, scrollHeight 1597px, h1 27.52px, 1 event column, overflow 0.

Evidence:

- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-events-real-ui-layout-v1174.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `python3 tools/validate_web_fe_events_real_ui_layout_v1174.py`
- Web/UI typechecks
- Web production build
- Clean current-state closure validator
- Screenshots: `/tmp/events-desktop-v1174.png`, `/tmp/events-mobile-v1174.png`

Base First decision: the route composes `lgo-service-compact-proof-page`, `lgo-detail-hero-card`, `lgo-service-proof-card-grid`, `lgo-service-proof-card` and adds current-page Events selectors in the shared UI package only. Screenshot capture waits for the Events h1 after keyboard navigation before visual review.

NO_ACCEPTED_BACKEND_CONTRACT retained.
