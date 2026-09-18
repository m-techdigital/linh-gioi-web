# LGO-WEB OPT-23 Public Performance & Governance Budgets Report v1.300

Status: WEB_CLOSED
Source delivery: `5dc5813eced6d732fac2df830586f8b4303196d9`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`
Baseline: `fb44f69b9ee9a6a6fc3fd6e593ce59340e8c1521` (accepted v1.299 final HEAD)

## Outcome

WEB-OPT-23 codifies automated regression budgets over the accepted optimized public Web source without changing public UI, approved copy, backend contracts or deployment behavior. The budget owner covers decoded CSS, public asset footprint, heavy image transfer, route page-height outliers, accidental design-reference shipping and active-suite authority drift.

The v1.298 active-suite manifest remains the single browser/validator authority. The v1.300 budget guard/spec are registered as active gates, taking the accepted authority from 168 validators / 159 browser specs before v1.300 to **169 validators / 160 browser specs** after registration. The configured caps intentionally equal 169/160, so future active-suite growth requires an explicit budget review instead of silently expanding the suite.

## Accepted runtime budgets

Fresh exact-source production-static browser verification covers all 59 public routes on desktop and mobile:
- decoded CSS median/max: **174,917 / 178,914 bytes**; limits 184,000 / 188,000;
- desktop page-height P90/max: **3,258 / 3,391px**; limits 3,450 / 3,600;
- mobile page-height P90/max: **4,016 / 4,282px**; limits 4,250 / 4,500;
- image transfer P90 / max route / max single: **1,081,021 / 1,652,849 / 1,587,579 bytes**; limits 1,140,000 / 1,740,000 / 1,670,000;
- page-level overflow routes: **0**;
- runtime design-reference requests: **0**.

Public static footprint remains **80 files / 10,187,479 bytes**, including **10,148,291 image bytes** and max single asset **1,587,579 bytes**. Limits are 82 files / 10,700,000 total / 10,660,000 image / 1,670,000 max single. Public design-reference files remain **0**.

## Verification

Fresh closure evidence on exact source commit:
- production build **63/63 routes PASS**;
- v1.300 budget browser **6/6 PASS** across desktop/mobile and all 59 public routes;
- Content tests **23/23 PASS**;
- monorepo typecheck **11/11 PASS**;
- Web lint PASS;
- v1.300, v1.298 authority, v1.278 CSS and v1.280 asset source guards PASS;
- clean **2,052-file** source current-state candidate PASS;
- terminal governance overlay (report, ledger, terminal checkpoint parser and closure guard) produces a clean **2,053-file** final-governance current-state PASS.

The original RED source guard failed before the budget authority/spec existed. Accepted v1.299 runtime/source measurements were captured before enforcement; GREEN then proves the same accepted source fits explicit reviewable tolerances.

## Program state / non-claims

WEB-OPT-01 through WEB-OPT-23 are closed under the v1.277 optimization authority. Phase C has no approved automatic successor after v1.300.

No production deployment, live telemetry, real account/backend integration, CMS, DB persistence, payment/economy or invented runtime measurement is introduced. Future/backend-dependent work remains gated by accepted canonical game-backend/release contracts.

**No automatic successor is authorized.** Owner/reviewer may accept this checkpoint and explicitly commission a fresh assessment or activate a backend-dependent task only when its canonical authority exists.
