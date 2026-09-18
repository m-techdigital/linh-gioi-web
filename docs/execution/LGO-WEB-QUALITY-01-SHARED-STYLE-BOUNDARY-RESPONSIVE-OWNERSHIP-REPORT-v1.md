# LGO-WEB-QUALITY-01 — Shared Style-Boundary & Responsive Ownership Report v1

Date: 2026-09-18
Task: T-90514fe13abc
Base source: d8e9fa11ed057f082f11f8a8aaaffeaf0f4daddd
Status: IMPLEMENTED — final commit is recorded in task/evidence closure

## Goal

Add a small static quality gate for Portal/Ops workspace CSS that prevents recurring responsive/style ownership mistakes without copying AXIRO's validator/debt scale or reopening frozen Public Web optimization.

Protected scope:
- packages/ui/src/shell.css
- packages/ui/src/forms.css
- packages/ui/src/data.css
- packages/ui/src/progress.css
- apps/portal/src/app/globals.css
- apps/ops/src/app/globals.css

Public Web landing/article CSS is intentionally outside this checker.
## Behaviors guarded

The checker rejects:
- unapproved breakpoint literals in the six owned workspace CSS files;
- app-local redefinition of shared --lgo-* tokens;
- app-local override of shared workspace/component selectors;
- Portal importing Ops styles or Ops importing Portal styles;
- overflow-x:hidden used as a responsive rescue;
- width:100vw inside workspace-owned CSS;
- large fixed width/min-width >=600px without an explicit nearby ownership marker.

The existing shared data table min-width:620px is legitimate because it lives inside an owned horizontal-scroll wrapper. It is now documented beside the rule with:

style-boundary-owned-scroll: data table horizontal scroll contract

This is explicit ownership, not a hidden path/line exception.
## Integration design

A first attempt registered the new checker as a separate WEB CURRENT STATE validator. Clean candidate validation correctly failed the v1.300 active-validator budget at 170 validators.

Rather than increasing the budget, the implementation was simplified:
- tools/web_workspace_style_boundaries.py is a helper/focused CLI;
- tools/validate_web_shared_base.py imports and executes the helper as part of the existing shared-base active gate;
- active validator count remains 169;
- no new independent validator entry is added to web_active_suite_manifest_v1298.json.

This preserves current-state authority while avoiding validator sprawl.
## TDD evidence

RED:
- python3 -m unittest tools.test_validate_web_workspace_style_boundaries
- failed with ModuleNotFoundError because the checker did not exist.

GREEN:
- 9/9 focused unit tests PASS.

Covered RED/GREEN cases:
- accepted owned shell breakpoint;
- rejected unowned breakpoint;
- rejected app-local shared token;
- rejected overflow-x:hidden;
- rejected width:100vw;
- rejected unowned large fixed width;
- accepted explicit owned-scroll fixed width;
- rejected app-local shared selector override;
- rejected cross-app style import.
## Integration verification

Focused:
- web_workspace_style_boundaries.py: PASS on six owned CSS files.
- validate_web_shared_base.py: PASS.
- validate_web_opt_active_suite_authority_v1298.py: PASS.
- active validators: 169.

Live worktree WEB CURRENT STATE was intentionally not used as source proof because local runtime caches currently exist under node_modules/** and apps/web/.next/** and are forbidden by the source-candidate gate.

A clean candidate was built from git archive of the exact base plus the task overlay. On that clean candidate:
- workspace style-boundary helper: PASS;
- WEB CURRENT STATE: PASS.

No cache or active runtime process was killed or deleted to manufacture a PASS.
## Changed source

- packages/ui/src/data.css
  - documents the legitimate owned horizontal-scroll table width.
- tools/web_workspace_style_boundaries.py
  - focused scanner/helper/CLI.
- tools/test_validate_web_workspace_style_boundaries.py
  - nine RED/GREEN characterization tests.
- tools/validate_web_shared_base.py
  - dispatches the workspace boundary helper through an existing active validator.
- this report.

No Portal/Ops route behavior, API contract, fixture data, Public Web page, or Game source is changed.
## Acceptance result

PASS criteria:
- concrete LGO workspace ownership problems are guarded;
- current workspace source passes;
- no giant debt allowlist;
- no active-validator budget increase;
- no Public Web scope expansion;
- RED fixtures + GREEN checks exist;
- gate runs under existing WEB CURRENT STATE authority;
- clean-source WEB CURRENT STATE passes.

This task is a quality-boundary improvement only. It does not claim that Portal/Ops real backend integration is open.
