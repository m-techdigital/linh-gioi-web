# LGO Web FE Download Real UI Layout Report v1.218

Status: WEB_CLOSED

Task ID: WEB-FE-DOWNLOAD-REAL-UI-LAYOUT-v1.218

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

`/download` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Download design target stayed as comparison guardrail; the work did not use design-only, translation-only, validator-only or docs-only changes as page progress.

What changed:
- The rendered `/download` page now reads as a real release-gate flow: availability hero, readiness checklist, official channels, status depth, trust gates, release evidence and one collapsed secondary evidence area.
- The old always-expanded proof stack was moved behind a disclosure so the primary download decision path stays reviewable on desktop and mobile.
- Download layout CSS now lives in `packages/ui/src/service-layout.css`, aligned with the shared service/disclosure/card rhythm used by other public pages.
- Stale Download-specific layout blocks were removed from `apps/web/src/app/globals.css`; app CSS no longer owns the route layout.
- Mobile changed from a very tall one-column proof board into a compact two-column rhythm for readiness, channel, status, trust and evidence cards.

Final browser metrics:
- Desktop: overflow 0, desktop scrollHeight 2074px, h1/max font 38.4px, heroBottom 451px, gateTop 163px, gateHeight 232px, readinessTop 457.41px, channelTop 622.33px, statusDepthTop 767.44px, trustGateTop 991.91px, releaseChecklistTop 1485.33px, releaseDetailTop 1717.33px, designBandTop 1877.23px, readinessColumns 5, channelColumns 2.
- Mobile: overflow 0, mobile scrollHeight 2935px, h1 27.19px, max font 32px, heroBottom 552.77px, gateTop 382.89px, gateHeight 158px, readinessTop 562.03px, channelTop 984.95px, statusDepthTop 1212.84px, trustGateTop 1574.28px, releaseChecklistTop 2132.80px, releaseDetailTop 2476.19px, designBandTop 2678.66px, readinessColumns 2, channelColumns 2.

Evidence:
- RED baseline: desktop scrollHeight 12567px and mobile scrollHeight 26690px before shared Base compaction, with all secondary release-detail boards open in the main page flow.
- GREEN: Playwright desktop/mobile 6/6 across Download design target density, Vietnamese design match and v1.218 real layout checks.
- Visual review: `/tmp/download-desktop-v1218.png`, `/tmp/download-mobile-v1218.png` checked for shared header/footer/menu consistency, margin/padding, font scale, first-flow density, card rhythm, mobile behavior and Base First reuse.
- Source validators updated so historical Download checks now point to `packages/ui/src/service-layout.css` rather than stale app-local CSS.
- Runtime Layout Gate remains active from `WEB-ACTIVE-GOAL.md` and `AGENTS.md`: browser screenshots and metrics came before docs/validator closure.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build or public download promise.
