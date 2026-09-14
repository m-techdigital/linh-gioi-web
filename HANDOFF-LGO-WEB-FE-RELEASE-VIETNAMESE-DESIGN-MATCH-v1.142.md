# HANDOFF — WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142

Status: WEB_CLOSED

Completed page: `/release`.

What changed:
- Public Release design target is Vietnamese and coherent with the Linh Giới game scenario.
- `/release` now prioritizes the M0 → M1 release scenario before readiness follow-up content.
- Six Vietnamese proof-stage cards are visible in the desktop first-flow.
- The old SVG design board copy about runtime closure/combat implementation was replaced by a Vietnamese release-stage board.

Evidence summary:
- RED browser/e2e confirmed stale English target label before the fix.
- GREEN browser/e2e confirmed Vietnamese target copy, target-led stage flow, no overflow and compact hero/board on desktop/mobile.
- screenshot/design-target review confirmed the first fold now follows hero → M0/M1 board → Bằng chứng trước lời hứa cards.

Required closure commands:
- `python3 tools/validate_web_fe_release_design_target_density_v1127.py`
- `python3 tools/validate_web_fe_release_vietnamese_design_match_v1142.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-release-design-target-density-v1127.spec.ts tests/e2e/fe-release-vietnamese-design-match-v1142.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`

Next page after commit/push: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.143 selects `/release/readiness` as the next single active page. Do not start `/release/readiness` until this handoff is committed and pushed.

Rules that continue: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure, Base UI/UX Layout.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
