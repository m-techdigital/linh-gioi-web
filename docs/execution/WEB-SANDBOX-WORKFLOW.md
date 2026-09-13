# WEB-SANDBOX-WORKFLOW

## Artifact-first source flow

1. Unzip source artifact into a clean sandbox workspace.
2. Run Python validators first.
3. Probe Node/pnpm/browser availability.
4. If runtime is blocked, keep runtime gates UNVERIFIED_ENVIRONMENT and do not claim release readiness.
5. Package full source ZIP and delta ZIP with no parent wrapper.

## vNext browser/e2e preseed flow

When sandbox lacks Node.js 24 LTS, pnpm or browser binaries, build a Linux runtime kit locally with Docker:

```bash
chmod +x tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
./tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh
```

If the generated runtime kit tarball is larger than 500MB, upload split parts and checksum sidecars instead of the full tarball:

```bash
chmod +x tools/runtime-kit/*.sh
./tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh /mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-aa
./tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh /mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz
./tools/runtime-kit/install_uploaded_runtime_kit.sh /mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz /mnt/data/lgo-web-runtime-kit
source /mnt/data/lgo-web-runtime-kit/env.sh
./tools/runtime-kit/run_uploaded_runtime_kit_web_checks.sh /mnt/data/lgo-web-continuous-work/web-source
```

No runtime kit artifact is source. Do not commit generated tarballs, browser binaries, node_modules or caches.

## Runtime kit split upload contract

The upload set for large kits is `*.tar.gz.part-*`, `*.tar.gz.parts.sha256`, `*.tar.gz.sha256`, `*.tar.gz.MANIFEST.txt`, and `UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt`. The full `.tar.gz` is reconstructed inside sandbox only after every part checksum passes.

## Base First preflight

Before implementation:

1. identify which of `apps/web`, `apps/portal`, `apps/ops` is affected;
2. search the existing `packages/*` owners for reusable capability;
3. decide whether the change belongs in shared/base or app-local composition;
4. record affected validation slices;
5. use targeted gates during development;
6. defer the full production build to closure unless build evidence is specifically required earlier.
