# WEB-ARCHITECTURE

## Intended stack lock

The Web Program target stack is:

```text
Next.js 16.x Active LTS
React 19.2
TypeScript strict
Node.js 24 LTS
pnpm
Turborepo
Tailwind CSS
CSS variables/design tokens
Radix primitives
LGO UI system
React Hook Form
Zod
Vitest
Playwright
Storybook
axe-core
```

WEB-00 records the intended stack only. WEB-01 must verify actual package versions during scaffold.

## Applications

```text
apps/web       Official Public Website
apps/portal    Player Portal
apps/ops       Admin/GM/Internal Operations
```

## Backend rule

Java/Spring Boot backend in LinhGioiOnline/server remains the canonical business backend.
Next.js route handlers may only be thin presentation/BFF adapters when explicitly justified.

## Architecture layers

1. Static/public presentation and content.
2. Shared design tokens and UI primitives.
3. Typed content model.
4. Contract records synced from game backend.
5. Centralized API client once accepted backend contracts exist.
6. App-specific route composition.

## Blocked integrations

Portal and Ops real integration remain blocked until an accepted Auth/DB/API contract exists in `WEB-API-CONTRACT-REGISTER.md` and corresponding contract records exist under `packages/contracts`.
