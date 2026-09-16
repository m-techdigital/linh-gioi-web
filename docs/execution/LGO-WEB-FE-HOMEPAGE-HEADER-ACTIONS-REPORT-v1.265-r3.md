# WEB-FE-HOMEPAGE-HEADER-ACTIONS-v1.265-r3

Status: WEB_VISUAL_REVIEW_REQUIRED. Turn outcome: CONTINUE. Same parent task WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265 and route `/`; no automatic move to /game or the deferred news queue. This revision is visible engineering progress, not owner visual acceptance.

Baseline: dfc20411cfc0d7c8824add12184bdd96708b048d. Branch main, /Users/minhdc/Projects/LinhGioiOnline-Web, session S-LGO-WEB-20260916-E6A1. No checkout/reset/restore. Before continuing, the previous completed r2 package was reconciled read-only: actual commit/remote, ended packaging PIDs, all checksum entries and ZIP integrity matched. Only the missing final delivery record was written and the finished own handoff claim released. No old build/commit/push/package rerun.

## Real homepage changes

The header now uses the same original brush wordmark as the hero, replacing the unrelated square sigil/block text on the homepage variant. It has a compact reserved image area and live fallback. A real Trang chủ link is inserted before the unchanged primary route list and is the single current item on `/`, with an underline rather than an active pill. The right-hand Trạng thái chơi still leads to /download; no fake login or download action was introduced.

Mobile keeps its header compact with a horizontal, touch-scrollable menu. All eight links have44px targets. Keyboard traversal uses normal Tab order and the existing RouteAwareLink now optionally reveals the whole focused item immediately. Native focus alone was reproduced leaving Cốt truyện partly clipped: right324.140625px on a320px viewport, still clipped after220ms. The opt-in nearest reveal fixes the actual clipping without changing focus, adding arrow-key traps or affecting other routes by default.

The three main links now have separate decorative icons, titles and14px/400-weight descriptions inside beveled corner frames: compass/Khám phá Linh Giới → /game; lotus/Chọn Lộ của bạn → /classes; book/Bắt đầu câu chuyện → /story. The book is intentional: this opens actual story text, not the mockup's unsupported video or download. The outer clickable anchor is not clipped; only decorative pseudo-elements use polygon frames, so the focus outline and full native hit target remain usable. Blue, jade and gold presentation retain clear action hierarchy.

All original brush artwork and scene/crop bytes are unchanged from r2. No image regeneration, enlargement, recoloring, font files or new asset was introduced. The homepage's content records, timestamps, summaries, article links, feature/discovery routes, and honest Bản public chưa mở boundary are unchanged.

## Shared implementation

LinkButton receives optional decoration metadata; the default markup stays byte-for-byte equal in its component test. ExperienceHero, MediaFrame and PageHeader forward optional icon/description/variant through that same owner, not a duplicate page-specific button. Existing ReleaseIcon gains three small SVG symbols. Presentation lives in packages/ui action-link.css and marketing-navigation.css; the old homepage-only button styling is removed from marketing-layout.css. No new selectors are appended to globals.css and no dependency changes are made.

PublicNavigation remains one owner with an opt-in immersive variant. Only the homepage opts into the brush header/current-home link; other public routes retain their existing header and layout. This is not a claim that all early pages have been redesigned. ArtWordmark is reused, so existing hero tests now correctly scope their locators to main h1 rather than treating a second legitimate header instance as a duplicate.

Visual review caught an undefined font token in the first implementation: --lgo-font-body invalidated the caption shorthand and inherited800-weight16px type. The actual token --lgo-font-sans is now used. A computed-style RED test preceded the correction, and the final captions are14px/400 weight. Original rejected screenshots and failed checks remain in evidence.

## Production evidence and its limits

Final selected regression:132/132 PASS across8 files, zero failed/skipped/flaky.44 cases are homepage tests, including10 new header/action cases. Source/native-art cases, original routes, current route markers, Tab focus, forced colors, image error fallback and enlarged text spacing remain covered. Header plus main axe checks and44px menu/action targets passed; this is not physical-device, screen-reader or WCAG certification.

The first production selection failed because some checks interacted with a still-hidden streamed subtree. A real timing probe observed document.readyState complete at168.6ms with h1 height0 under [hidden]; visible rendering arrived at382.5ms. Raw .focus()/DOM geometry reads did not wait for rendered UI. A shared test helper now waits for visible hero/h1 and current-route hydration before initial input, Back and Reload. Keyboard focus-visible checks use real Tab input rather than programmatic-only focus. No time budget, pixel threshold, assertion or app source was relaxed, and no failing case was skipped. The original failed run remains separate; only the final132 result is reported as PASS. This wait proves the rendered interaction, not the absence of an initial streaming delay or universal no-JavaScript rendering.

One production build generated63 static pages. The same build was reused for the corrected visibility-precondition run because runtime source was unchanged.322 runtime-file hashes are locked and rechecked. Four production captures at1440,768,390 and320px show no horizontal overflow or page JavaScript errors. Desktop and mobile images were viewed after production verification.

Shared component tests:17/17 across action links5, wordmark4, illustrated navigation4 and publication frame4. Same-task route-state tooling17/17 PASS. UI/Web/Portal/Ops typechecks and UI/Web lints PASS. Portal/Ops browser runtimes were not started or claimed. Native artwork provenance checks still pass against unchanged original pixels and detect the in-memory negative control.

Eight unchanged public routes across desktop/mobile match fresh dfc2041 production-before captures in main DOM, header DOM, measured geometry and full document height:16/16. No generated-ID normalization or tolerance was introduced. Those comparisons mean no observed regression, NOT that the sibling pages already match their designs.

## Coordination, delivery and next work

Only dev3221 and production3236 remain. process.ensure was followed by actual own PID/UID/start-time/cwd/executable/journal checks. One local helper first stopped before signaling because it expected the older launch label instead of r2's final label; the still-live exact process was rechecked and only the journal-label lookup corrected. The subsequent verified own listener received SIGTERM and its parent ended naturally. No other-session process, Manager configuration, old operator REVIEW task, new port or forced kill was involved.

Normal source commit/push with remote HEAD verification and full/delta/evidence ZIP/SHA/replay deliver this revision, not final visual closure. All failed/diagnostic evidence is retained. The only dashboard task visible for this session is the old v1.255 operator-review task; it is not repurposed or falsely finished for the homepage. Session progress and immutable local evidence track this direct owner request.

The homepage remains the active task. Next concrete permitted work is the lower Khám phá/Bản tin media composition and footer comparison: review the bright lead image and repeated feature/news thumbnail treatment against the existing design, using only appropriate available art and real source content. Keep this verified header, action behavior and native artwork intact. Do not switch to another page merely because the revision is packaged. No independent backend, production auth, database persistence, fake live population/server status, game download, CMS or production deployment.
