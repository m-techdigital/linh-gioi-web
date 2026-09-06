# WEB Runtime/E2E Preseed v1.1

Status: SOURCE_READY_RUNTIME_ENV_LIMITED

Purpose: make the independent Linh Giới Online Web repo reproducible inside restricted ChatGPT sandboxes by allowing the owner to build and upload a Linux runtime kit.

## Why this exists

WEB-01 through WEB-07 source validators pass, but the current sandbox cannot claim runtime package gates because Node.js is below the target Node 24 LTS, pnpm is not installed, and Corepack cannot download pnpm from the public registry.

## Runtime kit target

- Linux amd64 runtime for ChatGPT sandbox.
- Node.js 24 from `node:24-bookworm`.
- pnpm 10.15.0.
- pnpm store and `node_modules` snapshot built inside Linux, not macOS.
- Playwright Chromium browser cache.
- shell scripts for install, verification and real web checks.

## Owner build command

```bash
cd LinhGioiOnline-Web
chmod +x tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

On Apple Silicon, Docker still builds the correct upload artifact because the builder forces `linux/amd64` unless `LGO_WEB_RUNTIME_KIT_PLATFORM` is explicitly overridden.

## Upload files

Upload the files generated under `out/runtime-kit/`:

```text
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.MANIFEST.txt
UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
```

## Sandbox install and run

```bash
KIT="/mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-YYYYMMDDTHHMMSSZ.tar.gz"
cd LinhGioiOnline-Web
bash tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh "$KIT"
bash tools/runtime-kit/install_uploaded_runtime_kit.sh "$KIT" /mnt/data/lgo-web-runtime-kit
source /mnt/data/lgo-web-runtime-kit/env.sh
bash tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh "$PWD"
```

No command may be reported as PASS unless it exits zero in the target sandbox.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.

## Platform warning

Do not package macOS `node_modules` for sandbox runtime. Build the runtime kit inside Linux Docker so Next.js/SWC/Playwright native binaries match the hosted Linux sandbox.
