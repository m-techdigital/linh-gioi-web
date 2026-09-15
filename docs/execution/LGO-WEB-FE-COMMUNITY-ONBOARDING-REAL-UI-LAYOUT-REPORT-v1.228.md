# WEB-FE-COMMUNITY-ONBOARDING-REAL-UI-LAYOUT-v1.228

Status: WEB_CLOSED — local reading journey, not registration or tester enrollment.
Baseline: `6084f6d1cac2a8ed3573b278e6ee15d3df07b6d5`. Delivery: reviewed commit, normal push, remote HEAD match and source/delta/evidence ZIP/SHA256. No production deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Captured the actual old desktop/mobile page. The SVG named community-onboarding-gameplay-loop.svg was inspected directly: its labels describe Core Gameplay Loop, M1 offline combat, attack/reward/recovery. It was unrelated to onboarding and is no longer used as page content or comparison authority. The generic English service atlas also depicted account creation and live social links that this repo does not implement.

The smallest target correction is an exact /community/onboarding registry entry reusing the existing Vietnamese community composition target v1.149, with a clear three-step reading-only scope. No target image was regenerated, no screenshot of the implementation was mislabeled as an independent design, and the historical SVG is preserved in source. The accepted common shell remains unchanged. The manual motif reuses FieldManual from the shared release presentation. This is an explicitly scoped adaptation of the community visual family, not a pixel-identical copy of a dedicated onboarding painting.

Actual UI: illustrated manual hero; three selectable reading steps; current-step panel; previous/next controls with real boundaries; live reading-position status; four source-backed audience disclosures; prominent no-waitlist/privacy panel and real routes to tester preparation/safety. Original step order and destinations remain /status → /roadmap → /community.

## Base First / boundaries

ReadingJourney is a reusable client UI in packages/ui/src/reading-journey.tsx. It reuses ProgressSteps/ProgressStep, SpiritButton and LinkButton; no independent API, storage or routing subsystem. ProgressStep gained optional marker/children props. Actual React server rendering of all four original default states (current/upcoming/complete/blocked) remains byte-identical to baseline; optional marker/child rendering is tested. This is component compatibility evidence, not Portal/Ops browser certification.

All new CSS is in packages/ui/src/reading-journey.css. Removed 207 lines of unused onboarding-specific compact CSS from service-layout.css; globals.css was not changed. The route is composition only. packages/content, packages/contracts, design tokens, approved art, Portal and Ops app source are unchanged.

Reading position is in memory only; reload returns to step one. Selection never marks steps approved/complete and never creates a membership, waitlist place, account or entitlement. There is no form, file input, upload, payment or feedback endpoint. Request/storage assertions confirm step selection performs no fetch/XHR/non-GET request and makes no localStorage/sessionStorage change.

## Visual defects and test corrections

Six new tests initially failed against baseline. A test originally used the short design-link text, but the existing shared reference component exposes a longer accessibility label including scope and “mở trong tab mới”. The test was corrected to that complete exact accessible name, preserving the accessible new-tab warning.

Screenshot review found Bước trước looked enabled at the first step despite native disabled semantics. A dedicated RED check proved enabled and disabled opacity were both 1. Shared reading-navigation disabled styling now uses lower opacity and a dashed border; native disabled and boundary tests remain intact. No layout threshold was relaxed to hide the issue.

## Runtime evidence

Final onboarding suite: 12/12 PASS. Selected production regression: 128/128 PASS, zero failed and zero skipped inside the selected set. Includes prior community/support/safety/help/status/release/readiness/tester/download-trust suites, asset-gallery checks and multi-route heading order including roadmap/onboarding.
Production build: PASS, 63 static pages. UI/Web typecheck and lint PASS; Portal/Ops typecheck PASS. Five production captures with no JavaScript page errors and no main-content axe violations:

| Viewport | Document height | Hero bottom | Reading section top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 1976 | 600.00 | 632.00 | 0 | 0 |
| 1280 × 800 | 1962 | 590.38 | 622.38 | 0 | 0 |
| 768 × 1024 | 3063 | 904.31 | 928.31 | 0 | 0 |
| 390 × 844 | 3460 | 965.19 | 989.19 | 0 | 0 |
| 360 × 800 | 3639 | 989.50 | 1013.50 | 0 | 0 |

Automated axe is not a complete manual accessibility audit. The previous whole-app no-JavaScript/root-streaming limitation remains open; the local step controls require JavaScript. No full Portal/Ops browser regression or game runtime test is claimed.

## Source guard and provenance

Three historical combat-board/compact layout guards and exact E2E cases (v1.75/v1.150/v1.208) are HISTORICAL_SUPERSEDED, not counted as PASS. The v1.88 multi-route heading guard remains active and follows the extracted component. Two obsolete English expected headings in its E2E file were checked against immutable baseline source and updated to the already-existing Vietnamese headings; count/order/overflow/type-size assertions are unchanged.
Clean-source current-state verification passes. In a disposable copy, removing the first-step disabled boundary and removing the visual disabled distinction are rejected by the new guard. No authoritative file was corrupted. Review was inline source/browser review, not independent subagent review.

## Next / non-claims

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.229, `/performance`, one page only. Make an honest performance/readability guidance page, not invented uptime, benchmark scores, browser optimization or device certification.
No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. No fake waitlist. No live tester intake. No live community/chat/forum/guild backend. NO_ACCEPTED_BACKEND_CONTRACT.
