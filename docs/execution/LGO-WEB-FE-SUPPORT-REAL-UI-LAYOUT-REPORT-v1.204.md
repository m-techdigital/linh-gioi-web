# LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.204

Status: WEB_CLOSED

Task: WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204

`/support` was closed as a Real Browser UI/UX Layout First slice. The page no longer renders the whole support evidence wall in the main flow: the support station remains visible, while secondary helpfulness/trust/content/safety/community boards use the shared disclosure base.

Before fix, browser/e2e measured no disclosure, 23 expanded boards, desktop scrollHeight 10558px, mobile h1 48px and mobile scrollHeight 21605px. After fix, desktop measured hero bottom 352.16px, design top 347.52px, topic top 569.81px, disclosure top 1941.91px, scrollHeight 2498px and h1/max font 35.20px. Mobile measured hero bottom 431.03px, design top 442.55px, topic top 767.48px, disclosure top 2943.27px, scrollHeight 3686px and h1/max font 29.12px.

Base First decision: reuse `lgo-service-compact-proof-page`, `lgo-service-disclosure-stack` and `lgo-service-disclosure-body`; add only support route-density composition rules in `packages/ui/src/service-layout.css`. No current-page CSS was added to `apps/web/src/app/globals.css`. AXIRO remained an organizational reference only; no AXIRO code was copied.

Visual review: `/tmp/support-desktop-v1204.png` and `/tmp/support-mobile-v1204.png` were compared against the attached Hỗ trợ cộng đồng target and shared shell for header/footer/menu consistency, margin, padding, typography and card density.

Non-claims remain: NO_ACCEPTED_BACKEND_CONTRACT, no ticket backend, no account lookup, no sensitive data intake, no production auth, no DB persistence, no Portal/Ops integration and no production deployment.

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.
