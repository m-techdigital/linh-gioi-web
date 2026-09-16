# WEB-FE-EVENTS-ANNOUNCEMENT-BOARD-v1.251

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires the external delivery manifest: reviewed commit, normal origin/main push, exact remote HEAD, full/delta/evidence ZIP integrity/SHA256 and baseline+delta replay.
Baseline: `03c7bec5792f42bc233108eaefbcddf5ea6e344e`.
Session: `S-LGO-WEB-20260916-E6A1`; existing main and `/Users/minhdc/Projects/LinhGioiOnline-Web` retained.

## Real Browser UI/UX Layout First

Scope: `/events` only. The old page placed one tiny clipped card inside a mostly empty proof grid, with repeated status CTAs. The new page is an editorial community notice board: illustrated framed hero, explicit static boundaries, full-width parchment announcement, expandable full body and four contextual reading routes. Desktop separates publication metadata from the notice; mobile stacks metadata and full text without line-clamping. Public Core navy/gold/jade/editorial styling, existing illustration and the accepted shell/header/footer/navigation form the comparison target, explicitly registered for /events. Pixel-identical atlas artwork is not claimed.

Source currently supplies one published event record, “Lễ hội Linh Khí”. The route still uses localContentRepository.list("events"), not a copied event dataset. Title/summary/body/publishedAt are consumed directly. The previously inaccessible body is now readable via a native details/summary control. Enter and Space open/close it, focus remains on the summary and reload resets its browser-local disclosure. No form, custom toggle state, search controller or event service was added.

Posting date is derived from source publishedAt using fixed vi-VN formatting with UTC, and labelled “Ngày đăng nội dung” / “Không phải ngày tổ chức”. Publication status is never derived from the current date or treated as a live schedule. The source's future-event, no-registration, no-reward and unaccepted-backend boundaries remain explicit. No count of live events or participants is invented: the displayed count refers only to published announcements.

The primary hero link scrolls to and focuses the notice board below the actual header using unchanged ArticleFragmentRestoration with a single whitelisted target. Tab continues into the real summary. Cold direct URLs and malformed fragment controls are checked. Reading routes open Status, Roadmap, Community and FAQ, then Back returns normally. Failure to load the decorative illustration leaves the full source notice and actions usable.

## Base First / implementation scope

New shared AnnouncementBoard in packages/ui is a small server-rendered editorial list: title, summary, full body, publication metadata and native disclosure, plus an honest empty state. Existing ReadingCatalog and VisibilityCatalog were reviewed and rejected for this purpose because their search/filter state would be unnecessary for the single static notice. The board reuses shared paper/frame/icon primitives. Its generic CSS owns notice layout, dates, disclosures and route-grid presentation; no app-global block or duplicate state machine.

The existing ExperienceHero, ReadingPriorityPanel, SectionHeading, links and fragment helper are unchanged. The route composes those with PublicEventsExperience and the source repository. All 142 events-only legacy CSS lines were removed; every remaining service-layout.css byte matches baseline. Package manifest changes only export the new stylesheet. Dependencies/lockfile, content/contracts, tokens, assets/fonts, globals, common shell, Portal/Ops and existing base implementations remain unchanged. Historical game attachments are not used to infer live event scope.

## Tests and review

RED: 8 new desktop tests failed against the old renderer. First GREEN had14 PASS and2 focus checks fail because the test clicked a summary and then re-focused the same node before asserting :focus-visible. Direct instrumentation proved pointer focus had outline none while real Tab/Shift+Tab return had outline solid. The test now uses actual keyboard travel; assertions and thresholds are retained. No production CSS workaround was added. GREEN rerun16/16 PASS. Failure logs and modality evidence remain in the handoff.

Four real React server-rendering/component tests cover the empty list without invented notices/dates, multiple independent ordered disclosures, HTML escaping of source strings and the existing repository's published-only/category filtering. The synthetic future publication date remains a publication record rather than a computed event schedule. Tests use existing React/Vitest installations and a focused config with passWithNoTests=false; no new dependency.

One final production build succeeded with63 static pages. Fresh production regression executed512/512 PASS, zero failed/skipped/flaky across42 selected E2E files. The new events suite contributes16. Runtime heading-order v1.85 tests remain unchanged and active. All 287 runtime source/config inputs are hashed and rechecked at closure/delivery.

| Viewport | Document height | Hero bottom | Board top | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 1569 | 551.61 | 583.61 | 0 | 0 |
| 1280 × 800 | 1542 | 551.61 | 583.61 | 0 | 0 |
| 768 × 1024 | 2041 | 843.33 | 867.33 | 0 | 0 |
| 390 × 844 | 2522 | 947.36 | 971.36 | 0 | 0 |
| 360 × 800 | 2662 | 1020.91 | 1044.91 | 0 | 0 |

Expanded full-page capture at the current scroll position initially placed the fixed header/hidden skip-link offset inside the long image. A separate actual-viewport capture confirmed the header at y=0 and inactive skip link above the viewport (bottom=-12px); a top-reset full capture was saved separately, without changing page code or interaction focus.

Five production captures have no page JavaScript errors, overflowing headings or missing hero art. Expanded full notices are captured too. 320px tests require authored copy at least14px and all page actions at least44px. Standard and forced-colors keyboard focus are checked. Axe scans main content using selected WCAG tags; this is Chromium emulation, not physical-device/screen-reader testing or WCAG certification.

A filename collision initially gave both the community guide and community hub the capture key community, overwriting two before records. Comparison rejected this; no UI source changed. Keys are now unique and both capture scripts reject duplicates before writing. The two guide baselines were recovered byte-for-byte from the SHA256-verified v1.250 evidence ZIP at the current baseline commit; the other40 before records are fresh for this task. The first failed logs/partial records are preserved, and final comparisons ran again on the unchanged production build.

Twenty-one unchanged pages were compared at desktop/mobile: 40 raw exact main-DOM matches and 2 generated-ID-only matches; all42 measured geometries match. The only existing normalization is /performance generated-ID spelling with bijective mapping, unique/resolved references and a negative altered-copy control. Normalized markup is not called byte-identical.

Final source gate after docs: UI/Web/Portal/Ops typecheck, UI/Web lint, component4 tests, next-route7 tests, clean-source current-state and git diff --check. Eleven negative controls reject wrong repository selection, altered summary/body/time, publication-as-event wording, invented live claims, removed focus restoration/target/style, fabricated empty content and unsafe HTML insertion. Actual exits belong to closure-checks.json, not inferred from this report.

The initial local clean-source helper command failed because that helper did not exist in the prior checkpoint folder; its exit2 log is preserved. A new checker then ran for real. Only the two exact obsolete compact events validators/E2E v1.174 and v1.198 are HISTORICAL_SUPERSEDED, not counted as runtime PASS. The multi-route heading source guard now reads the extracted events owner; other routes and the browser test were not loosened. Review was inline source/browser, not an independent reviewer-agent result.

## Coordination, delivery and limits

Owner's stored-PID-capacity waiver remains; command/PID metadata lives in local-process-journal.jsonl. New pause/recovery/ownership/worktree/runtime/port/branch checks remain. The existing session received and acknowledged operator inbox M-efca73df3fc3. No assigned v2/v3 task/batch/run was present; no task was silently upgraded. No identity/bridge key, Manager cleanup/config, process kill or other-session mutation. New own loopback production preview is3229; listeners do not mean background assistant work.

Reviewed source/test/docs only are committed. Normal push, remote HEAD, ZIP/SHA256/replay and archive validator precede effective closure. No force-push; no deployment command.

No live calendar, event dates/countdowns, RSVP/sign-up, participation slots, rewards, personal history, telemetry, account lookups or event backend. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. Native disclosure in the served page does not establish whole-app no-JavaScript support.

After verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.252, `/patch-notes`; not started here.
