# WEB-FE-SUPPORT-DESIGN-TARGET-DENSITY-v1.131

Status: WEB_CLOSED

## Scope

Create a page-specific Vietnamese design target for public `/support`, attach the route to `Public Support`, and align the first support flow to that target before adding or changing deeper content.

## Design Target First

- Target: `apps/web/public/design-reference/support-detailed-design-target-v1131.png`
- Docs mirror: `docs/design/reference/WEB-FE-SUPPORT-DETAILED-DESIGN-TARGET-v1.131.png`
- Registry scope: `Public Support`
- Language requirement: first-flow visible support UI and design target use Vietnamese copy as the implementation reference.

## Base UI/UX Layout

The page reuses shared `Stack`, `Grid`, `GameCard`, `LinkButton`, `SectionHeading`, `StatusBadge` and `EmptyState` primitives. Page-local CSS is limited to `/support` target density and one-off support composition under `lgo-supportpage-stack`.

## Non-claims

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain. `/support` does not create a real ticket workflow, secure inbox, account recovery, moderation dashboard or backend support contract.

## Evidence

- RED browser/e2e: missing `Public Support` design target on `/support` failed desktop/mobile.
- Design artifact: built-in image_gen created a 1672x941 Vietnamese support design target.
- Browser/e2e: `tests/e2e/fe-support-design-target-density-v1131.spec.ts` passed desktop/mobile.
- Source validator: `tools/validate_web_fe_support_design_target_density_v1131.py`.
- Runtime/source checks: Web typecheck/build and current-state validator recorded in report and handoff.
