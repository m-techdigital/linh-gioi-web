# WEB BASE FIRST GOVERNANCE

## BASE FIRST

Every change in the Linh Giới Online Web Program starts by checking the shared/base owners before app-local implementation.

### Search existing owners first

Before adding a new component, helper, style primitive, contract type, auth helper, API helper, config value or test utility, search these owners first:

```text
packages/ui
packages/design-tokens
packages/auth
packages/api-client
packages/config
packages/contracts
packages/content
packages/testing
```

If an existing owner already provides the capability, reuse it. If the capability is reusable by two or more applications, extend that shared owner instead of adding app-local copies.

### Extend base/shared before page-local duplication

Dependency direction is:

```text
packages/* -> apps/web | apps/portal | apps/ops
```

Apps may compose domain-specific experiences, but they must not become duplicate owners of general-purpose primitives. Page-local code is allowed only when the behavior is genuinely app-specific or route-specific. The task handoff must record why a new local owner was necessary when a reusable shared owner was not chosen.

### Shared change discipline

A base/shared change must remain generic enough for its declared owner. Do not move public-marketing-specific copy, Portal business rules or Ops mutation semantics into `packages/ui`. Shared code owns reusable presentation and interfaces; app code owns domain composition.

## Evidence Reuse / Build Once

Verification follows affected-slice invalidation instead of rerunning the full build after every edit.

### Targeted inner loop

During implementation, run the smallest gates that prove the changed slice:

- shared/package validator for the owner being changed;
- package typecheck for changed package(s);
- focused tests for changed behavior;
- app typecheck when an app consumes a changed shared interface.

### Full production build runs at closure

The full production build runs at closure, or earlier only when source/config/dependency changes invalidate build evidence and the build result is necessary to continue. Do not use repeated full builds as an inner-loop substitute for focused validation.

### Do not rerun unchanged PASS evidence

Do not rerun unchanged PASS evidence unless the relevant source, dependency, configuration, runtime provenance or contract changed. A change in `packages/ui` invalidates consumers that compile against its interface; it does not automatically invalidate unrelated content validators or unchanged historical artifacts.

## Base First audit

Each task handoff must record:

1. shared owners searched;
2. shared owners changed;
3. app-local owners added and why they could not be shared;
4. duplicate code removed;
5. affected validation slices;
6. full-build decision and whether prior evidence was reused.
