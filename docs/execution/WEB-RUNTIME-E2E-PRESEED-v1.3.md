# WEB Runtime/E2E Preseed v1.3

Decision: `LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_HARDENED_v1.3`.

Purpose: fix real runtime-kit defects found after split upload verification.

## Fixes

- `bin/pnpm`, `bin/pnpx`, and `bin/corepack` are self-locating wrappers, not copied Corepack shims.
- `env.sh` resolves the installed kit root from its own path when `LGO_WEB_RUNTIME_KIT_ROOT` is not provided.
- `PNPM_CONFIG_STORE_DIR` and `npm_config_store_dir` point at the kit pnpm store.
- The pnpm store is preserved as `cache/pnpm-store/v10/**`, matching pnpm store layout.
- The generated `pnpm-lock.yaml` is included in the kit workspace snapshot.
- Every workspace `node_modules` tree is captured and restored, not just root `node_modules`.
- `run-web-checks.sh` performs offline install with the kit store, then runs lint, typecheck, test, build, validate, and e2e.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
