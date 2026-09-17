# WEB-FE-JOURNEY-VISUAL-REALIGNMENT-v1.269

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate below passes.

## Why `/journey` was reopened

The full-site browser audit showed that historical `/journey` PASS/CLOSED evidence did not match `journey-detailed-design-target-v1123.png`. The old route still rendered a generic player hero, six text-heavy proof cards, a text route flow and the technical journey reference board inside the public page. The target instead presents one cinematic experience: Linh Thành hero, a readable four-phase 20-minute cycle, an illustrated session strip and a visual world route.

## Real UI replacement

`/journey` now opts into the shared immersive public shell and composes `PublicJourneyLanding`. The first flow is live HTML/CSS with:
- the cinematic Linh Thành hero and truthful reading CTAs;
- four informational phases: Hội ngộ, Phiêu lưu, Chiến lợi, Mạnh hơn;
- all six canonical `sampleSessionBeats` in source order, each as an illustrated moment card;
- all five canonical `worldRouteStops` in source order as the world-route rail;
- six-column desktop beat rhythm, five-stop desktop route rhythm and one-column mobile reading flow;
- no form, account mutation, live session state, gameplay launch or embedded technical design board.

## Visual RED → GREEN and artwork provenance

The focused browser suite first failed 12/12 against the historical production layout because the immersive owner, four-phase cycle, illustrated beat cards, visual route rail and 320px owner behavior did not exist. A first hero crop was rejected because target headline/control fragments were baked into it; the final crop contains scene art only.
`apps/web/public/game-art/journey-target/provenance.json` locks the detailed target SHA256 and final hero output SHA256. The six session cards and five route stops reuse the already audited `world-target` imagery; text, timing, names and summaries remain canonical live source data. The whole design board and historical `journey-session-route-flow.svg` are never embedded as runtime UI.

Browser review caught two real presentation defects after the first GREEN: the desktop title was too narrow, and the live cycle inherited historical `.lgo-journey-cycle span:nth-child(...)` rules from `globals.css`, causing phase overlap. The new owner was given the isolated `lgo-journey-live-cycle` namespace instead of increasing specificity or deleting unrelated legacy CSS.

Historical journey board/target/layout suites v1.80, v1.123, v1.138 and v1.216 are explicitly superseded by the v1.269 owner/test. Canonical content, public navigation, v1.22 game-experience and v1.25 depth contracts remain active.

## Fresh verification

- Focused `/journey`: 12/12 PASS, desktop + mobile.
- Selected dev regression: 86/86 PASS across `/journey`, `/classes`, `/story`, `/game`, homepage final density, public navigation and `/game/loop`.
- Fresh production selected regression on port 3236: 86/86 PASS across the same set.
- Production build: 63 static pages; `/journey` prerendered successfully.
- `validate_web_fe_journey_visual_realignment_v1269.py`: PASS, including target/hero/reused-world-art hashes.
- v1.22 game-experience and v1.25 class-world-story-depth validators: PASS after journey owner compatibility updates.
- UI/Web typecheck and lint: PASS; `git diff --check`: PASS before source delivery.
- Clean `git archive` of the source commit: `WEB CURRENT STATE VALIDATION PASS`.

Production metrics: desktop project has 1280/1280px viewport/scroll width, 430px hero, 1216px beat and route grids, 4 phase nodes, 6 beat cards and 5 route stops. Mobile has 412/412px viewport/scroll width, 620px hero and 388px beat/route widths. All 12 runtime image elements completed with nonzero natural dimensions. BEFORE, MID and production AFTER desktop/mobile screenshots were reviewed in browser.

## Source delivery

Implementation commit `1b3e9c98fcd43981867f764b89272783a262c013` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared. A clean `git archive` of that source commit passed `WEB CURRENT STATE VALIDATION PASS` before push.

## Non-claims and next

This remains public informational FE. The 20-minute cycle is an explanatory visual, not real session telemetry or saved progression. Session cards do not start activities, grant loot, save inventory, create accounts, join guilds or mutate backend state. No production auth, DB persistence, CMS, playable backend, download entitlement or independent backend is claimed. `NO_ACCEPTED_BACKEND_CONTRACT` remains.

Next single page after final delivery verification: `/start` — WEB-FE-START-VISUAL-REALIGNMENT-v1.270. Do not resume the historical `/news` queue.
