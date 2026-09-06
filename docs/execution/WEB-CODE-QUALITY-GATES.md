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
