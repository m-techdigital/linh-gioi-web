# WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177

Task: WEB-FE-NEWS-CONTROL-TOWER-REAL-UI-LAYOUT-v1.177

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/news/web-program-control-tower` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese News Detail article page that explains the independent web control tower while preserving shared public shell coherence: same header, menu, footer, article rhythm, related-news flow and backend-boundary wording.

Implementation requirements:

- Reuse the shared compact service/detail layout in `packages/ui/src/service-layout.css`.
- Add only News Detail theme and density selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, detail sections, related news and next-step CTA copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no backend production data; no copied game backend; no independent business backend.
