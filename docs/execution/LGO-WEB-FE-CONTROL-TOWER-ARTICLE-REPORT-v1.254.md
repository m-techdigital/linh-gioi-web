# WEB-FE-CONTROL-TOWER-ARTICLE-v1.254

Status: WEB_VERIFY_PASSED. Effective WEB_CLOSED requires the external delivery verification: reviewed commit, normal origin/main push with matching HEAD, ZIP integrity/SHA256 and exact baseline+delta replay.
Baseline: `78565c0c984663d3739285cbaf3dfb58f6f2a058`.
Session: `S-LGO-WEB-20260916-E6A1`; same main branch and `/Users/minhdc/Projects/LinhGioiOnline-Web` worktree.

## Real Browser UI/UX Layout First

Scope: only `/news/web-program-control-tower`, plus the shared optional article presentation it needs. The old page clipped the source introduction and detail bodies inside compact proof cards. The replacement has a source-titled hero, explicit posting metadata, existing world illustration, a contents column and two complete parchment article sections. Desktop separates contents and reading; mobile stacks them and lets native details close/reopen the contents. The registered Public Core target supplies the accepted palette, framing, art/editorial rhythm and unchanged shared navigation; the established GuideArticle layout supplies the actual article structure. It is rendered HTML, not an image replacing the page. Pixel-identical atlas artwork is not claimed.

Title, summary, body, publishedAt and both contentDetailSections records are consumed directly. Every heading/body/playerImpact/nonClaim is preserved. Labels identify Ý nghĩa cho người chơi and Phạm vi bài viết rather than pretending historical text is a live server status. The original timestamp is displayed as Ngày đăng nội dung, 05/09/2026 using vi-VN UTC formatting. It is not a game release date, new build or operational dashboard.

Two contents links and Phần trước / Về mục lục / Phần tiếp follow real section IDs. Native fragment navigation, Back/Forward, fresh direct URLs, malformed and unknown fragments are checked. The existing ArticleFragmentRestoration helper is unchanged. Four contextual links lead to Status, Release, Guides and News. The breadcrumb returns to the news library. The existing three related published articles stay in their original selection/order, with exact full summaries and actual article destinations; each was opened and returned from in the browser. No search controller, newsletter, saved reading progress, fake workflow approval or account state is added.

## Base First and precise changes

GuideArticle is reused unchanged. GuideChapterBody gains optional outcome/boundary labels; exact guide defaults remain. GuidanceTopicGrid gains an opt-in articles variant; existing topic shelves keep their markup and default layout. New related reading uses this base rather than duplicating card markup. PublicControlTowerArticle is thin domain composition, not a second article-layout owner.

Eight added shared CSS lines provide the three-column/one-column article-link variant, a14px minimum for source boundary text in the opt-in editorial context, and native instant anchor scrolling only when that context and reduced-motion preference are present. No CSS was added to globals.css. No existing CSS was deleted: service-layout.css is still used by the16 unchanged news articles, so deleting it would be a regression, not a legitimate size reduction.

The dynamic news route specializes exactly the selected slug after its existing category/notFound guard and related selection. Its generic return branch for the other16 articles remains byte-for-byte unchanged. No changes to source content/contracts, tokens, artwork/fonts, dependencies/lockfile, shared shell, fragment helper, catalog, Portal or Ops. Whole-article routing and classification are not generalized or silently changed here.

## Tests and defects fixed

RED before implementation:11 desktop article tests failed;3 new shared-label/variant component cases failed while1 existing guide-default case passed. First browser GREEN attempt produced60 PASS/2 FAIL: a320px measurement correctly rejected13.28px boundary copy. The optional editorial minimum now makes it at least14px without resizing existing guides.

A reading screenshot also showed focus reaching the target before the native smooth-scroll animation completed. A measured trace distinguished this from a missing target: desktop moved from top1366.42px to88.42px; mobile moved from1568.63px to143.63px. Both settled below the header. The actual defect was that reduced-motion requests still received global smooth scrolling. Two new reduced-motion tests failed with computed smooth before the scoped CSS fix, then passed with auto and immediate visible arrival. No arbitrary timer, polling controller or global motion rewrite was added. The diagnostic samples, failed assertions and first screenshots are retained. Final captures show the intended second section under the header.

Focused browser result after fixes:64/64 PASS across the new article, previous news discovery and player-trust guide. New shared component4/4 PASS. Final source/runtime closure rechecks the existing reading6 and announcement7 component cases.

One final production build passed with63 static pages. Fresh production regression:616/616 PASS, zero failed/skipped/flaky across65 selected files;24 tests belong to the new article. The suite includes all previously selected news/guide/support/release regressions except the exact retired compact control-tower snapshot v1.177. Retired tests are HISTORICAL_SUPERSEDED, not counted as runtime PASS. The other news article tests remain active. All290 runtime input hashes are rechecked before commit and delivery; later report/tooling edits do not invalidate those unchanged compiled inputs.

| Viewport | Document height | Hero bottom | Article top | Related columns | Horizontal overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 2909 | 633.59 | 665.59 | 3 | 0 | 0 |
| 1280 × 800 | 2872 | 625.19 | 657.19 | 3 | 0 | 0 |
| 768 × 1024 | 3704 | 842.62 | 866.62 | 1 | 0 | 0 |
| 390 × 844 | 4783 | 1013.75 | 1037.75 | 1 | 0 | 0 |
| 360 × 800 | 4788 | 1039.67 | 1063.67 | 1 | 0 | 0 |

Five production viewports have no horizontal/heading overflow, page JavaScript error, missing cover or main-content axe violation in the selected WCAG tags. At320px, source paragraphs in all three section fields are at least14px and visible links/summary controls are at least44px high. Normal/forced-colors focus is tested. Missing decorative artwork does not hide source text or prevent section navigation. In-page reading sends no fetch/XHR/non-GET request and leaves browser local/session storage unchanged. This is Chromium emulation and scoped axe testing, not physical-device, screen-reader or WCAG certification.

Twenty-five unchanged surfaces were compared on desktop/mobile. In addition to dev-before screenshots, fresh compatibility baselines were captured from the unchanged v1.253 production server before rebuilding; its selected route was verified not to contain the new renderer. Final comparison: 50 exact raw main-DOM matches, 0 generated-ID-only matches, all50 geometries identical. The pre-existing generated-ID comparison for /performance and /guides validates unique/resolved label references and rejects altered user-facing text. No other markup/geometry normalization is introduced.

Final source gate after report/state changes: typecheck UI/Web/Portal/Ops, UI/Web lint, article4 + reading6 + announcement7 component tests, next-route13 tests, clean-source current-state validator and git diff --check. Fourteen negative source controls reject the wrong article selection, rewritten fields/dates/links, changed guide defaults, broken focus, smaller typography, broken reduced-motion scope, altered default topic variant and injected form. Actual exits are in closure-checks.json. Review is inline source and browser review, not an independent reviewer-agent result.

## Coordination, delivery and limits

The previous own pause remained acknowledged at preflight. The owner's latest direct request explicitly resumed the task; only that exact known pause timestamp1789544480.973881 was cancelled, then a fresh check returned0 and the existing worktree claim was verified. No recovery hold, pending successor, assigned v2 task/batch/run or new inbox directive was present. Fresh pause/recovery/ownership checks continue before batches. The stored-PID capacity waiver remains; commands and own PIDs are journaled locally. No Manager configuration, bridge identity/token, other-session claims or source are changed, and no process is killed/restarted.

Only reviewed source/test/docs are staged. Normal push, exact remote HEAD and full/delta/evidence ZIP/SHA256 with clean archive validation and content-exact replay precede closure. Existing services/claims remain; the new loopback production preview is3232. A running listener does not imply background assistant work. Final session state is WAITING_USER after delivery.

No new articles, author identities, publication dates, game release/builds, live news, backend, registration, personal data collection or entitlement. No production auth. No DB persistence. No independent backend. No CMS. No production deployment. NO_ACCEPTED_BACKEND_CONTRACT.
Whole-app JavaScript-disabled streaming remains open. Native article links/disclosure do not establish universal no-JavaScript rendering.

Next after verified delivery only: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.255, `/news/public-ux-content-polish-started`. That page is not redesigned in this task.
