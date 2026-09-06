# WEB-OWNERSHIP-MAP

## Canonical owners

```text
packages/design-tokens owns CSS variables and theme primitives.
packages/ui owns reusable UI primitives.
packages/content owns file-backed public content model.
packages/contracts owns imported/synced game API contract records.
packages/api-client owns generated/centralized API access.
apps/web owns public website pages.
apps/portal owns player portal routes and UX states.
apps/ops owns internal operations routes and workflows.
```

## Current path ownership

| Path | Owner | Notes |
|---|---|---|
| `apps/web/**` | Official public website | Starts active in WEB-01. |
| `apps/portal/**` | Player portal | Placeholder until Auth/DB/API contract. |
| `apps/ops/**` | Ops/Admin/GM | Placeholder until RBAC/audit/security/API contract. |
| `packages/design-tokens/**` | Design tokens | CSS variables, semantic tokens, theme primitives. |
| `packages/ui/**` | Shared UI | Reusable primitives only. |
| `packages/content/**` | Public content model | File-backed typed content. |
| `packages/contracts/**` | Contract sync | Imported/synced game API records only. |
| `packages/api-client/**` | API access | Generated or centralized access, never app-local canonical DTOs. |
| `packages/auth/**` | Web auth shell | Only after backend contract acceptance. |
| `packages/config/**` | Shared config | Tooling config once scaffolded. |
| `packages/testing/**` | Test utilities | Shared testing/evidence utilities. |

## Duplicate owner ban

Duplicate component owners are forbidden. A button, panel, modal, form field, route guard, API client, contract DTO or theme token must have exactly one canonical owner. App folders may compose; they must not re-own shared primitives.
