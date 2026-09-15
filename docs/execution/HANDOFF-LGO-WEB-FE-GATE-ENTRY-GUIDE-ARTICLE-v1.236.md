# WEB-FE-GATE-ENTRY-GUIDE-ARTICLE-v1.236

Status: WEB_CLOSED — a source-authored public guide, not a live map or gameplay session.
Baseline: `79a59787f24b5f50254f77c5dd7a3e70b289b4a1`.
Delivery: reviewed source/test/docs commit, normal origin/main push, exact remote HEAD verification and source/delta/evidence ZIP/SHA256. External manifest records actual delivery results. No deployment.

## Real Browser UI/UX Layout First

Started only after v1.235 source/delta replay, clean archive validation, normal push and all handoff checksums were verified. Read current governance and the exact gate-entry ContentEntry and guideDetailSteps. Baseline captures: 2746px desktop and 4043px mobile, with a compact three-step proof board, truncated text and a long chain of generic CTAs.

The page now has a coherent illustrated editorial header, responsive contents, three complete parchment chapters and a short related-reading section. Desktop contents remains beside the article; mobile contents can collapse before the full chapters. Each chapter includes the original instruction, expected result, source boundary and a real destination. Previous/contents/next and browser history use native fragments. Cold fragment URLs focus and scroll to the requested section; malformed fragments retain readable content without a JavaScript error.

All original entry title, summary and body and all three guideDetailSteps records are rendered directly and in order. Terminology such as Người Giữ Cổng, Gate Keeper and Training Stone is kept as authored; it is not silently harmonized with other guides or replaced from old game documents. Added destinations are editorial navigation only: /game, /game/loop and /download/trust. No guide entry, map behavior, game state or readiness evidence was invented.

## Design and Base First

Used the existing Public Core comparison family, its editorial hierarchy, navy/gold/jade treatment and framed illustration. The exact gate route now has a Vietnamese comparison label to that same atlas. The accepted header/menu/footer remain unchanged. Existing world concept art is labelled illustration, not a running client or live map. No new asset, font, dependency or pixel-identical recreation of all atlas artwork is claimed.

GuideArticle, ExperienceHero, SectionHeading, LinkButton and ArticleFragmentRestoration are reused. No new client controller or duplicate article template was created. Shared guide-article.css no longer enumerates world/beginner route classes: the existing .lgo-release-layout ancestor owns these article styles, with the same specificity and declarations. Parchment links inherit the solid-ink treatment introduced in v1.235. Removed 164 gate-only legacy CSS lines; every other byte of service-layout.css matches baseline. globals.css, content, tokens, assets, contracts, Portal and Ops remain unchanged.

The dynamic guide route retains its published-content/category guard and dynamicParams=false. Only this existing slug receives a new rendering branch, after that guard. The other article and generic guide paths retain their owners. Final production comparison of world article, beginner article and beginner-training guide on desktop/mobile yields six exact main DOM and measured geometry matches.

## Runtime verification and retained failures

TDD RED: seven tests failed against the old gate page. First combined GREEN: 44 passed, two failed because an existing world-guide compatibility test still expected gate-entry to use the now-replaced generic .lgo-guide-detail-steps renderer. Migrated only that exact gate slug assertion to the new owner and source-backed chapter count. Published guide HTTP 200, non-guide HTTP 404, headings, no world-guide contamination and overflow checks remain unchanged; the other generic slugs still require their legacy owner. No layout threshold was relaxed. Fixed combined suite: 46/46 PASS.

Final fresh production regression: 240/240 PASS, zero failed/skipped in the selected set. New gate suite: 14/14. Production build: 63 static pages, exit 0. Coverage includes beginner/library/world guide/world loop, roadmap, accessibility/performance, community/onboarding, support/help/safety, status, release/readiness/tester, download trust and multi-route headings. Final source, all-app typechecks, lint and negative controls are logged separately.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 2876 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 2851 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3363 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 4234 | 971.20 | 995.20 | 0 | 0 |
| 360 × 800 | 4424 | 995.52 | 1019.52 | 0 | 0 |

All five production records have zero JavaScript page errors and no overflowing headings. Additional 320px tests assert body text >=14px, ink on parchment, native controls/links >=44px and visible focus. Cold chapter-two production URL lands at 88.22px desktop and 143.91px mobile with focus on the correct section. Production screenshots were reviewed, including the mobile focused chapter.

Reading links do not create fetch/XHR or non-GET mutations. Complete original content remains available rather than being hidden as carousel steps or clipped to force short screenshots. Automated axe and Chromium viewport emulation are not complete WCAG, screen-reader or physical-device certification.

## Guard migration and review

Only the obsolete exact compact gate layout validator/E2E v1.158 is explicitly HISTORICAL_SUPERSEDED, not runtime PASS. The new guard validates the actual route owner, source-preserving chapter mapping, canonical shared CSS, native navigation, category guard and no gameplay surrogate. The v1.235 ownership marker follows the now-general shared article ancestor; its substantive source and behavior checks remain intact. Review is inline source/browser review, not an independent-agent review.

## Limitations and next page

The whole-application JavaScript-disabled streaming limitation remains open; existing fragment restoration still needs JavaScript. The earlier v1.235 non-reproduced dev fragment-coordinate observation is retained in its evidence and is not claimed fixed here. Final current production cold-fragment tests pass, with no modification to that restoration helper.

No gameplay simulation, combat, HP, inventory, reward, quest completion, saved reading progress, account entitlement, live wiki or support intake. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.237, `/guides/beginner-training-loop-guide`. Continue the existing sequential guide pass, preserving source-authored content and actual reading navigation.
