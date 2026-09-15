# WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.225

Status: WEB_CLOSED — local question discovery on the public FAQ page; not a support backend.
Baseline: ae00a89a2348b119aa1cb3a3c5f6cce586d4718e.
Delivery: reviewed source commit, normal origin/main push, remote HEAD verification, source/delta/evidence ZIP and SHA256. No production deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Opened the registered support-help-detailed-design-target-v1132.png and actual baseline screenshots. Baseline desktop/mobile had 0 native answer disclosures and 1 embedded full-page design image. The page was mainly a duplicated route directory.

The real page now has a six-topic parchment map, an illustrated topic index, 12 source-backed questions in six answer groups, category filtering, readable native disclosures, actual onward routes and explicit privacy/no-ticket guidance. A general fallback question is separate from the 12 topical questions. Existing common header/footer/navigation is retained.

Map links are real anchors into the local answer directory; reload and Back preserve the selected topic. Filters change only local display and fragment history, never call a search or ticket API. No input form or query box was added. Default all-topic view remains available and each group links to its existing authoritative explanatory route. A filtered group expands to full reading width rather than leaving a half-empty desktop row.

## Design comparison and limits

Composition follows the registered left-copy/right-map hero, six-topic index and lower reading hierarchy, with shared parchment/gold/ink styling. Existing approved world illustration is reused; the reference's character, library interior, map painting and separate six thumbnail paintings are not available as isolated approved assets. No new character art or pixel-identical visual fidelity is claimed. The reference image is linked in the design band, not embedded as the main UI.

Mobile keeps all wording, full answers and controls; decorative topic imagery becomes a narrow index strip instead of six large repeated images. Default all-topic page height is longer than the old route-only page because real answers are now present. The local filter provides a focused reading view; no text is line-clamped to meet an artificial height threshold.

## Base First / source boundaries

GuidanceStation gains an optional map variant; its default support-station behavior is unchanged. GuidanceTopicGrid adapts to a six-item collection. QuestionDirectory composes the existing QuestionDisclosureList, SpiritButton and LinkButton, owns local selection/history and cleans up event listeners. New styles live in packages/ui/src/question-directory.css. No app-global CSS was appended.

Removed 148 net lines from the help-only legacy stylesheet blocks while preserving the shared FAQ/issue-category declarations still consumed by sibling pages. Source fixture arrays, backend contracts, registered artwork and the root rendering boundary are unchanged. FAQ text is consumed from supportFaqs, faqDiscoveryGroups, playerSafetyPrinciples and faqHelpfulnessPrompts, with explicit build-time failure on missing expected records.

## Runtime evidence

Initial RED: six new tests failed against the baseline. An additional focused-width assertion failed with actual width 582px versus required >1003px before the single-group layout was corrected. A strict TypeScript tuple-index issue was fixed with a checked const tuple, not by weakening compiler settings.

Final page-specific Playwright: 12/12 PASS desktop/mobile. Production regression: 78/78 PASS, 0 failed and 0 skipped in the selected suite. Includes help, support, support/safety headings, status, tester, readiness, release, download-trust and public content heading order. Retired old diagram-only cases are not part of this count.

Fresh production Web build: PASS, 63 static pages. UI/Web typecheck and lint PASS; final closure also checks Portal/Ops typecheck. Five-viewport production screenshot/axe matrix:

| Viewport | Document height | Hero bottom | Topic index top | Overflow | Axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 2676 | 621.75 | 653.75 | 0 | 0 |
| 1280 × 800 | 2676 | 621.75 | 653.75 | 0 | 0 |
| 768 × 1024 | 4672 | 973.72 | 997.72 | 0 | 0 |
| 390 × 844 | 4942 | 1084.64 | 1108.64 | 0 | 0 |
| 360 × 800 | 5056 | 1119.73 | 1143.73 | 0 | 0 |

No page JavaScript errors in the recorded matrix. Expanded answers were checked with axe and Enter/Space; category links/reload/history/reset, zero filter fetch/XHR/mutation requests, destination HTTP 200 and control sizes are asserted. Automated axe is not full manual accessibility certification.

## Verification and historical guards

The former v1.73/v1.132/v1.147/v1.205 help-only image/card layout guards are explicitly HISTORICAL_SUPERSEDED by v1.225 source and interaction coverage, not counted as PASS. The shared v1.87 guard follows the new hero/answer composition for this page and retains other route checks. No shared runtime thresholds were relaxed. Negative source checks remove real map links or add an undefined token in disposable copies and must fail.

The inherited whole-app JavaScript-disabled root-streaming limitation remains open, as recorded in v1.224; this task does not claim no-JavaScript application support. Filter state is not persisted to account/storage; it is a local fragment, and private data is never requested.

## Handoff / next

Evidence is under handoff/continuous-v1.225/evidence. ZIP integrity, exact baseline+delta replay and validation of the extracted clean source ZIP are recorded in the external LGO-Handoffs package. No logs/ZIPs/secrets are staged. Next page: /support/safety, WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.226. Complete the handoff and normal push before advancing.

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT. No search backend, AI chatbot, ticket intake, account recovery, SLA or game feature is claimed.
