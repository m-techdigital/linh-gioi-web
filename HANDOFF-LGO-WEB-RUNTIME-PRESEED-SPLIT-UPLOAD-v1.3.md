# Handoff — LGO Web Runtime Preseed Split Upload v1.3

Final decision: `LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_V1_2_CHECKED_V1_3_BUILDER_FIX_READY_ENV_LIMITED`

## What was verified

The user-uploaded v1.2 split runtime kit parts were complete and checksummed correctly:

- `part-aa`: PASS
- `part-ab`: PASS
- `.parts.sha256`: PASS
- full `.tar.gz.sha256` after reassembly: PASS
- reassembled full tarball: PASS

Full archive SHA256:

`8276c01746de63882ec0055f6648a08fb79a09dcebece7ab21ba5627e858f682`

## Findings

The upload was correct, but v1.2 runtime-kit builder had real defects:

- broken copied Corepack/pnpm shims;
- env root default could point to the wrong install path;
- repeated full tar scans in verifier caused timeout risk;
- pnpm store layout was not preserved as `v10/**`;
- generated `pnpm-lock.yaml` was not included;
- workspace-local `node_modules` trees were not included;
- source lint was not runtime-closed because ESLint lacked a TS parser.

## Fixes in v1.3 package

- `tools/lgo_web_lint.mjs` added.
- workspace lint scripts changed to use the custom source linter.
- runtime-kit Dockerfile hardened with self-locating wrappers.
- runtime-kit env/install/run/verify scripts hardened.
- validator updated to enforce v1.3 requirements.
- v1.3 runtime-preseed docs/checklist added.

## Runtime status

- Split upload verification: PASS.
- Reassemble: PASS.
- Node 24 binary in kit: PASS after direct probe.
- pnpm 10.15.0 available in kit cache: PASS after direct probe.
- v1.2 `pnpm install/lint/typecheck/build/e2e`: FAIL/UNVERIFIED due the defects above.
- v1.3 rebuilt kit required before browser/e2e closure.

## Next action

1. Apply `LGO-WEB-runtime-preseed-split-upload-v1.3-full-source.zip` or delta over v1.2.
2. Rebuild runtime kit locally:

```bash
cd /Users/minhdc/Projects/LinhGioiOnline-Web
python3 -m py_compile tools/*.py
python3 tools/validate_web_current_state.py
chmod +x tools/runtime-kit/*.sh tools/lgo_web_lint.mjs
LGO_WEB_RUNTIME_KIT_SPLIT_SIZE=450m ./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

3. Upload the new v1.3 split output from `out/runtime-kit/`.
4. Re-run sandbox reassemble/install/runtime checks.

## Non-claims

- no production auth
- no DB persistence
- no real portal integration
- no real ops/admin mutation
- no independent backend
- no CMS
- no production deployment
- no payment/shop/economy
- no final browser/e2e PASS yet
