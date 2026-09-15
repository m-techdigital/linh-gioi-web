# LGO Web FE Release Real UI Layout Report v1.220

Status: WEB_CLOSED

Task ID: WEB-FE-RELEASE-REAL-UI-LAYOUT-v1.220

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

`/release` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Release design target stayed as comparison guardrail; the work did not use design-only, translation-only, validator-only or docs-only changes as page progress.

What changed:
- The rendered `/release` page keeps a compact staged-release story: hero, M0→M1 visual board, stage cards, readiness CTA and one collapsed expanded-evidence area.
- Release layout CSS now lives in `packages/ui/src/service-layout.css`, aligned with the shared service/disclosure/card rhythm used by `/download` and `/download/trust`.
- Stale Release-specific layout blocks were removed from `apps/web/src/app/globals.css`; app CSS no longer owns the route layout.
- Desktop was tuned after moving CSS owner so the first-flow remains compact despite the changed cascade order.

Final browser metrics:
- Desktop: overflow 0, desktop scrollHeight 1510px, h1/max font 34.82px, heroBottom 360.92px, boardTop 349.08px, boardBottom 530.83px, stagesTop 549.38px, stagesBottom 1030.08px, readinessTop 1031.03px, disclosureTop 1207.33px, designBandTop 1313.39px, stageColumns 6.
- Mobile: overflow 0, mobile scrollHeight 3095px, h1/max font 30.28px, heroBottom 546.94px, boardTop 618.94px, boardBottom 1133.72px, stagesTop 1184.13px, stagesBottom 2071.41px, readinessTop 2127.41px, disclosureTop 2676.08px, designBandTop 2838.33px, stageColumns 2.

Evidence:
- RED ownership baseline: desktop and mobile layout were already usable, but route layout CSS lived in stale `globals.css` blocks; after moving to shared UI the first desktop run showed cascade drift, then shared block density was fixed in `packages/ui`.
- GREEN: Playwright desktop/mobile 6/6 across Release design target density, Vietnamese design match and v1.220 real layout checks.
- Visual review: `/tmp/release-desktop-v1220.png`, `/tmp/release-mobile-v1220.png` checked for shared header/footer/menu consistency, margin/padding, font scale, first-flow density, card rhythm, mobile behavior and Base First reuse.
- Source validators updated so historical Release checks now point to `packages/ui/src/service-layout.css` rather than stale app-local CSS.
- Runtime Layout Gate remains active from `WEB-ACTIVE-GOAL.md` and `AGENTS.md`: browser screenshots and metrics came before docs/validator closure.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, No DB persistence, CMS, production deployment, payment/shop/economy, real account entitlement, real launcher build, open beta or public download promise.
