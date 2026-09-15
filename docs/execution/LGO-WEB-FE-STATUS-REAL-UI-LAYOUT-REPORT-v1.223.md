# WEB-FE-STATUS-REAL-UI-LAYOUT-v1.223

Status: WEB_CLOSED — public content-visibility UI only. Date: 2026-09-15.
Baseline: `bb21420efe5f8476d2813b457d70cbc495a9f99e`.
Delivery: local commit + source/delta/evidence ZIP + SHA256; commit/push now authorized by the latest owner instruction; remote verification follows the commit.

## Real Browser UI/UX Layout First

Opened registered `status-detailed-design-target-v1130.png` and actual baseline desktop/mobile screenshots. Replaced the capsule/report layout and small schematic with a real illustrated hero, three labelled visibility signals, four fixture-backed surface cards, working visibility filters, native source/boundary disclosures, trust commitments and clearly provisional maintenance content.

The accepted common header/footer/navigation remains unchanged. Existing world concept art is reused; the target's separate character/blue-city/crystal painting is not available as standalone web art. The new signals are reusable faceted SVG decoration with real adjacent text, not an embedded mockup. Main composition, hierarchy, gold/ink framing and distinct jade/cyan/purple status cues are implemented; pixel-identical artwork is NOT claimed.

## Truth boundaries

The reference's illustrative public shop/events cards are NOT treated as implemented game services. The real four statusTrustSurfaces remain: Website công khai (public), Gói tải game (blocked), Tài khoản/quyền Portal (blocked), Guardrail runtime/browser (internal). Filtering shows 4 total, 1 public, 1 internal, 2 blocked — content categories, not service-health counts.

Maintenance consumes the actual localContentRepository maintenance fixture and explicitly says it is not a live incident or maintenance schedule. No artificial uptime, dates, player counts, live polling or health API. Absence of live data is not presented as absence of incidents. NO_ACCEPTED_BACKEND_CONTRACT remains visible.

## Base First / fixes found by visual review

`VisibilityCatalog` and its presentation-only types are shared UI, not backend contracts. Filter controls reuse SpiritButton; evidence uses native details/summary. SVG signal presentation extends the shared release owner. `visibility-layout.css` owns visibility/catalog styling; the old status-only compact block (178 lines) was removed from service-layout.css. No app-global CSS was appended. Two legacy status-section labels now point to real h2 headings.

A fresh screenshot exposed an invalid jade token: `--lgo-color-jade` did not exist, causing the public beacon/card border to become gray or disappear. A new test failed with expected `#35c6a3`, actual empty string. The styles now use canonical `--lgo-color-jade-teal`; the same typo in the shared copy-success message was fixed. The new source guard validates every canonical --lgo-* token reference in release/reading/visibility styles. A specificity collision with common h2 typography was corrected so the console title stays secondary rather than competing with h1.

## Runtime evidence

TDD RED: 5 initial tests failed against baseline before implementation. Additional palette regression test failed before correcting the token. Final status suite: 12/12.

Production browser regression: 50/50 PASS, 0 failed, 0 skipped. Includes status, tester pack, readiness, release, download-trust, release headings, and content heading order for events/patch-notes/news/status. The historical v1.85 status test still expected “Trạng thái / Maintenance”, although the baseline already rendered “Trạng thái công khai”. Only that obsolete expected label was corrected; h1 order/count, overflow, typography limits and other routes remained intact. The successful production build was reused for this test-only change.

Production Web build PASS: 63 static pages. UI/Web typecheck/lint PASS. Five production screenshot/axe viewport records:

| Viewport | Height | Hero bottom | Surfaces top | Overflow | axe violations |
|---|---:|---:|---:|---:|---:|
| 1440x900 | 1828 | 582.97 | 614.97 | 0 | 0 |
| 1280x800 | 1809 | 581.61 | 613.61 | 0 | 0 |
| 768x1024 | 2929 | 979.84 | 1003.84 | 0 | 0 |
| 390x844 | 3520 | 1089.83 | 1113.83 | 0 | 0 |
| 360x800 | 3619 | 1127.42 | 1151.42 | 0 | 0 |

No JavaScript page errors recorded in the matrix. Automated axe is not full manual accessibility certification. Source fixtures, backend contracts and design image files were not changed.

## Verification ownership / historical guards

Old v1.81/v1.130/v1.145/v1.203 schematic/card-only source guards and exact old E2E cases are explicitly HISTORICAL_SUPERSEDED, not counted as PASS; new v1.223 behavior, layout, palette and semantic tests replace them. The multi-route v1.85 source guard follows the new status composition while retaining all other routes. No broad test thresholds were relaxed.

Final isolated clean source guard, typecheck, diff check and negative invalid-token control are recorded in closure-checks.json. ZIP replay and validation of the extracted final source ZIP are recorded externally by the packager. A leftover “continue until tester pack is closed” sentence in the prior queue was corrected to the active status page, and the next queue is rebuilt explicitly to avoid stale route wording.

## Next / non-claims

Next page `/support`: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.224. Continue real browser implementation using its registered target. Do not create a fake ticket system or accept private account data.

No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. No independent backend. No CMS. No production deployment. No payment/shop/economy. NO_ACCEPTED_BACKEND_CONTRACT. No monitoring, actual incident system or server health claim.
