# WEB-FE-NEWS-DISCOVERY-v1.253

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires reviewed commit, normal origin/main push with exact remote HEAD, full/delta/evidence ZIP integrity/SHA256 and baseline+delta replay verified in the external delivery manifest.
Baseline: `f8b3af5fa366e733f6941149606b8b0092acd427`.
Session: `S-LGO-WEB-20260916-E6A1`; branch main and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

Scope: `/news` index and the necessary shared reading-catalog/featured-cover options only. The previous index sliced published news to the first3 records, clipped summaries and used tiny buttons in three proof cards. The new real page exposes all17 published news articles in a searchable editorial library, with an illustrated framed hero and a source-backed starting article on parchment. The accepted Public Core navy/gold/jade/artwork/editorial target and unchanged shell are the comparison guardrail, registered explicitly for /news. This is HTML and controls rendered in a browser, not an embedded screenshot of a design. Pixel-identical atlas artwork is not claimed.

The source selection remains localContentRepository.list("news"), now without slicing. Every title, summary, article link and publishedAt is consumed directly. Repository order is preserved; the source is not sorted or rewritten to invent a latest-news order. The featured starting article is the first source-flagged entry with a first-entry fallback, not a personalized or popularity recommendation. All17 authored summaries are available via native disclosures, with no ellipsis or line-clamping. Posting dates are formatted vi-VN in UTC and labelled Ngày đăng. Historical news is not reworded into current operational claims.

The local title/description filter handles Vietnamese accents, đ/Đ, case, repeated whitespace and decomposed Unicode using the existing matching function. It can find records outside the old first3. The actual visible/total count is announced; no invented topic groups are added. Empty results explain how to recover. Space on Xóa bộ lọc clears the text and returns focus to the stable input; reload resets local filtering. Tests compare storage before/after and observe requests: typing/filtering/disclosure sends no query, writes no reader storage and does not change URL. There is no search backend or recommendation service.

The primary link arrives at news-library below the real header with focus; Tab reaches the actual search box. Cold direct fragments and malformed-fragment controls are tested through unchanged ArticleFragmentRestoration. Every one of the17 article links was opened in both browser profiles, its original h1 checked and Back used to return. The four onward paths open Status, Roadmap, Guides and FAQ. The featured cover opens the original article with Mở bài viết instead of Mở bài hướng dẫn. Article body pages were not redesigned in this slice.

## Base First and changes

No new search/filter controller or duplicated catalog renderer. ReadingCatalog receives an optional typed caller-copy object while retaining exact guide defaults, an optional publication field per entry, and omits nonexistent group controls only when groups is empty. Existing guide shelf/filter state, matching logic, reset behavior and source mapping are unchanged. FeaturedReading receives one optional action label with its previous guide default.

Shared reading-catalog.css adds publication metadata layout/readability rules and broadens the existing discovery hero selector to its reusable alias with equal specificity. Guide geometry and DOM were checked, not assumed. All142 obsolete news-index CSS lines were removed and every remaining service-layout.css byte matches baseline. No additions to globals.css, token changes, new artwork/fonts, dependency/lockfile changes, content edits, game/backend changes or Portal/Ops changes. The currently attached historical game reports do not determine the news route's live-operation scope.

## Verification and review

RED:11 new desktop tests failed against the old index. Three new component cases failed because shared copy/publication/featured-label options did not exist;3 existing behavior/escaping/selection checks passed. GREEN:40/40 news+guide browser checks and6/6 reading component checks. Source and visual review were performed inline; no independent reviewer-agent result is claimed.

One new production build passed with63 static pages. The final selected production suite ran594/594 PASS, zero failed/skipped/flaky across65 files, including the pre-existing news-detail tests. The new index contributes22 tests. All289 build inputs are hashed and rechecked at closure/delivery; docs/tooling changes do not substitute for unchanged runtime-source evidence.

| Viewport | Document height | Hero bottom | Library top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3354 | 604.98 | 636.98 | 0 | 0 |
| 1280 × 800 | 3306 | 604.98 | 636.98 | 0 | 0 |
| 768 × 1024 | 4423 | 947.98 | 971.98 | 0 | 0 |
| 390 × 844 | 6153 | 991.70 | 1015.70 | 0 | 0 |
| 360 × 800 | 6146 | 991.70 | 1015.70 | 0 | 0 |

Five production viewports were captured in default and filtered/expanded states. No horizontal overflow, overflowing headings, missing cover or page JavaScript errors were observed. At320px, news summary text is at least14px and visible actions are at least44px high; keyboard focus and forced-colors are tested. Decorative-image failure leaves the library and summaries usable. Axe scans main content with selected WCAG tags; this is Chromium emulation, not screen-reader/physical-device testing or WCAG certification.

Twenty-four unchanged surfaces were compared on desktop/mobile, including the guide library, events, patch journal and two news-detail pages: 44 exact raw DOM matches, 4 generated-ID-only matches, all48 measured geometries identical. The /performance and /guides catalogs use a narrowly scoped generated-ID rename comparison, with unique/resolved references and negative altered-copy controls. An initial production comparison failed for /guides because its one React-generated prefix differed between dev baseline and production (_R_19pbn5rlb_ versus _R_19lfivb_). Every difference was confined to IDs and their label/control references; geometry matched. The original failure and exact diff are retained. Only the same bijective generated-ID check was extended to this catalog; visible copy, structure, CSS and geometry thresholds were not relaxed. No UI source changed and no new build was needed. All before snapshots are fresh for this task and capture keys are unique.

The first dev compatibility script retained a patch-journal fragment check from its predecessor; that result is labelled dev evidence, not news arrival proof. The script was corrected to news-library before production. Dedicated new tests also check actual news arrival. Initial source validation correctly rejected the obsolete news-index owner markers. Only v1.176 compact news-index validator/E2E is HISTORICAL_SUPERSEDED and not counted as runtime PASS; all existing news-article tests remain active. The multi-route heading guard now reads the extracted owner, and the guide guard follows the optional-copy binding while asserting exact guide defaults. Neither existing browser suite was loosened.

Final source gate after docs/state: UI/Web/Portal/Ops typecheck, UI/Web lint, reading component6 and existing announcement component7 tests, next-route13 tests, clean-source current-state and git diff --check. Thirteen negative source controls reject wrong selection, first3 truncation, altered summaries/dates/links, broken focus, live-feed claims, changed guide defaults, query submission, clipped copy, unsafe HTML and fabricated empty text. Actual command exits are in closure-checks.json.


The final source gate initially rejected the next existing news article because public_route_exists understood dynamic /guides only. A failing test reproduced this before the guard changed. The resolver now recognizes only the two existing families /guides and /news, requires their real renderer/selection/category/notFound markers, and accepts only a matching published record in contentEntries. Unknown namespaces, unrelated fixture exports, draft/scheduled entries, wrong categories, missing renderers and missing category guards are rejected. Thirteen unique tooling tests pass after the fix; original failures remain in evidence. This is source validation only, not a runtime or next-article UI implementation. The289 runtime input hashes remain unchanged.

## Coordination and delivery

Owner's stored-PID capacity waiver remains; commands/PIDs are in local-process-journal.jsonl. Pause, recovery and ownership checks remain active. Initial v2 status had no assigned task/batch/run; no task was silently opted into v3. No Manager configuration, registry cleanup, bridge credentials, process kill/restart or other-session change. Own production loopback preview is3231; a listener does not imply background assistant work.

Only reviewed source/test/docs enter Git. Normal push, remote HEAD verification and full/delta/evidence ZIP/SHA256/replay precede closure. No force-push or production deployment command. Existing services and claims remain; final registry state is WAITING_USER after delivery.

No invented articles, publication dates, live-news feed, personal recommendations, subscriptions, notifications, counts of readers, release availability or backend. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. Native disclosure does not establish universal no-JavaScript access.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.254, `/news/web-program-control-tower`; not started here.
