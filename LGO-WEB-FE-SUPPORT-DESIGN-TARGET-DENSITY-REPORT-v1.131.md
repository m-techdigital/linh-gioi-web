# LGO WEB FE SUPPORT DESIGN TARGET DENSITY REPORT v1.131

Task: WEB-FE-SUPPORT-DESIGN-TARGET-DENSITY-v1.131
Status: WEB_CLOSED

## Result

Design Target First: `/support` now has a dedicated `Public Support` design target and a Vietnamese first-flow support layout. The page starts with a compact support hero, a no-real-ticket boundary note, the design board, and support topic cards before deeper FAQ/safety/route continuity content.

## Design target

- Generated with built-in image_gen.
- Public copy: `apps/web/public/design-reference/support-detailed-design-target-v1131.png`
- Docs copy: `docs/design/reference/WEB-FE-SUPPORT-DETAILED-DESIGN-TARGET-v1.131.png`
- Dimensions: 1672x941.
- The visible design target copy is Vietnamese and is registered as `Public Support`.

## Base UI/UX Layout

The implementation uses existing shared primitives from `@lgo-web/ui`. Page-local CSS is scoped to `lgo-supportpage-stack` and only handles the page-specific hero, support board and first-flow density.

## Evidence

- RED: Playwright desktop/mobile failed because `/support` was still attached to broad `Public Service` and did not expose `Public Support`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-design-target-density-v1131.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: `python3 tools/validate_web_fe_support_design_target_density_v1131.py` → WEB FE SUPPORT DESIGN TARGET DENSITY v1.131 VALIDATION PASS.
- PASS: `pnpm --filter @lgo-web/web typecheck`.
- PASS: `pnpm --filter @lgo-web/web build`.
- PASS browser/e2e: `pnpm exec playwright test tests/e2e/fe-support-design-target-density-v1131.spec.ts --project=chromium-desktop --project=chromium-mobile --reporter=line` → 2 passed.
- PASS: clean current-state validator on filtered copy, recorded at closure.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains. `/support` remains static public guidance and does not claim a real ticket, account lookup, secure inbox, moderation or SLA backend.
