# WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176

Task: WEB-FE-NEWS-REAL-UI-LAYOUT-v1.176

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/news` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese News page that communicates static public news boundaries without fake CMS, live feed, live-server announcement, patch-game claim or backend production contract.

Implementation requirements:

- Reuse the shared compact service proof/card base in `packages/ui/src/service-layout.css`.
- Add only News-specific theme and density selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, latest-news board and boundary CTA copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no live-server announcement; no patch-game release claim; no backend production data.
