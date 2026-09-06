# Handoff — LGO Web Runtime Preseed Continuation v1.1

Final decision: `LGO_WEB_RUNTIME_PRESEED_KIT_BUILDER_HARDENED_ENV_LIMITED_v1.1`

This handoff continues from `LGO_WEB_PUBLIC_RC_WITH_PORTAL_OPS_SHELLS_ENV_LIMITED` and hardens the runtime kit path for browser/e2e validation.

## What changed

- Hardened Docker runtime kit builder for Linux amd64 ChatGPT sandbox target.
- Added explicit `pnpm` binary copy into kit to avoid relying on Corepack registry download inside sandbox.
- Added Linux-built `node_modules`, pnpm store and Playwright Chromium cache into the kit.
- Added runtime kit verify/install/run scripts.
- Added source docs and checklist for local/sandbox runtime closure.
- Updated runtime preseed validator to enforce the new kit structure.

## Evidence

- Python source validators: PASS.
- Runtime preseed validator: PASS.
- Shell syntax for runtime kit scripts: PASS.
- Package hygiene before ZIP: PASS.
- Forbidden game roots: PASS.
- App API backend route scan: PASS.
- Node/pnpm/build/browser gates: UNVERIFIED_ENVIRONMENT in this sandbox.

## Known environment limitation

Current sandbox has Node `v22.16.0`, no usable pnpm, Corepack download fails with DNS `EAI_AGAIN registry.npmjs.org`, and Docker is unavailable. Therefore the task cannot claim real `pnpm install/lint/typecheck/test/build/test:e2e` PASS here.

## Build kit locally

```bash
cd /Users/minhdc/Projects/LinhGioiOnline-Web
chmod +x tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

Upload generated files from `out/runtime-kit/`:

```text
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.MANIFEST.txt
UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
```

## Sandbox use after upload

```bash
KIT="/mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-YYYYMMDDTHHMMSSZ.tar.gz"
cd /mnt/data/LinhGioiOnline-Web
bash tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh "$KIT"
bash tools/runtime-kit/install_uploaded_runtime_kit.sh "$KIT" /mnt/data/lgo-web-runtime-kit
source /mnt/data/lgo-web-runtime-kit/env.sh
bash tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh "$PWD"
```

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

Upload the locally built Linux amd64 runtime kit and rerun runtime gates. Do not open real backend integration before accepted backend Auth/API/DB/RBAC/audit contracts exist.
