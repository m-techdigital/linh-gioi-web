# LGO-WEB OPT-21 Active Test/Validator Authority Consolidation Report v1.298

Status: WEB_CLOSED
Source delivery: `3a11d997c0ee8576fd49dbce2d12e5e6c94e34bc`
Authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`

## Outcome

The repository now has one canonical active-suite authority:
`tools/web_active_suite_manifest_v1298.json`.

The manifest classifies **167 active validators**, **159 active browser specs**, **119 superseded validators**, **112 superseded browser specs**, **18 provenance-only validators**, and **1 retired browser ignore pattern whose original spec no longer exists**.

Historical/superseded entries remain recoverable provenance. They are not executed or printed as current runtime PASS evidence.

## Before / after authority

At entry the repo contained 271 E2E specs and 304 validators. `validate_web_current_state.py` embedded 285 validator references: 166 active and 119 superseded. `playwright.config.ts` embedded 113 ignore patterns, of which 112 still mapped to files and one historical v1.143 readiness pattern no longer existed.
After consolidation, `validate_web_current_state.py` dispatches only `active.validators` from the manifest and `playwright.config.ts` derives `testMatch` and `testIgnore` from the same authority.

The executable authority files are materially smaller:
- `validate_web_current_state.py`: **667 → 265 lines**.
- `playwright.config.ts`: **221 → 56 lines**.

The large inventory is intentionally data, not executable routing logic.

## Supersession and compatibility

One validator chain was flattened explicitly:
`validate_web_fe_news_real_ui_layout_v1176.py → validate_web_fe_news_discovery_v1253.py → validate_web_opt_public_ia_language_v1281.py`.

WEB-OPT validators v1.278–v1.297 now check manifest registration instead of grepping current-state implementation source. v1.281 and v1.285 supersession checks also read manifest authority instead of legacy dict/testIgnore syntax.

## Verification

TDD RED first proved the missing manifest plus both hard-coded authorities. The first GREEN attempt also exposed two harness facts that were fixed at source: Playwright loads the TypeScript config as CommonJS, so manifest lookup uses `__dirname`; and validator supersession can contain a chain that must resolve to the terminal active validator.
Final focused authority verification:
- v1.298 authority validator: PASS.
- Playwright `--list`: **159/159 active spec files**, zero missing and zero unexpected.
- Clean `WEB CURRENT STATE`: PASS with **167 active validators**.
- Historical runtime-pass marker count: **0**.
- Web typecheck: PASS.
- Web lint: PASS.
- Python compile + `git diff --check`: PASS.

No browser UI run was needed because v1.298 changes test/validator authority only; Playwright configuration behavior was exercised through `--list`, and no public product source changed.

## Non-claims / next

No public UI/copy, content fixture, backend contract, runtime behavior or production deployment changed.

Next authority: `WEB-OPT-22-CONTENT-FIXTURE-MODULARIZATION-v1.299`.
