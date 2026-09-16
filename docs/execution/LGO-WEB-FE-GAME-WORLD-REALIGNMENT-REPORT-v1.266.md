# WEB-FE-GAME-WORLD-REALIGNMENT-v1.266

Status: WEB_CLOSED after reviewed commit/push and verified archive delivery.

## Why this page was reopened

The full-site visual audit captured 27 concrete public routes at desktop/mobile and compared 16 routes with page-specific detailed targets. `/game` was materially wrong despite historical PASS/CLOSED evidence: it rendered a wireframe reference board, long proof/evidence disclosure and generic cards, while `game-world-detailed-design-target-v1120.png` is a cinematic world landing with a panorama hero, compact five-stop journey, five illustrated region cards and a four-pillar footer strip. Historical validator success is engineering history, not visual acceptance.

## Real UI replacement

`/game` now opts into the same immersive public shell proven on homepage. The first flow is live HTML/CSS and consists of:
- panorama hero with source-derived character/city artwork and a live H1;
- two truthful reading CTAs (`/game/loop`, `/journey`), never a fake trailer or game launch;
- five-stop exploration rail from `worldRouteStops`;
- five illustrated world-region cards;
- four compact world pillars and the truthful shared marketing footer.

The old `game-world-atlas-hub.svg`, `Board tham chiếu`, `Bằng chứng phụ`, long map-boundary proof board and expanded evidence disclosure are no longer in the `/game` first flow. They remain historical source/artifacts only.

Visible route/atlas copy is intentionally concise to match the target; original source `summary` and `mood` remain associated with each region through accessible labels and the source fixtures remain unchanged.

## Artwork provenance

Seven decorative PNG crops are under `apps/web/public/game-art/world-target/` with `provenance.json`. All come from the unchanged 1672×941 game-world target using integer `sips` crop only. No resize, inpainting, generation, full-board embedding or baked interactive controls. Early hero crops that contained target typography were reviewed and recropped before runtime use.

## Base First fix

The audit exposed a shared ownership bug: `variant="immersive"` depended on `marketing-layout.css`, so `/game` initially showed an unstyled giant wordmark/footer. Shared shell styling is now owned by `packages/ui/src/immersive-shell.css`; homepage `marketing-layout.css` imports it and keeps homepage-only composition, while new `public-entry-layout.css` imports the same shell owner. Homepage + game shared-shell regression passed 22/22 before production closure.

## Browser / production evidence

- RED: old r6 `/game` failed the new target structure tests.
- Focused final dev: 18/18 PASS across desktop/mobile.
- Homepage + game shared-shell regression: 22/22 PASS.
- Fresh production selected regression: 40/40 PASS across `/game`, homepage final-density, public-navigation and current `/game/loop` suites.
- Production build: 63 static pages.
- UI/Web/Portal/Ops typecheck: PASS.
- UI/Web lint: PASS.
- Eight unchanged sibling routes × desktop/mobile: 16/16 exact main DOM, header DOM, measured geometry and page height; no horizontal overflow.
- Final desktop `/game` height: 1295px; old audited page: 1471px. The current composition is visually denser because proof-board copy was removed, not because readability thresholds were relaxed.
- 320px copy remains >=14px and visible controls >=44px; reduced-motion and forced-colors behavior are explicitly tested.

## Historical authority correction

The proof-board validators/tests v1.83/v1.120/v1.135/v1.213 are explicitly `HISTORICAL_SUPERSEDED` by `validate_web_fe_game_world_realignment_v1266.py` and the new browser suite. They are not counted as runtime PASS and are not allowed to force the retired proof-board UI back into source.

## Non-claims

This is still informational public FE. No live world server, trailer, account position, quest state, gameplay simulation, login, production download or player-count claim is introduced. `NO_ACCEPTED_BACKEND_CONTRACT` remains.

## Next

The full-site audit shows `/story` is the next high-value visual mismatch. Continue automatically with `story-detailed-design-target-v1121.png`; do not return to the historical `/news` queue.
