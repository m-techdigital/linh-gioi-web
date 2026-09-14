# WEB-FE-GUIDES-ROUTE-CONTINUITY-CONVERSION-REAL-UI-LAYOUT-v1.169

Status: WEB_CLOSED

Scope: complete only `/guides/route-continuity-conversion-guide` as the active page from WEB-NEXT-ACTION. Real Browser UI/UX Layout First and Base First are mandatory.

Goal: render a compact Vietnamese guide flow for Bắt đầu → Vòng lặp thế giới → Tin cậy tải game → Trạng thái → Hỗ trợ without fake download, account, ticket, payment or backend conversion claims.

Implementation requirements:

- Reuse the shared compact guide-flow base in `packages/ui/src/service-layout.css`.
- Add only route-continuity-specific theme selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: slug detection, shared stack class, shared hero class, badge and boundary copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow and focus.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no live ticket/support; no public build entitlement.
