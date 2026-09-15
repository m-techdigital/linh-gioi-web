# WEB-FE-BEGINNER-GUIDE-READING-v1.235

Status: WEB_CLOSED — source-authored beginner orientation, not gameplay or account progress.
Baseline: `cafb34025b93f1bef754dfcd0144f568804792ac`.
Delivery: reviewed commit and normal origin/main push; verify remote HEAD and source/delta/evidence ZIP/SHA256. No deployment. External manifest records actual commit/archive results.

## Real Browser UI/UX Layout First

Recovered the already-started beginner guide after confirming v1.234 source/delta/evidence checksums and remote checkpoint. All six pending source files were backed up and hashed before review. The scope stayed `/guides/beginner`; historical M0/game documents were not used as replacement source or task direction.

The real page now uses an illustrated editorial header, a sticky desktop/mobile-collapsible contents block, four complete parchment sections and a compact related-reading area rather than the earlier compact guide/world/download/FAQ board stack. Every chapter has a real destination, previous/contents/next links and an explicit current boundary. Native fragment navigation and keyboard focus use the existing GuideArticle owner; malformed fragment addresses retain the article without a JavaScript exception.

The four beginnerGuideSections retain their exact title/action/playerTip/blockedScope and order, including existing English source terminology. Added destination labels are editorial navigation to /download, /game, /roadmap and /support, not new gameplay claims. No fixture or source claim was silently translated, reconciled or replaced.

## Visual review and shared ownership

Compared fresh desktop/mobile screenshots with the registered Public Core family and the accepted article style introduced in v1.233. Exact route registration is Vietnamese; header/footer/menu remain unchanged. Existing world art remains labelled illustration, not a runtime game capture. No new art/font or pixel-identical recreation of atlas panels is claimed.

Reused GuideArticle, ArticleFragmentRestoration, ExperienceHero, LinkButton and SectionHeading. Shared article CSS now covers the beginner caller while retaining world-article declarations. Removed 263 obsolete beginner-only CSS lines; the remaining service-layout.css bytes match baseline. No globals.css growth, duplicate article implementation, new dependency or client controller. Content, tokens, assets, backend contracts, dynamic guide renderer, Portal and Ops remain unchanged.

Visual review identified chapter actions looking washed out against parchment because the shared neutral button used 72% opaque ink. Added a genuine failing computed-style test, then supplied solid ink and a distinct jade-tinted hover at the shared article action owner. Focus uses dark ink on paper and Highlight in forced colors. The page actions remain >=44px tall, with full text at 320px.

## Verification and retained failures

Original RED: six new tests failed against the prior page. Fresh resume: beginner/world-article 28/28 PASS. Solid-action RED failed as intended. Subsequent local combined run: 29 passed, one existing world-article cold-fragment check sampled y=-95.61. Twelve timing captures and twelve exact-viewport terminal-position probes did not reproduce that value; final positions were within the original 70–600px gate. Its root cause is not established and is NOT claimed fixed. The helper and that prior test/threshold remain unchanged; original failure trace and diagnostics are retained separately, not counted as PASS.

Final fresh production regression: 226/226 PASS, zero failed/skipped within the selected suite, including that unchanged cold-fragment test. New beginner suite: 16/16. Production build: 63 static pages, exit 0. Main-content axe and screenshot matrix below have no page errors. Final all-app typechecks, lint, unit/source checks and negative controls are recorded separately.

| Viewport | Document height | Hero bottom | Article top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 3272 | 615.69 | 647.69 | 0 | 0 |
| 1280 × 800 | 3246 | 609.52 | 641.52 | 0 | 0 |
| 768 × 1024 | 3723 | 826.95 | 850.95 | 0 | 0 |
| 390 × 844 | 4556 | 954.84 | 978.84 | 0 | 0 |
| 360 × 800 | 4698 | 954.84 | 978.84 | 0 | 0 |

The previous world article's main DOM and measured section/heading geometry match its baseline on both desktop and mobile. Fresh production cold beginner links focus/scroll to chapter three. Coverage also checks direct malformed/unknown fragments, native Back, source-exact content, all four destination HTTP responses, real route navigation, full text, keyboard contents, no outgoing mutation from reading links and ink/hover/focus states. Chromium emulation and automated axe are not a physical-device/screen-reader or complete WCAG certification.

## Guard migration and limits

Only the obsolete exact multi-board beginner layout validator/E2E v1.157 is explicitly HISTORICAL_SUPERSEDED, not runtime PASS. New guard verifies authored data, shared owner, native navigation, ink action treatment, canonical tokens and no client/game surrogate. Other active article and route/category checks remain enabled. Review is inline source/browser review, not an independent-agent review.

Whole-application JavaScript-disabled streaming remains open; fragment restoration depends on the existing small client helper and this task does not repair the foundation. No account, saved progress, quest completion, build entitlement, online support, gameplay, combat, inventory or reward is created. No production auth. No DB persistence. No independent backend. No CMS. No real Portal integration. No real Ops/Admin mutation. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.236, `/guides/gate-entry-guide`. Continue the existing guide sequence with source-preserving article layout and real navigation only.
