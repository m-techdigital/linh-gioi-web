# LGO Web Runtime Preseed Split Upload Report v1.2

## Task ID

LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-v1.2

## Goal

Fix the Web vNext browser/e2e runtime kit workflow so large runtime kits greater than the upload limit do not need to be uploaded as a single file. The runtime kit builder now produces upload-safe split parts, part checksum sidecars, full archive checksum sidecars, and sandbox reassembly scripts.

## Input artifact

- Baseline source: `LGO-WEB-runtime-preseed-continuation-v1.1-full-source.zip`
- Baseline SHA256 observed: `0af09cd4303d24ebb4071e3c764793503d0518377bd34b5bf91b5fd2b1c348d6`
- Previous runtime decision: `LGO_WEB_RUNTIME_PRESEED_KIT_BUILDER_HARDENED_ENV_LIMITED_v1.1`

## User issue

The locally generated runtime kit can exceed 500MB, so uploading the full `*.tar.gz` is not reliable. The workflow must support splitting the runtime kit locally and reassembling it in ChatGPT sandbox before verification/install.

## Implementation summary

Added split upload support to the runtime kit builder and sandbox scripts:

- `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh`
  - default split size: `450m` via `LGO_WEB_RUNTIME_KIT_SPLIT_SIZE`
  - optional `LGO_WEB_RUNTIME_KIT_NO_SPLIT=1`
  - generates `*.tar.gz.part-*`
  - generates `*.tar.gz.parts.sha256`
  - keeps full archive checksum `*.tar.gz.sha256`
  - writes upload instructions listing split parts first
- `tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh`
  - accepts `.tar.gz`, `.tar.gz.part-aa`, or auto-discovers a single part set in `/mnt/data`
  - validates part checksums before concat
  - validates full archive checksum after concat
  - runs `tar -tzf` to verify archive readability
- `tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh`
  - can receive `.part-aa` directly and reassemble first
- `tools/runtime-kit/install_uploaded_runtime_kit.sh`
  - can receive `.part-aa` directly and reassemble first
- Runtime kit docs/checklists now specify split upload as the default large-file path.

## Files added

- `docs/execution/WEB-RUNTIME-E2E-PRESEED-v1.2.md`
- `docs/execution/checklists/WEB-RUNTIME-KIT-SPLIT-UPLOAD-CHECKLIST-v1.2.md`
- `tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh`
- `reports/LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-REPORT-v1.2.md`
- `HANDOFF-LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-v1.2.md`
- `LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-CHANGED-FILES.txt`
- `LGO-WEB-RUNTIME-PRESEED-SPLIT-UPLOAD-DELETIONS.txt`

## Files modified

- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-SANDBOX-WORKFLOW.md`
- `docs/execution/WEB-TASK-LEDGER.md`
- `tools/runtime-kit/README-LGO-WEB-vNEXT-BROWSER-E2E-KIT.md`
- `tools/runtime-kit/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt`
- `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/runtime-kit/install_uploaded_runtime_kit.sh`
- `tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh`
- `tools/validate_web_runtime_preseed.py`

## Files deleted

No deletions.

## Commands executed

| Command | Result |
|---|---|
| `python3 -m py_compile tools/*.py` | PASS |
| `python3 tools/validate_web_current_state.py` | PASS |
| `python3 tools/validate_web_runtime_preseed.py` | PASS |
| `bash -n tools/runtime-kit/*.sh` | PASS |
| Dummy split/reassemble smoke using `reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh` | PASS |

## Runtime/build/e2e status

The split/reassemble logic was smoke-tested with a dummy `.tar.gz` archive. The actual large runtime kit was not rebuilt in ChatGPT sandbox because Docker is not available in this sandbox. Node/pnpm/browser gates remain `UNVERIFIED_ENVIRONMENT` until the owner builds the Linux amd64 kit locally, uploads split parts, and the sandbox reassembles + runs actual runtime gates.

## Package hygiene

Final source package excludes:

- `node_modules`
- `.next`
- `dist`
- `build`
- `coverage`
- `__pycache__`
- `.git`
- generated runtime kit archives
- generated split runtime kit parts

## Forbidden roots / backend non-integration

No game source roots are included or modified:

- no `client/`
- no `server/`
- no `protocol/`
- no `gamedata/`

No backend integration, no independent business backend, no `app/api/**` business routes, no production auth, no database persistence.

## Final decision

`LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_READY_ENV_LIMITED_v1.2`

## Next action

Owner should build the Linux amd64 runtime kit locally with Docker, upload the split parts and checksum sidecars, then the next sandbox can reassemble and run real runtime/e2e gates.
