# WEB-FE-PERFORMANCE-GUIDE-ARTICLE-v1.245

Status: WEB_VERIFY_PASSED. Delivery closure requires the external manifest to verify the reviewed commit, normal push to origin/main, matching remote HEAD and full/delta/evidence ZIPs.
Baseline: `ad3ff73feb2381b07e0c0dc2b99594569f50f76c`.
Session: `S-LGO-WEB-20260916-E6A1`; existing `main` and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

The page `/guides/performance-copy-budget-guide` replaces four clipped compact cards and a long unrelated CTA chain with a real HTML/CSS editorial header, an HTML principle panel, sticky desktop/mobile-collapsible contents, four complete parchment chapters and focused related reading. Baseline browser height: 2718px desktop and 4115px mobile. More complete article text is intentionally not cut to force a shorter document.

The original entry title, summary, body and ordered title/action/expectedResult/blockedScope records are consumed directly from the existing provisional fixtures. Existing wording about compact cards, visual weight and operational boundaries is preserved; no source reconciliation or gameplay invention. Six contextual actions lead to real existing reading pages. The second chapter opens `/performance#performance-preview`; the last has three independent links for download trust, release conditions and safe support. Previous/contents/next, keyboard focus, history and cold or malformed fragments are verified. These are reading actions, not commands that improve speed or grant access.

The hero follows the accepted Public Core navy/gold/jade/editorial family without a raster cover: this particular guide explains light visuals, so an existing shared HTML/CSS panel is used rather than another large illustration. There are no guide images, video, canvas, image preloads or new asset files. Request observation shows zero illustration image requests even when the game-art routes are blocked. This is a scoped resource observation, not a total transfer budget or performance benchmark. Header/menu/footer and registered atlas artwork remain unchanged. No pixel-identical atlas reconstruction is claimed.

## Base First and scope review

ReadingPriorityPanel was extracted from the existing `/performance` console into packages/ui and consumed there and in this article. It has no state, telemetry, progress indication or data input. Existing CSS is reused; only two heading-selector owners change from page experience to the equal-specificity shared release-layout owner. All 46 obsolete performance-guide-only CSS lines are removed; all remaining service-layout.css bytes match baseline. No new CSS block, client controller, typography control, font, asset, dependency or app globals were added.

GuideArticle, GuideChapterBody, grouped actions and whitelisted fragment restoration are reused unchanged. Content, contracts, design tokens, public assets, shell, Portal and Ops are unchanged. The exact slug rendering branch remains after the existing published/category guard, with dynamicParams=false.

## Verification and retained failures

TDD: nine new tests failed on the compact baseline. First implementation run: 22 passed / 8 failed because a test-template replacement accidentally changed four root class selectors into the URL slug spelling. Corrected those four selectors only; no layout/source/keyboard/size threshold was reduced. The combined targeted suite then passed 46/46. The older generic-route test was migrated only for this slug, retaining generic coverage on route-continuity-conversion-guide and all published HTTP/category/source/heading/overflow checks.

Production build: 63 static pages, exit 0. The completed production regression contains 378/378 PASS, zero failures/skips/flaky, across 33 selected test files. It completed naturally before the metadata-related pause. On resume, all 279 recorded production-input hashes matched; no unnecessary full rebuild or full-suite rerun was performed. Fresh production page tests: 18/18 PASS. Fresh production visual and sibling comparison were run after resume.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3363 | 627.14 | 659.14 | 0 | 0 |
| 1280 × 800 | 3344 | 627.14 | 659.14 | 0 | 0 |
| 768 × 1024 | 3927 | 950.42 | 974.42 | 0 | 0 |
| 390 × 844 | 4906 | 1038.66 | 1062.66 | 0 | 0 |
| 360 × 800 | 5050 | 1038.66 | 1062.66 | 0 | 0 |

All five viewport captures have no JavaScript page errors, heading overflow or illustration image requests. Main-content axe reports no violations in its tag-limited scan. Tests at 320px require body text >=14px, targets >=44px and visible focus. Reviewed the production desktop first fold and focused mobile chapter manually. This is Chromium viewport emulation, not physical-device/screen-reader testing, production field measurements or WCAG certification.

Compatibility: 12 sibling guides × 2 viewports = 24 raw exact main-DOM and measured-geometry matches. `/performance` has the same geometry/text/structure but differs in a generated `_R_..._` ID root between the old dev capture and new production capture. The first raw comparison failure is retained. For this one page only, an explicit attribute-level bijective generated-ID rename is compared, requiring unique IDs and resolving label/ARIA references. Both viewports pass, and a negative control replacing visible text still fails. Do not describe these two results as raw byte-identical DOM. Existing performance interaction tests remain in the 378-test regression.

Final source checks run after report/state updates: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tooling tests, clean-source current-state validator, git diff --check. Five separate negative source controls must reject altered authored results, broken workshop destination, inserted guide image, fabricated measurement wording and unknown dynamic routes. Output logs, input hashes and verified-source hashes are stored in evidence. Inline source/browser review was performed; no independent-agent review is claimed.

Only the exact obsolete compact performance-guide v1.168 layout validator/E2E is HISTORICAL_SUPERSEDED, not counted as runtime PASS. No source guard or runtime threshold is removed merely to obtain PASS.

## Session coordination and delivery

The first run reached the test Session Manager's 100 stored-PID cap; it counted ended records. The session paused without killing services. The owner explicitly waived this metadata-capacity restriction and authorized continuing. Only this session's self-imposed pause was cancelled; worktree/runtime/port claims and checks for new pause requests remain. Command/PID records now also go to a session-local journal. No Manager code/configuration/database cleanup, other claims or other processes were changed. Existing dev and production services remain declared; a running service does not mean the assistant is running in the background.

Normal origin/main push, exact remote HEAD confirmation, package integrity, SHA256 and byte-for-byte source replay are required to make WEB_CLOSED effective. Never force-push or include local handoff artifacts/secrets/dependencies in source Git. No production deployment command.

## Non-claims and next

No production speed score, benchmark, monitoring, server analytics, image CDN, optimized-bundle certification, saved preference, personalization, authentication, account lookup, ticket intake, entitlement or real game controls. No production auth. No DB persistence. No independent backend. No CMS. No real Portal integration. No real Ops/Admin mutation. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. Fragment restoration still uses the existing small client helper. The earlier non-reproduced dev fragment observation is not claimed fixed here.

Next only after delivery: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.246, `/guides/route-continuity-conversion-guide`.
