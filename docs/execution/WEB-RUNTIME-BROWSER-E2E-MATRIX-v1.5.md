# WEB Runtime Browser E2E Matrix v1.5

Decision target: `LGO_WEB_RUNTIME_BROWSER_E2E_MATRIX_READY_v1.5`

This document extends the v1.4 runtime preseed closure by requiring real Playwright browser E2E coverage for all three WEB apps:

- public web on `127.0.0.1:3000`
- player portal on `127.0.0.1:3001`
- ops admin on `127.0.0.1:3002`

The goal is to prevent another false-pass/no-op class where a root script exits cleanly but does not run the intended browser tests.

## Runtime matrix

| App | Runtime route examples | Required marker |
|---|---|---|
| public web | `/`, `/game`, `/download` | public release non-claims stay visible |
| player portal | `/`, `/login`, `/characters` | fixture-only and No production auth markers stay visible |
| ops admin | `/`, `/control-center`, `/audit` | no real ops/admin mutation markers stay visible |

## Required runtime evidence

The following command must execute real Playwright browser E2E, not a package-script no-op:

```bash
pnpm test:e2e
```

Expected behavior:

- starts public web, player portal and ops admin dev servers through the sharded browser matrix runner;
- sets `LGO_WEB_SKIP_WEBSERVER=1` for Playwright after explicit server readiness probes;
- runs Chromium desktop and Chromium mobile projects in small shards to avoid hosted-sandbox process hangs;
- validates headings and explicit non-claim markers;
- returns nonzero on route failure, missing heading, missing non-claim marker, wrong port or dev server failure.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No payment/shop/economy.
- No production deployment.

## Boundary

This is runtime/browser hardening only. It does not add backend integration, does not add API routes, does not add database persistence and does not modify game source.


Sandbox stability note: root `pnpm test` uses `turbo run test --concurrency=1` to avoid parallel Vitest/esbuild worker contention in constrained hosted sandboxes.


## v1.5 hosted-sandbox runner

The canonical no-op-safe command is:

```bash
pnpm test:e2e
```

`pnpm test:e2e` delegates to `tools/run_lgo_web_browser_matrix.sh`, a sharded browser matrix runner. It starts all three apps, probes readiness, runs public navigation plus public/portal/ops route matrix on Chromium desktop and mobile, and prints `LGO_WEB_BROWSER_MATRIX_RESULT PASS` only after all shards pass.
