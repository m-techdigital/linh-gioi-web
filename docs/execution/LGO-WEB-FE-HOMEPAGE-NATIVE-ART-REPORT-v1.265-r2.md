# WEB-FE-HOMEPAGE-NATIVE-ART-v1.265-r2

Status: WEB_VISUAL_REVIEW_REQUIRED. Same active task WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265; route `/`. This revision delivers tested visual improvements, not final acceptance or permission to advance to another page. The news queue remains deferred.

Baseline: 69465d3a684b7287628acdca53923d04f87d273c. Branch main and worktree /Users/minhdc/Projects/LinhGioiOnline-Web unchanged. Session S-LGO-WEB-20260916-E6A1. Current Web source, not the attached historical game foundation reports, governs this work.

## Actual visual changes

The generic italic serif title is replaced in the loaded state by the original brush wordmark from homepage-detailed-design-target-v1118.png. The source design is unchanged. The extracted transparent PNG is422×169; the real h1 retains the accessible name Linh Giới Online. A shared ArtWordmark owner reserves its aspect ratio, shows live text before load/on image failure, handles already-cached image completion and restores visible text in forced-colors mode. The decorative image and visual fallback do not duplicate the accessible name.

The old225×245 city crop was measured at748.796875 CSS pixels wide on1440px desktop. It is no longer used by the renderer. Desktop now uses native1672×405 scene artwork capped at source size. The original central mockup logo, buttons and population counters are transparent, not a screenshot interface hidden beneath hotspots. Interactive copy, links and disclosures remain HTML. Existing decorative signs and poetic calligraphy in the desktop scenery remain non-interactive and aria-hidden; their pixels are not live labels or release claims.

Mobile initially used the eastern scene crop. Production screenshot review found its decorative calligraphy behind real copy even though the intermediate122-case test run passed. That candidate was rejected, a targeted failing test was added, and mobile now uses a565×405 native crop from the traveler side without that calligraphy. The final browser build and122-case suite were rerun after this source change. No fake upscaling, invented hidden geometry or new design generation was used. A small bottom-edge alpha fade removes the abrupt image boundary.

Hero spacing was tightened without shrinking body copy or clipping source summaries. News titles themselves are now the real article links; the redundant separate bottom link was removed. Each card still exposes its complete original summary through one native disclosure. Published dates, source text/order, destinations and content fixtures remain unchanged. The same three primary actions, feature links and discovery routes continue to work by keyboard and pointer.

## Artwork provenance and limitations

Three used derivatives: wordmark-brush.png422×169, hero-artwork.png1672×405 and hero-mobile.png565×405. native-art-provenance.json records original SHA, dimensions, extraction parameters and file hashes. Extraction was integer crop plus alpha masking, not a new high-resolution or vector master. Source pixels under removed UI are left transparent, not reconstructed. Original scenic calligraphy is retained on desktop; it is excluded by the mobile crop.

Read-only native pixel verification checked333945 opaque scene pixels,107948 mobile pixels and16167 wordmark pixels against their exact original RGB locations: zero mismatches. Specified source brand/button/counter regions have zero remaining opaque/partial pixels in the scene. An in-memory one-pixel corruption was detected by the negative control. These checks prove provenance and removal at the checked regions; they are not a complete perceptual equivalence score.

The wordmark is still a raster derivative with processed edge alpha, not a vector/retina master. The full hidden panoramic art is not available from the flattened mockup. Common header identity, CTA icon/frame details and final scene continuity remain candidates for the next SAME-homepage refinement; they were not silently accepted or certified by passing tests. No other early page is claimed redesigned.

## Shared scope and review

Added packages/ui ArtWordmark component/style; the homepage consumes it and the existing ExperienceHero. Native-scene and spacing changes stay in marketing-layout.css. Existing global CSS, public shell/navigation, shared hero implementation, content/contracts/tokens, dependencies, Portal/Ops source and the original design board are unchanged. Source review was inline; no independent reviewer-agent result is claimed.

Rejected keying/masking candidates are preserved in local handoff. One initial edit batch stopped on an unnecessary string-index lookup after assets/exports were written; actual partial state was inspected and only the remaining edits continued. No checkout/reset, duplicate export, old commit replay or blind retry was used. Rejected newly-created hero-east.png was removed from untracked runtime source only after its own preview stopped and after preserving a local copy.

## Verified results

Final scoped production suite:122/122 PASS in7 files, with zero failures/skips/flaky.34 are homepage cases across two browser profiles:22 existing composition/route/accessibility cases plus12 native-art/fallback/title-link cases. Current art tests cover source scale, accessible name, load error, forced colors, source selection and resizing through320/390/768/1440/1920 and844×390. The h1 font-size proxy was replaced by actual wordmark image bounds; section/card typography and functional route assertions remain.

RED before changes:4 of5 initial new homepage cases failed,1 passed. News title-link RED failed2 cases; final mobile source-selection RED failed1 case. Shared ArtWordmark component tests4/4, illustrated-navigation4/4 and existing publication-frame4/4 PASS. Same-task state/route tooling17/17 PASS. UI/Web/Portal/Ops typecheck and UI/Web lint PASS. Portal/Ops browser runtimes were not started or claimed.

Final production build PASS with63 static pages. A second build was necessary because mobile artwork changed after the first production visual review. Intermediate122/122 evidence is retained but not added to the final count. Final320 runtime file hashes are locked to the last tested build and rechecked before delivery.

Final screenshots inspected on desktop and mobile; four capture widths1440/768/390/320 show no horizontal overflow or page JavaScript error. Main-content axe checks are in the two test profiles, not claimed at every capture size. Physical-device, screen-reader, complete no-JavaScript behavior and WCAG certification are not claimed.

| Viewport | Final page height | Hero height | Horizontal overflow |
|---|---:|---:|---:|
| 1440×900 | 1294 | 455 | 0 |
| 768×1024 | 1773 | 490 | 0 |
| 390×844 | 2931 | 615.65625 | 0 |
| 320×800 | 2978 | 604.234375 | 0 |

Eight unchanged Web routes across desktop/mobile match the previously verified69465d3 production snapshots in main DOM, header DOM, measured geometry and document height:16/16. Baselines are explicitly reused from immutable revision1 evidence, not freshly captured after revision2 source changes. This proves no observed regression there, not design fidelity of those early pages.

## Delivery and continuation

Local evidence: handoff/home-realignment-v1.265-r2/evidence; REVIEW.html contains original design, previous revision and final real screenshots. Normal source commit/push plus full/delta/evidence review ZIPs and SHA/replay checks deliver this revision without changing its visual-review status. Generated/cache/runtime logs and local ZIPs do not enter Git.

Only existing dev3221 and production3236 are retained. Each production replacement used process.ensure, read-only registry/native identity checks and the exact own prior launch journal. Only its verified listener received SIGTERM; parent ended naturally. No forced kill, new version port, Manager configuration change or other-session action. Old dashboard v1.255 task stays operator REVIEW; it is not repurposed for homepage. Temporary handoff claim is released only after verified archives and closed handles.

Keep homepage v1.265 active. Next concrete permitted work: refine the shared header identity and main-action icon/frame treatment against the original target while preserving this wordmark, native-scale scene and source/keyboard behavior. Do not open /game or resume news merely because this revision is packaged. No independent backend, production auth, DB persistence, CMS, fabricated server/player count, game download or Internet deployment.
