# WEB-FE-STATUS-REAL-UI-LAYOUT-v1.145

Status: WEB_CLOSED.

Scope: close only `/status` as a real browser UI/UX Layout page slice. The slice refreshes the existing status target only because it was English-heavy, then prioritizes rendered browser layout.

Implementation:

- Replaced the `/status` detailed design target copies with a Vietnamese Trạng thái công khai target.
- Replaced the incorrect status SVG board, which was still a mobile combat HUD wireframe, with a Vietnamese public status signal board.
- Reworked `/status` into the shared `lgo-service-compact-proof-page` flow: compact hero, status seals, board, public fixture cards, status explainers and trust surfaces.
- Reused Base First classes from `packages/ui/src/service-layout.css`: `lgo-service-proof-board`, `lgo-service-proof-card-grid`, `lgo-service-proof-brief-board`, and `lgo-service-proof-card`.
- Removed the stale v1.130 status route CSS block from `apps/web/src/app/globals.css`.
- Localized first-flow status labels and fixture/trust labels visible in the selected page.

Required evidence:

- Source validator: `python3 tools/validate_web_fe_status_real_ui_layout_v1145.py`.
- Browser/e2e desktop and mobile for `/status` with overflow, font scale, DOM order and fold metrics.
- Screenshot review: desktop first fold shows hero → board → public fixture cards without oversized font or horizontal overflow.
- Package checks: content test, UI typecheck, web typecheck and production web build.

Non-claims:

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains in effect.


Evidence keywords: Real Browser UI/UX Layout First, browser/e2e, screenshot.
