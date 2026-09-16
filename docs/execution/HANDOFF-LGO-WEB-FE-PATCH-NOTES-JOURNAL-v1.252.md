# WEB-FE-PATCH-NOTES-JOURNAL-v1.252

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires the external delivery manifest: reviewed commit, normal origin/main push, matching remote HEAD, ZIP integrity/SHA256 and exact baseline+delta replay.
Baseline: `223530e7c5d2b3a4736dd1d61430d7c10b3df85a`.
Session: `S-LGO-WEB-20260916-E6A1`; existing main and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

Scope: `/patch-notes` only, plus the required shared AnnouncementBoard copy API. The old compact page hid complete record bodies and clipped source summaries inside small cards. The rendered replacement has an illustrated framed hero, a clear publication-scope panel, two full-width parchment records and four contextual onward routes. Desktop separates posting metadata from content; mobile stacks metadata and readable text. The accepted Public Core frame, navy/gold/jade palette, editorial typography and unchanged shared shell are the comparison target, registered for this route. Existing world artwork is illustrative, not a screenshot of a released patch. Pixel-identical atlas artwork is not claimed.

The route continues to call localContentRepository.list("patch-notes"). Both ordered published records retain their original title, summary, body and publishedAt. No new record/version is generated and no historical text is updated to imply current operational readiness. “Ngày đăng nội dung” and “Không phải ngày phát hành game” distinguish source posting dates from game release dates; vi-VN formatting uses UTC. The count refers to published notes, not downloadable builds.

The previously inaccessible full body is available through “Đọc toàn bộ bản ghi”, a native details/summary control. Both records expand independently: opening or closing one leaves the other unchanged, Enter/Space work and reload resets disclosures. No text is line-clamped. No custom toggle state, search or update controller is introduced.

The primary link opens and focuses the journal below the real sticky header; Tab continues into the first record. Cold direct URLs, malformed fragments and native Back behavior are checked through the unchanged ArticleFragmentRestoration helper. The four ordered routes open Status, Roadmap, Download conditions and Download Trust. They are reading destinations, not file downloads or update commands. The hero also links to the existing release explanation.

## Base First and scope

AnnouncementBoard gains one optional typed copy object with three labels: eyebrow, publicationNote and disclosureLabel. Its existing event labels remain exact defaults. Event-page source and CSS are unchanged. Patch notes supply their own publication wording without duplicating a list renderer or leaking event-date terminology.

All layout/CSS comes from existing shared owners. All 142 obsolete patch-note-only CSS lines are removed; every other service-layout.css byte equals baseline. No new CSS selector or app-global rule. AnnouncementBoard CSS, hero, priority panel, fragment helper, tokens, artwork/fonts, dependencies/lockfile, source content/contracts, site shell, Portal and Ops are unchanged. No historical game attachment is used to infer Web release capability.

## Tests, fixes and visual review

RED before implementation: nine new desktop route tests failed against the old page, and two new shared-copy tests failed; five existing component/selection tests remained passing. After implementation, focused patch/event browser tests passed34/34 and component tests7/7. Component coverage includes empty state, multiple records, HTML text escaping, published/category selection and caller-specific copy with exact event defaults.

An exact event DOM comparison caught one React SSR comment caused by splitting a former literal label into an expression plus a whitespace node. Visible copy and geometry matched, but raw DOM did not. Label plus trailing space now render as one string node. The failed comparison/logs are retained; no new DOM-normalization exception or geometry threshold was introduced. Rerun matches the event default markup exactly. A source guard also caught a missing barrel type export; the actual separate export-type statement was fixed and revalidated.

One final production build passed with63 static pages. Fresh production regression after the final implementation:530/530 PASS, zero failed/skipped/flaky across43 selected E2E files; the new page contributes18. All 288 build inputs were hashed and are rechecked at source closure and delivery. No earlier build's result substitutes for this run.

| Viewport | Document height | Hero bottom | Journal top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 1878 | 548.42 | 580.42 | 0 | 0 |
| 1280 × 800 | 1838 | 510.22 | 542.22 | 0 | 0 |
| 768 × 1024 | 2555 | 857.89 | 881.89 | 0 | 0 |
| 390 × 844 | 3194 | 1035.91 | 1059.91 | 0 | 0 |
| 360 × 800 | 3390 | 1052.91 | 1076.91 | 0 | 0 |

Five production captures have no page JavaScript errors, heading overflow or missing hero artwork. Both records were opened for expanded screenshots and axe checks; full-page captures reset scroll to top, while separate viewport captures show actual reading/focus position. At320px, tests require full source copy >=14px, actions >=44px and visible keyboard focus under normal/forced colors. Blocking decorative artwork leaves the source text and disclosure usable. Reading sends no fetch/XHR/non-GET request. These are Chromium emulation and main-content axe checks, not physical-device, screen-reader or WCAG certification.

Twenty-one unchanged pages were compared on desktop/mobile: 40 raw exact main-DOM matches and 2 generated-ID-only matches; all42 geometries match. The existing /performance-only ID normalization validates unique/resolved references and rejects altered visible text. Event-page DOM is not normalized. All baselines were freshly captured for this task with unique filenames.

Final source gate after this report/state update: UI/Web/Portal/Ops typecheck, UI/Web lint, component7 tests, next-route7 tests, clean-source current-state validation and git diff --check. Thirteen negative controls reject wrong category selection, altered source text/time, publication-as-release wording, update-action labels, invented release claims, broken focus, changed event defaults, unsafe HTML and an invalid trust link. Actual exits belong to closure-checks.json.

Only the exact obsolete compact patch-note validators/E2E v1.175 and v1.199 are HISTORICAL_SUPERSEDED, not counted as runtime PASS. The multi-route v1.85 source guard now inspects the extracted patch owner; the browser heading/overflow test and other routes stay unchanged. Review was inline source/browser review, not an independent reviewer-agent result.

## Coordination, delivery and limits

Owner waiver for stored-PID capacity remains; commands/PIDs are journaled locally. New pause/recovery/ownership checks stay active; worktree/runtime/port/branch claims are checked. Initial v2 status had no assigned task/batch/run. No Manager configuration, registry cleanup, identity/bridge key, process kill/restart or other-session mutation. Production preview uses own claimed loopback port3230. A listener is not background assistant work.

Only reviewed source/test/docs enter Git; handoff/screenshots/cache/secrets stay outside. Normal push, matching remote HEAD, verified full/delta/evidence ZIP/SHA256 and archive replay precede closure. No force-push or deployment command.

No game release versions, binaries, checksum/signatures, installer/launcher service, deployment status, patch downloads, account personalization or backend are invented. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. Native disclosure does not establish universal no-JavaScript access.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.253, `/news`; not started here.
