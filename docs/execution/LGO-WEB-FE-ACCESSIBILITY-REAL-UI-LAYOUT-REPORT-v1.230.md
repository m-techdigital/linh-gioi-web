# WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.230

Status: WEB_CLOSED — public readability guidance and disposable keyboard practice.
Baseline: `5a072ff551fbcfcbdc69157fdc724f7bea3ee7e0`.
Delivery: reviewed commit and normal push to origin/main, verified remote HEAD and source/delta/evidence ZIP/SHA256. No deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Followed the current queue after v1.229 source/delta replay and archive validation. Captured the original /accessibility page at desktop/mobile: 1399/1990px height, zero button/input controls in main, and a static game-derived route-map image rather than usable reading guidance.

The route now has an editorial hero with real keycaps, a native keyboard-practice panel, five clear reading destinations, expandable source principles and visible limitations. The start button moves focus only when requested, to a labelled checkbox. Space changes it; Tab moves to the native disclosure; Enter opens it; Tab advances to a real continuation link; Shift+Tab goes backward. Focus can leave the sample normally. Starting again unchecks/collapses and focuses the first control; reload discards local state. Mouse/click interaction remains available. No keyboard event interception or focus-trap mechanism is implemented.

## Design and Base First

Used the existing Public Service atlas family, panel 06, only for navy/cyan/gold framing, editorial hierarchy and tools grouping. Fake percentages/certification text in illustrative reference panels are not adopted. The unrelated route-map image is removed from rendered content. The exact /accessibility reference now has a Vietnamese scope/label to the existing family; shared navigation/header/footer remain unchanged. No bitmap artwork, font file or design image was added. Pixel-identical artwork is not claimed.

KeyboardPractice lives in packages/ui/src/keyboard-practice.tsx and reuses CheckboxField, SpiritButton, LinkButton, shared reading-grid/paper-panel layout and ReleaseIcon. New styling is owned by packages/ui/src/keyboard-practice.css. Removed 201 lines of accessibility-only compact CSS from service-layout.css; globals.css, tokens, fixtures and assets are unchanged. Source cards/disclosures consume accessibilityReadabilityPrinciples, routeReadabilityChecks, mobileScannabilityRules and focusOrderCheckpoints without rewriting their contracts.

The new canonical-token guard caught an invalid --lgo-font-body reference in keycap typography. The RED result is retained; it was corrected to the defined --lgo-font-sans token before the final production build.

## Runtime evidence

Initial valid RED: six tests failed on the old page. The first post-change run then encountered 12 connection-refused errors because the old dev server PID 73974 was no longer running and port 3221 had no listener. This was not classified as a code regression or PASS. The evidence does not establish why that process ended. A new owned dev process was started, the route returned 200, and the unchanged suite passed 12/12.

Final production regression: 152/152 PASS, zero failures and skipped cases within the selected suite. It includes performance workshop, community/onboarding/gallery, support/help/safety, status, release/readiness/tester, download trust and multi-route heading checks. Production build PASS, 63 static pages. UI/Web typecheck/lint pass; final source and other-app typechecks are logged separately.

Tests cover native forward/back focus sequence, start/reset/reload, no outgoing fetch/XHR or non-GET from the exercise, working shared skip link, five existing routes, unclamped expanded principles, minimum 44px button/link/summary targets, normal main-content axe and visible focus under emulated forced colors/reduced motion. This is Chromium desktop/mobile emulation, not a physical-device or screen-reader lab certification.

| Viewport | Document height | Hero bottom | Practice top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 2135 | 537.23 | 569.23 | 0 | 0 |
| 1280 × 800 | 2128 | 537.23 | 569.23 | 0 | 0 |
| 768 × 1024 | 3327 | 826.50 | 850.50 | 0 | 0 |
| 390 × 844 | 3836 | 897.08 | 921.08 | 0 | 0 |
| 360 × 800 | 4006 | 966.42 | 990.42 | 0 | 0 |

All five production viewport records have no JavaScript page errors. Default production screenshots were reviewed; forced-colors focused-state screenshots are in Playwright evidence. Larger mobile height reflects full instructions and real controls, not truncating the content to meet a short screenshot target.

## Guards / review

Historical exact diagram/compact presentation validators and tests (v1.78/v1.152/v1.210) are explicitly HISTORICAL_SUPERSEDED, not counted as PASS. The shared multi-route heading guard now follows the extracted component while retaining actual heading count/order, overflow and size checks. The active guard rejects undefined CSS tokens, key interception, auto-focus on load, persistence/telemetry and missing scope statements. Source review is inline, not an independent-agent review.

## Limits and next

The sample is not consent, registration, a submitted report, a test score, or account settings. It does not change browser shortcuts or website-wide accessibility preferences. Whole-application JavaScript-disabled streaming remains an open foundation limitation and is visibly disclosed on the page; not repaired or counted as PASS here.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.231, `/roadmap`; actual readable planning states and navigation, no fake release dates or completion claims.
No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. No formal WCAG audit certification. No legal accessibility compliance claim. No assistive-technology lab certification. NO_ACCEPTED_BACKEND_CONTRACT.
