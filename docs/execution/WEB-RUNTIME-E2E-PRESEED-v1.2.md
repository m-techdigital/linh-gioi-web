# WEB Runtime/E2E Preseed v1.2 — Split Upload Contract

Status: source-level runtime kit builder hardening.

## Purpose

Runtime kits can exceed the platform upload limit because they include Linux Node.js 24, pnpm 10.15.0, pnpm store, workspace `node_modules`, and Playwright Chromium cache. WEB v1.2 changes the upload contract from full-archive upload to split-part upload.

## Split artifact contract

Required upload files:

```text
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-*
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.parts.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.sha256
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.MANIFEST.txt
UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
```

The full `.tar.gz` is local-only when larger than 500MB. The sandbox reassembles parts into the full archive, then verifies:

1. each split part using `.parts.sha256`;
2. the full reassembled archive using `.tar.gz.sha256`;
3. archive readability with `tar -tzf`;
4. required runtime contents with `verify_lgo_web_vnext_browser_e2e_kit.sh`.

## Non-claims

This document does not claim runtime PASS. Runtime PASS requires successful install and actual execution of `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm validate`, and browser/e2e checks in the target sandbox.

No production auth. No DB persistence. No real portal integration. No real ops/admin mutation. No independent backend. No CMS. No production deployment.


## Runtime preseed v1.3 check result

Runtime kit split upload v1.2 was reassembled successfully, but verification found builder defects in copied pnpm/corepack shims and incomplete workspace node_modules/lockfile restoration. v1.3 hardens the builder before asking the owner to rebuild/upload a replacement kit.
