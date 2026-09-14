# WEB-FE-RELEASE-VIETNAMESE-DESIGN-MATCH-v1.142

Status: WEB_CLOSED

Scope: Public Release `/release` only. Sequential Page Completion, Just-in-time Design, Design Target First, Layout Match Before Closure and Base UI/UX Layout apply.

Goal: make Public Release follow the Vietnamese design target and Linh Giới game scenario: compact release hero, M0 → M1 visual board, and proof-before-promise stage cards before release readiness follow-up.

Allowed scope:
- Refresh the registered Public Release raster design target in public and docs design-reference paths.
- Update `/release` hero, design board caption and first-flow order.
- Update the repo-native M0 → M1 SVG board used by `/release` so the visible board matches the Vietnamese game scenario.
- Update stage fixtures required by `/release`.
- Add source/browser guardrails for the page.

Forbidden scope:
- No independent backend.
- No production auth.
- No DB persistence.
- No real Portal integration.
- No real Ops/Admin mutation.
- No fake open beta, public build, entitlement funnel or production launch claim.
- No broad multi-page design batch.

Acceptance evidence:
- RED browser/e2e reproduced stale English target label before implementation.
- Public Release design target is Vietnamese and aligned with the game scenario.
- `/release` first-flow renders hero → M0/M1 board → proof-before-promise stage cards → readiness follow-up.
- Browser screenshot comparison checks hero composition, visual hierarchy, spacing, typography scale, content order, first-fold density and mobile behavior.
- `tools/validate_web_fe_release_vietnamese_design_match_v1142.py` passes.
- Playwright desktop/mobile page e2e passes.
- Relevant content/web typecheck/build pass.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, NO_ACCEPTED_BACKEND_CONTRACT.
