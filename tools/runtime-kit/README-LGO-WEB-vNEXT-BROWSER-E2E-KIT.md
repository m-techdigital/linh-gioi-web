# LGO Web vNext Browser/E2E Runtime Kit Builder

This builder exists because ChatGPT sandbox may have Node.js below the target, no pnpm cache, no browser binaries and no registry/DNS access.

Build target: Linux x64 runtime kit for ChatGPT sandbox. The builder forces `linux/amd64` by default so the result can run in typical hosted Linux sandboxes even when built from macOS or Apple Silicon Docker Desktop.

The kit is a toolchain/cache artifact, not source code. Do not commit generated runtime kits into the repo.

## Build on local machine with Docker

From the `LinhGioiOnline-Web` repo root:

```bash
chmod +x tools/runtime-kit/*.sh
./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

Optional overrides:

```bash
LGO_WEB_RUNTIME_KIT_PLATFORM=linux/amd64 ./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
LGO_WEB_RUNTIME_KIT_SPLIT_SIZE=450m ./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
LGO_WEB_RUNTIME_KIT_NO_SPLIT=1 ./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

Output will be written under:

```text
out/runtime-kit/
```

## Upload split parts when the full archive is larger than 500MB

Upload these generated files back to ChatGPT sandbox:

```text
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-*
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.parts.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.MANIFEST.txt
UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
```

Do not upload the full `.tar.gz` if it exceeds the platform upload limit. The sandbox will reassemble the parts and verify both the part checksums and the full archive checksum before install.

## Use in sandbox after split upload

```bash
KIT_PART="/mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-YYYYMMDDTHHMMSSZ.tar.gz.part-aa"
cd /mnt/data/LinhGioiOnline-Web
bash tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh "$KIT_PART"
bash tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh "${KIT_PART%.part-aa}"
bash tools/runtime-kit/install_uploaded_runtime_kit.sh "${KIT_PART%.part-aa}" /mnt/data/lgo-web-runtime-kit
source /mnt/data/lgo-web-runtime-kit/env.sh
bash tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh "$PWD"
```

The verify and install scripts can also receive `.part-aa` directly; they will reassemble first.

## Why Docker is required

Do not package macOS `node_modules` for sandbox runtime. Next.js, SWC and Playwright include platform-specific binaries. Building inside Linux Docker avoids macOS-to-Linux binary mismatch.


## v1.3 hardening

Runtime-kit split upload now requires self-locating pnpm/pnpx/corepack wrappers, `cache/pnpm-store/v10/**`, `workspace/pnpm-lock.yaml`, and `workspace-node-modules/**/node_modules` so sandbox offline install and nested Turborepo workspace commands can run without registry access.

## v1.4 runtime check contract

- `pnpm validate` is run before installing cached dependencies, while the source tree is still clean.
- `pnpm build` is serialized via root package script to avoid sandbox CPU/memory contention during three Next.js app builds.
- `pnpm test:e2e` now runs real Playwright tests instead of a no-op filtered workspace script.
- Generated runtime artifacts (`node_modules`, `.next`, `.turbo`) are runtime evidence only and must not be packaged into source ZIPs.
