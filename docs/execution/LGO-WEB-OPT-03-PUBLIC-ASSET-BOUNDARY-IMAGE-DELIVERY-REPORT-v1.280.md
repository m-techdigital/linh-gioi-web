# LGO-WEB OPT-03 Public Asset Boundary & Image Delivery Report v1.280

Status: WEB_CLOSED
Source delivery: `1c131e10ffe7f5ef060189cc02cbf57e77fcdf7a`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

WEB-OPT-03 removed review-only design targets from the Web public deploy root while preserving every canonical target under `docs/design/reference/`. SHA inventory proved all 23 former public mirrors were byte-identical to their docs counterparts before removal.

`PublicDesignTargetReference.tsx` remains source-governance compatibility only because active historical validators still read it; it has no runtime consumer and no binary review target is served from the public Web.

Homepage desktop/mobile hero delivery changed from PNG to WebP q95 with the original PNG sources moved intact to `docs/design/source/public-marketing/`.

## Measured result

Public deploy footprint: `61,177,886 B / 103 files` → `10,187,479 B / 80 files`, a reduction of `50,990,407 B / 83.35%`.

Review-only design-reference footprint: `49,856,647 B / 23 files` → `0 B / 0 files` under `apps/web/public`.

Homepage hero transfer: desktop `993,789 B → 171,088 B (-82.78%)`; mobile `377,232 B → 65,626 B (-82.60%)`. Natural/render dimensions and page heights stayed unchanged. WebP alpha is byte-equivalent to the PNG source alpha in both assets.

Desktop visual diff mean absolute RGB was approximately `0.18 / 0.11 / 0.24` over the full page; mobile approximately `0.04 / 0.03 / 0.05`. Contact-sheet review found no meaningful visual degradation.

## Verification

TDD RED reproduced public review-target availability (`200` instead of `404`) and PNG hero delivery. Final focused browser matrix: 4/4 PASS on desktop/mobile, covering 59-route image health, no review-asset requests, public review URL `404`, WebP hero source selection and stable dimensions.

Regression gates: WEB-OPT-02 2/2 PASS; WEB-OPT-01 4/4 PASS; v1.280/v1.279/v1.278 source validators PASS; UI/Web typecheck PASS; Web lint PASS; exact clean build 63 pages; clean final `WEB CURRENT STATE` PASS.

Evidence: `handoff/web-opt-v1.280/evidence/` contains before/after inventory, 23-file SHA mapping, visual diff metrics and desktop/mobile contact sheets.

No production deployment, backend, IA or public-copy change was introduced. Portal/Ops runtime design mirrors remain untouched.
