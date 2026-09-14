# LGO-WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-REPORT-v1.205

Status: WEB_CLOSED

Task: WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205

`/support/help` was closed as a Real Browser UI/UX Layout First slice. The page no longer renders the whole FAQ/support proof wall in the main flow: the FAQ route map and discovery flow remain visible, while secondary issue/helpfulness/trust/download/safety/accessibility/performance boards use the shared disclosure base.

Before fix, browser/e2e measured no disclosure, 16 expanded boards, desktop scrollHeight 6266px, mobile h1 41.2px and mobile scrollHeight 13120px. After fix, desktop measured hero bottom 400.75px, design top 396.11px, route top 616.81px, FAQ discovery top 902.00px, disclosure top 1316.52px, scrollHeight 1895px and h1/max font 34.82px. Mobile measured hero bottom 530.80px, design top 538.80px, route top 895.52px, FAQ discovery top 1457.52px, disclosure top 2648.69px, scrollHeight 3407px, h1 font 29.12px and max heading font 32.00px.

Base First decision: reuse `lgo-service-compact-proof-page`, `lgo-service-disclosure-stack` and `lgo-service-disclosure-body`; add only support-help route-map density composition rules in `packages/ui/src/service-layout.css`. No current-page CSS was added to `apps/web/src/app/globals.css`. AXIRO remained an organizational reference only; no AXIRO code was copied.

Visual review: `/tmp/support-help-desktop-v1205.png` and `/tmp/support-help-mobile-v1205.png` were compared against the attached Vietnamese Support Help target and shared shell for header/footer/menu consistency, margin, padding, typography and card density.

Non-claims remain: NO_ACCEPTED_BACKEND_CONTRACT, no search backend, no ticket backend, no account lookup, no sensitive data intake, no production auth, no DB persistence, no Portal/Ops integration and no production deployment.

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.
