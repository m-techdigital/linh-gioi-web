# WEB-FE-HOMEPAGE-LOWER-MEDIA-FOOTER-v1.265-r4

Status: WEB_VISUAL_REVIEW_REQUIRED. Same parent task WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265, route `/`. This revision finishes the known lower-page composition gaps; it does not silently accept the design or advance to /game. The previous /news queue remains deferred.

Baseline: aea361703057c2e81738ba2badafa7a250994671. Branch main and the same Web worktree. No checkout/reset/restore.

## Browser-visible changes

The lower Khám phá/Bản tin area now follows the original design rhythm more closely. The discovery lead no longer uses the bright independent Dong Mon skyline. It uses a dark 500×240 night-city crop from the existing homepage design source, while all title/copy/links stay live HTML. An initial 500×300 crop visibly retained a fragment of the mockup CTA at the lower edge; that artifact was caught by image review, rejected, and recropped from the same source. The rejected image remains only in local evidence.

The three news cards no longer recycle the feature-card images. They use three distinct editorial crops from the design: event lantern scene, moonlit city and sunset community scene. The cards remain source-driven: title, original publishedAt, complete summary and /news/{slug} destination are unchanged. There is one title link plus one native summary disclosure per article, not duplicated controls.

The immersive homepage footer is now a compact three-part composition like the design: original brush wordmark + tagline, live Status/Roadmap/Support links, and a truthful availability status. It deliberately does NOT copy unsupported Windows/Android/iOS availability, “server stable” status, login or game-download claims from the mockup. The public state remains “Bản public chưa mở”, with a real /download route labelled “Xem trạng thái chơi”. Non-immersive pages retain the existing generic footer unchanged.

Desktop keeps discovery/news aligned side-by-side with equal measured height in the tested layout. Mobile stacks discovery, three full-width editorial cards and a one-column compact footer. The r3 hero, original brush brand, native artwork, header, current-home link, framed CTA icons/descriptions and feature links are preserved.

## Shared ownership

New reusable owners live in packages/ui: EditorialPreviewCard and MarketingFooter, with home-editorial.css. PublicHomeLanding now only composes these owners. PublicSiteShell selects MarketingFooter only for the immersive variant; default routes keep the exact legacy footer owner/markup. Existing page-local news-card and availability selectors were removed from marketing-layout.css rather than duplicated.

A browser typography regression caught one real cascade issue after extraction: legacy `.lgo-public-shell main h3/p` overrode the new card owner. The shared selector was made explicit inside `.lgo-editorial-preview-copy`; no global CSS change and no test threshold relaxation. Component/source tests and real browser reruns prove the corrected owner.

## Artwork provenance

Four new assets are integer crops from homepage-detailed-design-target-v1118.png, whose SHA remains ecf58cb2af080587e3be3b07430640b9765eb6b8319facc5bc9ad16e8eecef9e: discovery-world500×240, news-event242×91, news-update244×91 and news-community244×91. lower-art-provenance.json records rectangles and file hashes. No resize, redraw, generation or inpainting. The discovery crop intentionally avoids the center mockup buttons. Pixel validation compared every crop pixel to the registered source:120000+22022+22204+22204 pixels with zero mismatches; an in-memory altered pixel is rejected by the negative control.

The design’s lower discovery screenshot itself contains a baked play/logo/trailer label, so it is NOT embedded. The footer’s mock platform/server badges are also NOT embedded. This preserves truthful live semantics while using only appropriate artwork.

## Verification

TDD: home-editorial component suite first failed because the owner did not exist. Homepage composition SSR then failed2/3 against the old lower composition. New component suites pass: home-editorial4/4 and homepage-composition3/3. Existing action-link5/5, wordmark4/4, illustrated-navigation4/4 and publication-frame4/4 remain green.

The first real-browser r4 pass yielded48/56: all six new lower-composition cases passed; eight failures were old selectors/count assumptions after ownership moved. Tests were updated to the new shared card owner and the footer's legitimate third wordmark. The second run reached54/56 and exposed one real CSS cascade defect; source was fixed in the shared card owner. The final focused homepage run is56/56 PASS.

Final selected production regression:144/144 PASS in9 files, zero failed/skipped/flaky. It includes56 homepage cases plus unchanged News, guide, safety/support and navigation coverage. Production build generated63 static pages. UI/Web/Portal/Ops typechecks and UI/Web lints PASS. Same-task route tooling and both native/lower artwork provenance validators PASS. No Portal/Ops browser runtime is claimed.

Four final production screenshots at1440/768/390/320 show no horizontal overflow or page JavaScript errors. Main-content accessibility checks remain in the browser suites; this is not physical-device/screen-reader/WCAG certification. Sixteen comparisons on eight unchanged Web routes across desktop/mobile match the immutable r3 production snapshots in main DOM, header DOM, measured geometry and page height. Those matches prove no observed regression, not visual acceptance of those pages.

The final tested runtime input set contains329 files and hashes are unchanged after the run. A clean copied-source current-state validator and git diff check are required again after docs before commit.

## Runtime caveat

At r4 start both preview listeners were absent although their claims remained. ctl2/process.ensure returned connection refused because the Manager HTTP API was offline; ctl.py check still worked and showed no pause/recovery/conflict. No Manager service/config was restarted or modified. Under the owner's prior test-environment waiver, dynamic verification used command-scoped `next start` on the already-owned fixed3236 port only, with shell cleanup/SIGTERM after each test command. No new port or background server was left behind. This is recorded as a process-management limitation, not a normal process.ensure REUSE claim.

## Remaining visual review

The homepage now covers all major registered target regions: header identity, native hero/wordmark, three framed CTAs, three feature cards, discovery/news composition and compact footer. Deliberate semantic differences remain: no fake login/download/server/platform badge, and the source artwork is a flattened target rather than a standalone high-resolution master. Keep WEB_VISUAL_REVIEW_REQUIRED until owner acceptance. If accepted, next page is /game; otherwise continue `/` only.

No independent backend, production auth, DB persistence, CMS, fake live population/server status, game download or Internet deployment.
