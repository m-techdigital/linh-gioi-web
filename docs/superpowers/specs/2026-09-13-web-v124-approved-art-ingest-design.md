# WEB v1.24 Approved Art Ingest & Visual Review — Design

## Goal
Replace selected CSS-only presentation areas with audited 2D art while keeping the scenario-first v1.22/v1.23 information architecture intact and preserving truthful public claims.

## Creative rule
Narrative, world fantasy, class identity and player journey remain the design source. Game-source assets are only a material library. Asset presence must not dictate IA or feature claims. The web owns composition, framing, typography, motion and editorial treatment so future art can be swapped without restructuring the site.

## Asset policy
Only audited assets may enter `apps/web/public/game-art/**`.

- `DongMonIllustrated/skyline.png`: upstream `DRAFT_OWNER_REVIEW`. Web use is limited to **world concept / art-direction preview**. Never label as gameplay screenshot or final environment art.
- `VoLv1ApprovedRuntimeArt/vo-lv1-starter-atlas.png`: upstream `APPROVED_RUNTIME_ART`, but upstream explicitly says alpha/cell slicing still need refinement before production-final claim. Web use is limited to **Võ development art preview**.
- `VoLv1ApprovedRuntimeArt/vo-lv1-skill-atlas.png`: same upstream status; limited to **skill/VFX development preview**.

No other game-repo image is surfaced in v1.24.

## Presentation
1. Hero/world scene: introduce an art-backed layer using the Đông Môn skyline with an explicit `World concept` label. Keep portal/spirit overlays from v1.23 so the cinematic system remains branded rather than becoming a raw screenshot.
2. World panorama: use the same approved-for-web-reference world art only where it improves depth; no duplicate full-bleed image wall.
3. Classes page: add a Võ art spotlight showing starter modular art and a small skill/VFX preview, labeled work-in-progress/development art. Keep all five class emblems and narrative parity; Võ art must not make the other four look removed from the product.
4. Accessibility/performance: local static assets only, explicit width/height, lazy load below the fold, responsive object-position, reduced-motion unchanged.

## Non-claims
No production-final artwork claim, no gameplay screenshot claim, no public build claim, no representation that all five classes already have equivalent approved web art.

## Verification
- v1.22 and v1.23 validators remain green.
- v1.24 validator checks audited asset registry, local files, labels/non-claims and responsive CSS.
- Content tests validate provenance/status boundaries.
- Lint/typecheck/tests run when runtime is stable.
- Build/browser remain environment-classified if sandbox fsync EIO persists.
