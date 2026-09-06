# LGO-WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-REPORT-v1.16

Final decision: LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.16

## Scope completed

WEB v1.16 continues public-web product development. It focuses on performance as a player-facing readability and trust problem rather than a tooling expansion.

Implemented:

- Added `/performance` public route.
- Added `PublicPerformanceBudgetSections.tsx`.
- Added typed content:
  - `performanceCopyBudgetPrinciples`
  - `staticRouteCompositionRules`
  - `perceivedLoadSignals`
  - `mobileDensityBudgets`
- Added `performance-copy-budget-guide`.
- Added `performance-copy-asset-budget-polish-started` news entry.
- Updated Homepage, Start, Accessibility, Download, Download Trust, Status, Roadmap, Guides, Guide Detail, Game Loop and Support Safety to link the performance/copy-budget route where it helps player understanding.
- Updated navigation and sitemap.
- Updated docs/state/next-action/task-ledger/non-claims.
- Added source validator `tools/validate_web_public_performance_copy_asset_budget_polish.py` and integrated it into `validate_web_current_state.py`.

## Product result

The public web now explains:

- why copy should be short and summary-first;
- why visual fantasy stays CSS-only until approved runtime assets exist;
- why static routes are preferred while backend/CMS contracts are blocked;
- how perceived load is improved by showing route purpose, blockers and next actions early;
- how mobile reading density avoids turning the homepage into a technical changelog.

## Validation

PASS:

- `python3 -m py_compile tools/*.py`
- `python3 tools/validate_web_public_performance_copy_asset_budget_polish.py`
- `python3 tools/validate_web_current_state.py`
- Runtime kit Node: `v24.20.0`
- Runtime kit pnpm: `10.15.0`
- `pnpm install --offline --ignore-scripts`
- `pnpm lint`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/content typecheck`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build` on rerun

## Runtime note

The first long chained runtime command timed out during web build output collection. The web build was rerun as a standalone command and PASSed, including the new `/performance` route and the new `/guides/performance-copy-budget-guide` SSG path.

## Non-claims

- No Core Web Vitals measured PASS.
- No Lighthouse score certification.
- No production RUM monitoring.
- No CDN deployment claim.
- No image CDN integration.
- No approved production art pipeline.
- No production auth.
- No DB persistence.
- No real portal/ops integration.
- No independent backend.
- No CMS.
- No production deployment.
- No public game download artifact.
