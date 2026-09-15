# WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.221

Status: WEB_CLOSED — FE page slice only. Delivery: local commit and ZIP handoff; push waived by owner.
Baseline: `20410ac00f2463f447834937ba10e80f2f571591`. Date: 2026-09-15.

## Real Browser UI/UX Layout First

The registered target `release-readiness-detailed-design-target-v1128.png` was opened beside real desktop/mobile captures before changes. No new design target was generated. The old view rendered a text-heavy pill/card stack and a small schematic image; it did not reproduce the target's art-backed composition.

Implemented actual DOM UI: illustrated hero, editorial serif hierarchy, rectangular gold framing, release seal, fixture-backed owner gates with native evidence disclosures, tester guidance and three safe destination tiles. All gate evidence remains readable without line-clamping. Four existing section labels now point to real h2 elements.

## Base First / ownership

`packages/ui/src/release.tsx` owns reusable icons, seal and gate cards. `packages/ui/src/release-layout.css` owns the layout; `packages/design-tokens/src/tokens.css` owns editorial type and ink/parchment colors. The route composes the base. Old readiness-only blocks were removed from globals/service-layout. The monolithic files are reduced; the new shared stylesheet is role-owned. No byte-size or performance reduction is claimed. Other routes retain the standard OwnerReleaseGateBoard presentation.

## Visual review and deliberate source-truth differences

Desktop keeps hero copy and gate console side by side, then owner gates and tester/destination panels. Mobile stacks the console and uses single-column, readable owner cards. The shared accepted header/footer/navigation are unchanged. The existing Dong Mon concept illustration is reused and labelled as illustration, not gameplay; the target's separate character/portal art is not available as a standalone web asset. This is NOT a claim of pixel-identical artwork reproduction.

The target's illustrative percentages and six progress rails were NOT published as real data. The page shows the four actual ownerReleaseGates fixtures and their actual blocked/review/planned states. “Đang duyệt” does not mean a release gate is approved.

## Runtime Layout Gate — fresh evidence

Production `next build` PASS: 63 static pages. Production browser suite PASS: 20 tests, 0 failed, 0 skipped (new readiness 10, sibling release/download-trust 4, release-heading priority 6). UI/Web typecheck and lint PASS. `git diff --check` PASS.

Independent production visual/axe matrix:

| Viewport | Document height | Hero bottom | Owner top | Horizontal overflow | axe violations |
|---|---:|---:|---:|---:|---:|
| 1440x900 | 1656 | 624.23 | 656.23 | 0 | 0 |
| 1280x800 | 1652 | 620.78 | 652.78 | 0 | 0 |
| 768x1024 | 2639 | 1043.31 | 1067.31 | 0 | 0 |
| 390x844 | 3329 | 1064.73 | 1088.73 | 0 | 0 |
| 360x800 | 3440 | 1086.48 | 1110.48 | 0 | 0 |

Before: desktop 1624px and mobile 2778px. The new mobile page is longer because copy is no longer truncated and primary text is readable; reducing page height was not used as a proxy for visual quality. No JavaScript page errors were recorded in the five-viewport matrix. Automated axe coverage is not a claim of complete accessibility certification.

TDD RED: three new tests failed against baseline before production code changed. Initial keyboard probe targeted a still-hidden streamed DOM boundary; diagnostics showed a hidden ancestor. The test now waits for actual visibility and asserts focus before pressing Enter. Native Enter/Tab behavior passes; no UI workaround or arbitrary timeout was introduced.

## Source guards and historical supersession

Current-state validation PASS on an isolated clean source copy. v1.221 source guard PASS; negative test removing the new stylesheet fails with exit 1. Historical readiness validators v1.71/v1.128/v1.143/v1.201 required the removed schematic or clipped-card implementation and are explicitly marked HISTORICAL_SUPERSEDED, not PASS. Their replacement validates the real shared composition and its browser tests. The multi-route v1.86 guard retains other-route assertions and follows the new readiness owner.

85 historical validators pinned WEB-NEXT-ACTION to a particular old version/page. Only those queue metadata assertions were normalized; active first-checkpoint version, successor number, route existence and ledger closure are now enforced by `check_active_checkpoint` in the aggregator. Other production-source/runtime assertions are retained. This avoids modifying those 85 validators after every following page.

## Evidence and replay

Local evidence owner: `handoff/continuous-v1.221/evidence/`. Important files: `before-desktop.png`, `before-mobile.png`, `after-desktop.png`, `after-mobile.png`, `review-matrix.json`, `red.log`, `production-e2e.log`, `build-final.log`, `source-checks-first.json`, `current-state-second.log`, `negative-source-guard.log`. Final archive/source integrity and checksums are recorded in the external handoff manifest, not self-referential hashes inside source.

## Non-claims / next action

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT remains visible. No real download, registration, intake, entitlement or release readiness approval.

Next selected page: `/release/tester-pack`, task WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.222. Use its registered design, reuse the shared release primitives and close actual browser UI before advancing. Do not push.
