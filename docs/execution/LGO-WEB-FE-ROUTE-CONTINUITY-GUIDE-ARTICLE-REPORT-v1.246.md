# WEB-FE-ROUTE-CONTINUITY-GUIDE-ARTICLE-v1.246

Status: WEB_VERIFY_PASSED. Delivery becomes WEB_CLOSED only when the external manifest confirms reviewed commit, normal origin/main push, exact remote HEAD and full/delta/evidence ZIP/SHA256 replay.
Baseline: `ab0da02b515685a87e3f3cdcd1bb915a13dea9eb`.
Session: `S-LGO-WEB-20260916-E6A1`; `main` and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

Scope is `/guides/route-continuity-conversion-guide`, not a new game milestone. The baseline had four compact, clipped cards and a long chain of unrelated CTA bands. It is now a real HTML editorial hero, five linked reading destinations, a responsive contents rail, four complete parchment chapters and a short related-reading section. Before-capture document height was 2734px desktop and 4115px mobile. Complete source descriptions are not truncated to force a shorter page.

The source summary names Bắt đầu → Vòng lặp thế giới → Tin cậy tải game → Trạng thái → Hỗ trợ. The hero presents those five actual destinations: /start, /game/loop, /download/trust, /status and /support/safety. Each row is a native anchor, not a state button or game-launch command. Tests visit each destination and return with browser history. Inline guidance states these are reading paths, not access grants or account progress.

The four chapters preserve the original entry title, summary, body and ordered title/action/expectedResult/blockedScope records from provisional fixtures. Six contextual chapter actions are mapped to existing routes. The first chapter has Start/Journey choices; the third has Download Trust/Status choices. The second leads to the world-loop explanation; the fourth leads to safe-report preparation. Native previous/contents/next navigation, focus restoration, history, direct fragments and malformed-fragment survival are verified. No selection/progress is stored or sent.

The visual comparison target remains the accepted Public Core navy/gold/jade editorial family. The registered link now identifies this guide's reading-flow composition. This is a native linked wayfinding panel, not a screenshot presented as live controls. Atlas art, shell, header, menu, footer and theme are unchanged. No new raster image, video, animation or external asset is required to read the page. No pixel-identical recreation of the atlas artwork is claimed.

## Base First and scope

GuideArticle, GuideChapterBody, grouped reading actions, ExperienceHero and whitelisted ArticleFragmentRestoration are reused without modification. Existing ReadingPriorityPanel gains one optional href field per item. Linked items render an anchor; unlinked items retain the existing span/strong structure. This avoids rebuilding a route-panel owner in the application.

Ten lines of optional-link styling are added to packages/ui/src/performance-layout.css, including 48px minimum rows, visible keyboard focus, full-row click area and forced-colors focus. Existing declarations remain byte-for-byte unchanged. All 46 obsolete route-continuity-only CSS lines are removed from service-layout.css; all other bytes of that file match baseline. No app-global CSS is added.

Content/contracts/design tokens/public assets/site shell/Portal/Ops and both existing performance consumers are unchanged. No dependency, font, client controller or new backend route. The exact slug branch is after the published/category guard; dynamicParams remains false.

## Evidence and checks

Test-first RED: nine desktop feature tests failed on the old compact page. GREEN: 48/48 for the new article and two existing performance consumers. Final fresh production regression: 396/396 PASS, no failure, skip or flaky result, across 34 selected E2E files. The new page contributes 18 tests (desktop/mobile). Build succeeded with 63 static pages. Production input hashes are recorded separately; no source changes since the final build are accepted without revalidation.

| Viewport | Document height | Hero bottom | Article top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3471 | 708.14 | 740.14 | 0 | 0 |
| 1280 × 800 | 3452 | 708.14 | 740.14 | 0 | 0 |
| 768 × 1024 | 3993 | 990.03 | 1014.03 | 0 | 0 |
| 390 × 844 | 5150 | 1178.56 | 1202.56 | 0 | 0 |
| 360 × 800 | 5336 | 1178.56 | 1202.56 | 0 | 0 |

All five production captures report no JavaScript page errors or heading overflow. Main-content axe is tag-scoped, not full accessibility certification. At 320px, tests require body copy >=14px, chapter actions/navigation >=44px and visible focus. Header waypoints and grouped actions are tested with Tab/Enter; Tab exits the last waypoint to the article contents without a trap. Request observation covers no submission/fetch/XHR on intra-article navigation; it does not claim zero whole-site network traffic.

Compatibility: 28 sibling/view combinations across 14 pages; 26 raw DOM matches, 2 additional generated-ID-only matches; all 28 recorded geometry comparisons match. A pre-existing narrow /performance comparison permits only a bijective generated React-ID spelling change, verifies unique IDs and resolved labels/ARIA, and rejects changed visible text as a negative control. No other sibling may use that normalization. Preserve raw comparison fields rather than describing normalized results as byte-identical DOM.

Final source gate runs after these reports/state updates: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tool tests, clean-source current-state validation, git diff --check, plus six negative controls. The controls reject changed source-authored results, a wrong world-loop destination, a broken native shared link, missing specific link-focus styling, fabricated access wording and unknown dynamic routes. Exact outcomes are in closure-checks.json and the final-source log, not assumed by this document.

Only the exact historical compact v1.169 validator/E2E is HISTORICAL_SUPERSEDED. The older world-loop multi-guide test now verifies the exact continuity article and adds player-trust-release-guide as the still-generic control. Published HTTP/category/source/heading/overflow coverage is retained. Inline source and visual review was performed; no independent-agent review is claimed.

## MCP execution and delivery

The owner waived the test registry's stored-PID capacity restriction. Command/PID records remain in local-process-journal.jsonl. Worktree/runtime/port/branch claims, checks for new pause requests, evidence and truthful status updates remain in use. The v2 client was enrolled without exposing its identity; there were no assigned v2 tasks/jobs, so existing v1-compatible coordination was retained. No Manager code/configuration/registry cleanup or another session's claim/process was changed.

The existing dev and previous local production processes were not stopped. This task's production build was verified on a separate claimed loopback port, 3223. A running local server does not imply the assistant continues working after the response. No force-push or production deployment command; no handoff archives/cache/secrets in source Git.

## Non-claims and next

No live conversion funnel, recommendation backend, personalization, user tracking, login/account flow, entitlement, download artifact, real checksum, ticket intake, support SLA, combat, reward or account progress. No production auth. No DB persistence. No independent backend. No CMS. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open; native article enhancement still uses the unchanged fragment helper. No physical-device/screen-reader/WCAG certification or performance benchmark.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.247, `/guides/player-trust-release-guide`.
