# WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198

Task: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/events` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese Events page that explains static community-event direction while preserving shared public shell coherence: same header, menu, footer, service proof rhythm, event-card density and no-live-event wording.

Implementation requirements:

- Reuse the shared compact service proof layout in `packages/ui/src/service-layout.css`.
- Do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, event cards and next-step CTA copy.
- Compare the rendered page with the public core design target for margin, padding, font-size, card density, header/footer/menu coherence and mobile first-fold behavior.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.
- Use AXIRO only as an organizational reference for base/layout/style separation; do not copy AXIRO code or treat it as canonical for Linh Giới.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no backend production data; no copied game backend; no copied AXIRO code; no independent business backend; no event registration; no reward entitlement; no live calendar; no production event backend; no backend scheduler.
