# WEB-FE-HOMEPAGE-DESIGN-REALIGNMENT-v1.265

Status: WEB_VISUAL_REVIEW_REQUIRED. Engineering implementation is verified; final design acceptance is not claimed. Active route remains `/`. The remaining news queue is deferred by the owner's direct instruction to restart from homepage and the early public pages. Earlier CLOSED markers and test counts are historical engineering records, not proof of visual fidelity.

Baseline: be09b029def936fb596ce52d7f1a26d372184086, main, /Users/minhdc/Projects/LinhGioiOnline-Web. Same MCP session S-LGO-WEB-20260916-E6A1. No checkout, reset or source restoration.

## What changed on the real page

The actual 1672×941 homepage-detailed-design-target-v1118.png was opened and compared before implementation. It specifies a panoramic illustrated scene with centered brand, three prominent actions, three horizontal illustrated features, and discovery beside a compact news grid. The former source instead rendered a split copy/boxed CSS scene and many long text-led sections.

The homepage now has a full-width illustrated hero, centered live brand/title, three real action links, identity chips, three illustrated navigation cards, a five-link discovery mosaic and three source news records. The lower discovery/news layout is paired on desktop and stacked on mobile. A short accurate availability notice replaces long internal framing. The developer design-reference band is absent on this immersive variant only; other pages retain their existing shell.

All controls are HTML links or native disclosures, not hotspots over a screenshot. News titles, posting timestamps, summaries and destinations come from the existing published source; source order is preserved, not falsely called latest. Complete summaries can be opened without clipping. Existing article content and all fixtures remain unchanged. Home copy is concise public-facing composition, not a verbatim preservation of its former lengthy section text.

The user-facing routes remain actual informational pages. No fabricated population count, running-server badge, login, game download, trailer/player, ticket intake or backend was copied from the illustrative design. The notice states Bản public chưa mở and points to /download.

## Shared owners and assets

Existing ExperienceHero is reused; only its title type widens from string to ReactNode. IllustratedLink and MediaMosaic are shared UI owners. App code composes these, with all new layout CSS in packages/ui/src/marketing-layout.css. PublicSiteShell has an opt-in immersive variant; its default DOM is unchanged. The original common header/navigation is retained. Removed 63 obsolete homepage-only CSS lines; shared legacy pillar rules are preserved because other entry pages still consume them. No new CSS was appended to globals.css.

Nine artwork-only crops were extracted with macOS sips from the existing design, with exact source SHA, rectangles and per-file SHA in game-art/marketing/manifest.json. No baked title/button/counter/UI panel is embedded. The original full board remains unchanged and is never loaded inside homepage markup. The gallery lead uses the already existing standalone skyline. The crop set totals651876 bytes. Initial sharp/PIL tooling attempts were unavailable; errors are retained and no dependency was installed.

## Visual findings, not just test results

The first implementation passed18 interaction/layout cases but failed visual review: legacy `.lgo-public-shell main h1/h2/h3/p` rules overrode intended type sizes. New typography tests reproduced the actual defect on desktop/mobile before the fix. The marketing owner now scopes its selectors explicitly to the opt-in shell. The corrected desktop hierarchy uses a large brand, smaller section headings, and compact card/news headings. Mobile brand is kept on one line; its measured fit is tested rather than inheriting the oversized desktop setting.

Remaining design differences are explicitly open: the brand is live italic serif text rather than the bespoke brush-lettered logo; the right-side city plate is225×245 and becomes soft when expanded, so it is not a high-resolution standalone panorama; common navigation and truthful availability deliberately differ from the mockup's unsupported login/download/live claims. The current result is a reviewable visual realignment, not a pixel-identical or final-art completion claim. Keep `/` active until those visual decisions are reviewed. /game, /classes, /story, /journey and /start have NOT been redesigned by this task.

## Verification

Old-page RED:9 actual homepage cases failed. Shared-owner RED failed at module loading because the new component did not exist; that is not four executed failing component tests. Typography RED:2 executed failures. Final homepage suite contains22 cases across desktop/mobile, including skip-to-main, header navigation, all actual link destinations, typography proportions, responsive composition, complete source summaries,320px text/control sizes, forced-colors focus, reduced motion, artwork failure and scoped main-content axe checks.

An initial broad selection produced104 passes and10 failures:4 wrong-origin navigation attempts at3000,2 obsolete requirements for the homepage developer-reference band, and4 Portal/Ops connections at3001/3002 outside this task. These logs remain. Existing navigation assertions were rerun unchanged at the correct3236 origin and4/4 passed. The final targeted selection excludes the multi-app legacy shell file and supplies current homepage keyboard coverage; it does not claim those Portal/Ops runtime tests passed.

Final scoped production run:110/110 PASS across6 files, no failures/skips/flaky;22 are homepage cases. Production build:63 static pages. Shared illustrated-navigation4/4 and existing publication-frame4/4 PASS. UI/Web/Portal/Ops typecheck and UI/Web lint PASS; Portal/Ops were not started in browsers. Review-state route tooling17/17 PASS. Four production captures at1440,768,390 and320 pixels show no horizontal overflow or page errors. Main axe is covered in the two browser profiles, not claimed at every capture size.

Fresh baseline comparison of8 unchanged Web routes across desktop/mobile:16/16 exact main DOM, header DOM, measured geometry and document height matches. This only checks absence of regressions; it does NOT certify those early pages as matching their designs.

| Viewport width | Before homepage height | New height |
|---|---:|---:|
| 1440 | 3962 | 1316 |
| 390 | 9506 | 2939 |

The difference comes from rebuilding the homepage composition and moving detailed reading to its real destinations, not shrinking font sizes or hiding source summaries. Chromium simulations and axe are not physical-device/screen-reader testing or WCAG certification. Runtime314 file hashes are locked against the single tested build.

## Governance and next action

The current-state guard formerly required every active state to be CLOSED and the next version to advance. It now also represents WEB_VISUAL_REVIEW_REQUIRED, requiring the exact same task and explicit route. Tests prove it rejects silent route/version advancement and unknown statuses while preserving closed-successor rules. This avoids declaring acceptance merely to satisfy a validator. Old homepage-only layout validators/tests are explicitly historical; two multi-page guards only redirect their homepage ownership checks and retain all other checks.

Build is served on the existing production preview3236, with dev3221 retained. The old3236 listener was checked by UID/native start identity/cwd/command/claim/own journal before authorized SIGTERM; parent ended naturally. No extra version port, force kill, Manager configuration, old operator REVIEW task change or other-session mutation. Temporary handoff claims are released only after verified archives; evidence and failed attempts are retained.

A normal source commit/push and full/delta/evidence review package are delivery, not visual acceptance or Internet deployment. Keep active homepage v1.265 and WAITING_USER for review. No independent backend, production auth, DB persistence, CMS, fabricated release state or game implementation. Whole-site no-JavaScript rendering remains unverified. Next main route after homepage acceptance: /game; the former news queue is not automatically resumed.
