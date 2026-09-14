# WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173

Task: WEB-FE-GUIDES-FAQ-SEARCH-HELPFULNESS-REAL-UI-LAYOUT-v1.173

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/guides/faq-search-helpfulness-guide` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese guide flow for FAQ group → support route → static search boundary → useful feedback without fake search backend, chatbot, ticket routing, account lookup or production support claims.

Implementation requirements:

- Reuse the shared compact guide-flow base in `packages/ui/src/service-layout.css`.
- Add only FAQ-helpfulness-specific theme selectors in `packages/ui`; do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: slug detection, shared stack class, shared hero class, badge and boundary copy.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no live search backend; no chatbot support; no ticket routing; no account lookup.
