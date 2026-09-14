# WEB-FE-COMPLETE-DESIGN-ATLAS-v1.95

Status: WEB_CLOSED.

## SELECT

User feedback rejected the prior one-board direction as too narrow: the web needs complete screen/page design destinations and detailed component content so implementation can be compared against a real target instead of ad-hoc styling.

## SPEC_LOCK

Create a full FE design atlas made of high-fidelity raster boards, saved both under `apps/web/public/design-reference` for browser/e2e access and under `docs/design/reference` for design review. The atlas must cover:

- Public Core: Homepage, Game, Class, Story and Journey page patterns.
- Public Service: Download/Trust, Release, Status, Support, Community onboarding and Accessibility/Performance page patterns.
- Player Portal: dashboard, account/security, character, journey, support/recovery and blocked/no-backend state.
- Ops/Admin: dashboard, player ops, support triage, game ops, audit and blocked mutation state.
- Component/state: navigation, buttons, forms, cards, tables, alerts, empty/loading/blocked states and mobile layout references.

No backend, DTO or integration contract is introduced. Portal and Ops board content remains fixture/design reference only.

## IMPLEMENT

Added five project-bound built-in image_gen PNG boards:

- `apps/web/public/design-reference/design-atlas-public-core-v195.png`
- `apps/web/public/design-reference/design-atlas-public-service-v195.png`
- `apps/web/public/design-reference/design-atlas-portal-v195.png`
- `apps/web/public/design-reference/design-atlas-ops-v195.png`
- `apps/web/public/design-reference/design-atlas-components-v195.png`

Mirrored the same PNGs into `docs/design/reference` with `WEB-FE-DESIGN-ATLAS-*` names. Added Playwright coverage to confirm all five public design targets are served and load with usable dimensions.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_complete_design_atlas_v195.py`.

## RUNTIME_VERIFY

Required browser/e2e evidence:

- RED: `pnpm exec playwright test tests/e2e/fe-complete-design-atlas-v195.spec.ts --project=chromium-desktop` failed with 404 for all five missing atlas assets.
- GREEN desktop: `pnpm exec playwright test tests/e2e/fe-complete-design-atlas-v195.spec.ts --project=chromium-desktop` passed 5/5.
- GREEN mobile: `pnpm exec playwright test tests/e2e/fe-complete-design-atlas-v195.spec.ts --project=chromium-mobile` passed 5/5.

## VISUAL_REVIEW

Visual review is represented by saved high-fidelity boards generated with built-in image_gen and displayed during creation. Each board is 1672x941 and materially different in layout scope.

## HANDOFF

Use this atlas as the target when continuing UI implementation. The next task returns to FE accessibility/interaction audit at v1.96, now with a broader design destination for public, portal, ops and shared component work.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
