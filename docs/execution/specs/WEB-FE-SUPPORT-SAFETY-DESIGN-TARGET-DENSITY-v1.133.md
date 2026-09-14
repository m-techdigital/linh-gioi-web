# WEB-FE-SUPPORT-SAFETY-DESIGN-TARGET-DENSITY-v1.133

Status: WEB_CLOSED

## Scope

Create a page-specific Vietnamese design target for public `/support/safety`, attach the route to `Public Support Safety`, and align the first safe-reporting flow to that target before deeper content changes.

## Design Target First

- Target: `apps/web/public/design-reference/support-safety-detailed-design-target-v1133.png`
- Docs mirror: `docs/design/reference/WEB-FE-SUPPORT-SAFETY-DETAILED-DESIGN-TARGET-v1.133.png`
- Registry scope: `Public Support Safety`
- Language requirement: first-flow visible safety/support UI and design target use Vietnamese copy as the implementation reference.

## Base UI/UX Layout

The page reuses shared `Stack`, `GameCard`, `LinkButton`, `SectionHeading` and `StatusBadge` primitives. Page-local CSS is limited to `/support/safety` target density and one-off safe-reporting checklist composition under `lgo-supportsafetypage-stack`.

## Non-claims

No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain. `/support/safety` does not create a real ticket workflow, secure inbox, account recovery, moderation dashboard or data collection flow.

## Evidence

- RED browser/e2e: missing `Public Support Safety` design target on `/support/safety` failed desktop/mobile.
- Design artifact: built-in image_gen created a 1672x941 Vietnamese support/safety design target.
- Browser/e2e: `tests/e2e/fe-support-safety-design-target-density-v1133.spec.ts` passed desktop/mobile.
- Source validator: `tools/validate_web_fe_support_safety_design_target_density_v1133.py`.
- Runtime/source checks: Web typecheck/build and current-state validator recorded in report and handoff.
