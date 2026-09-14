# WEB-FE-NEWS-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.195

Task: WEB-FE-NEWS-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.195

Status: WEB_CLOSED

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.

Scope: complete only `/news/release-readiness-hub-polish-started` as the active page from WEB-NEXT-ACTION.

Goal: render a compact Vietnamese News Detail article page that explains the release readiness hub while preserving shared public shell coherence: same header, menu, footer, article rhythm, related-news flow and proof-before-claim wording.

Implementation requirements:

- Reuse the shared compact News Detail layout in `packages/ui/src/service-layout.css`.
- Do not add route CSS to `apps/web/src/app/globals.css`.
- Keep app page code as composition: shared stack, shared hero/card classes, Vietnamese badge, detail sections, related news and next-step CTA copy.
- Compare the rendered page with the public core design target for margin, padding, font-size, card density, header/footer/menu coherence and mobile first-fold behavior.
- Verify the actual page in browser for desktop and mobile first-fold, spacing, typography, card density, overflow, focus and screenshot state after keyboard navigation.
- Use AXIRO only as an organizational reference for base/layout/style separation; do not copy AXIRO code or treat it as canonical for Linh Giới.

Exit evidence required: browser/e2e desktop/mobile screenshots, source validator, Web/UI typecheck, Web build, current-state validator, docs/ledger/handoff, commit and push.

Non-claims: NO_ACCEPTED_BACKEND_CONTRACT; no production auth; no DB persistence; no CMS; no live feed; no backend production data; no copied game backend; no copied AXIRO code; no independent business backend; no public download; no open beta; no entitlement; no ticket support; no checksum placeholder; no release backend; no production SLA.
