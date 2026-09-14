# LGO WEB FE SUPPORT SAFETY DESIGN TARGET DENSITY REPORT v1.133

Task: WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133
Status: WEB_CLOSED

## Result

Design Target First: `/support/safety` now has a dedicated `Public Support Safety` design target and a Vietnamese first-flow safe-reporting layout. The page starts with a compact safety hero, design board, sensitive-data checklist, safety principles and issue routing before secondary CTA content.

## Design target

- Generated with built-in image_gen.
- Public copy: `apps/web/public/design-reference/support-safety-detailed-design-target-v1133.png`
- Docs copy: `docs/design/reference/WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png`
- Dimensions: 1672x941.
- The visible design target copy is Vietnamese and is registered as `Public Support Safety`.

## Base UI/UX Layout

The implementation uses existing shared primitives from `@lgo-web/ui`. Page-local CSS is scoped to `lgo-supportsafetypage-stack` and only handles page-specific hero, design board, safety checklist and issue-routing density.

## Evidence

- RED: Playwright desktop/mobile failed because `/support/safety` was still attached to broad `Public Service` and did not expose `Public Support Safety`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: `python3 tools/validate_web_fe_support_safety_design_target_density_v1133.py` → WEB FE SUPPORT SAFETY DESIGN TARGET DENSITY v1.133 VALIDATION PASS.
- PASS: `python3 tools/validate_web_fe_public_safety_support_design_board_v172.py`.
- PASS: `python3 tools/validate_web_fe_public_support_heading_priority_v187.py`.
- PASS: `python3 tools/validate_web_public_player_safety_support_faq_polish.py`.
- PASS: `pnpm --filter @lgo-web/web typecheck`.
- PASS: `pnpm --filter @lgo-web/web build`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: clean current-state validator on filtered copy.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains. `/support/safety` remains static public guidance and does not claim real ticket, secure inbox, account lookup, moderation or SLA backend.
