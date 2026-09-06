# WEB Runtime Kit Split Upload Checklist v1.4

Use this checklist after uploading split runtime-kit parts to ChatGPT sandbox.

- [ ] Confirm `.tar.gz.part-aa` and all following `.part-*` files exist.
- [ ] Confirm `.tar.gz.parts.sha256` exists.
- [ ] Confirm `.tar.gz.sha256` exists.
- [ ] Confirm `.tar.gz.MANIFEST.txt` exists.
- [ ] Run `sha256sum -c *.parts.sha256` from the upload directory.
- [ ] Reassemble full archive with `reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh`.
- [ ] Run full archive SHA check with `.tar.gz.sha256`.
- [ ] Run `gzip -t` or equivalent archive integrity check.
- [ ] Install kit to a clean destination using `install_uploaded_runtime_kit.sh`.
- [ ] Source installed `env.sh`.
- [ ] Confirm Node 24 from kit.
- [ ] Confirm pnpm 10.15.0 from kit.
- [ ] Run source validators before install/build artifacts exist.
- [ ] Run offline install using the kit pnpm store.
- [ ] Run lint.
- [ ] Run typecheck.
- [ ] Run unit tests.
- [ ] Run serialized build.
- [ ] Run real Playwright E2E through root `pnpm test:e2e`.
- [ ] Confirm final source ZIP excludes `node_modules`, `.next`, `.turbo`, `dist`, `build`, `coverage`, `__pycache__`, and `.git`.
- [ ] Confirm no `client`, `server`, `protocol`, or `gamedata` roots exist in the web repo.
