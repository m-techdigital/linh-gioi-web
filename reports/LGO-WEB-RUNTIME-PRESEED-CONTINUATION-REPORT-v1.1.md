# LGO Web Runtime Preseed Continuation Report v1.1

Task ID: WEB-RUNTIME-PRESEED-v1.1

Goal: harden the vNext browser/e2e runtime kit builder so the owner can build a Linux amd64 runtime kit locally and upload it to ChatGPT sandbox for real Node 24 + pnpm + Playwright checks.

Input artifact: `LGO-WEB-continuous-public-rc-v1.0-full-source.zip`
Input actual SHA256: `efda2503fd7e068c319d7bdf2e030b3889a4b07aff731bb3f862f4d93f2c7080`

Starting decision: `LGO_WEB_PUBLIC_RC_WITH_PORTAL_OPS_SHELLS_ENV_LIMITED`
Final decision: `LGO_WEB_RUNTIME_PRESEED_KIT_BUILDER_HARDENED_ENV_LIMITED_v1.1`

## Scope

Allowed scope was limited to runtime/e2e preseed hardening, documentation, source validators, reports and handoff. No feature expansion, no backend integration and no game source modification were performed.

## Files added or materially updated

- `tools/runtime-kit/Dockerfile.lgo-web-vnext-browser-e2e-kit`
- `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/runtime-kit/install_uploaded_runtime_kit.sh`
- `tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh`
- `tools/runtime-kit/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt`
- `tools/runtime-kit/README-LGO-WEB-vNEXT-BROWSER-E2E-KIT.md`
- `tools/validate_web_runtime_preseed.py`
- `docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.1.md`
- `docs/execution/WEB-LOCAL-RUNTIME-CLOSURE-CHECKLIST-v1.1.md`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`
- `package.json`

## Runtime kit hardening details

- Docker build now forces `linux/amd64` by default.
- Runtime kit filename now includes `linux-amd64`.
- Dockerfile copies the resolved `node`, `corepack`, `pnpm` and optional `pnpx` binaries into `/kit/bin`.
- Runtime kit includes Linux-built `node_modules`, pnpm store and Playwright Chromium cache.
- Verification checks now require `bin/node`, `bin/pnpm`, `cache/pnpm-store`, `cache/ms-playwright` and `workspace/node_modules`.
- Repo-side runner `run_uploaded_runtime_kit_web_checks.sh` delegates to uploaded kit `run-web-checks.sh`.
- Documentation now warns not to package macOS `node_modules` for Linux sandbox runtime.

## Validation executed in sandbox

- Input continuous v1.0 full source SHA256: `efda2503fd7e068c319d7bdf2e030b3889a4b07aff731bb3f862f4d93f2c7080`.
- `unzip -t` input ZIP: PASS.
- `python3 -m py_compile tools/*.py`: PASS.
- `python3 tools/validate_web_current_state.py`: PASS.
- `bash -n tools/runtime-kit/*.sh`: PASS.
- Package hygiene scan before final packaging: PASS after removing transient Python `__pycache__` from verification.
- Forbidden roots scan: PASS.

## Runtime environment probe

- Node: `v22.16.0` in current sandbox, below target Node.js 24 LTS.
- Corepack: `0.32.0`.
- pnpm: UNVERIFIED_ENVIRONMENT because Corepack attempted to download `pnpm@10.15.0` and failed with DNS `EAI_AGAIN registry.npmjs.org`.
- Docker: unavailable in sandbox (`docker: command not found`).

## Final decision

`LGO_WEB_RUNTIME_PRESEED_KIT_BUILDER_HARDENED_ENV_LIMITED_v1.1`

This is not a public release/runtime closure. It only hardens the source and local-builder path for future real runtime closure.

## Backend and game source non-integration

- No `client/`, `server/`, `protocol/`, `gamedata/` roots were added.
- No `app/api/**` routes were added.
- No backend or database dependency was added.
- Java/Spring Boot game backend remains canonical for future explicit contract sync.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No Node/pnpm/browser runtime PASS in this sandbox.

## Next action

Owner should build the Linux amd64 runtime kit locally using Docker and upload the tarball, SHA and manifest. Then a sandbox can install the kit and rerun real Node 24 + pnpm + Playwright runtime gates.
