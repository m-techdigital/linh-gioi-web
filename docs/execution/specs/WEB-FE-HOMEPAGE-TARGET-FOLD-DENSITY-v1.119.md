# WEB-FE-HOMEPAGE-TARGET-FOLD-DENSITY-v1.119

Status: WEB_CLOSED

## Lifecycle

SELECT: Current WEB-NEXT-ACTION v1.119 selected the next visible FE accessibility/interaction audit issue after the Public Homepage design target landed in v1.118.

SPEC_LOCK: Public `/` must follow Design Target First against the registered `Public Homepage` target. The first desktop fold must no longer be a hero-only composition; it must expose the first content cards enough for real browser comparison while preserving readable typography, CTA access, identity chips and mobile behavior.

DESIGN_TARGET_ATTACH_OR_CREATE: Existing target used: `Public Homepage` / `homepage-detailed-design-target-v1118.png`. No new design target was required because this task implements fold density against the v1.118 target. No stale target was deleted.

IMPLEMENT: FE-only CSS/layout adjustments compacted the public homepage hero and the first pillar section. The page-local homepage section received a narrow marker class for target-specific fold density while reusable card/grid primitives stayed in `packages/ui`.

SOURCE_VERIFY: Dedicated validator `tools/validate_web_fe_homepage_target_fold_density_v1119.py` checks task files, Design Target First references, Base UI/UX Layout notes, docs, state, next action and ledger closure.

RUNTIME_VERIFY: browser/e2e `tests/e2e/fe-homepage-target-fold-density-v1119.spec.ts` measures desktop/mobile horizontal overflow, design-target attachment, hero height, h1 target scale, identity signal chips, CTA count and first-card fold visibility.

VISUAL_REVIEW: Runtime screenshots and Playwright metrics were compared against the `Public Homepage` target. The meaningful target for this slice is fold density: hero plus the first content cards must be visible in the first desktop viewport, instead of a hero-only viewport.

HANDOFF: Closure recorded in report, handoff, state and ledger.

## Base UI/UX Layout

Base UI/UX Layout remains mandatory. This slice did not add duplicate card, grid, shell, token or reusable layout owners. The reusable `GameCard`, `Grid`, `LinkButton`, `SectionHeading` and design target reference owners remain shared. The only page-local class is `lgo-home-pillar-section`, used to tune homepage-specific target density that is not currently reusable across Portal/Ops.

## Non-claims

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT remains in force. This is FE layout/browser evidence only and does not make fixture data canonical.
