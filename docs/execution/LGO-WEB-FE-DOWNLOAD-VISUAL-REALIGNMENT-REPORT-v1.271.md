# WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate passes.

## Why `/download` was reopened

The full-site visual audit showed that historical `/download` CLOSED/PASS evidence did not match `download-detailed-design-target-v1125.png`. The live route still read like an engineering proof stack: generic hero, readiness cards, download-depth/trust/evidence boards and a secondary disclosure. The target is a compact, cinematic closed-release gate with one truthful status message, five readiness gates and official information paths.

## Real UI replacement

`/download` now opts into the shared immersive public shell and composes `PublicDownloadLanding` with live HTML/CSS:
- one cinematic locked-gate hero and truthful `Chưa mở cổng phát hành` state;
- three real reading routes to `/status`, `/release` and `/download/trust`, never a fake binary/download action;
- all five canonical `downloadReadiness` records in source order;
- both canonical `downloadBuilds` records as non-clickable availability cards;
- four real official-information routes: Tin tức, Cộng đồng, Trạng thái and Hỗ trợ;
- compact target-like desktop density and responsive mobile reflow.

## RED → GREEN, visual review and provenance

The focused browser suite first ran against the old production route and produced the intended RED baseline: 13 failures and one mobile density no-op PASS because the immersive owner, new release state, five readiness gates, two channel cards, four information routes and clean target art did not yet exist.

An early hero crop was rejected because it contained baked web copy from the design board. The final `download-target/hero-gate.png` is decorative gate scenery only. `provenance.json` locks target SHA256, integer crop rectangle, resize dimensions and output SHA256; all release labels, readiness state, cards and actions remain live HTML.

The dev focused suite then passed 14/14. BEFORE and MID desktop/mobile screenshots were reviewed against the target before regression work. A later dev selected run reported two `/game` failures only at `browserContext.close` because a simultaneous Playwright run deleted shared trace resources under `test-results/.playwright-artifacts-*`; no product assertion failed. Re-running the same matrix with `--trace=off` and a dedicated output directory produced a clean 114/114 PASS and confirmed the incident was a harness artifact collision, not a product regression.

## Fresh verification

- Focused `/download`: 14/14 PASS, desktop + mobile.
- Clean selected dev regression: 114/114 PASS with isolated Playwright output.
- Fresh production selected regression on port 3236: 114/114 PASS with isolated output and trace disabled.
- Production build: 63 static pages; `/download` prerendered successfully.
- `validate_web_fe_download_visual_realignment_v1271.py`: PASS, including target/source/art hashes.
- v1.25 canonical class/world/story-depth compatibility and v1.112 public download navigation: PASS.
- UI/Web typecheck and lint: PASS; `git diff --check`: PASS before source delivery.

Production metrics: desktop 1280×720 has no horizontal overflow, page height 1260px, 430px hero, 1220px readiness grid with five columns, two build cards and a two-column official-info grid. Pixel 7 production has 412/412 viewport/scroll width, 2574px page height, two readiness columns and one-column official-info flow. The single runtime hero image completed with nonzero natural dimensions (1570×970).

## Source delivery

Implementation commit `dae79b11925fb330d7e89519b3e8ed2f9b26d823` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared. A clean `git archive` of that source commit passed `WEB CURRENT STATE VALIDATION PASS` before push.

Historical `/download` layout suites v1.125, v1.140 and v1.218 are superseded by v1.271 and are not counted as runtime PASS. Canonical download content, navigation and public-release truthfulness guards remain active.

## Non-claims and next

This remains public informational FE. No public game build, SHA256 artifact, launcher download, entitlement, production auth, account flow, CMS, backend mutation or production deployment is claimed. The page deliberately says the public release gate is closed.

Next single page after final delivery verification: `/download/trust` — WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-v1.272. Continue sequentially through the release/service family; do not resume the historical `/news` queue.
