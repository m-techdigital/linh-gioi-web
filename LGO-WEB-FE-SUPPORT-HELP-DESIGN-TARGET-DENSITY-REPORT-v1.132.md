# LGO WEB FE SUPPORT HELP DESIGN TARGET DENSITY REPORT v1.132

Task: WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132
Status: WEB_CLOSED

## Result

Design Target First: `/support/help` now has a dedicated `Public Support Help` design target and a Vietnamese first-flow FAQ route-map layout. The page starts with a compact FAQ hero, the design board, route cards and FAQ/issue routing before secondary CTA content.

## Design target

- Generated with built-in image_gen.
- Public copy: `apps/web/public/design-reference/support-help-detailed-design-target-v1132.png`
- Docs copy: `docs/design/reference/WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png`
- Dimensions: 1672x941.
- The visible design target copy is Vietnamese and is registered as `Public Support Help`.

## Base UI/UX Layout

The implementation uses existing shared primitives from `@lgo-web/ui`. Page-local CSS is scoped to `lgo-supporthelppage-stack` and only handles page-specific hero, design board, route-card and FAQ density.

## Evidence

- RED: Playwright desktop/mobile failed because `/support/help` was still attached to broad `Public Service` and did not expose `Public Support Help`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-help-design-target-density-v1132.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: `python3 tools/validate_web_fe_support_help_design_target_density_v1132.py` → WEB FE SUPPORT HELP DESIGN TARGET DENSITY v1.132 VALIDATION PASS.
- PASS: `python3 tools/validate_web_fe_public_support_help_design_board_v173.py`.
- PASS: `python3 tools/validate_web_fe_public_support_heading_priority_v187.py`.
- PASS: `pnpm --filter @lgo-web/web typecheck`.
- PASS: `pnpm --filter @lgo-web/web build`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-help-design-target-density-v1132.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: clean current-state validator on filtered copy.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains. `/support/help` remains static public guidance and does not claim real search, ticket, secure inbox, account lookup, moderation or SLA backend.
