# LGO-WEB OPT-13 Game Loop Density Report v1.290

Status: WEB_CLOSED
Source delivery: `4830f7b7c90b9623937f9fa8805afd1180ab4b29`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/game/loop` keeps the established informational world-loop journey while reducing the mobile wall of four reading-stage cards. The four stages now form a world-loop-only horizontal rail on mobile; generic `ReadingJourney` stacking remains unchanged outside this route.

The hero no longer repeats the gameplay/non-live technical boundary. That truth is consolidated into the existing scope panel, which still states “Đang đọc, không phải đang chơi”, no combat simulation, no persisted quests/rewards/account access and `NO_ACCEPTED_BACKEND_CONTRACT`.

## Runtime improvement

Exact v1.289 baseline mobile height was `4,880px`; final is `4,282px` (-12.25%, -598px), exceeding the backlog target to remove roughly 390px of vertical cost. Hero height falls `841px → 730px` and the reading section `1,343px → 835px`.
The mobile stage rail changes from a four-row grid to one horizontal row (`scrollWidth 1,375px / clientWidth 396px`) with zero page-level overflow. Desktop remains intentionally stable at `2,326px → 2,331px` (+5px); its four-stage grid remains one row.

Boundary ownership is reduced without hiding truth: hero technical boundary count `1 → 0`; the reading boundary remains `1`; the consolidated scope panel remains visible; all four route proof disclosures and the final source-scope disclosure remain present.

## Browser and regression evidence

Fresh production-static BEFORE/RED against clean `e50d33b` produced 5/8 PASS with the three intended failures: hero boundary present on desktop/mobile and the mobile loop still a four-row grid. BEFORE screenshots and exact desktop/mobile metrics are retained under `handoff/web-opt-v1.290/evidence/before`.

Final exact-WIP production-static v1.290 suite is 10/10 desktop/mobile. Combined v1.290 + v1.289 onboarding regression is 18/18, proving the new rail is scoped to `.lgo-world-loop-experience` and does not reopen the onboarding/shared ReadingJourney regression.

The numeric browser guard now requires mobile height `<= 4,490px`, so the ~390px reduction remains enforced. Axe A/AA/2.1AA on the route main region is clean and page-level horizontal overflow remains zero.
## Closure verification

A clean temporary production build generated 63/63 routes. Content tests are 20/20; Content/UI/Web typecheck, Web lint, v1.290/v1.289/v1.232 source guards and `git diff --check` PASS. A clean 2,015-file candidate `WEB CURRENT STATE` replay PASSed.

Four full-page BEFORE/AFTER screenshot artifacts are retained for desktop/mobile. Runtime geometry and accessibility evidence were reviewed directly; the remote screenshot binaries are preserved for owner visual inspection rather than claiming an unavailable local image-render review.

## Non-claims / next

No playable session, combat simulation, persisted quest/progress/reward, inventory, account access, game backend, production auth, DB persistence, CMS, payment/economy or production deployment is claimed.

Next: `WEB-OPT-14-GUIDES-DISCOVERY-v1.291` on `/guides` only.
