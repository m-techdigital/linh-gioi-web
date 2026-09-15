# WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.222

Status: WEB_CLOSED — FE preparation page only. Date: 2026-09-15.
Baseline: `1af3e754f9db3e7add3d23f64f83b3187d551fe8`.
Delivery: local commit + verified source/delta/evidence ZIP and SHA256. Do NOT push.

## Real Browser UI/UX Layout First

Opened the registered `tester-pack-detailed-design-target-v1129.png` and captured actual baseline desktop/mobile before implementation. The baseline was a rounded text/pill composition with a small schematic and clipped content, rather than the target's illustrated manual, navigation tiles and visible feedback tools.

Rebuilt the real page: illustrated editorial hero, CSS/HTML field manual, five real shortcut links, warm paper safety panel, keyboard-accessible template tabs, local preparation checklist, privacy-aware device guidance and four expandable known limitations. This is rendered HTML, not a design-board image used as the page. A browser review caught the initial cover obscuring the paper quote; book geometry was corrected and production screenshots rechecked.

## Base First

Reusable LocalChecklist and TemplateTabs belong to `packages/ui/src/reading-tools.tsx` with role-owned `reading-tools.css`. They reuse CheckboxField and SpiritButton. FieldManual extends the shared release owner. Gold frames, reading panels, shortcut tiles, paper panel and disclosure rhythm extend `release-layout.css`; no app-global CSS addition. The replaced legacy tester compact-layout block was removed from service-layout.css. Existing four legacy board labels now reference actual h2 headings through the shared headingId API.

The route consumes these owners and existing closedTesterChecklist, safeFeedbackTemplates, deviceReportTemplateFields and knownLimitationNotes fixtures. No backend contract or fixture state was redefined.

## Interaction semantics and boundaries

Checklist counts are actual self-marked local items, not availability, eligibility or acceptance scores. They reset when the page reloads; no localStorage/sessionStorage/account persistence. Native checkboxes support Space. Reset clears the selection.

Templates support arrows/Home/End, roving tabIndex and labelled tab panels. Copy uses the Clipboard API only following a click, reports errors honestly, and ignores stale async completions after switching tabs or unmounting. Tests intentionally inject a browser clipboard API stub for both success and denial, avoiding overwriting the user's Mac clipboard. Native OS clipboard permissions/content were NOT tested. Text remains selectable as the fallback.

The bug template uses the existing field names; full source guidance is accessible in a native tips disclosure. The Vòng chơi and Góp ý templates are explicit editorial composition, not new gameplay capability. No form, email/password/file field, registration, feedback POST or device fingerprinting was added.

## Fresh production evidence

Production build PASS: 63 static pages. Production Playwright PASS: 30 tests, 0 failed, 0 skipped (tester 10, readiness 10, release/download trust 4, release heading priority 6). UI/Web typecheck and lint PASS. TDD RED was 5 expected baseline failures before production edits.

Five independent production screenshot/axe viewports:

| Viewport | Document height | Hero bottom | Shortcuts top | Overflow | axe violations |
|---|---:|---:|---:|---:|---:|
| 1440x900 | 2804 | 648.55 | 680.55 | 0 | 0 |
| 1280x800 | 2795 | 645.09 | 677.09 | 0 | 0 |
| 768x1024 | 4282 | 968.53 | 992.53 | 0 | 0 |
| 390x844 | 4918 | 987.28 | 1011.28 | 0 | 0 |
| 360x800 | 5022 | 1008.34 | 1032.34 | 0 | 0 |

No JavaScript page errors recorded in this matrix. This is not a full manual accessibility certification or proof of pixel-identical artwork. Shared accepted shell is preserved; the original reference portrait/tabletop art was not present as standalone web assets. Existing world concept plus an HTML/CSS manual replaces that illustration while preserving the main composition, gold/editorial type, paper/navy contrast and functional reading areas. No new image was generated or sold as gameplay.

## Guard migration, not skip-as-PASS

The obsolete v1.77/v1.129/v1.144/v1.202 tester image/card-only source guards and their exact E2E cases are explicitly retired as HISTORICAL_SUPERSEDED, not counted as PASS. The new v1.222 guard covers the real composition, shared controls, real fixture consumption and no storage/submission. The v1.86 multi-route heading guard now follows TesterPackHero before shortcuts, retaining both sibling route checks. The centralized checkpoint/successor validation from v1.221 remains unchanged.

Final clean-source validator and negative control-removal test are recorded in `closure-checks.json`. Final source ZIP extraction/current-state and delta replay are recorded in the external package manifest.

## Handoff / next

Evidence: `handoff/continuous-v1.222/evidence/` — before/after desktop/mobile, five-viewport review matrix, RED log, production build and production E2E logs, source checks and negative guard. External ZIP names and hashes live under LGO-Handoffs; not committed to source.

Next selected page: `/status` — WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.223. Preserve truthful unknown/offline/fixture boundaries. Do not publish made-up live server health, uptime, incidents or dates from illustrative artwork.

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT. No real tester intake or entitlement.
