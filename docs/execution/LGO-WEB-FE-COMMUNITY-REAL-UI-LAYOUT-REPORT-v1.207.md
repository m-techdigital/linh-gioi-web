# LGO-WEB-FE-COMMUNITY-REAL-UI-LAYOUT-REPORT-v1.207

Status: WEB_CLOSED

Task: WEB-FE-COMMUNITY-REAL-UI-LAYOUT-v1.207

`/community` was closed as a Real Browser UI/UX Layout First slice. The page no longer renders the whole community proof wall in the main flow: the hero, design board, focus cards, real Linh Thành screenshots and community readiness remain visible, while onboarding/feedback/conduct/trust/route/safety/accessibility boards use the shared disclosure base.

Before fix, browser/e2e measured no disclosure, 18 expanded boards, desktop scrollHeight 6868px, mobile h1 41.2px and mobile scrollHeight 13139px. After fix, desktop measured hero bottom 373.13px, design top 372.48px, focus top 593.19px, plaza top 889.92px, readiness top 1423.00px, disclosure top 1951.83px, scrollHeight 2507px and h1/max font 34.82px. Mobile measured hero bottom 473.30px, design top 481.30px, focus top 821.95px, plaza top 1391.91px, readiness top 2090.80px, disclosure top 3283.80px, scrollHeight 4042px and h1/max font 29.12px.

Base First decision: reuse `lgo-service-compact-proof-page`, `lgo-service-disclosure-stack` and `lgo-service-disclosure-body`; add only community route density composition rules in `packages/ui/src/service-layout.css`. No current-page CSS was added to `apps/web/src/app/globals.css`. AXIRO remained an organizational reference only; no AXIRO code was copied.

Visual review: `/tmp/community-desktop-v1207.png` and `/tmp/community-mobile-v1207.png` were compared against the attached Vietnamese Community target and shared shell for header/footer/menu consistency, margin, padding, typography and card density.

Non-claims remain: NO_ACCEPTED_BACKEND_CONTRACT, no chat backend, no forum, no guild, no ticket backend, no account lookup, no moderation dashboard, no production auth, no DB persistence, no Portal/Ops integration and no production deployment.

Process: Real Browser UI/UX Layout First; Base First; browser/e2e evidence before closure.
