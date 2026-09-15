# WEB-FE-GUIDES-DISCOVERY-REAL-UI-LAYOUT-v1.234

Status: WEB_CLOSED — local discovery of published guide content only.
Baseline: `fa383218ca2c36df16924170eecc2cecf2bddf0a`.
Delivery: reviewed source/test/docs commit, normal origin/main push, verified remote HEAD and full/delta/evidence ZIP/SHA256. Actual commit/archive results live in the external delivery manifest. No deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Verified the previous handoff and its checksums, then followed WEB-NEXT-ACTION to `/guides`. Baseline captures measured 2371px desktop and 2945px mobile, with no search/filter controls, two compact shelves and line-clamped descriptions. Read the registered Public Core atlas and the 16 published guide entries before modifying the route.

The page now has an illustrated lead-article cover, an editorial hero, four reading groups, an accessible local phrase field, result counts, summary disclosures, complete source-backed article links, an empty state and a reset action. Desktop shows three catalog columns; tablet two; mobile full-width compact rows with separate summary/read actions. Native disclosures reveal the complete original description rather than clipped text. The lead article also has a working summary and real destination. The initial implementation exposed all descriptions; visual review rejected its 7277px mobile length. Native summaries and compact mobile rows reduced this to 5083px at 390px while preserving all 16 article titles and all content on demand.

## Content and Base First

`localContentRepository.list("guides")` supplies only published guides. Every entry title and summary now comes directly from that record rather than the prior per-slug display aliases. No source fixture was rewritten, reconciled with old game documents or supplemented with invented gameplay. Four route-owned editorial shelves group stable slugs: 3 beginner, 5 release/test, 4 community/support and 4 web-reading entries. These labels are navigation metadata, not a new canonical category contract or personal recommendation. An unmapped future published slug remains visible under Other.

ReadingCatalog and FeaturedReading are in packages/ui, reusing FilterChoices, FormField, TextInput, SpiritButton, LinkButton, ExperienceHero and ReleaseIcon. Styles are in reading-catalog.css. Only the 281-line obsolete guide-index block was removed from service-layout.css; the rest of that file matches baseline byte-for-byte. globals.css, tokens, all content, assets, backend contracts, the dynamic guide renderer, Portal and Ops are unchanged. No font/art file or package dependency was added.

Used the existing Public Core atlas as a guide to editorial hierarchy, framed art, palette and discovery organization; retained the accepted shared shell. Registered a Vietnamese exact-route label to that same family. Existing world concept art is labelled as illustration, not evidence of a live game. No pixel-identical recreation of every reference panel is claimed.

## Behaviors and issues fixed

The first seven RED tests failed against the old route. The first implementation passed 12 tests and failed two: splitting a phrase into substring tokens made `ĐÁ LUYỆN` also match an entry containing `đâu` and `luyện` separately. Replaced that with contiguous normalized-phrase matching: Unicode combining marks, case and repeated whitespace are normalized, including Vietnamese đ. The original source strings stay unchanged. Category and phrase intersect; result counts reflect actual entries, with no server call.

Native summary RED/GREEN proves description expansion/collapse through Enter/Space. A separate mobile density RED measured a 228.98px first card; shared row styling now meets the <=190px first-card gate with both action targets >=44px. No text-size threshold or layout test was relaxed to obtain PASS. Two initial source-guard marker mismatches were corrected to the actual equality direction and existing non-claim terminology; these were guard mistakes, not application bugs.

Reset clears both filters and moves focus to the stable search input before its button becomes disabled. Reload discards the filter. No local/session storage, request, URL query/history mutation, form submit or account lookup is used. The phrase is limited to 120 input characters; this does not search the full website or guide body. React renders source text as text, not HTML. Summary open state is native reading UI, not saved progress.

## Verification

Final targeted suite: 18/18 PASS. Fresh production regression: 210/210 PASS, no failure or skip in the selected set. Includes the published-guide HTTP/category/fragment checks and all previously closed public-route slices in the running regression. Production build PASS, 63 static pages. UI/Web typecheck and lint pass; final all-app and clean-source checks recorded separately.

| Viewport | Document height | Hero bottom | Library top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3076 | 604.98 | 636.98 | 0 | 0 |
| 1280 × 800 | 3033 | 604.98 | 636.98 | 0 | 0 |
| 768 × 1024 | 3890 | 986.86 | 1010.86 | 0 | 0 |
| 390 × 844 | 5083 | 1006.92 | 1030.92 | 0 | 0 |
| 360 × 800 | 5314 | 1006.92 | 1030.92 | 0 | 0 |

All five production viewport records have no JavaScript page errors. Additional 320px reflow/control-size tests pass. Four production state captures cover filtered/expanded and empty results on desktop/mobile, with correct 3/0 article counts and no axe findings in main. Tests cover all 16 exact source titles/summaries/links, diacritics/uppercase/whitespace, intersection, actual navigation, stable reset focus, no submission and native disclosures. Automated main-content axe and Chromium viewport emulation are not full WCAG or assistive-technology certification.

## Guard migration / review

Only the exact v1.156 compact two-shelf layout validator/E2E are HISTORICAL_SUPERSEDED, not PASS. The new guard requires published content, source parity, shared ownership, canonical tokens and no persistence/intake. The multi-route v1.25 base-hero guard now follows the actual extracted directory/ExperienceHero owner for `/guides` only; other routes retain their checks. Review was inline source/browser review, not an independent-agent review.

## Boundaries and next

No new guide content, quest database, game state, live wiki, account personalization, search backend or readiness claim. Filters require JavaScript; the shared application JavaScript-disabled streaming limitation remains open. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.235, `/guides/beginner`; source-backed beginner orientation, real readable layout and navigation, no gameplay simulation.
