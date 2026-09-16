# WEB-FE-PLAYER-TRUST-GUIDE-ARTICLE-v1.247

Status: WEB_VERIFY_PASSED. Delivery becomes WEB_CLOSED only after the external manifest verifies the reviewed commit, normal origin/main push, exact remote HEAD, ZIP integrity, SHA256 and full-source/delta replay.
Baseline: `31c7a18651dbd2e9bbd7d63b84b24a45c8af03b6`.
Session: `S-LGO-WEB-20260916-E6A1`. Existing `main` and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

`/guides/player-trust-release-guide` is now a reading-first article rather than four clipped compact cards followed by long repeated CTA bands. An illustrated editorial header introduces the guide, responsive contents lead into four complete parchment chapters, and a short related-reading area closes the page. The accepted Public Core navy/gold/jade/editorial family and shared header/menu/footer are retained. The existing world illustration is clearly captioned as illustration, not a test build or invitation. The target link identifies this guide; no target image is embedded as interactive page content or regenerated. Pixel-identical atlas art recreation is not claimed.

The original title, summary, body and four ordered title/action/expectedResult/blockedScope records are consumed directly from provisional fixtures. They explain release stages, download evidence, support boundaries and closed-test preparation. Existing terminology is preserved; this task does not reconcile gameplay/backend facts using old project attachments or guess new availability.

Six contextual native links lead to `/release`, `/download/trust`, `/status`, `/support/safety`, `/release/tester-pack#tester-checklist` and `/release/readiness`. The third chapter groups Status/Safe Support; the fourth groups Tester Checklist/Release Conditions. Links never sign up the reader, grant access or submit a ticket. The tester checklist destination loads its existing controls with no boxes preselected. Keyboard Tab/Enter, browser Back, previous/contents/next, cold direct fragment URLs and malformed fragments are covered. Losing the illustration still leaves the authored content and native article navigation available.

## Base First and scope

ExperienceHero, GuideArticle, GuideChapterBody, grouped chapter actions, LinkButton and ArticleFragmentRestoration are reused unchanged. No new shared owner, stateful controller, token, asset, font or dependency was introduced. A required cross-page checklist destination fix exports and consumes the unchanged fragment helper, adds programmatic focus to that one checklist section, and extends the existing shared reading-panel focus selector. The one opt-in root scroll rule applies only when a focusable release reading panel is present; it prevents a native smooth-fragment animation from overriding restored position. Existing no-opt-in pages retain their scroll behavior. The entire 46-line obsolete player-trust-only CSS block is removed; all remaining service-layout.css bytes match the baseline. App globals, content/contracts, tokens, public assets, site shell, Portal and Ops are unchanged. Tester content and controls are unchanged; only its checklist focus/mount behavior changes.

Only the exact player-trust slug gets the new renderer after the existing published/category guard. dynamicParams remains false. The older multi-guide test is updated for this renderer and adds release-readiness-hub-guide as a still-generic control; HTTP/category/source/heading/overflow assertions remain. Only the exact obsolete compact v1.170 validator/E2E is HISTORICAL_SUPERSEDED, not counted as PASS.

## Verification

Additional real defect: a diagnostic after the initial 414-test production run showed that the checklist link changed URL but did not scroll into view (desktop target top 1563.296875px, scrollY 0). The initial URL/visibility-only assertion was insufficient. Two explicit pre-fix regression tests failed on keyboard arrival and a cold direct URL. Root cause: the streamed tester section had neither mount-time fragment restoration nor a programmatic focus target. The fix reuses the existing whitelisted helper for tester-checklist only, plus tabindex=-1 and shared focus styling. This is the destination required by the new article, not a broader tester redesign. The first helper-only attempt passed click navigation but two cold-URL tests failed: a pending native smooth scroll moved the target after focus restoration. Event tracing and an auto-scroll experiment reproduced and isolated the cause. Shared opt-in native instant scrolling fixes that race without timers, polling or global changes on other pages. Ordinary/unknown/malformed fragments must not steal focus; checking a box must not bounce focus back to the section. Initial evidence is retained, not presented as final closure. A second build and complete production run are required because runtime source changed.

RED: nine desktop tests failed on the old page. GREEN: 42/42 passed for the new article, existing checksum guide and tester pack. After destination and native-scroll fixes, a fresh 34/34 focused suite passed, including six dedicated arrival regressions. Final fresh production regression: 420/420 PASS, zero failed/skipped/flaky, across 36 selected E2E files; the article contributes 18 tests and the required checklist-destination regression adds six tests across desktop/mobile. Production build succeeded with 63 static pages. All 281 production-input hashes are pinned for final validation.

| Viewport | Document height | Hero bottom | Article top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3379 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3353 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3889 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 5058 | 991.16 | 1015.16 | 0 | 0 |
| 360 × 800 | 5182 | 1033.44 | 1057.44 | 0 | 0 |

The five production captures have no JavaScript page errors or heading overflow; the cover resolves from its existing file. Automated axe is scoped to main content and selected WCAG tags. At 320px, tests require body copy at least 14px, action/navigation targets at least 44px and visible focus. The intentional failed-image test is separate from the normal viewport checks. This is Chromium viewport emulation, not physical-device/screen-reader testing or accessibility certification.

Sibling compatibility: 28 raw exact main-DOM matches plus 2 generated-ID-only matches, with all 30 measured geometries matching. The separate tester destination comparison preserves content/geometry and permits only the intended tabindex=-1 plus generated-ID spelling; changed visible copy is rejected. The existing sibling exception applies only to `/performance`: it bijectively renames generated React ID roots, checks uniqueness/resolved labels/ARIA and rejects changed visible text. Do not call those normalized cases byte-identical DOM.

Final source checks run after report/state changes: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tool tests, clean-source current-state validation and git diff --check. Nine negative controls reject altered source outcomes, a broken checklist fragment, a wrong safe-support route, fabricated access claims, a false illustration caption, missing checklist focus/mount restoration or its native-scroll coordination and unregistered dynamic routes. Exact exits are recorded in closure-checks.json and logs. Inline source/browser review was performed; no independent-agent review is claimed.

## Final source scope review

The additional tester fix is limited to exporting the unchanged helper, its one whitelisted use beside the existing checklist, that section's tabindex, and shared opt-in focus/native-scroll CSS. The other tester sections, content, native controls, templates, reset semantics and privacy rules are unchanged. The normal-page comparison checks geometry and DOM with only the intentional focus attribute and bijective generated-ID spelling allowed. No scroll polling, timeout retry or saved state was introduced.

## MCP and delivery

PID metadata capacity remains waived by the owner; local-process-journal.jsonl records commands and this session's PIDs. Worktree/runtime/port/branch claims and checks for new pause requests remain active. The v2 announcement was read, acknowledged and resolved by this session. Its already-enrolled v2 client works; no v2 task/batch/recipe was assigned, so v1-compatible coordination remains. No identity file is copied into source/evidence and no Manager configuration, data cleanup or other session is changed.

The new production preview uses claimed loopback port 3225. Existing dev/production services are not terminated. A running local server does not imply the assistant works in the background. Commit/push and full/delta/evidence ZIP/SHA256 must be verified before effective closure. No force-push, deployment command, handoff ZIP, dependency cache or secret in source Git.

## Non-claims and next

No open test signup, guaranteed test slot, real build distribution/checksum, launcher, entitlement, account lookup, ticket inbox, support SLA, telemetry, rewards, economy or automatic access. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. The existing article fragment helper remains unchanged. These Web source fixtures are not claims about current game backend readiness.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.248, `/guides/release-readiness-hub-guide`.
