# WEB Runtime Browser E2E Checklist v1.5

- [ ] Source ZIP SHA verified.
- [ ] Runtime kit parts verified.
- [ ] Runtime kit full archive reassembled and SHA verified.
- [ ] Runtime kit installed.
- [ ] Node 24 from kit verified.
- [ ] pnpm 10.15.0 from kit verified.
- [ ] `python3 -m py_compile tools/*.py` PASS.
- [ ] `python3 tools/validate_web_current_state.py` PASS on clean source.
- [ ] `python3 tools/validate_web_runtime_browser_matrix.py` PASS on clean source.
- [ ] `pnpm install --offline --ignore-scripts` PASS.
- [ ] `pnpm lint` PASS.
- [ ] `pnpm typecheck` PASS.
- [ ] `pnpm test` PASS.
- [ ] `pnpm build` PASS.
- [ ] `pnpm test:e2e` runs real Playwright browser E2E.
- [ ] public web routes covered.
- [ ] player portal routes covered.
- [ ] ops admin routes covered.
- [ ] no false-pass/no-op test pattern remains.
- [ ] no `app/api/**` backend route added.
- [ ] no game source roots copied.
- [ ] no generated/cache artifacts in final source ZIP.


Sandbox stability note: root `pnpm test` uses `turbo run test --concurrency=1` to avoid parallel Vitest/esbuild worker contention in constrained hosted sandboxes.


## v1.5 hosted-sandbox runner

The canonical no-op-safe command is:

```bash
pnpm test:e2e
```

`pnpm test:e2e` delegates to `tools/run_lgo_web_browser_matrix.sh`, a sharded browser matrix runner. It starts all three apps, probes readiness, runs public navigation plus public/portal/ops route matrix on Chromium desktop and mobile, and prints `LGO_WEB_BROWSER_MATRIX_RESULT PASS` only after all shards pass.
