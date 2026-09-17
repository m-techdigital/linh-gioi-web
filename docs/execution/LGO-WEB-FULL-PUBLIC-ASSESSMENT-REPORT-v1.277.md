# LGO-WEB FULL PUBLIC ASSESSMENT REPORT v1.277

Date: 2026-09-17
Baseline: `1f45821670ce6f7238e284d42ee97d46d02c066c` (`main == origin/main` at audit start)
Scope: public `apps/web` plus `packages/ui`, `packages/design-tokens`, `packages/content`; Portal/Ops only where shared foundations are consumed.

## Independent conclusion

The public Web is usable, visually coherent enough to continue development, and materially better than the earlier technical/proof-first site. It is not yet optimized or product-complete. The next round should not continue page-by-page visual polish immediately; cross-site foundation and content/IA root causes now have higher leverage.

There is no evidence of a current catastrophic public-runtime defect: all 59 sitemap URLs rendered, no horizontal overflow was measured at 1440px or 390px, image failures disappeared after normal lazy-load scrolling, and automated axe WCAG A/AA smoke reported no violations on all 59 URLs. The remaining work is primarily optimization, information architecture, maintainability and player-facing clarity.

## Audit inventory

- 59 public sitemap URLs, 28 page templates, 77 `apps/web` components and 69 `packages/ui/src` files.
- 16 client components; 30 `useState` and 13 `useEffect` references; no public fetch/localStorage/sessionStorage data layer was found.
- 251 Playwright specs, 284 Python validators, 112 explicitly ignored historical E2E specs, 297 execution docs and 76 top-level handoff directories.
- `packages/content/src/fixtures.ts`: 3,302 lines.
- `apps/web/src/app/globals.css`: 3,024 lines; `packages/ui/src/service-layout.css`: 5,067 lines; total CSS source audited: ~11,084 lines.
- Public assets: ~59 MB; ~48 MB are 23 design-reference PNG files, ~11 MB are game-art assets.
## Runtime UX / layout evidence

- Desktop page-height median ~1,449 px; P90 ~3,203 px; max ~3,313 px.
- Mobile page-height median ~2,461 px; P90 ~4,917 px; max ~5,357 px.
- No horizontal overflow was measured across all 59 routes at 1440 px or 390 px.
- Longest mobile families are Guides/News plus `/support/help` and `/game/loop`; these remain readable but feel like card walls rather than concise game-site journeys.
- Automated geometry flagged 113 sub-44px interactive elements on mobile. Checkbox inputs are not automatically defects because their labels can enlarge the hit area, but representative inspection confirmed real link/button/summary targets at 31–40 px on `/release`, `/status` and News details.
- Root cause includes `service-layout.css`, which intentionally compresses some `.lgo-link-button` controls to 30–34 px.
- Remaining older-family contact sheets show visually consistent branding, but repeated hero → board/card grid → boundary-note structure creates monotony and high reading density on mobile.

## Shared foundation / CSS findings

**P1 — CSS ownership has accumulated historical layers.** `service-layout.css` is imported globally from `apps/web/src/app/layout.tsx`, despite being a service/proof-page stylesheet and containing 5,067 lines. Modern immersive routes also load their own landing CSS. This increases baseline style cost and makes global regressions harder to reason about.

`globals.css` still contains 31 historical `WEB v1.x` sections and 36 design-board selector occurrences. A static literal-consumer heuristic found ~20% of its `.lgo-*` classes and ~28% of `service-layout.css` classes with no current TS/TSX literal consumer. This is heuristic evidence, not proof of dead code, but it is strong enough to justify a controlled ownership cleanup.

The design-token layer is only 37 lines while ~420 hard-coded hex occurrences remain across active CSS. Route-specific art direction legitimately needs some local color values, but the current ratio means palette/contrast changes are expensive and inconsistent.

Production HTML referenced 31 unique CSS chunks totaling ~420 KB decoded across the site. Many content/service pages referenced roughly 240–250 KB decoded CSS for a single route. This is consistent with over-broad shared imports rather than a broken bundler.
## Content / IA findings

**P1 — Public content still exposes too much engineering history.** News details average ~606 words and 11.5 technical/internal terms per route; Guide details average ~668 words and 8.4; core pages average ~392 words and 4. Repeated terms include `backend`, `contract`, `fixture`, `WEB v1`, `owner`, `runtime`, `production` and `e2e`.

Many News entries describe Web-program implementation history rather than player/news value. Many Guides explain Web boundaries rather than game/player tasks. These non-claims are truthful and should not be removed blindly, but the current presentation makes the public site feel like an engineering transparency portal instead of an MMORPG product site.

`/events` is the only sitemap route with zero inbound public links and is unreachable from `/` through the rendered internal link graph. Since its content is still a future-event fixture, it should either be intentionally removed from public indexing/discovery until real event content exists or given a truthful place in the information architecture.

The current sitemap has 59 URLs. 20 routes have one or fewer inbound links. Deep News/Guide routes are therefore discoverable mostly through their own index pages, not through a deliberate player journey.

**P1 — News/Guide route implementation is fragmented by historical version.** `guides/[slug]/page.tsx` is 175 lines with 16 explicit specialized slug branches plus legacy conditional class logic. `news/[slug]/page.tsx` has 11 specialized article branches. Shared `PublishedArticle` and `GuideArticle` frames already exist, so the current route code is carrying historical renderer decisions that should become a data/registry concern.

## SEO / discoverability findings

- All 28 page templates define route metadata titles, and runtime titles are unique across the 59 URLs.
- All 59 runtime URLs currently share the same root meta description.
- No canonical URL was emitted on any of the 59 audited pages.
- Static sitemap `lastModified` values are hard-coded to 2026-09-13 even though source continued changing on 2026-09-17.
- Public News/Guide content should declare whether development-history articles are indexable product content or retained provenance; the current sitemap treats them as normal public content.
## Asset / performance findings

**P1 — Review artifacts are shipped as public assets.** `apps/web/public/design-reference` contains 23 PNGs totaling ~48 MB. `PublicDesignTargetReference` has no current app consumer, yet these files remain publicly addressable and part of the deployment artifact. Design review evidence belongs outside the public static root unless a product route intentionally exposes it.

Only one source file uses `next/image`; there are 64 raw `<img>` occurrences. This is not automatically wrong for local/static art, but heavy hero assets are transferred at source size. With a fresh browser context and full-page scroll, homepage image transfer was ~1.77 MB, `/classes` ~628 KB, `/start` ~490 KB and `/game` ~218 KB.

The public static directory is ~59 MB overall. Asset optimization should focus first on shipped design references and the heaviest hero images rather than indiscriminately converting every small icon.

## Source/component/client findings

The public app is not over-clientized. Only 16 files contain `"use client"`; no public API fetch layer, persistent browser storage or hidden account state was found. Client behavior is mostly local filtering, route-awareness, fragment restoration, keyboard practice and clipboard utilities. This should be preserved.

`packages/ui/src/primitives.tsx` is 535 lines and mixes public primitives with workspace/Portal/Ops primitives. It is maintainable today but is a future split candidate after the public CSS/base cleanup; it is not an urgent rewrite by itself.

`packages/content/src/fixtures.ts` at 3,302 lines mixes many public product domains and historical Web-program content. After the IA/content contract is settled, it should be decomposed by domain while preserving the repository interface.

## Accessibility findings

Automated axe WCAG 2 A/AA/2.1 A/AA smoke reported zero violations on all 59 audited URLs. Skip-link, focus-visible behavior, semantic headings and fragment navigation are generally strong.

The main accessibility improvement is interaction geometry: shared compact layouts deliberately shrink some links/buttons below a comfortable 44px mobile target. This should be fixed at shared owner level and verified with real hit-area geometry rather than adding route-specific padding.
## Test / governance findings

The project has strong evidence discipline but accumulated substantial historical execution surface: 251 E2E specs, 284 Python validators, 112 ignored historical specs, a 637-line current-state validator with 469 validator references, 297 execution docs and 76 handoff directories.

This history is useful provenance, but active authority is becoming harder to identify than the product source itself. A successor sandbox can still continue because current-state docs exist, yet each new page closure requires understanding a large supersession graph. That is a maintainability risk and a source of harness mistakes such as stale baseURL/retired-suite confusion.

The next optimization program should introduce an explicit active-suite manifest and move historical evidence out of the normal execution path without deleting provenance. This task must not become a docs-only detour ahead of user-visible foundation work.

## Roadmap finding

A long-term WEB-00→WEB-10 roadmap exists, and the sequential visual-remediation queue exists, but they currently describe different layers of the project and are interleaved with hundreds of historical version checkpoints. For a developer or successor sandbox, the future direction is therefore technically present but not operationally simple.

The roadmap should be presented as five current lanes:
1. Public foundation optimization — shared CSS, interaction geometry, assets and metadata.
2. Public content/IA reset — player-facing language, route taxonomy, News/Guides consolidation.
3. Remaining page UX — Support, Community, utility/knowledge pages, one route at a time after shared fixes.
4. Maintenance simplification — tests/validators/content fixture decomposition and automated budgets.
5. Backend-dependent future — WEB-08 contract sync, real Portal/Ops integration and deployment only after canonical game-backend contracts exist.

## Evidence files

Audit evidence is stored outside tracked product source under `handoff/full-public-audit-20260917/evidence/`, including runtime IA/content JSON, payload/transfer metrics, desktop/mobile layout metrics, 59-route axe results and visual contact sheets for the remaining page families.