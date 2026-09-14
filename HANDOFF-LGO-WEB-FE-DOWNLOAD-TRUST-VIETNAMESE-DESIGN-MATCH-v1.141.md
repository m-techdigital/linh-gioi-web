# HANDOFF — WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141

Status: WEB_CLOSED

Completed page: `/download/trust`.

What changed:
- Public Download Trust design target is Vietnamese and coherent with the Linh Giới release-trust scenario.
- `/download/trust` now prioritizes the actual trust gate board before release-readiness follow-up content.
- Six Vietnamese trust gates are now used for the page: gói build, SHA256, nguồn gốc, giới hạn đã biết, kỳ vọng hỗ trợ, phê duyệt chủ sở hữu.
- The old desktop overlap caused by pulling `.lgo-download-trust-first-gates` upward was removed.

Evidence summary:
- RED browser/e2e confirmed stale English target label before the fix.
- GREEN browser/e2e confirmed Vietnamese target copy, six trust-gate labels, no overflow, compact hero and trust-gate-first order on desktop/mobile.
- screenshot/design-target review confirmed the first fold now follows hero → cổng kiểm tin tải game instead of hero → release readiness/owner gates.

Required closure commands:
- `python3 tools/validate_web_fe_download_trust_vietnamese_design_match_v1141.py`
- `LGO_WEB_SKIP_WEBSERVER=1 pnpm exec playwright test tests/e2e/fe-download-trust-design-target-density-v1126.spec.ts tests/e2e/fe-download-trust-vietnamese-design-match-v1141.spec.ts --project=chromium-desktop --project=chromium-mobile`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/web typecheck`
- `pnpm --filter @lgo-web/web build`

Next page after commit/push: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.142 selects `/release` as the next single active page. Do not start `/release` until this handoff is committed and pushed.

Rules that continue: Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure, Base UI/UX Layout.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.

screenshot review remains required for Layout Match Before Closure.

The page remains aligned to the Linh Giới game scenario and the accepted Public Download Trust design target.
