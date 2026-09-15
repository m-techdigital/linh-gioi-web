# WEB-FE-WORLD-LOOP-GUIDE-ARTICLE-v1.233

Status: WEB_CLOSED — source-backed reading article, not an online game or task tracker.
Baseline: `8ecc61dd879e4059c9f23fe3655b7454f72677a3`.
Delivery: reviewed source/test/docs commit, normal origin/main push, exact remote HEAD verification and full/delta/evidence ZIP/SHA256. No deployment. External delivery manifest records the actual commit and archive results.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Started only after the v1.232 world-loop checkpoint was committed, pushed and packaged with clean-archive validation and byte-for-byte delta replay. Read the current governance, exact guide route, content repository, guide sections and shared UI owners. Captured the baseline article: desktop 2718px and mobile 4115px, with a compact multi-column step board followed by a long stack of generic CTAs.

The current `/guides/world-gameplay-loop-guide` is now an illustrated editorial header, a responsive contents rail, four full parchment article sections and a compact related-reading panel. Desktop contents stays visible during scrolling; mobile puts the collapsible contents before the article. Each chapter includes the authored instruction, expected understanding and current boundary, followed by previous/contents/next links. Targeted chapters receive a visible outline and keyboard focus. All content stays in the DOM rather than a carousel hiding the other chapters.

Original entry title, summary and body are consumed directly. All four guideDetailSteps retain their source order, step numbers, titles, actions, expectedResult and blockedScope. No historical game upload or general knowledge was used to rewrite the article's source claims. No new gameplay content, feature readiness or release date was inferred.

## Design and Base First

Inspected the registered Public Core atlas, particularly its editorial/journey grouping, navy/gold/jade palette, framed artwork and section hierarchy. The exact route now has a Vietnamese comparison label pointing to the same atlas. Header, navigation and footer stay accepted. Existing world artwork is explicitly illustration, not a running game screenshot. No new art or font was added; this is not a pixel-identical recreation of every atlas panel.

GuideArticle and its styles belong to packages/ui. The app provides source-backed chapter content and uses ExperienceHero, SectionHeading, LinkButton and ReleaseIcon. Removed 46 lines of exclusive old world-guide CSS from service-layout.css; every other byte of that legacy stylesheet was compared against baseline and preserved. globals.css, content fixtures, design tokens, all assets, contracts, Portal and Ops code are unchanged.

The generic guide route special-cases only this existing slug after its original published-content/category guard. The fallback renderer for other guides is unchanged. Fresh production comparisons of three sibling guides on desktop/mobile show exact main DOM and heading/step geometry matches: gate-entry-guide, beginner-training-loop-guide and player-safety-support-guide.

## Functional defects found and fixed

1. The first post-change suite exposed unknown guide URLs returning HTTP 200 with an embedded not-found marker. The guide route already generates only published local content, but an unknown slug could enter the async streamed fallback. Set dynamicParams=false for this published guide family. Production tests assert every published guide returns 200, while an unknown slug and a published news slug used as a guide return 404. This is a route-boundary correction, not a claim that the entire app's streaming/no-JavaScript limitation is fixed.

2. Visual review found chapter navigation labels too small at 320px. An added RED assertion measured 10.08px. Raised chapter navigation labels to at least 12px and kept link targets at least 44px without cutting text or causing horizontal overflow.

3. A separate fresh-page diagnostic found that a cold URL ending in a chapter fragment did not scroll/focus after streamed article content mounted. The original warm-navigation test passed because it had already loaded the article in beforeEach; it did not prove cold deep linking. Retained that inadequate probe separately, strengthened the test with about:blank before document navigation, and observed a genuine cold-fragment RED failure. Added a small mount-only ArticleFragmentRestoration client helper. It safely decodes and whitelists chapter/contents IDs, then scrolls and focuses only the explicitly requested target. It adds no polling, hash listener, persistent state, request, keyboard interception or focus trap. Ordinary article links and Back/Forward remain native browser navigation.

The article is server-rendered, but the mount-only restoration helper requires JavaScript. It is incorrect to claim no client JavaScript was added. The previously recorded whole-application JavaScript-disabled streaming limitation remains open.

## Runtime verification

Initial valid RED: six tests failed against the old page. First GREEN attempt: 10 passed, 2 failed at the unknown-guide HTTP assertion. Corrected source boundary passed 12/12. Navigation-size RED/GREEN and cold-fragment RED/GREEN are retained with traces. Final article suite: 16/16 PASS. Final freshly rebuilt production regression: 192/192 PASS, zero failed/skipped inside the selected set. Earlier warm-fragment results are preserved but are not used as cold-load proof. A new build was required after adding the restoration helper; the earlier build was not reused for final acceptance.

Production build PASS, 63 static pages. Scoped typecheck/lint had passed before the final article build; final source/all-app typechecks and negative controls are recorded separately. The production regression covers prior world-loop, roadmap, accessibility/performance, community/onboarding, support/help/safety, status, release/readiness/tester, download trust and heading checks.

| Viewport | Document height | Hero bottom | Article layout top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3115 | 590.02 | 622.02 | 0 | 0 |
| 1280 × 800 | 3095 | 585.20 | 617.20 | 0 | 0 |
| 768 × 1024 | 3570 | 802.64 | 826.64 | 0 | 0 |
| 390 × 844 | 4505 | 946.89 | 970.89 | 0 | 0 |
| 360 × 800 | 4769 | 971.20 | 995.20 | 0 | 0 |

All five records have zero JavaScript page errors. Additional 320px reflow and minimum navigation text/control-size tests pass. Automated main-content axe and Chromium emulation are not complete WCAG or physical-device/screen-reader certification. Full source text is not truncated merely to reduce page height.

Cold direct step-03 URL after final production render: desktop target top 87.80px and mobile 144.45px, with focus on the correct section. Desktop contents after scrolling 1500px remains at top 112px. Tests also verify contents collapse/reopen with Space/Enter, keyboard forward navigation, section return links, direct unknown fragments retaining the article, and Back/Forward without submissions.

## Source guard migration / review

Two exact historical world-guide four-column/CTA layout validators and E2E files (v1.155/v1.165) are explicitly HISTORICAL_SUPERSEDED, not counted as runtime PASS. Their former layout no longer exists; source-complete article, geometry, native navigation and error-boundary coverage replaces it. Other guide validators and runtime source/category guards remain active. The source guard rejects missing authored boundaries, unexported stylesheet ownership, undefined tokens, line clamps and fragment restoration without target whitelisting. Inline source/browser review was performed; no independent reviewer is claimed.

## Non-claims and next

No game simulation, HP, damage, combat inputs, loot, inventory, rewards, completed quests, persistent reading progress, account permissions, wiki API or online session. This web guide does not determine the game's production state. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.234, `/guides` index. Continue the same one-page sequence with actual guide discovery/navigation using existing published content. Do not invent guide entries, account personalization, search backend or gameplay.
