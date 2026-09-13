# WEB-CODE-QUALITY-GATES

Required local/runtime chain:

```bash
python3 -m py_compile tools/*.py
python3 tools/validate_web_current_state.py
corepack enable
corepack prepare pnpm@10.15.0 --activate
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm validate
pnpm test:e2e
```

No command may be claimed PASS unless it executed and exited zero.

Current sandbox status: source validators PASS; Node/pnpm/browser gates UNVERIFIED_ENVIRONMENT.

## Targeted inner-loop gates

Follow Base First and verify only the affected slice while implementing:

```text
shared validator -> changed package typecheck/test -> consuming app typecheck/test
```

Examples:

- `packages/ui` change: validate shared-base policy, typecheck `packages/ui`, then typecheck consuming app(s).
- `packages/content` change: run content tests and the affected public-content validator, then typecheck `apps/web`.
- app-only route composition: run the dedicated route/feature validator and that app's typecheck/tests.

Do not repeatedly run all builds after each small edit.

## Full closure gates

At task closure, after source and targeted gates are green, run the full task-appropriate closure chain once. Full production build runs at closure. If the environment blocks build/browser execution, classify it accurately and retain source-level evidence; never substitute repeated build attempts for root-cause evidence.

Unchanged PASS evidence may be reused when its source/dependency/config/runtime provenance is unchanged.
