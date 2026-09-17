# WEB-FE-CLASSES-VISUAL-REALIGNMENT-v1.268

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate below passes.

## Why `/classes` was reopened

The full-site visual audit showed that historical `/classes` PASS/CLOSED evidence did not match `classes-detailed-design-target-v1122.png`. The old route still used a generic player hero, text/emblem class cards and an expandable proof section, while the target is a cinematic Năm Lộ landing with a large world hero, class wheel, five illustrated identity cards and a strong selected-Lộ detail strip.

## Real UI replacement

`/classes` now opts into the shared immersive public shell and composes `PublicClassesLanding`. The first flow is live HTML/CSS with:
- a cinematic Linh Thành hero and live Năm Lộ wheel;
- five illustrated choices in canonical `classPaths` order: Võ, Kiếm, Pháp, Cơ, Linh;
- role/fantasy copy from canonical source data rather than baked target text;
- keyboard-focusable local buttons using `aria-pressed`;
- one read-only selected-path feature using `battleRhythm`, `signatureVerbs` and `worldLens`;
- five-column desktop rhythm and one-column mobile flow.
## Visual RED → GREEN and artwork provenance

The new browser suite first failed against the historical production layout: immersive owner, illustrated class choices, selected-path behavior, target-width grid and 320px focus controls did not exist. The first crop pass was also rejected because target labels were baked into the images. Final runtime portraits are clean decorative character crops only; names, roles, copy and controls remain live HTML.

`apps/web/public/game-art/classes-target/provenance.json` locks the 1672×941 target source SHA256, integer crop rectangles, portrait resize dimensions and output SHA256 for five class portraits plus the Võ feature crop. The hero reuses the already provenance-locked `/game-art/world-target/hero-city.png`; the whole design board is never embedded as UI.

Browser review then caught mobile-density/crop issues; those were corrected before the final focused run. Historical class-art/loading/target/layout suites v1.54, v1.55, v1.122, v1.137 and v1.215 are explicitly superseded by the v1.268 owner/test while canonical `classPaths`, approved-art manifest checks and public navigation contracts remain active.

## Fresh verification

- Focused `/classes`: 14/14 PASS, desktop + mobile.
- Selected dev regression: 74/74 PASS across `/classes`, `/story`, `/game`, homepage final density, public navigation and `/game/loop`.
- Fresh production selected regression on port 3236: 74/74 PASS across the same set.
- Production build: 63 static pages; `/classes` prerendered successfully.
- `validate_web_fe_classes_visual_realignment_v1268.py`: PASS, including target/source and six crop hashes.
- v1.22 game-experience, v1.24 approved-art, v1.25 class-world-story and v1.44 public-navigation validators: PASS.
- UI/Web typecheck and lint: PASS; `git diff --check`: PASS before source delivery.
Production metrics: desktop 1600×900 has no horizontal overflow, 420px hero, 1536px choice grid and ~298px cards; mobile Pixel 7 has no horizontal overflow, 560px hero, 388px one-column grid/cards and selected feature at 2161px. All seven runtime images completed with nonzero natural dimensions. BEFORE, MID and production AFTER desktop/mobile screenshots were reviewed in-browser.

## Source delivery

Implementation commit `00385ed64fe38140953580b5d3fce915a476323d` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared. A clean `git archive` of that source commit passed `WEB CURRENT STATE VALIDATION PASS` before push.

## Non-claims and next

This remains public informational FE. The five choice buttons only alter local presentation; they do not create a character, save a class, launch gameplay, register an account or mutate backend state. No production auth, DB persistence, CMS, playable backend, download entitlement or independent backend is claimed. `NO_ACCEPTED_BACKEND_CONTRACT` remains.

Next single page after final delivery verification: `/journey` — WEB-FE-JOURNEY-VISUAL-REALIGNMENT-v1.269. Do not resume the historical `/news` queue.