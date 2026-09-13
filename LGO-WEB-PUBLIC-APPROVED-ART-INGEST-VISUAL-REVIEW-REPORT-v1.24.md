# LGO WEB — PUBLIC APPROVED ART INGEST & VISUAL REVIEW — REPORT v1.24

Task: `WEB-PUBLIC-APPROVED-ART-INGEST-AND-VISUAL-REVIEW-v1.24`

Final decision: `LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24`

## Objective

Strengthen the player-facing website with a small audited 2D art set while keeping scenario/world/class fantasy as the creative source of truth. The website owns composition, framing, typography, responsive behavior and visual hierarchy; game art is replaceable visual material, not a website layout contract.

## Baseline

- `LGO-WEB-public-game-visual-asset-cta-polish-v1.23-full-source.zip`
- SHA256: `896f898acb2af2d9bb062b6e7ed0d7f3331cdc499a43a57376c1670784788a4a`

## Art usage

- Đông Môn skyline → public label `World concept · Đông Môn`; used as cinematic world material, not a gameplay screenshot or final-environment claim.
- Võ starter board → `Development art preview · Võ Lv1–30`; used as editorial class-development material, not production-final key art.
- Võ skill/VFX board → development preview; not a final combat screenshot.
- Võ / Kiếm / Pháp / Cơ / Linh remain equal in navigation and class identity. Võ is only the first art-backed editorial example.

## Web-owned visual architecture

- Audited art registry lives in typed content.
- Web delivery derivatives live under `apps/web/public/game-art/**`.
- `manifest.json` records source SHA256, derivative SHA256, dimensions and claim classification.
- Layout does not depend on Unity atlas geometry; future approved artwork can replace the current web derivatives without changing IA.

## Verification evidence

Source/runtime gates executed on the v1.24 final source tree:

- Node `24.20.0`: PASS.
- pnpm `10.15.0`: PASS.
- Workspace lint: PASS, 11/11 packages.
- `@lgo-web/web` TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 12/12.
- v1.22 game-experience continuity validator: PASS.
- v1.23 visual/CTA continuity validator: PASS.
- v1.24 approved-art validator: PASS.
- WEB CURRENT STATE validator: PASS.
- Art derivative SHA256/dimensions/public-claim validation: PASS.
- Source NUL-byte scan: PASS.
- Generated/cache-artifact hygiene: PASS after runtime symlinks/caches were removed.

## Environment-limited gates

Next.js production build is **not claimed PASS**. The sandbox repeatedly returns:

```text
EIO: i/o error, fsync
```

after the Next.js process begins work. This reproduces the same filesystem limitation observed during v1.23. Browser/visual review is therefore also `UNVERIFIED_ENV`; the website is not claimed browser-closed in this environment.

## Explicit non-claims

- No production-final art claim.
- No gameplay-screenshot claim for concept/development art.
- No public game build claim.
- No production deployment claim.
- No production auth/database/portal/ops integration claim.

## Next task

`WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25`

## Packaging

- Full source: `LGO-WEB-public-approved-art-ingest-visual-review-v1.24-full-source.zip`
- Delta from v1.23: `LGO-WEB-public-approved-art-ingest-visual-review-v1.24-delta.zip`
- Changed-files manifest: `LGO-WEB-PUBLIC-APPROVED-ART-INGEST-VISUAL-REVIEW-v1.24-CHANGED-FILES.txt`
- Deletions manifest: empty (0 deletions).
- SHA256 values are distributed as companion `.sha256` files after final archive creation.
