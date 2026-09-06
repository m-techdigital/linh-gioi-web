# Handoff — LGO Web Runtime Preseed Split Upload v1.2

## Final decision

`LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_READY_ENV_LIMITED_v1.2`

## What changed

The runtime kit workflow now supports large files by splitting the locally built Linux amd64 runtime kit into upload-safe parts. The sandbox can reassemble parts, verify part checksums, verify full archive checksum, and then install/run the uploaded kit.

## Key files

- `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh`
- `tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/runtime-kit/install_uploaded_runtime_kit.sh`
- `tools/runtime-kit/README-LGO-WEB-vNEXT-BROWSER-E2E-KIT.md`
- `tools/runtime-kit/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt`
- `docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.2.md`
- `docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.2.md`
- `reports/LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-REPORT-v1.2.md`

## Evidence

| Gate | Result |
|---|---|
| Python compile validators | PASS |
| WEB current state validator | PASS |
| Runtime preseed validator | PASS |
| Runtime shell syntax | PASS |
| Dummy split/reassemble smoke | PASS |
| Actual Docker build of large runtime kit | UNVERIFIED_ENVIRONMENT |
| Actual pnpm install/lint/typecheck/test/build | UNVERIFIED_ENVIRONMENT |
| Actual Playwright/browser e2e | UNVERIFIED_ENVIRONMENT |

## Owner local build command

```bash
cd /Users/minhdc/Projects/LinhGioiOnline-Web
chmod +x tools/runtime-kit/*.sh
LGO_WEB_RUNTIME_KIT_SPLIT_SIZE=450m ./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

## Upload files

Upload the files listed in `out/runtime-kit/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt`:

```text
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-*
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.parts.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.MANIFEST.txt
UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
```

Do not upload the full `.tar.gz` if it exceeds the platform upload limit.

## Sandbox reassemble/install/check commands

```bash
cd /mnt/data/LinhGioiOnline-Web
chmod +x tools/runtime-kit/*.sh
KIT_PART="$(find /mnt/data -maxdepth 1 -type f -name 'lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-aa' | sort | head -n 1)"
bash tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh "$KIT_PART"
KIT="${KIT_PART%.part-aa}"
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
- No actual browser/e2e PASS until split kit is uploaded, reassembled, installed and run in target sandbox.

## Next allowed step

Upload split runtime kit parts and rerun runtime gates. Do not move to WEB-08 real backend sync unless accepted backend Auth/API/DB/RBAC/audit contracts exist.
