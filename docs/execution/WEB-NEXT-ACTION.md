# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Assessment authority: `026a0719027b5db25bc7c07175ef1bb786d1ed6d` — `LGO-WEB-FULL-PUBLIC-ASSESSMENT-REPORT-v1.277.md`.
Backlog authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`.
WEB-OPT-22 v1.299 is CLOSED at source commit `12c74e2edcd613c240136aa3df62a6a5ffc03fd2`; do not reopen it without fixture/export/copy-parity regression evidence.

Next task:
WEB-OPT-23-PUBLIC-PERFORMANCE-GOVERNANCE-BUDGETS-v1.300

Objective:
Codify regression budgets from the accepted optimized public source for decoded CSS, public asset footprint, heavy image transfer, route page-height outliers, accidental design-reference shipping and active-test authority drift.

Current optimization scope: measurement/budget tooling and governance evidence only. Do not cosmetically redesign routes, rewrite approved copy, alter backend contracts or deploy production changes.

Entry baseline:
- WEB-OPT-01–22 are CLOSED;
- current public source/build evidence is the accepted pre-release baseline;
- active browser/source-gate authority is canonical from v1.298 and fixture ownership is modular from v1.299.

Exit criteria:
- automated budgets use documented accepted baseline values with explicit regression tolerances;
- budgets fail on measurable regression without forcing cosmetic redesign;
- design-reference shipping and active-suite authority drift are guarded;
- relevant tests/validators, typecheck/lint/build/current-state and normal commit/push/package closure PASS.

Execution rules: Phase C maintenance only; measure first; RED→GREEN; no production deployment.

---

## Historical validator compatibility snapshot — not active queue

The text below is retained only because historical source validators still consume `WEB-NEXT-ACTION.md` as provenance. It MUST NOT override the first `Next task` above. WEB-OPT-21 owns migration away from these compatibility markers.

# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Owner delivery policy: commit and push are now explicitly authorized. Close each page with reviewed source/test/docs, verified origin/main HEAD, ZIP/SHA256 and browser evidence, then continue without asking for confirmation. No force-push or production deployment.

Next task:
WEB-FE-SUPPORT-VISUAL-REALIGNMENT-v1.277

Objective:
Continue the owner-priority full-site visual remediation one page at a time. `/status` v1.276 is closed by target-driven real-browser evidence and verified source delivery; do not reopen it without a related regression. The next single active page is `/support` using the registered Public Support detailed target v1.131 and the accepted shared public chrome.

Current FE scope: select `/support` only after v1.276 governance/package closure. Capture fresh production BEFORE desktop/mobile, compare against the registered Support target, then RED→GREEN the real page body while preserving truthful static support expectations and FE-only boundaries. Do not batch `/support/help`, `/support/safety` or community routes into `/support`.

Full-site visual audit override (2026-09-17): 27 public routes were captured desktop/mobile; 16 have detailed page targets. `/game` v1.266 through `/status` v1.276 have now passed sequential target-driven replacement/review. Continue next with `/support` only, then Support Help/Safety and community families. The old `/news` queue remains historical, not active authority.

Tester Pack v1.275 checkpoint: `/release/tester-pack` remains closed at source commit `b2f8b5aa9a48505899c467002a030081734fb591`; focused14/14, selected dev110/110, production110/110 and build63 remain accepted predecessor evidence.

Status v1.276 checkpoint: `/status` is closed at source commit `9fdeafccca16657740eba1002c0e13680ecd4829`. Focused14/14, active v1.223 + v1.276 26/26, selected dev136/136 and corrected selected production136/136 PASS; build63; clean production AFTER desktop/mobile reviewed without dev overlay or overflow; source validators/typecheck/lint/diff-check/current-state PASS. Latest report: LGO-WEB-FE-STATUS-VISUAL-REALIGNMENT-REPORT-v1.276.md. Next single page: `/support` v1.277.

Mandatory execution rules:

1. Real Browser UI/UX Layout First is Priority #1.
   If the existing design target is usable, stop design work and fix the rendered page. Only make a minimal just-in-time target correction when missing, stale, English-heavy, scenario-wrong or inconsistent with the accepted shared header/footer/menu/shell/navigation. Return immediately to browser layout.

2. Base UI/UX Layout First is mandatory.
   Inspect sibling release/download/download-trust/status/support/performance/accessibility pages, packages/ui and packages/design-tokens. Reusable hero, proof board, card grid, CTA, form, table, status badge, route map, typography rhythm, responsive density and focus states belong in shared owners first.

3. CSS must be managed by owner/role.
   Theme/tokens: packages/design-tokens. Reusable component/layout style: packages/ui. Apps compose base and keep only truly route-specific differences. Do not inflate apps/web/src/app/globals.css with duplicate page blocks.

4. Do not move past the current single active page until closure evidence exists:
   - render in real browser/e2e;
   - desktop/mobile metrics and screenshot/visual review against the target and accepted shell;
   - active source validator and necessary typecheck/build;
   - updated state, report, ledger and handoff;
   - commit, normal push to origin/main, remote HEAD verification and verified ZIP/SHA256.

5. Forbidden substitutes: text-only/copy-only, translation-only, design-only, validator/doc-only, content edits without browser evidence, multiple pages at once. Never relax layout tests just to obtain PASS.

6. If execution drifts, return to the current active page, inspect rendered layout, check Base First owners, modify the shared base where reusable, and continue until that page is closed.

Non-claims: FE-only until accepted game backend contracts exist. No independent backend. No production auth. No DB persistence. No CMS. No production deployment. No payment/shop/economy.

Validator compatibility and anti-drift guardrails:
- Resolve package/runtime environment or rerun WEB-01 runtime gates when their foundation evidence is invalidated; reuse unchanged closed evidence.
- Historical closed marker: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15.
- Vietnamese public labels and design evidence, except external technical identifiers.
- Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.
- Deprecated phrase marker: Design Target First. Active interpretation is Real Browser UI/UX Layout First, with only just-in-time comparison correction.
- complete one page at a time; DESIGN_TARGET_ATTACH_OR_CREATE just-in-time only when comparison is blocked; LOCAL_HANDOFF after closure; COMMIT_PUSH is a historical marker only. Do not move to another page before CLOSED.
- Base First Stop Gate: inspect shared owners and reuse/extend shared layout before page-local component/CSS work.

Runtime resource policy: keep dev3221 and reuse production3236 after fresh ownership/process verification. Do not open another port per version. Release finished handoff write claims after verified delivery; retain artifacts.

Deferred historical queue (not active): WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.265 `/news/accessibility-readability-polish-started`. Current task follows the sequential visual-remediation route above; do not resume the old news queue.

Homepage revision3 checkpoint: header identity and primary-action icon/frame details are implemented and verified. Keep the SAME homepage task. Next review/refine the lower Khám phá/Bản tin media composition and footer against the original design, especially the bright gallery lead and repeated thumbnail treatment. Preserve real content, proven header/actions and native artwork. Packaging is not page acceptance. Latest report: LGO-WEB-FE-HOMEPAGE-HEADER-ACTIONS-REPORT-v1.265-r3.md.

Homepage revision4 checkpoint: Khám phá/Bản tin media and compact footer now align with the original design using source-derived artwork and truthful live HTML. All major target regions are implemented; remain on `/` for owner visual acceptance. If accepted, next route is `/game`; otherwise continue only the homepage. Do not resume the deferred news queue. Latest report: LGO-WEB-FE-HOMEPAGE-LOWER-MEDIA-FOOTER-REPORT-v1.265-r4.md.

Homepage revision5 checkpoint: source-derived cyan header sigil, live target motto and non-video discovery focal are implemented and verified. All registered homepage design regions now have truthful live equivalents; keep the SAME `/` task for owner visual acceptance. If accepted, /game is next; otherwise continue only `/`. Latest report: LGO-WEB-FE-HOMEPAGE-FINAL-DETAILS-REPORT-v1.265-r5.md.

Homepage revision6 checkpoint: final target-density pass reduces immersive nav to six truthful target-rhythm routes and removes the redundant technical badge/prose from the hero while preserving the source brush logo, motto, CTAs, signals, discovery/news/footer and accessibility behavior. Fresh production156/156 after a real12px→14px motto readability fix. Keep the SAME `/` task for owner acceptance; packaging does not auto-advance. Latest report: LGO-WEB-FE-HOMEPAGE-FINAL-DENSITY-REPORT-v1.265-r6.md.

Story v1.267 checkpoint: `/story` now uses the immersive public shell, source-derived target artwork, three-line desktop hero title with foreground character layer, truthful reading CTAs and a four-card chapter/event rhythm that stacks to one column on mobile. Fresh focused20/20 and production selected60/60 PASS; build63; provenance validator/typecheck/lint PASS. Historical story proof-board validators/tests are superseded, not runtime PASS. Latest report: LGO-WEB-FE-STORY-VISUAL-REALIGNMENT-REPORT-v1.267.md. Next single page: `/classes` v1.268.


Classes v1.268 checkpoint: `/classes` now uses the immersive public shell, canonical five-Lộ source data, clean target-derived portraits, a live Năm Lộ wheel, five illustrated selectable identity cards and a read-only selected-path feature. Focused14/14, selected dev74/74 and production74/74 PASS; build63; source/provenance/current-state/typecheck/lint gates PASS. Historical classes proof/art/layout suites are superseded, not runtime PASS. Latest report: LGO-WEB-FE-CLASSES-VISUAL-REALIGNMENT-REPORT-v1.268.md. Next single page: `/journey` v1.269.
Journey v1.269 checkpoint: `/journey` now uses the immersive public shell, canonical six `sampleSessionBeats`, five `worldRouteStops`, a live informational four-phase cycle, one clean target-derived Linh Thành hero crop and the already audited world-target artwork. Focused12/12, selected dev86/86 and production86/86 PASS; build63; source/provenance/current-state/typecheck/lint gates PASS. Historical journey board/target/layout suites are superseded, not runtime PASS. Latest report: LGO-WEB-FE-JOURNEY-VISUAL-REALIGNMENT-REPORT-v1.269.md. Next single page: `/start` v1.270.
Start v1.270 checkpoint: `/start` now uses the immersive public shell, five clean target-derived artwork crops, a live five-step onboarding rail, a keyboard-readable movement/Lộ guide panel and four illustrated milestones. Focused14/14, selected dev100/100 and production100/100 PASS; build63; source/provenance/current-state/typecheck/lint gates PASS. Historical Start board/gallery/target/layout suites are superseded, not runtime PASS. Latest report: LGO-WEB-FE-START-VISUAL-REALIGNMENT-REPORT-v1.270.md. Next single page: `/download` v1.271.

Download v1.271 checkpoint: `/download` now uses the immersive public shell, canonical five `downloadReadiness` gates, both `downloadBuilds` channels, one clean locked-gate hero crop and four real official-information routes. Focused14/14, clean selected dev114/114 and production114/114 PASS; build63; source/provenance/current-state/typecheck/lint gates PASS. Historical Download target/layout suites are superseded, not runtime PASS. Latest report: LGO-WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-REPORT-v1.271.md. Next single page: `/download/trust` v1.272.
Download Trust v1.272 checkpoint: `/download/trust` now uses the immersive public shell, canonical six `downloadTrustGates`, two clean provenance-locked trust-art crops, three truthful reading routes and a compact reason/principles band. Focused14/14, selected dev128/128 and production128/128 PASS; build63; source/provenance/current-state/typecheck/lint gates PASS. Historical Download Trust proof/design/layout suites are superseded, not runtime PASS; the cross-route v1.88 heading guard remains active. Latest report: LGO-WEB-FE-DOWNLOAD-TRUST-VISUAL-REALIGNMENT-REPORT-v1.272.md. Next single page: `/release` v1.273.
