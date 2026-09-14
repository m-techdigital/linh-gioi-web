# WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190

Task: WEB-FE-NEWS-PLAYER-SAFETY-SUPPORT-REAL-UI-LAYOUT-v1.190

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/news/player-safety-support-faq-polish-started` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese News Detail article page that explains player safety support and FAQ expectations while preserving shared public shell coherence: same header, menu, footer, article rhythm, related-news flow and backend-boundary wording.

Implementation requirements:

- Reuse the shared compact News Detail layout in `packages/ui/src/service-layout.css`.
- Do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, detail sections, related news and next-step CTA copy.
- Compare the rendered page with the public core design target for margin, padding, font-size, card density, header/footer/menu coherence and mobile first-fold behavior.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no backend production data; no copied game backend; no independent business backend; no live support ticket; no account lookup; no moderation dashboard; no support SLA; no download entitlement.
