# WEB-FE-HOMEPAGE-FINAL-DENSITY-v1.265-r6

Status: WEB_VISUAL_REVIEW_REQUIRED. Same parent task WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265, same active route `/`. This revision does not open /game or resume the deferred /news queue.

Baseline: fe4ef4a258895d0ababc7a579006d696589f8421 (homepage r5). Branch main and /Users/minhdc/Projects/LinhGioiOnline-Web unchanged.

## Why revision6

After r5, the remaining visible mismatch was density rather than missing art: the immersive header still carried eight route links while the target uses a shorter primary set, and the hero had an extra technical badge plus a descriptive sentence between the target's tagline/motto/actions. These were truthful but visually redundant.

The immersive header now has six primary links: Trang chủ, Thế giới, Lộ phái, Tính năng, Cộng đồng, Tin tức. They map to existing real routes /, /game, /classes, /game/loop, /community and /news. Default non-immersive navigation keeps its prior primaryItems and route semantics unchanged. The header retains the r5 cyan source sigil, brush wordmark and truthful Trạng thái chơi action rather than copying unsupported login/download controls from the target.

The homepage hero now has no technical status badge and no extra descriptive prose line. Shared ExperienceHero gained one optional `motto` slot; the homepage passes the existing live-text motto through that slot and does not pass badge/lead. Existing consumers keep their badge and lead behavior. Visual order is now brush wordmark → Sống một đời khác trong Linh Giới → KIẾP NÀY... motto → three framed actions → four truthful signals.

The first attempted source edit only made ExperienceHero props optional because r5 had moved motto and prose into one lead node. Focused RED caught the still-rendered badge on both profiles. Source inspection established the root cause; the correct shared motto slot was then added. Focused browser20/20 and action-link component6/6 passed after the fix.

Full production run initially reached154/156; both failures were the same real readability issue: the now-semantic motto paragraph was12px at320px, while the homepage guard requires visible paragraph copy ≥14px. The test was not relaxed. Mobile motto is14px with narrower decorative lines. The exact failing 320px test then passed2/2, followed by a fresh build and full selected rerun.

## Final verification

Fresh final production selected regression:156/156 PASS in10 files; zero failures, skips or flaky cases. This includes all r5 homepage/browser coverage plus6 new r6 cases across desktop/mobile. Build generated63 static pages. UI/Web/Portal/Ops typecheck and UI/Web lint PASS. Shared action-link component6/6 PASS.

Four production captures at1440/768/390/320 have no horizontal document overflow or page JavaScript error. The final desktop/mobile screenshots were inspected directly. Sixteen immutable r5 sibling comparisons across eight non-home Web routes match main DOM, header DOM, measured geometry and document height exactly; this proves no observed regression, not design acceptance of those routes. Final runtime-input set contains331 hashes and is unchanged after the tested build.

The first full run154/156, focused RED/failed GREEN traces and all subsequent corrected evidence are retained. No failed result is relabeled PASS.

## Design/non-claims

R6 intentionally does not copy the target's login button, live server claim, platform availability or enabled download state. `Tính năng` routes to the existing gameplay-loop reading page; it does not claim a live game service. The public build remains informational FE. No independent backend, production auth, DB persistence, CMS, player-count telemetry or Internet production deployment.

All major target regions and the final target-density details registered in this task are implemented. Keep WEB_VISUAL_REVIEW_REQUIRED for owner acceptance. If accepted, the next main page may be /game; otherwise continue only `/`.
