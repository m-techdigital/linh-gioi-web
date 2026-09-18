# LGO-WEB OPT-20 Player Roadmap Report v1.297

Status: WEB_CLOSED
Source delivery: `ef4755ba4346ce3107172baa87a9f579d6727f6b`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/roadmap` now leads with a player-readable product journey instead of Web-engineering milestones. The public sequence is hero → four player stages → one truthful release boundary → four evidence gates.

The former 15-entry engineering implementation archive is no longer rendered in the public journey. **15 engineering records remain source-owned** in `@lgo-web/content` for governance/history, including the historical v1.6 and WEB-08 records; source provenance was not deleted or rewritten.

The public H1 is now **Lộ trình Linh Giới Online**. Gate and stage labels use player-facing language while their source-owned status, release impact, decision owner and non-claims remain intact.

## Browser evidence

Exact v1.296 baseline: desktop `1,789px`, mobile `3,907px`, page overflow `0`, four product stages, four gates and 15 rendered engineering archive records.

Final exact-WIP: desktop `1,771px`, mobile `3,959px`, page overflow `0`, four product stages, four gates and zero rendered engineering archive records. Mobile height is intentionally not claimed as an improvement; this task changes hierarchy and public ownership rather than hiding product/truth content.

Fresh BEFORE/RED on the exact v1.296 production artifact produced **4/8 PASS** with the expected failures: the old H1 remained and the public engineering archive was still rendered.

Final exact-WIP browser verification is **20/20 PASS** across desktop/mobile: v1.297 focused coverage plus the migrated full v1.231 roadmap regression. The matrix verifies stage-before-gate order, source-owned engineering history, native gate details, 44px interaction geometry, no fake progress/date state, zero page overflow and axe A/AA/2.1AA cleanliness.

Desktop/mobile BEFORE and AFTER screenshots were visually reviewed. AFTER presents the four player stages immediately below the hero, keeps the release boundary before technical gates, and removes engineering history from the primary public reading flow without truncating the player roadmap.

## Closure verification

Clean temporary production build: **63/63 routes**. Content tests: **20/20**. Content/UI/Web typecheck and Web lint PASS. v1.297, v1.231, v1.88, v1.296, v1.281 and v1.282 source guards PASS.

A clean **2,037-file** current-state candidate passes `WEB CURRENT STATE VALIDATION`. The historical v1.88 guard was migrated narrowly from the superseded roadmap heading/presentation marker to the new heading/truth boundary without weakening its heading-priority purpose. The v1.296 governance guard now preserves its historical closure while enforcing the v1.297 next-action only when v1.296 is still the active head.

## Truth boundaries / non-claims

No release date, countdown, completion percentage or live-game state was invented. `NO_ACCEPTED_BACKEND_CONTRACT` remains explicit. Build availability still requires a real artifact/SHA/approval; account/server stages remain blocked by an accepted backend contract.

## Next authority

Phase B product-facing route optimization is complete through WEB-OPT-20. The next backlog authority is `WEB-OPT-21-ACTIVE-TEST-VALIDATOR-AUTHORITY-CONSOLIDATION-v1.298`, but this report does not start that task.
