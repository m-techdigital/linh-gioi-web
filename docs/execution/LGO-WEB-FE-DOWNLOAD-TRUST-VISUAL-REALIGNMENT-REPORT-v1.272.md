# LGO-WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-REPORT-v1.272

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate passes.

## Why `/download/trust` was reopened

The full-site visual audit showed that the historical Download Trust route still rendered as a long engineering proof stack even though its detailed target is a compact cinematic trust page. The public flow mixed internal proof boards, release/readiness evidence and secondary disclosures into a page more than 2200px tall on desktop.

## Real UI replacement

`/download/trust` now opts into the shared immersive public shell and composes `PublicDownloadTrustLanding` with live HTML/CSS:
- cinematic two-sided hero art with the player-facing promise `Không tải giả`;
- three truthful routes to `/download`, the release-trust/checksum guide and `/status`;
- all six canonical `downloadTrustGates` in source order, each showing `Cần có` and `Người chơi thấy`;
- a compact reason/principles band instead of the historical proof-stack disclosure;
- no binary link, fake checksum, launcher, entitlement or release claim.

## RED → GREEN, visual review and provenance

The focused browser suite first ran against the old production route and produced the intended RED baseline: 11 failures and 3 existing truthfulness/boundary passes. The replacement then reached 14/14 focused PASS on desktop and mobile.

Two decorative crops were taken from `download-trust-detailed-design-target-v1126.png`: the character scene and the chained trust seal. `provenance.json` locks the target SHA256, integer crop rectangles and output SHA256; live labels, gate text and actions are not baked into runtime art.

BEFORE/AFTER browser screenshots were reviewed against the target. Desktop height dropped from roughly 2283px to about 1270px with six gates in one row; mobile stayed width-safe and readable. A shared first-load footer wordmark fallback briefly exceeded the historical 64px typography cap; the Base First footer owner was fixed and the v1.88 browser heading guard returned 6/6 PASS.

## Fresh verification

- Focused `/download/trust`: 14/14 PASS.
- Selected dev regression: 128/128 PASS on one isolated run.
- Fresh production selected regression on port 3236: 128/128 PASS.
- Production build: 63 static pages; `/download/trust` prerendered successfully.
- `validate_web_fe_download_trust_visual_realignment_v1272.py`: PASS.
- UI/Web typecheck and lint: PASS; `git diff --check`: PASS before source delivery.
- Clean source-archive `WEB CURRENT STATE`: PASS after updating the still-active v1.88 static validator to follow the new owner while retaining its route semantics.

## Source delivery and resource discipline

Implementation source commit `e7846efa628f57bff44d15481c56182fccf0e90d` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared.

Historical Download Trust proof/design/layout validators v1.67, v1.126, v1.141 and v1.219 are superseded by v1.272 and are not counted as runtime PASS. The cross-route v1.88 heading/typography guard remains active.

After production verification, the owned 3236 runtime was stopped and generated `.next`, raw Playwright output, traces and Python caches were removed while preserving source, final screenshots, provenance and compact run metadata. About 1.7 GB of transient data was reclaimed; shared Chrome/MCP processes were not touched.

## Non-claims and next

This remains public informational FE. There is no public game binary, real SHA256 artifact, launcher, entitlement, production auth, account flow, CMS, backend mutation or production deployment claim.

Next single page after verified governance/package delivery: `/release` — WEB-FE-RELEASE-VISUAL-REALIGNMENT-v1.273. Continue one page at a time; do not resume the historical `/news` queue.
