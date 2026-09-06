# WEB Runtime Kit Split Upload Checklist v1.2

- [ ] Build kit with `tools/runtime-kit/build_lgo_web_vnext_browser_e2e_kit.sh`.
- [ ] Confirm full archive exists locally.
- [ ] Confirm `.tar.gz.sha256` exists.
- [ ] Confirm `.tar.gz.MANIFEST.txt` exists.
- [ ] Confirm `.tar.gz.part-*` files exist and every part is below the upload limit.
- [ ] Confirm `.tar.gz.parts.sha256` exists.
- [ ] Upload split parts, `.parts.sha256`, full `.sha256`, manifest, and upload list.
- [ ] In sandbox, run `reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh`.
- [ ] Verify parts checksum PASS.
- [ ] Verify full archive checksum PASS.
- [ ] Verify `tar -tzf` PASS.
- [ ] Install kit to `/mnt/data/lgo-web-runtime-kit`.
- [ ] Run actual WEB runtime gates.

Do not claim runtime PASS until commands actually exit zero in the target sandbox.
