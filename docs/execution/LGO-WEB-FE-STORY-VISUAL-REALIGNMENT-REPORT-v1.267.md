# WEB-FE-STORY-VISUAL-REALIGNMENT-v1.267

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate below passes.

## Why `/story` was reopened

The full-site visual audit showed that historical `/story` PASS/CLOSED evidence did not match the page-specific target `story-detailed-design-target-v1121.png`. The old route still used the generic player hero, three proof-oriented chapter cards and an expandable evidence section. The target is a compact cinematic narrative landing with a dominant fracture hero and four illustrated chapter/event cards.

## Real UI replacement

`/story` now opts into the immersive public shell and composes `PublicStoryLanding` instead of the historical proof-board flow. The first flow is live HTML/CSS with:
- source-derived hero character + Đông Môn fracture artwork;
- a live three-line desktop H1 and truthful reading CTAs (`#chapters`, `/journey`);
- three canonical `narrativeChapters` cards plus one explicitly narrative `BIẾN CỐ CỐT TRUYỆN` card;
- four-column desktop card rhythm and one-column mobile flow;
- shared truthful marketing footer and existing public navigation.

No design-reference board is embedded as runtime UI and no fake trailer, download or live-event action was introduced.

## Visual-review RED → GREEN

Browser review caught two issues that the first functional suite did not fully protect. First, legacy `.lgo-story-chapters` grid ownership compressed the new card grid to a narrow central strip; a new width test reproduced this RED and the route owner now forces the new section composition with `display:block`. Second, the desktop H1 wrapped to four lines and the character had no explicit foreground stacking; new RED tests locked target title measure/layering, then `max-width:12ch` plus character/gate z-order made them GREEN.

Mobile readability also produced a real RED at 320px because the kicker inherited 12px text. The route owner raises it to 14px on mobile; tests were not relaxed.

## Artwork provenance

Six decorative PNG crops are under `apps/web/public/game-art/story-target/` with `provenance.json`. The manifest locks source SHA256, integer crop rectangles and output SHA256 for hero character, hero gate, three chapter images and invasion art. Runtime never embeds the whole design board as a fake interface.

## Historical authority correction

The layout-era story validators/tests v1.64, v1.84, v1.121, v1.136 and v1.214 are explicitly `HISTORICAL_SUPERSEDED` by `validate_web_fe_story_visual_realignment_v1267.py` and `fe-story-visual-realignment-v1267.spec.ts`. They remain historical engineering evidence and cannot force the retired disclosure/proof-board composition back into source.

## Fresh verification

- Focused `/story`: 20/20 PASS, desktop + mobile.
- Selected dev regression: 60/60 PASS across `/story`, `/game`, homepage final density, public navigation and `/game/loop`.
- Fresh production selected regression on port 3236: 60/60 PASS across the same set.
- Production build: 63 static pages; `/story` prerendered successfully.
- `validate_web_fe_story_visual_realignment_v1267.py`: PASS, including target source hash and all six crop hashes.
- UI/Web typecheck: PASS. UI/Web lint: PASS. `git diff --check`: PASS before source delivery.
- Final reviewed screenshots: desktop 1600×900 and mobile 390×844; no horizontal page overflow.

## Source delivery

Implementation commit `f631e2aa129b367977ff301e725fd4cb29b2f541` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared. Final governance HEAD and archive hashes are recorded by the delivery package after this file is committed.

## Non-claims and next

This remains public informational FE. No production auth, DB persistence, live event scheduler, playable world, trailer backend, download entitlement, CMS or independent backend is claimed. `NO_ACCEPTED_BACKEND_CONTRACT` remains.

Next single page after final delivery verification: `/classes` — WEB-FE-CLASSES-VISUAL-REALIGNMENT-v1.268. Do not resume the historical `/news` queue.
