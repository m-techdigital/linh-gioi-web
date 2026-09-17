# Public IA & Player-Language Contract v1.281

Authority: `WEB-OPT-04-PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281`.
Machine-readable owner: `packages/content/src/public-ia.ts`.

## Purpose

The public Web must read first as an MMORPG product and player-help surface, not as an engineering transparency portal. Engineering history remains available when useful, but it must not occupy primary player discovery by default.

The contract assigns every current sitemap URL to one of five owners: `product`, `guide`, `news`, `support`, or `archive`. It also records discovery priority, indexability intent and language profile.

## Route ownership

- Product: world, classes, story, gameplay loop, journey, start, download/release/status, community and product roadmap surfaces.
- Guide: the Guides hub plus all current guide routes.
- News: `/news` as the player-news hub. A detail route becomes News only when its content is explicitly classified as player news.
- Support: support/help/safety plus accessibility and performance player-help surfaces.
- Archive: historical Web-program news, fixture-only events and engineering patch notes.

## Current news decision

All 17 currently published `news` records describe Web-program implementation history. They remain reachable, but v1.281 classifies them as Archive/Devlog rather than primary player news.

Therefore `/news` has a truthful empty primary state until a future entry is explicitly classified as player news. Homepage no longer promotes the current development-history articles inside the primary `Bản tin Linh Giới` area.

No article body is deleted or rewritten by this contract. Editorial consolidation and deeper copy cleanup belong to WEB-OPT-06/07/15.

## Events and patch notes

`/events` is fixture-only today. The v1.281 decision is `archive + noindex intent` until a truthful event source exists. It remains reachable from the News archive so it is no longer an accidental orphan.

`/patch-notes` currently documents Web engineering history, so it also has `archive + noindex intent`. WEB-OPT-05 owns actual metadata/sitemap implementation of these intents; WEB-OPT-16/17 own later product decisions for these routes.

## Player-language rule

Primary discovery should prefer plain player language. Terms such as `WEB v`, `fixture`, `runtime`, `e2e`, `source-owned`, `source-ready`, `owner approval`, `monorepo`, `Turborepo` and `pnpm` belong in Archive/Devlog or internal governance, not primary discovery.

Technical trust terms such as `checksum`, `SHA256` and `artifact` may remain where a player genuinely needs them to verify a build or provenance. `backend` and `production` should normally be replaced with plain explanations such as “hệ thống máy chủ chưa được kết nối” or “môi trường vận hành chính thức”.

Truthful non-claims remain mandatory. This contract does not authorize fake release dates, live servers, account systems, support intake, downloads, events, rewards or backend capability.

## Successor ownership

WEB-OPT-05 implements canonical/indexability/sitemap intent. WEB-OPT-06 consolidates editorial renderers. WEB-OPT-07 reduces editorial reading density. WEB-OPT-14/15 reshape Guides/News discovery after those foundations. WEB-OPT-16/17 make the final Events/Patch Notes product decisions.
