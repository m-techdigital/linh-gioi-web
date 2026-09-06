# LGO Web Runtime Preseed Split Upload Report v1.4

Final decision: `LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_RUNTIME_GATES_PASSED_WITH_TOOLING_FIX_v1.4`

## Scope

This patch fixes and closes the WEB runtime-kit execution contract after testing the uploaded v1.3 split kit in ChatGPT sandbox. It does not add game backend integration or product functionality.

## Uploaded runtime kit checked

- Archive base: `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T062355Z.tar.gz`
- Split parts: `part-aa`, `part-ab`
- Full archive SHA256: `47756d1652be696583ee48d12b95913301f8d7bdeaecc8648d2cc3f541aea936`
- Full archive size: about 664 MiB

## Findings from v1.3 uploaded kit

- Split upload was complete.
- Part checksums passed.
- Full archive reassembly passed.
- Full archive SHA256 passed.
- Runtime kit installation passed.
- Node `v24.20.0` and pnpm `10.15.0` ran from the installed kit.
- `pnpm install --offline`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed after runtime kit installation.
- Real Playwright browser E2E passed: 10 tests executed / 10 passed.

## Root-cause fixes

1. Root `test:e2e` was a no-op because it called a missing workspace script. It now runs `playwright test` directly.
2. Runtime wrapper previously ran source-hygiene validation after `node_modules` and `.next` existed. It now runs direct Python validators before installing cached dependencies, without invoking `pnpm validate` before dependencies exist.
3. Root build now serializes Turborepo build execution with `--concurrency=1` to reduce resource contention in sandbox.
4. Runtime wrapper copies only the lockfile from the kit and lets `pnpm install --offline --ignore-scripts` recreate workspace links from the preseeded store; it does not call the heavy workspace `node_modules` restore path during checks.
5. Dockerfile embedded runtime-kit `run-web-checks.sh` now follows the same corrected runtime sequence.
6. Runtime preseed validator now checks the v1.4 no-op prevention and clean-source validation sequence.

## Validation evidence

PASS:

- `python3 -m py_compile tools/*.py`
- `python3 tools/validate_web_current_state.py`
- `bash -n tools/runtime-kit/*.sh`
- `sha256sum -c lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T062355Z.tar.gz.parts.sha256`
- runtime kit full archive SHA256 check
- `gzip -t` on the reassembled full archive
- runtime kit install
- `node --version` from kit: `v24.20.0`
- `pnpm --version` from kit: `10.15.0`
- `pnpm install --offline --ignore-scripts --frozen-lockfile=false --prefer-offline --store-dir <kit>/cache/pnpm-store`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm build`
- `pnpm test:e2e`: 10 passed

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.

## Packaging rule

Generated runtime artifacts remain excluded from source packaging: `node_modules`, `.next`, `dist`, `build`, `coverage`, `__pycache__`, `.git`, `.turbo`.
