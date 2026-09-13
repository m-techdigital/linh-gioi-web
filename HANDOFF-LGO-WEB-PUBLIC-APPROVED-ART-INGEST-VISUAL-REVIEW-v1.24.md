# HANDOFF — WEB-PUBLIC-APPROVED-ART-INGEST-AND-VISUAL-REVIEW-v1.24

Status: `WEB_HANDOFF_DONE`

Final decision: `LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24`

## Baseline

- `LGO-WEB-public-game-visual-asset-cta-polish-v1.23-full-source.zip`
- SHA256 `896f898acb2af2d9bb062b6e7ed0d7f3331cdc499a43a57376c1670784788a4a`

## What changed

- Added an audited local web-art registry and three web-delivery derivatives.
- Added Đông Môn **world concept** art as a cinematic hero material layer.
- Added a Võ **development art preview** editorial spotlight with modular gear and skill/VFX boards.
- Preserved equal product/navigation treatment for Võ / Kiếm / Pháp / Cơ / Linh.
- Added manifest-based provenance, source SHA256, derivative SHA256, dimensions and claim boundaries.
- Kept public claims bounded: no gameplay screenshot, production-final art or public-build claim.

## Creative rule

The website owns composition, framing, typography, responsive behavior and visual hierarchy. Game/source art is a material library and claim-verification input, not a website layout contract.

## Verification

- Node 24.20.0: PASS.
- pnpm 10.15.0: PASS.
- Workspace lint: PASS, 11/11 packages.
- Web TypeScript: PASS.
- Content tests: PASS, 12/12.
- v1.22 / v1.23 / v1.24 validators: PASS.
- WEB CURRENT STATE: PASS.
- Art provenance/SHA/dimensions: PASS.
- Production build: `UNVERIFIED_ENV` due sandbox `EIO: i/o error, fsync`.
- Browser/visual review: `UNVERIFIED_ENV` for the same environment limitation.

## Non-claims

No production-final artwork, gameplay screenshot, public game build, production deployment, production auth, DB persistence, portal integration or ops production readiness is claimed.

## Next allowed step

`WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25`

## Output artifacts

- `LGO-WEB-public-approved-art-ingest-visual-review-v1.24-full-source.zip`
- `LGO-WEB-public-approved-art-ingest-visual-review-v1.24-delta.zip`
- Companion SHA256 files for both archives.
- Delta contains repo-relative paths and 0 deletions.
