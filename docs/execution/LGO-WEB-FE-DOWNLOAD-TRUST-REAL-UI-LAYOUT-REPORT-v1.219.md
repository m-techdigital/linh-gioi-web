# LGO Web FE Download Trust Real UI Layout Report v1.219

Status: WEB_CLOSED

Task ID: WEB-FE-DOWNLOAD-TRUST-REAL-UI-LAYOUT-v1.219

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

`/download/trust` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Download Trust design target stayed as comparison guardrail; the work did not use design-only, translation-only, validator-only or docs-only changes as page progress.

What changed:
- The rendered `/download/trust` page now reads as a trust-gate flow: hero, trust gates, owner readiness, release evidence, status depth, trust CTA and one collapsed secondary evidence area.
- The old always-expanded proof chain was moved behind a disclosure so the primary checksum/provenance decision path stays reviewable on desktop and mobile.
- Download Trust layout CSS now lives in `packages/ui/src/service-layout.css`, aligned with the shared service/disclosure/card rhythm used by `/download` and related public routes.
- Stale Download Trust-specific layout blocks were removed from `apps/web/src/app/globals.css`; app CSS no longer owns the route layout.
- Mobile changed from a very tall one-column proof board into compact two-column trust, owner and release-evidence grids while keeping the two larger first-gate blocks readable.

Final browser metrics:
- Desktop: overflow 0, desktop scrollHeight 2209px, h1/max font 35.2px, heroBottom 393px, trustGateTop 401.33px, trustGateBottom 690.83px, firstGatesTop 812.17px, ownerGateTop 812.17px, releaseEvidenceTop 1112.06px, statusDepthTop 1317.91px, secondaryTop 1876.55px, designBandTop 2012.45px, trustGateColumns 6, firstGateColumns 2, ownerGateColumns 4, releaseEvidenceColumns 4.
- Mobile: overflow 0, mobile scrollHeight 3204px, h1 26.37px, max font 32px, heroBottom 369.67px, trustGateTop 378.63px, trustGateBottom 855.66px, firstGatesTop 888.66px, ownerGateTop 1145.08px, releaseEvidenceTop 1511.92px, statusDepthTop 1820.23px, secondaryTop 2768.45px, designBandTop 2946.92px, trustGateColumns 2, ownerGateColumns 2, releaseEvidenceColumns 2.

Evidence:
- RED baseline: desktop scrollHeight 13079px and mobile scrollHeight 28482px before shared Base compaction, with all secondary trust proof boards open in the main page flow.
- GREEN: Playwright desktop/mobile 6/6 across Download Trust design target density, Vietnamese design match and v1.219 real layout checks.
- Visual review: `/tmp/download-trust-desktop-v1219.png`, `/tmp/download-trust-mobile-v1219.png` checked for shared header/footer/menu consistency, margin/padding, font scale, first-flow density, card rhythm, mobile behavior and Base First reuse.
- Source validators updated so historical Download Trust checks now point to `packages/ui/src/service-layout.css` rather than stale app-local CSS.
- Runtime Layout Gate remains active from `WEB-ACTIVE-GOAL.md` and `AGENTS.md`: browser screenshots and metrics came before docs/validator closure.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, real SHA256 artifact or public download promise.
