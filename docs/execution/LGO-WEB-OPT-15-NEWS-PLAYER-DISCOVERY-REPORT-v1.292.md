# LGO-WEB OPT-15 News Player Discovery Report v1.292

Status: WEB_CLOSED
Source delivery: 839121ddfe8a4ae71416beb0c1f2a93602db278d
Authority: LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md

## Outcome

/news now treats the truthful player-news state as the primary experience. The current source-owned policy still contains **0 player-news records** and **17 archived Web-program records**; v1.292 does not fabricate announcements to fill the gap.

The player-facing empty state leads to Status, Guides and Roadmap before the engineering archive. The repeated technical warning was removed from the hero and retained where it belongs in the collapsed archive scope. On mobile, the three useful routes form a one-row swipe rail while generic Events/Patch Notes announcement-route layout remains unchanged.

## Runtime improvement

Exact v1.291 baseline: desktop 1,259px, mobile 1,875px. Final: desktop 1,206px (-4.21%) and mobile 1,681px (-10.35%), with zero page-level horizontal overflow.

Mobile hero height falls 462px → 378px (-18.18%). The empty-state action layout changes from three mobile rows to one horizontal rail (scrollWidth 1,029px / clientWidth 357px). Player cards remain 0; archive cards remain 17; the archive remains collapsed by default.
## Browser and regression evidence

Fresh production-static BEFORE/RED was captured from the verified v1.291 base. It proved the old hierarchy placed the archive before useful player routes, repeated the technical boundary in the hero and stacked the mobile empty-state actions vertically.

Final exact-source browser verification is **18/18 PASS**: v1.292 is 12/12 desktop/mobile and the v1.281 public-IA regression is 6/6 desktop/mobile. The v1.292 suite also verifies the generic /events reading routes remain a grid rather than inheriting the news-only rail.

A historical v1.281 route-link audit was compatibility-migrated for the already-closed v1.291 curated Guides shelf: it explicitly opens **Tất cả (16)** before counting inbound Guide links. No product behavior is changed by that migration.

## Closure verification

Exact final production build: 63/63 routes. Content tests: 20/20. Content/UI/Web typecheck, Web lint, v1.292/v1.281/v1.282/v1.251/v1.85 source guards and git diff --check PASS. Clean 2,021-file WEB CURRENT STATE candidate PASS.

The current source policy remains 0 player / 17 archive. No backend news feed, CMS, subscription, notification system, release-state fabrication, account data, production auth, DB persistence, payment/economy or production deployment is introduced.

## Next

Continue with WEB-OPT-16-EVENTS-PRODUCT-DECISION-v1.293 on /events only. Make the product/indexability decision from current source truth; do not invent a live event merely to keep the route public/indexable.
