# WEB-FE-ROADMAP-REAL-UI-LAYOUT-v1.231

Status: WEB_CLOSED — frontend planning guidance and historical source lookup.
Baseline: `df77232feae1f3854d7f4fb4b37587501afaaf82`.
Delivery: reviewed source/test/docs commit, normal push to origin/main, remote HEAD check and verified full/delta/evidence ZIPs. No deployment.

## Real Browser UI/UX Layout First / Runtime Layout Gate

Verified baseline and v1.230 handoff checksums before editing. Captured original /roadmap at desktop/mobile: document heights 1920/2923px. The original first flow was text plus an embedded game-derived flow SVG, static cards and a long nested evidence stack.

Rebuilt the real page around an atmospheric editorial hero, paper gate navigation, four source-backed condition cards, a visible no-release-schedule notice and four release-message stages. Each map link scrolls to its actual gate; native disclosures expose decision owner, original message, release impact and explicit non-claims. States are read from roadmapDecisionGates, not fabricated by the UI. Presentation titles map by the original gate/stage key, not array position. Unknown records keep their source title.

The old publicRoadmapItems dataset contains fifteen authored records, including v1.6–v1.21 entries still tagged current/planned. It is preserved byte-for-byte, displayed in a clearly labelled historical/source archive, and NOT silently reconciled or marketed as current project work. The archive has real filters for original current/next/planned/blocked labels, exact 15/11/0/3/1 counts, empty-state recovery and reload reset. Its warning explicitly says these labels are not present-day progress. No completion percentages, release dates, countdown or tester intake were added.

## Design and Base First

Inspected the registered Public Service atlas, especially its release-readiness/checklist, framed panels, navy/jade/gold hierarchy and existing approved shell. The game-derived public-roadmap-flow.svg no longer substitutes for rendered content. Existing world art is reused only as labelled atmosphere. The /roadmap comparison link is scoped and labelled in Vietnamese to the same existing atlas family. No new design image or font asset was added; pixel-identical illustration is not claimed.

PlanningGateMap, MilestoneArchive and planning-layout.css live in packages/ui. The existing VisibilityCatalog filter row was extracted as the shared controlled FilterChoices owner and reused; /status still uses the same filters, labels and semantics. The actual catalog DOM was compared before/after (ignoring generated React IDs) and matched. Its twelve regression tests remain active. Existing ExperienceHero, SpiritButton, LinkButton, ReleaseIcon, SectionHeading and shared frame/paper/disclosure styles are reused.

Removed 251 lines of superseded compact roadmap CSS from service-layout.css. globals.css, content fixtures, tokens, contracts, assets, Portal and Ops code are unchanged. The archive uses disposable component state only, not local storage or a backend.

## Runtime and review evidence

Initial RED: all six new roadmap tests failed against the old UI. Initial roadmap + status GREEN: 24/24. Inline review then found that resetting from the empty state removed the focused button. A dedicated added assertion failed on lost focus; the fix returns focus to the persistent All filter only on the user's reset action. Roadmap GREEN: 12/12. The production build was rebuilt after this production-code fix, not reused incorrectly.

Final production regression: 164/164 PASS, zero failures and skipped tests inside the selected suite. Production build PASS, 63 static pages. Five viewport production captures and main-content axe checks completed. Tests cover map anchors, native keyboard disclosures, all fifteen original source records, exact filter counts including empty next results, reset focus, reload, no fetch/XHR/non-GET from filters, no registration/progress/date controls, working guidance routes and expanded main-content accessibility.

| Viewport | Document height | Hero bottom | Gate cards top | Overflow | Main axe violations |
|---|---:|---:|---:|---:|---:|
| 1440 × 900 | 1921 | 631.36 | 663.36 | 0 | 0 |
| 1280 × 800 | 1911 | 631.36 | 663.36 | 0 | 0 |
| 768 × 1024 | 2942 | 978.89 | 1002.89 | 0 | 0 |
| 390 × 844 | 4025 | 1147.31 | 1171.31 | 0 | 0 |
| 360 × 800 | 4152 | 1147.31 | 1171.31 | 0 | 0 |

No JavaScript page errors in the five viewport records. Automated axe and Chromium viewport emulation are not manual screen-reader, physical-device or WCAG certification. Captures use a local production server, not a deployment.

A copied capture harness initially referenced the previous page's accessibility-practice ID; it failed, was corrected to roadmap-gates, and then rerun. The initial failure log is retained rather than counted as PASS. A transient MCP no-device response later recovered; terminal output files confirmed that the final production suite had completed.

## Guard migration / source review

Historical roadmap SVG/compact presentation validators and exact tests (v1.70/v1.153/v1.211) are HISTORICAL_SUPERSEDED, never counted as PASS. Active v1.231 checks real owner wiring, source-driven states, historical-label warning, no persistence/intake/countdown, palette tokens and filter/disclosure contracts. The multi-route trust-heading guard follows the extracted component without changing runtime heading/overflow/font assertions. The v1.223 status guard follows FilterChoices for button semantics and retains no-monitoring checks. Source review is inline, not an independent reviewer claim.

## Limits and next

This page does not update the historical roadmap fixture or prove today's game/backend progress. Clicking a gate does not approve it; a source ready label applies only to public content. No download, entitlement, owner sign-off, registration or completion is granted. Whole-application JavaScript-disabled root streaming remains an open prior limitation; no claim of fixing it here. Archive filters require JavaScript.

Next: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.232, `/game/loop`, continuing the single-page sequence with real visual reading flow, no gameplay simulation or live combat claims.
No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT.
