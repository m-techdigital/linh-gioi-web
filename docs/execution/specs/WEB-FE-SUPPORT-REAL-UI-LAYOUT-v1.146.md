# WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.146

Status: WEB_CLOSED.

Scope: close only `/support` as a Real Browser UI/UX Layout First page slice. The registered Vietnamese support target was already usable, so no new image was generated. Work moved directly to the rendered page.

Implementation:

- Kept the existing Vietnamese `support-detailed-design-target-v1131.png` target and used it as the comparison guardrail.
- Reworked `/support` into the shared `lgo-service-compact-proof-page` service flow: compact Hỗ trợ cộng đồng hero, support boundary note, board tham chiếu, support topic board, FAQ and safety discovery.
- Reused and extended Base First classes in `packages/ui/src/service-layout.css`, including `lgo-service-proof-board`, `lgo-service-proof-card-grid`, `lgo-service-proof-card` and the shared support station layout.
- Removed the stale v1.131 support density block from `apps/web/src/app/globals.css` so support layout ownership sits with the shared UI service layout.
- Changed the visible target scope to `Hỗ trợ cộng đồng` and replaced the stale `Design Target First` first-flow badge with `Board tham chiếu`.
- Localized first-flow FAQ scope labels and support FAQ answers that were visible on `/support`.

Required evidence:

- Source validator: `python3 tools/validate_web_fe_support_real_ui_layout_v1146.py`.
- Existing target-density validator: `python3 tools/validate_web_fe_support_design_target_density_v1131.py`.
- Browser/e2e desktop and mobile for `/support` with overflow, font scale, DOM order and fold metrics.
- Screenshot review: desktop and mobile first-flow show hero → board → topic board → FAQ without oversized target image or horizontal overflow.
- Package checks: content test, UI typecheck, web typecheck and production web build.

Non-claims:

- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- NO_ACCEPTED_BACKEND_CONTRACT remains in effect.

Evidence keywords: Real Browser UI/UX Layout First, browser/e2e, screenshot.
