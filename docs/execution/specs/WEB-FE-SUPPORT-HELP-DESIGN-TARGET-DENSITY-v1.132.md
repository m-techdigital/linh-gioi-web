# WEB-FE-SUPPORT-HELP-DESIGN-TARGET-DENSITY-v1.132

Status: WEB_CLOSED

## Scope

Create a page-specific Vietnamese design target for public `/support/help`, attach the route to `Public Support Help`, and align the first FAQ route-map flow to that target before deeper content changes.

## Design Target First

- Target: `apps/web/public/design-reference/support-help-detailed-design-target-v1132.png`
- Docs mirror: `docs/design/reference/WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png`
- Registry scope: `Public Support Help`
- Language requirement: first-flow visible support/help UI and design target use Vietnamese copy as the implementation reference.

## Base UI/UX Layout

The page reuses shared `Stack`, `GameCard`, `LinkButton`, `SectionHeading` and `StatusBadge` primitives. Page-local CSS is limited to `/support/help` target density and one-off FAQ route-map composition under `lgo-supporthelppage-stack`.

## Non-claims

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain. `/support/help` does not create a real search backend, ticket workflow, secure inbox, account recovery or data collection flow.

## Evidence

- RED browser/e2e: missing `Public Support Help` design target on `/support/help` failed desktop/mobile.
- Design artifact: built-in image_gen created a 1672x941 Vietnamese support/help design target.
- Browser/e2e: `tests/e2e/fe-support-help-design-target-density-v1132.spec.ts` passed desktop/mobile.
- Source validator: `tools/validate_web_fe_support_help_design_target_density_v1132.py`.
- Runtime/source checks: Web typecheck/build and current-state validator recorded in report and handoff.
