# LGO Web FE Start Real UI Layout Report v1.217

Status: WEB_CLOSED

Task ID: WEB-FE-START-REAL-UI-LAYOUT-v1.217

Execution rule: Real Browser UI/UX Layout First, Runtime Layout Gate and Base First.

`/start` was closed as a real browser UI/UX Layout slice. The existing Vietnamese Public Start design target stayed as comparison guardrail; no design batch, translation-only or validator-only work was used as page progress.

What changed:
- The rendered `/start` page now reads as hero, tutorial loop board, real Đông Môn screenshot proof, compact Năm Lộ cards and compact world route.
- Start layout CSS now lives in one consolidated shared owner block in `packages/ui/src/service-layout.css`.
- Stale Start layout blocks were removed from `apps/web/src/app/globals.css`; app CSS now only holds the compact public design-reference shell styling required by the existing public shell.
- Mobile changed from long one-column sprawl to dense two-column screenshot/class/route rhythm while keeping the Đông Môn scene visible.
- The public design-reference band was compacted so it supports development comparison without visually taking over the public page.

Final browser metrics:
- Desktop: overflow 0, scrollHeight 2050px, h1/max font 44.8px, heroBottom 463px, sceneTop 120.80px, sceneHeight 328.41px, designBoardTop 475.48px, screenshotPanelTop 752.66px, classGridTop 1273.17px, routeTop 1586.44px, 3 screenshot columns, 5 class columns.
- Mobile: overflow 0, scrollHeight 3080px, h1/max font 37.08px, heroBottom 624.56px, sceneTop 447.73px, sceneHeight 164px, designBoardTop 649.83px, screenshotPanelTop 912.64px, classGridTop 1522.19px, routeTop 2327.77px, 2 screenshot columns, 2 class columns.

Evidence:
- RED baseline: desktop scrollHeight 3071px and mobile scrollHeight 7113px before shared Base compaction.
- GREEN: Playwright desktop/mobile 10/10 across Start design target, Vietnamese match, gameplay board, real onboarding gallery and v1.217 real layout checks.
- Visual review: `/tmp/start-desktop-v1217.png`, `/tmp/start-mobile-v1217.png` checked for header/footer/menu consistency, margin/padding, font scale, density, first-flow, mobile behavior and Base First reuse.
- Source validators updated so historical Start checks now point to `packages/ui/src/service-layout.css` instead of stale app-local CSS.
- Runtime Layout Gate was recorded in `WEB-ACTIVE-GOAL.md` and `AGENTS.md` so future FE/UI closures cannot treat validator/docs/design-only work as progress.
- AXIRO reference: used only as code organization inspiration for Base-first composition and CSS ownership, no copied code.

Non-claims remain: FE-only; NO_ACCEPTED_BACKEND_CONTRACT; No production auth, DB persistence, CMS, production deployment, payment/shop/economy, full MMO gameplay or public download promise.
