# LGO Web Runtime Preseed Split Upload Report v1.3

Task: `LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-v1.3`

## Input checked

Uploaded runtime kit split set:

- `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T055246Z.tar.gz.part-aa`
- `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T055246Z.tar.gz.part-ab`
- `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T055246Z.tar.gz.parts.sha256`
- `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T055246Z.tar.gz.sha256`
- `lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T055246Z.tar.gz.MANIFEST.txt`
- `UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES(1).txt`

Source baseline: `LGO-WEB-runtime-preseed-split-upload-v1.2-full-source.zip`.

## Upload verification result

- Required split files present: PASS
- Part size under 500MB: PASS
  - part-aa: 471,859,200 bytes
  - part-ab: 223,797,029 bytes
- Part checksums: PASS
  - part-aa SHA256: `bfd7b3aa5e4d3f3cfcdba11040466438e34d5de6d2daa4a1312d8d8c60e96340`
  - part-ab SHA256: `ffeac6226b1e0d5dce4ee85abc7cd0229bca37869f6f8397086220bcf4a1b653`
- Reassembled full archive: PASS
- Reassembled full archive SHA256: PASS
  - full SHA256: `8276c01746de63882ec0055f6648a08fb79a09dcebece7ab21ba5627e858f682`
- Full archive size after reassemble: about 664 MiB / 695,656,229 bytes

## Runtime-kit defects found in v1.2

The upload itself is good. The issue is in the v1.2 runtime kit builder/source:

1. `bin/pnpm`, `bin/pnpx`, and `bin/corepack` were copied as Corepack shims, but those shims require adjacent Corepack lib files. In the sandbox they failed with `Cannot find module './lib/corepack.cjs'` or fell back to the system Node/Corepack.
2. `env.sh` defaulted to `/mnt/data/lgo-web-runtime-kit`, so non-default install paths could source the wrong runtime root.
3. `verify_lgo_web_vnext_browser_e2e_kit.sh` rescanned the 664MiB tarball repeatedly, which is slow and timeout-prone.
4. The pnpm store was packaged as `cache/pnpm-store/files/**` instead of pnpm's expected `cache/pnpm-store/v10/files/**` layout.
5. The kit did not preserve `pnpm-lock.yaml` for offline install.
6. The kit only copied root `node_modules`, not every workspace package/app `node_modules` tree, so nested Turborepo commands could not resolve app-local dependencies.
7. Runtime lint uncovered that WEB source used ESLint without a TypeScript parser dependency, causing parsing errors on valid `.ts/.tsx` files.

## Fixes implemented in v1.3 source/builder

- Added `tools/lgo_web_lint.mjs` as a dependency-light source linter for sandbox/offline use.
- Updated all workspace `lint` scripts to use `tools/lgo_web_lint.mjs`.
- Reworked runtime-kit Dockerfile to create self-locating `pnpm`, `pnpx`, and `corepack` wrappers.
- Reworked `env.sh` in generated kit to discover installed kit root from its own path when not explicitly set.
- Reworked pnpm store packaging to preserve `cache/pnpm-store/v10/**`.
- Reworked builder to include generated `pnpm-lock.yaml`.
- Reworked builder to capture and restore all workspace `node_modules` trees.
- Reworked verify script to scan the tarball once into a temporary manifest.
- Hardened install/run scripts to use `LGO_WEB_RUNTIME_KIT_ROOT` consistently.
- Added v1.3 docs and checklist.
- Updated runtime-preseed validator to require v1.3 safeguards.

## Commands executed in sandbox

- `find /mnt/data ...` to locate uploaded parts and sidecars: PASS
- `sha256sum -c *.parts.sha256`: PASS
- `bash tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh ...part-aa`: PASS
- `sha256sum -c *.tar.gz.sha256`: PASS
- `tar -xzf` direct extraction smoke: PASS
- `node --version` from ad-hoc repaired kit wrapper: PASS, `v24.20.0`
- `pnpm --version` from ad-hoc repaired kit wrapper: PASS, `10.15.0`
- `pnpm install --offline`: FAIL on v1.2 kit because store/lock snapshot is incomplete for offline reinstall
- `pnpm lint`: FAIL on v1.2 source because ESLint could not parse TypeScript/TSX without parser dependency
- `pnpm typecheck`: FAIL after partial v1.2 restore because app-local dependencies were not restored
- `python3 -m py_compile tools/*.py`: PASS after v1.3 source fixes
- `python3 tools/validate_web_current_state.py`: PASS after v1.3 source fixes
- `bash -n tools/runtime-kit/*.sh`: PASS after v1.3 source fixes

## Final decision

`LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_V1_2_CHECKED_V1_3_BUILDER_FIX_READY_ENV_LIMITED`

The uploaded split archive is valid, but the v1.2 builder output is not sufficient to close runtime gates. Rebuild/upload the runtime kit with v1.3 source/builder.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No final browser/e2e PASS until v1.3 rebuilt kit is uploaded and runtime gates pass.
