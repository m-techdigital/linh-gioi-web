# WEB-FE-RELEASE-READINESS-GUIDE-ARTICLE-v1.248

Status: WEB_VERIFY_PASSED. Closure is effective only after the external delivery manifest verifies reviewed commit, normal origin/main push, matching remote HEAD, full/delta/evidence ZIP integrity, SHA256 and source replay.
Baseline: `555f0a996f0741381dc8f2dd8b254c90a3d26f82`.
Session: `S-LGO-WEB-20260916-E6A1`; existing main/worktree retained.

## Real Browser UI/UX Layout First

Scope: `/guides/release-readiness-hub-guide`, not a change to game readiness or the approval workflow. The old page used four small clipped cards followed by repeated unrelated CTA bands. The new page has a framed editorial header, a linked four-point overview, responsive contents, four complete parchment chapters and a short related-reading area. Existing Public Core navy/gold/jade typography/frame/navigation patterns remain the comparison target. The target link identifies this guide. No image target is embedded as controls and no new design artwork was generated. Pixel-identical reproduction of atlas illustrations is not claimed.

All title/summary/body and four ordered title/action/expectedResult/blockedScope records are consumed directly from the existing provisional fixture. Source terminology is preserved. The guide explains opening the readiness hub, checking gate evidence, reading Download Trust/Status/Safe Support together and understanding conditional closed test. It does not reconcile old game attachments, invent prerequisites or declare the game ready.

The shared ReadingPriorityPanel has four native fragment links generated from the same four source steps. It is navigation within the article, not duplicated gate state, a checklist, a score or a progress tracker. Clicking or using Enter focuses the requested chapter below the sticky header; previous/contents/next and browser Back/Forward retain their native behavior. Direct chapter URLs and malformed fragments are tested. Existing ArticleFragmentRestoration remains unchanged.

Seven contextual chapter actions lead to existing routes. Chapter 1 opens `/release/readiness`. Chapter 2 offers the readiness page and the existing checksum/source guide. Chapter 3 provides the complete `/download/trust`, `/status`, `/support/safety` group in that order. Chapter 4 opens `/release/tester-pack#tester-checklist`. All groups use the existing shared action owner; narrow layouts stack the links without text clipping.

The readiness destination is deliberately the page URL, not an unverified cold fragment. The end-to-end test opens that page, activates its existing “Xem các cổng duyệt” anchor, measures the board below the header and expands native evidence. It then verifies real arrival at the already-fixed tester checklist with focus, zero preselected boxes, Tab/Space input and local reset on reload. This task does not redesign the destination pages or claim that generic cross-page fragments all work.

## Base First and scope review

ExperienceHero, ReadingPriorityPanel, GuideArticle, GuideChapterBody, grouped actions, LinkButton and fragment restoration are reused without modification. No new CSS rules, UI owner, stateful controller, token, font, asset or dependency. All 46 obsolete readiness-guide-only CSS lines are removed from service-layout.css; all remaining bytes of that file match the baseline. App globals and all existing shared article/priority/release CSS are unchanged. PublicReleaseReadinessExperience/HubSections, TesterPackExperience, content/contracts, tokens, assets, shell, Portal and Ops are unchanged.

Only the exact slug is specialized, after the existing published/category guard. dynamicParams remains false. The older world-loop multi-guide test now checks this exact article and adds closed-tester-information-pack-guide as a still-generic renderer control. HTTP/category/source/heading/overflow assertions remain. Only the exact historical v1.171 compact validator and E2E file are HISTORICAL_SUPERSEDED, not counted as PASS.

## Verification

RED: ten new desktop tests failed on the old renderer. A test-construction root-selector duplication was corrected and the layout RED was rerun before implementation; the corrected selector still failed because the new renderer did not exist. No production fix is credited for the test typo. GREEN: 36/36 for the new guide, readiness page and prior tester-destination regression. Fresh final production regression: 440/440 PASS, zero failed/skipped/flaky, in 37 selected E2E files; this article contributes 20 tests across desktop/mobile. Build succeeded with 63 static pages. All 282 production input hashes are pinned and must match at source closure and delivery.

| Viewport | Document height | Hero bottom | Article top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3437 | 671.30 | 703.30 | 0 | 0 |
| 1280 × 800 | 3388 | 671.30 | 703.30 | 0 | 0 |
| 768 × 1024 | 3981 | 977.31 | 1001.31 | 0 | 0 |
| 390 × 844 | 5261 | 1144.28 | 1168.28 | 0 | 0 |
| 360 × 800 | 5501 | 1178.19 | 1202.19 | 0 | 0 |

Five production captures report zero JavaScript page errors, heading overflow and raster image requests. That is the measured new guide, not a zero-network claim for the website. Main-content axe is scoped to selected WCAG tags, not manual screen-reader or accessibility certification. At 320px, tests require authored body text >=14px, chapter navigation/actions >=44px and visible focus. The four overview links have full click/touch rows and Tab exits the last link into the article contents without a trap. No controls grant approval or access. The gate-evidence and checklist-arrival screenshots are retained in production test output.

Compatibility: 30 raw main-DOM matches plus 2 generated-ID-only matches across 16 pages, with all 32 measured geometries matching. The only pre-existing exception is `/performance`: a bijective generated React-ID spelling normalization checks unique IDs/resolved labels and rejects altered visible copy. Normalized cases are not called byte-identical DOM. Readiness and tester destinations also remain covered by their existing full E2E suites.

Final source checks run after reports/state updates: UI/Web/Portal/Ops typecheck, UI/Web lint, seven next-route tooling tests, clean-source current-state validation and git diff --check. Six negative controls reject an altered source result, broken overview fragment, wrong support destination, broken checklist link, invented approval wording and unexpected dynamic routes. Exact exits are in closure-checks.json/logs, not inferred from this report. Review is inline source/browser review, not an independent reviewer-agent result.

## MCP, delivery and non-claims

Owner waiver for stored-PID capacity remains; commands/PIDs are in local-process-journal.jsonl. Ownership/worktree/runtime/port/branch claims, new pause checks and evidence/status updates remain active. Already-enrolled v2 status was checked and no task/batch/job was assigned. No client identity is copied, no registry cleanup, Manager modification, kill/restart or change to another session. Current production preview is on claimed loopback port 3226. A listening local server is not background assistant work.

Only reviewed source/test/docs enter Git; archives, screenshots, caches and secrets stay out. Normal push and verified ZIP/SHA256 replay precede effective WEB_CLOSED. No deployment command.

No owner approval, bypass, real checksum, download artifact, test signup/slot, account entitlement, ticket intake, support SLA, live telemetry, rewards or economy. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. This task makes no assertion about present game backend capability beyond the unchanged Web fixtures.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.249, `/guides/closed-tester-information-pack-guide`.
