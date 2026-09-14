# WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184

Task: WEB-FE-NEWS-RELEASE-READINESS-REAL-UI-LAYOUT-v1.184

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/news/closed-tester-information-pack-started` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese News Detail article page that explains release readiness while preserving shared public shell coherence: same header, menu, footer, article rhythm, related-news flow and backend-boundary wording.

Implementation requirements:

- Reuse the shared compact News Detail layout in `packages/ui/src/service-layout.css`.
- Do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, detail sections, related news and next-step CTA copy.
- Keep the design target synchronized with the accepted common header, footer, menu, shell and navigation; if a target diverges, correct only the current-page target area needed before returning to browser UI work.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no backend production data; no copied game backend; no independent business backend; no public download/open beta/entitlement/ticket/checksum claim.
