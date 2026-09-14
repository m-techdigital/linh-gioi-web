# WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171

Task: WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/guides/release-readiness-hub-guide` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese guide flow for release readiness → cổng phê duyệt → Tải game/Trạng thái/Hỗ trợ → closed test có điều kiện without fake download, ticket, tester access, entitlement or production release claims.

Implementation requirements:

- Reuse the shared compact guide-flow base in `packages/ui/src/service-layout.css`.
- Add only release-readiness-specific theme selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: slug detection, shared stack class, shared hero class, badge and boundary copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow and focus.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no live ticket/support; no public build entitlement; no guaranteed closed-test access.
