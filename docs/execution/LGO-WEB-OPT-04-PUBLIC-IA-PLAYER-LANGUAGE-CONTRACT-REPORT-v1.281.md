# LGO-WEB OPT-04 Public IA & Player-Language Contract Report v1.281

Status: WEB_CLOSED
Source delivery: `a5659a33e0e74710efe334a96057dad7f64489c2`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

The public Web now has a machine-readable 59-route information-architecture contract in `packages/content/src/public-ia.ts`. Every current public URL is assigned to Product, Guide, News, Support or Archive ownership with explicit discovery, indexability intent and language profile.

All 17 currently published News records are Web-program development history, so v1.281 classifies them as Archive/Devlog instead of primary player news. Their routes and source bodies remain intact.

Homepage primary news no longer promotes Control Tower/UX/visual implementation history. `/news` now has a truthful player-news empty state plus a closed 17-item development archive.

## IA and language decisions

`/events` is deliberately Archive/Devlog with `noindex` intent until a truthful event source exists. It is now linked from the News archive, eliminating the only orphan route measured by the v1.277 audit. `/patch-notes` is also Archive/Devlog until its later product-boundary task.

Primary discovery keeps plain player language. Engineering markers such as `WEB v`, fixture, runtime, e2e, source-owned/source-ready, owner approval, monorepo/Turborepo/pnpm are Archive/internal vocabulary. Trust terms such as checksum, SHA256 and artifact remain allowed when players genuinely need them.

Implementation of canonical/noindex/sitemap intent is deliberately deferred to WEB-OPT-05; v1.281 defines the source contract and discovery behavior only.

## Measured result

Inbound graph: `/events` `0 → 1`; route orphans `["/events"] → []` across all 59 sitemap URLs.

Desktop `/news` default flow: `3232px → 1266px`; primary visible `backend/production` hits `1/1 → 0/0`; primary visible News cards `17 → 0`, with all 17 retained inside the closed Archive disclosure.

Homepage desktop height remains `1182px`; its three historical Web devlog cards are replaced by one truthful `Chưa có bản tin game mới` panel with routes to News archive and Status.

Desktop/mobile BEFORE→AFTER contact sheets confirm the existing Home world/discovery composition is preserved while News becomes substantially shorter and more player-oriented.

## Verification

TDD RED: missing IA module; News lacked player-news state; Homepage promoted development history; `/events` was the only orphan. GREEN: Content tests 18/18, focused v1.281 browser 6/6 desktop/mobile, v1.280 4/4, v1.279 2/2, v1.278 4/4.

Content/UI/Web typecheck PASS, Web lint PASS, exact production build 63 pages, v1.281/v1.280/v1.279/v1.278 plus Homepage/v1.85 source guards PASS, and clean `WEB CURRENT STATE` PASS with News Discovery v1.253 explicitly marked historical/superseded.

Evidence is retained under `handoff/web-opt-v1.281/evidence/`. No backend, release-date, live event, CMS, account, download or production-deployment capability was added.
