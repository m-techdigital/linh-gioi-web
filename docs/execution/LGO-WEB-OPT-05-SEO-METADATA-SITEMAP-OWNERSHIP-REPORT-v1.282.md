# LGO-WEB OPT-05 SEO Metadata & Sitemap Ownership Report v1.282

Status: WEB_CLOSED
Source delivery: `d8f2a2b5af106ab51960835117c48fd4745ffda3`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md` + `PUBLIC-IA-PLAYER-LANGUAGE-CONTRACT-v1.281.md`

## Outcome

Public metadata now has one shared source owner in `packages/content/src/public-metadata.ts` and one Next.js adapter in `apps/web/src/lib/public-metadata.ts`. Static pages, News/Guide dynamic routes, sitemap and robots consume the same v1.281 route/indexability authority instead of maintaining independent route lists.

All 59 public routes now emit canonical metadata. The 40 player-facing/indexable routes emit route-specific descriptions and Open Graph URL/description metadata. The 19 Archive/noindex routes (`/events`, `/patch-notes`, and 17 Web-program News detail routes) remain directly reachable but explicitly emit `noindex`.

## Sitemap and freshness ownership

Sitemap membership changed from all 59 public routes to the 40 routes whose v1.281 policy is `index`. The stale global `new Date("2026-09-13")` value and independent `staticRoutes` list were removed. Where a route has an owned content publication date, `publicLastModifiedForRoute()` derives it from that content source; routes without truthful owned freshness omit `lastModified` rather than inventing a date.

`robots.txt` now publishes the explicit `https://linhgioi.vn` host and absolute sitemap URL. Archive/noindex semantics live on each route's metadata, while robots continues to allow crawling so canonical/archive pages remain inspectable without being indexed as primary product pages.

## Base ownership and compatibility

25 static page modules use `metadataForRoute("/route")`; News and Guide dynamic metadata use the same owner with source-backed title/summary/date. Root layout owns `metadataBase` and the site title template only.

Historical source validators that previously required metadata strings inside `layout.tsx`, `sitemap.ts` or route files were migrated to the new owner while preserving their original product/safety assertions. Predecessor whole-public-route browser audits now use `publicRouteMatrix` rather than sitemap as the 59-route inventory, because v1.282 intentionally makes sitemap an indexability surface instead of a route registry.

## Verification

TDD RED: metadata unit owner missing; zero canonical URLs; archive pages lacked noindex; sitemap returned 59 instead of 40; robots lacked Host/absolute Sitemap. GREEN: focused v1.282 browser 8/8 PASS across desktop/mobile.

Predecessor regression: v1.281 + v1.280 + v1.278 `14/14` desktop/mobile PASS and v1.279 `2/2` mobile PASS after lifecycle-safe route-inventory updates. Content tests `20/20` PASS. Content/UI/Web typecheck, Web lint, exact production build `63` pages, v1.282→v1.278 source guards, historical ownership guards and clean `WEB CURRENT STATE` PASS.

No page layout, player-visible product copy, backend capability, release date, CMS, account behavior or production deployment was added. Next task is WEB-OPT-06 v1.283, which owns editorial renderer consolidation rather than metadata.
