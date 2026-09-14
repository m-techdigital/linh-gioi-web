# WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172

Task: WEB-FE-GUIDES-CLOSED-TESTER-INFORMATION-PACK-REAL-UI-LAYOUT-v1.172

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/guides/closed-tester-information-pack-guide` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese guide flow for tester pack → feedback an toàn → giới hạn đã biết → readiness gate without fake signup, tester entitlement, ticket intake, public build or guaranteed closed-test access claims.

Implementation requirements:

- Reuse the shared compact guide-flow base in `packages/ui/src/service-layout.css`.
- Add only closed-tester-pack-specific theme selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: slug detection, shared stack class, shared hero class, badge and boundary copy.
- Keep shared tester CTA copy in its base component rather than route-local overrides.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow and focus.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no live tester intake; no public build entitlement; no guaranteed closed-test access.
