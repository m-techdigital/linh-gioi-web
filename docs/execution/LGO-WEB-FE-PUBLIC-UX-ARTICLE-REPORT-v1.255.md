# WEB-FE-PUBLIC-UX-ARTICLE-v1.255

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires the external delivery verification: reviewed commit, normal origin/main push with matching HEAD, ZIP integrity/SHA256 and content-exact baseline+delta replay.
Baseline: `42aa7fc7bb9ee3ccb1565be18f9dba6318063b64`.
Session: `S-LGO-WEB-20260916-E6A1`; unchanged main and `/Users/minhdc/Projects/LinhGioiOnline-Web`.

## Real Browser UI/UX Layout First

Scope is `/news/public-ux-content-polish-started` and extraction of the shared article frame required by this second article. The replacement turns clipped compact proof cards into an illustrated editorial hero, authored posting date, two source-complete parchment sections, desktop contents column/mobile native contents disclosure, and original related article cards. Registered Public Core colors, framing, illustration and unchanged common header/footer are the comparison guardrail. Actual HTML and links are rendered in a browser; no design screenshot replaces the page and no pixel-identical atlas claim is made.

The existing title Bắt đầu polish UX và nội dung public, summary, body, publishedAt and both contentDetailSections records are used unchanged. Section heading/body/playerImpact/nonClaim remain exact source text. Labels explain Ý nghĩa cho người chơi and Phạm vi bài viết; dated historical website text is not represented as current game operation. The original posting timestamp displays as Ngày đăng nội dung, 05/09/2026, using vi-VN and UTC. No publication date, author, game release or availability is invented.

Two real contents links, previous/next, return-to-contents and direct fragment URLs select actual sections and receive focus below the sticky header. Native contents disclosure closes/reopens without hiding the article. Keyboard, Back/Forward, malformed and unknown fragments, missing decorative artwork and reduced-motion immediate arrival were verified. Six contextual links navigate to Home, Game, Roadmap, Download, FAQ and News; their source destinations were opened and returned from in the browser. Breadcrumb returns to News. Original related selection remains the first three other published news entries with unchanged titles/summaries and real links. This is a reading experience, not saved progress, registration or access authorization.

## Base First: one shared owner, no CSS expansion

The previous Control Tower article markup is now owned by `PublishedArticle` in packages/ui. It composes existing ExperienceHero, GuideArticle, GuideChapterBody, GuidanceTopicGrid and links; no second state/navigation system was added. Its typed structural entry/section/related/copy/link inputs keep domain selection in apps/web. Both PublicControlTowerArticle and PublicUXArticle are thin source/label/link compositions. Original Control Tower visible copy, classes, layout and interactions remain unchanged and are independently checked in the existing browser suite and exact DOM/geometry comparison.

The dynamic news route adds only the exact public-UX slug specialization after the existing category/notFound guard and related selection. The generic return branch for the15 remaining article pages is byte-for-byte unchanged. No duplicate hero/article/related-card markup remains in the two wrappers.

Zero CSS added, removed or modified. The existing article typography, focus, responsive layout and reduced-motion correction from v1.254 are reused. The generic service/news CSS must remain because the15 unchanged articles still use it. No globals.css, tokens, artwork/fonts, source-content/contracts, dependency/lockfile, shell, fragment helper, catalog, Portal or Ops changes. No game/backend work. The historical game attachments in this conversation are not the authoritative source for this independent Web task.

## Verification

Continuation first reconciled actual HEAD/remote, working-tree changes, preflight/RED logs and old PIDs after the UI interruptions. The only unfinished source artifacts were three new test files; no prior v1.255 tracked production edits were present. Prior capture and RED jobs had ended. No pause, recovery hold, pending successor, assigned v2 batch/run or inbox instruction blocked continuation. The completed v1.254 commit/push was not rerun.

Existing RED evidence:12 desktop UI cases failed against the old article before implementation. On resumption, the structural component suite could not collect because PublishedArticle did not exist; this is explicitly an import/collection failure, not4 executed failing assertions. After extraction, its4 cases executed and passed: source/date fields, caller labels/links, empty related data and escaped text. Targeted new article + Control Tower + news library:70/70 PASS.

One new production build passed with63 static pages. Fresh selected production regression:638/638 PASS, zero failures/skips/flaky across65 files;24 tests are for the new article. Only the exact obsolete compact UX article v1.178 test/validator was superseded; it is historical evidence, not runtime PASS. All previously selected other article tests remain active. The v1.254 source guard now follows source selection in its thin wrapper and rendering assertions in the actual shared owner. The new v1.255 guard adds its exact source scope and labels. No browser assertions were loosened.

| Production viewport | Document height | Hero bottom | Article top | Related columns | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 2966 | 633.59 | 665.59 | 3 | 0 | 0 |
| 1280 × 800 | 2852 | 625.19 | 657.19 | 3 | 0 | 0 |
| 768 × 1024 | 3723 | 842.62 | 866.62 | 1 | 0 | 0 |
| 390 × 844 | 4986 | 1039.67 | 1063.67 | 1 | 0 | 0 |
| 360 × 800 | 5111 | 1039.67 | 1063.67 | 1 | 0 | 0 |

Five production viewports have no document/heading overflow, page JavaScript error, missing cover or detected main-content axe violation in selected tags. Screenshots include the first fold, complete page and actual second-section arrival. At320px the three source fields are at least14px and visible links/summary controls at least44px high. Normal/forced-colors focus and reduced-motion are tested. In-page reading changes neither browser storage nor sends fetch/XHR/non-GET requests. Chromium viewport emulation and scoped axe are not physical-device, screen-reader or WCAG certification.

Twenty-five unchanged surfaces were compared at desktop/mobile using previously captured v1.254 production baselines: 50 exact raw main-DOM matches, 0 generated-ID-only matches, all50 measured geometries identical. This includes the delivered Control Tower article, news library, guides and release/support siblings. Only the pre-existing /performance and /guides generated-ID comparison is permitted, with unique/resolved label references and negative altered-copy controls. No new normalization exception or relaxed geometry threshold was introduced.

An interim dev-versus-production comparison stopped at the news library's generated React IDs (production _R_19lfivb_ versus dev _R_19pbn5rlb_); measured geometry matched. That dev failure and exact diffs are retained. It was not masked or counted as a complete compatibility PASS. Final production-to-production comparison above provides closure evidence, without changing the UI or comparator to pass it.

Final source gate after state/report: UI/Web/Portal/Ops typecheck; UI/Web lint; published-frame4 + article-primitive4 + reading6 + announcement7 component tests; next-route13 tests; clean-source current-state and git diff --check. Fifteen negative source cases reject wrong slug/section selection, changed original fields/date/links/wrapper binding/caller label, changed guide defaults, missing focus, broken reduced-motion and intake. Actual command exits are in closure-checks.json. All292 runtime input hashes are checked again before commit and delivery. Review is inline source/browser review, not an independent reviewer-agent result.

## Delivery, coordination and limits

Owner authorizes normal commit/push and per-page handoff. Only reviewed source/tests/docs enter Git; no handoff ZIPs, build outputs, cache or secrets. Verified remote HEAD, full/delta/evidence ZIP integrity/SHA256, clean archive validation and content-exact baseline+delta replay precede closure. Production preview is local loopback3233, not a deployment. Existing services and claims stay intact. Final registry status is WAITING_USER; a listening server does not mean the assistant is running background work.

Stored-PID capacity waiver remains, with command/own-PID local journaling. Fresh pause/recovery/ownership checks remain active. No Manager configuration, SQL status rewrite, token/bridge identity, other-session claims, process kill/restart, branch/worktree switch or source rollback.

No new source articles, live feed, CMS, backend, personal data intake, account/auth, DB persistence, game release/download entitlement or production deployment. NO_ACCEPTED_BACKEND_CONTRACT. Whole-app JavaScript-disabled streaming remains open; native article links do not prove universal no-JavaScript access.

Next after verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.256, `/news/visual-responsive-polish-started`; not implemented here.
