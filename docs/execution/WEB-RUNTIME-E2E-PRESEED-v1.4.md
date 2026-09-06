# WEB Runtime E2E Preseed v1.4

Status: runtime-checked in ChatGPT sandbox after the uploaded v1.3 split kit was reassembled and installed.

## Purpose

v1.4 closes the WEB runtime-kit execution contract defect discovered during real sandbox verification:

- The uploaded split kit can supply Linux Node 24, pnpm 10.15.0, pnpm store cache, and Playwright Chromium without network access.
- The direct Python source validator must run before generated runtime artifacts such as `node_modules`, `.next`, and `.turbo` exist.
- pnpm test:e2e must execute real Playwright tests, not a filtered workspace no-op.
- Build should run with constrained concurrency in sandbox.

## Required runtime sequence

From a clean repo root:

1. Source `env.sh` from the installed runtime kit.
2. Run `python3 -m py_compile tools/*.py`.
3. Run `python3 tools/validate_web_current_state.py`.
4. Run `python3 tools/validate_web_current_state.py` while source is still clean.
5. Copy `workspace/pnpm-lock.yaml` from the kit if present.
6. Run `pnpm install --offline --ignore-scripts --frozen-lockfile=false --prefer-offline --store-dir "$KIT_ROOT/cache/pnpm-store"`.
7. Run `pnpm lint`.
8. Run `pnpm typecheck`.
9. Run `pnpm test`.
10. Run `pnpm build`.
11. Run `pnpm test:e2e`.

## Acceptance evidence

The v1.4 source/wrapper is acceptable only when the evidence includes:

- part checksum PASS;
- full archive SHA256 PASS;
- runtime kit install PASS;
- Node `v24.20.0` from kit;
- pnpm `10.15.0` from kit;
- offline install PASS;
- lint PASS;
- typecheck PASS;
- tests PASS;
- build PASS for `apps/web`, `apps/portal`, and `apps/ops`;
- real Playwright browser E2E PASS with 10 executed tests.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
