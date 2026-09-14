# WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174

Task: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/events` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese Events page that communicates static community event direction without fake live calendar, event registration, reward claims, CMS ownership or backend scheduler claims.

Implementation requirements:

- Reuse the shared compact service proof/card base in `packages/ui/src/service-layout.css`.
- Add only Events-specific theme and density selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, event board and boundary CTA copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live event schedule; no registration flow; no reward entitlement; no backend scheduler.
