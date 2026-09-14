# WEB-FE-DOWNLOAD-TRUST-VIETNAMESE-DESIGN-MATCH-v1.141

Status: WEB_CLOSED

Scope: Public Download Trust `/download/trust` only. Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout apply.

Goal: make Public Download Trust follow the Vietnamese design target and Linh Giới game scenario: hero → cổng kiểm tin tải game → six trust gates for gói build, SHA256, nguồn gốc, giới hạn đã biết, kỳ vọng hỗ trợ and phê duyệt chủ sở hữu. The page must avoid stale English design copy and must not move to another page before browser/e2e and screenshot review.

Allowed scope:
- Refresh the existing Public Download Trust target copies under `apps/web/public/design-reference` and `docs/design/reference` when the target is English-heavy or inconsistent with the game scenario.
- Update `/download/trust` page UI copy and flow.
- Update shared public trust/release-readiness components and file-backed fixtures needed by this page.
- Add source/browser guardrails for the page.

Forbidden scope:
- No independent backend.
- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- No fake download, fake checksum, entitlement claim or release-ready claim.
- No broad multi-page design batch.

Acceptance evidence:
- RED browser/e2e reproduced stale English target label before implementation.
- Public Download Trust target is Vietnamese and aligned with the game scenario.
- `/download/trust` first flow renders hero then trust gate board before readiness/owner follow-up.
- Six trust gate labels are visible in Vietnamese.
- Browser screenshot comparison checks hero composition, trust-gate order, spacing, typography scale, first-fold density and mobile behavior.
- `tools/validate_web_fe_download_trust_vietnamese_design_match_v1141.py` passes.
- Playwright desktop/mobile page e2e passes.
- Relevant content/web typecheck/build pass.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
