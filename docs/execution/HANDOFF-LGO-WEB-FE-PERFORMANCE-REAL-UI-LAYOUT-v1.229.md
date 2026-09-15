# WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.229

Status: WEB_CLOSED — frontend reading workshop only.
Baseline: `337ac517658abed6dc6d8a39c7208cea08206d4b`.
Delivery: reviewed commit, normal origin/main push, remote HEAD verification and source/delta/evidence ZIP/SHA256. No production deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Read current repo governance and verified v1.227/v1.228 handoff checksums before selecting the actual next route, /performance. Captured the old page in desktop/mobile: 1435/2050px high, zero interactive controls in main, with a mobile game HUD screenshot embedded as the supposed performance layout. The rendered old typography/grid also scattered hero copy across columns.

Replaced it with an editorial hero and priority console, an interactive reading workshop, explicit unmeasured-state cards, native principle disclosures and four source-backed reading routes. The main title is again a coherent first heading rather than a fragment inside a report grid. All text remains readable without line clamps. Default workshop has compact spacing and no optional image request; comfortable spacing and on-demand world illustration are real controls, not a screenshot. Reset/reload restores the default. Image failure keeps text usable and can be retried by toggling the option off/on.

## Target adaptation

The registered Public Service atlas family was inspected, especially panel 06 Performance / Accessibility. Its navy/jade/gold framing, editorial hierarchy and tools/evidence grouping are comparison references. Illustrative values such as 99.9%, 48ms and 100% are not measured evidence and were NOT copied. The unrelated portrait mobile HUD is removed from rendered page content. The exact /performance comparison registration now has Vietnamese scope/label and points to the existing atlas; no broad image regeneration or shell redesign. Pixel-identical artwork is not claimed. This route follows its existing no-new-bitmap-hero budget: all initial visual treatment uses CSS/tokens, and existing world art appears only after an explicit option.

## Base First and scope

ReadingPreview is a reusable client component in packages/ui, consuming shared CheckboxField, SpiritButton and ReleaseIcon. Its illustration load state is owned by the mounted optional child and discarded when hidden. All new styles are in performance-layout.css. Removed 205 lines of superseded performance-only compact CSS from service-layout.css. globals.css, design tokens, content fixtures, assets and backend contracts are unchanged. Apps only compose the shared base plus performance-specific content. Existing ExperienceHero, SectionHeading and QuestionDisclosureList remain the owners.

The four performanceCopyBudgetPrinciples, four staticRouteCompositionRules, perceivedLoadSignals and mobileDensityBudgets remain source-owned fixtures. Historical implementation guidance is shown as such in disclosures, not claimed as a completed optimization of sibling pages.

## Runtime verification

TDD RED: six new behavior/layout tests failed on the old page. GREEN: 12/12 in desktop/mobile. Production regression: 140/140 PASS, no failures or skipped cases in the selected suite. Prior release, trust, readiness, tester, status, support/help/safety, community/onboarding, gallery provenance and multi-route headings are covered.

Production build PASS, 63 static pages. UI/Web typecheck and lint PASS. Five production viewports, main-content axe checks and fresh screenshots completed. Illustrated/comfortable preview screenshots and a separate preview axe check were also captured on desktop/mobile.

| Viewport | Document height | Hero bottom | Workshop top | Overflow | Main axe violations | Default optional-art requests |
|---|---:|---:|---:|---:|---:|---:|
| 1440 × 900 | 2544 | 522.77 | 554.77 | 0 | 0 | 0 |
| 1280 × 800 | 2534 | 522.77 | 554.77 | 0 | 0 | 0 |
| 768 × 1024 | 3711 | 832.22 | 856.22 | 0 | 0 | 0 |
| 390 × 844 | 4646 | 886.72 | 910.72 | 0 | 0 | 0 |
| 360 × 800 | 4792 | 907.78 | 931.78 | 0 | 0 | 0 |

No JavaScript page errors in the five viewport records. The request count is a local functional observation, not a bandwidth or speed benchmark. Tests cover unchanged sample content, increased spacing, no clamping, keyboard controls, no initial optional art fetch, successful image loading, intentionally blocked image recovery, reset, reload and no fetch/XHR or non-GET submission from spacing controls. Automated axe is not assistive-technology certification. No production CWV/Lighthouse results are inferred from passing tests.

## Guard migration / review

Three historical HUD/compact-layout guards and exact E2E files (v1.76/v1.151/v1.209) are marked HISTORICAL_SUPERSEDED, not PASS. The new guard checks real component ownership, no telemetry/storage/intake, canonical CSS tokens, optional image mounting and behavioral tests. The shared multi-route heading guard follows the extracted performance component while retaining its actual h1 order/count, overflow and size assertions. Runtime acceptance thresholds were not relaxed. Source review is inline, not an independent reviewer claim.

## Boundaries / next

Controls only change the example, not the whole website, device, account or network. No persistence, telemetry, server API, performance observer, automatic optimizer, remote media service or personal data form. Hiding an already-loaded image does not return transferred bytes; the UI says so. Existing whole-application no-JavaScript root-streaming limitation remains open and is not counted as PASS here.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.230, `/accessibility`. Use the accepted family and real reading/focus interactions; no accessibility certification or persisted preference claims.
No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. No production RUM monitoring. No CDN deployment claim. NO_ACCEPTED_BACKEND_CONTRACT.
