# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Owner delivery policy: commit and push are now explicitly authorized. Close each page with reviewed source/test/docs, verified origin/main HEAD, ZIP/SHA256 and browser evidence, then continue without asking for confirmation. No force-push or production deployment.

Next task:
WEB-FE-STORY-VISUAL-REALIGNMENT-v1.267

Objective:
Owner priority override: restart at the homepage `/`; early public pages have NOT been accepted as matching the detailed design. Defer the remaining /news queue. Build from the actual homepage design, not previous CLOSED labels or same-layout regression counts.

Current FE scope: select `/story` as the next single active page. Rebuild from `story-detailed-design-target-v1121.png`; complete `/story` fully before any other page, with real browser desktop/mobile evidence, before touching `/classes`.

Full-site visual audit override (2026-09-17): 27 public routes were captured desktop/mobile;16 have detailed page targets. Historical CLOSED/PASS does not prove visual fidelity. `/game` v1.266 is now closed by real target-driven replacement. Continue sequentially `/story` → `/classes` → `/journey` → `/start`, then release/service and support/community families. Do not use the old `/news` queue as current authority.

Mandatory execution rules:

1. Real Browser UI/UX Layout First is Priority #1.
   If the existing design target is usable, stop design work and fix the rendered page. Only make a minimal just-in-time target correction when missing, stale, English-heavy, scenario-wrong or inconsistent with the accepted shared header/footer/menu/shell/navigation. Return immediately to browser layout.

2. Base UI/UX Layout First is mandatory.
   Inspect sibling release/download/download-trust/status/support/performance/accessibility pages, packages/ui and packages/design-tokens. Reusable hero, proof board, card grid, CTA, form, table, status badge, route map, typography rhythm, responsive density and focus states belong in shared owners first.

3. CSS must be managed by owner/role.
   Theme/tokens: packages/design-tokens. Reusable component/layout style: packages/ui. Apps compose base and keep only truly route-specific differences. Do not inflate apps/web/src/app/globals.css with duplicate page blocks.

4. Do not move past `/` until closure evidence exists:
   - render in real browser/e2e;
   - desktop/mobile metrics and screenshot/visual review against the target and accepted shell;
   - active source validator and necessary typecheck/build;
   - updated state, report, ledger and handoff;
   - commit, normal push to origin/main, remote HEAD verification and verified ZIP/SHA256.

5. Forbidden substitutes: text-only/copy-only, translation-only, design-only, validator/doc-only, content edits without browser evidence, multiple pages at once. Never relax layout tests just to obtain PASS.

6. If execution drifts, return to `/`, inspect rendered layout, check Base First owners, modify the shared base where reusable, and continue until `/` is closed.

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

Deferred historical queue (not active): WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.265 `/news/accessibility-readability-polish-started`. Current task stays homepage until review.

Homepage revision3 checkpoint: header identity and primary-action icon/frame details are implemented and verified. Keep the SAME homepage task. Next review/refine the lower Khám phá/Bản tin media composition and footer against the original design, especially the bright gallery lead and repeated thumbnail treatment. Preserve real content, proven header/actions and native artwork. Packaging is not page acceptance. Latest report: LGO-WEB-FE-HOMEPAGE-HEADER-ACTIONS-REPORT-v1.265-r3.md.

Homepage revision4 checkpoint: Khám phá/Bản tin media and compact footer now align with the original design using source-derived artwork and truthful live HTML. All major target regions are implemented; remain on `/` for owner visual acceptance. If accepted, next route is `/game`; otherwise continue only the homepage. Do not resume the deferred news queue. Latest report: LGO-WEB-FE-HOMEPAGE-LOWER-MEDIA-FOOTER-REPORT-v1.265-r4.md.

Homepage revision5 checkpoint: source-derived cyan header sigil, live target motto and non-video discovery focal are implemented and verified. All registered homepage design regions now have truthful live equivalents; keep the SAME `/` task for owner visual acceptance. If accepted, /game is next; otherwise continue only `/`. Latest report: LGO-WEB-FE-HOMEPAGE-FINAL-DETAILS-REPORT-v1.265-r5.md.

Homepage revision6 checkpoint: final target-density pass reduces immersive nav to six truthful target-rhythm routes and removes the redundant technical badge/prose from the hero while preserving the source brush logo, motto, CTAs, signals, discovery/news/footer and accessibility behavior. Fresh production156/156 after a real12px→14px motto readability fix. Keep the SAME `/` task for owner acceptance; packaging does not auto-advance. Latest report: LGO-WEB-FE-HOMEPAGE-FINAL-DENSITY-REPORT-v1.265-r6.md.
