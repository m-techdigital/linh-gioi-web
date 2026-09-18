# LGO-WEB OPT-12 Community Onboarding Report v1.289

Status: WEB_CLOSED
Source delivery: `c6de3524c672e3302a23e212d5ba542804907dff`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

`/community/onboarding` now leads a newcomer through three product-facing reading steps: Start → Game → Community. The hero no longer repeats the technical registration/live-system boundary; the remaining source-backed scope section still states no waitlist, no registration/account enrollment and `NO_ACCEPTED_BACKEND_CONTRACT`.

On mobile, the three reading choices and four audience choices are onboarding-only horizontal rails. The shared `ReadingJourney` base was deliberately restored for other consumers after a regression run caught an accidental scope leak into `/game/loop`.

## Runtime improvement

Exact v1.288 baseline mobile height was `3,289px`; final is `2,668px` (-18.88%). Hero height falls `805px → 694px`, the reading section `1,103px → 773px`, and audience choices `372px → 192px`. Page-level horizontal overflow remains zero and the duplicated hero technical boundary count is `1 → 0`.

Desktop remains intentionally stable at `1,836px → 1,769px` (-3.65%) with the established grid composition intact. No form, account field, waitlist, ticket intake, gameplay runtime or persistent reading state was introduced.

## Browser and regression evidence

TDD BEFORE capture is `2/2` and RED reproduced the old `/status → /roadmap → /community` reading path plus the vertical mobile wall (5/8 PASS, three expected failures). Final exact-source v1.289 focused browser is `6/6` desktop/mobile; the migrated v1.228 onboarding contract is `12/12`; the shared v1.232 `/game/loop` regression is `12/12`; exact AFTER capture is `2/2`.

A clean temporary production build generated `63/63` routes and its seven changed product/test/validator files are byte-identical to source commit `c6de3524c672e3302a23e212d5ba542804907dff`. Focused browser verification against that static production artifact is `6/6` desktop/mobile.

The v1.228 browser guard was updated only where later authority had superseded implementation details: WEB-OPT-03 v1.280 removed public design-reference links, and v1.289 intentionally replaces the onboarding mobile one-column grid with an onboarding-scoped swipe rail. Source-side design provenance remains guarded.

## Closure verification

Content tests `20/20`, Content/UI/Web typecheck, Web lint, v1.289 through v1.285 validators, v1.228 onboarding and v1.232 game-loop source guards, and `git diff --check` all PASS. A clean 2,012-file candidate `WEB CURRENT STATE` replay PASSed.

Evidence summaries: `metrics-comparison.json` SHA256 `65811c0b55a08921813db418f54188113a1d8c1ad7d957465766cbef3e431391`; `verification-summary.json` SHA256 `a4de114520c28c28f527b3b0ffb759f08ef4c98f6951e2c2f30dc19b69b52f96`.

## Non-claims / next

No registration, waitlist, account enrollment, live chat/forum/guild, community backend, gameplay runtime, production auth, DB persistence, CMS, payment/economy or production deployment is claimed. Next: `WEB-OPT-13-GAME-LOOP-DENSITY-v1.290` on `/game/loop` only.
