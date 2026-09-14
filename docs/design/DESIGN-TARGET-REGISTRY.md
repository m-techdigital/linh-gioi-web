# DESIGN-TARGET-REGISTRY

Design Target First registry for Linh Giới Online Web. Every UI task must attach the page, section or reusable component to one of these design targets before implementation. If a page or section is not covered, create a new target first. If a target is stale or misleading, replace or delete obsolete design targets in the same task.

| Scope | Current design target | Applies to | Status | Notes |
| --- | --- | --- | --- | --- |
| Public Core | `apps/web/public/design-reference/design-atlas-public-core-v195.png` | `/`, `/game`, `/classes`, `/story`, `/journey`, `/start`, public hero/feature/gallery/footer patterns | Active | Use for public core page hierarchy and game atmosphere. |
| Public Service | `apps/web/public/design-reference/design-atlas-public-service-v195.png` | `/download`, `/download/trust`, `/release`, `/release/readiness`, `/release/tester-pack`, `/status`, `/support`, `/support/help`, `/support/safety`, `/community`, `/community/onboarding`, `/performance`, `/accessibility`, `/roadmap` | Active | Use for support/trust/status/readiness/service layouts. |
| Player Portal | `apps/web/public/design-reference/design-atlas-portal-v195.png` | Portal dashboard, account/security, character, journey, support/recovery, auth-required and blocked backend states | Active | Fixture/demo only until accepted backend contract. |
| Ops/Admin | `apps/web/public/design-reference/design-atlas-ops-v195.png` | Ops dashboard, player operations, support triage, game ops, audit, risk/blocked mutation states | Active | Read-only/no-contract design target; no destructive mutation. |
| Component/state | `apps/web/public/design-reference/design-atlas-components-v195.png` | Navigation, sidebar, mobile drawer, buttons, cards, forms, chips, tables, alerts, empty/loading/error/success/blocked states, typography and spacing | Active | Base UI/UX Layout source for shared `packages/design-tokens` and `packages/ui` work. |

## Replacement rule

When a design target is replaced, update this registry in the same commit. The old file must either be deleted if it is misleading or moved to a clearly superseded historical record with the replacement path recorded here. Do not leave two active targets for the same page or section.
