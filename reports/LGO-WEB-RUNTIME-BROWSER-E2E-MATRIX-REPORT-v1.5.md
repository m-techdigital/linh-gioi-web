# LGO Web Runtime Browser E2E Matrix Report v1.5

TASK_ID: LGO-WEB-RUNTIME-BROWSER-E2E-MATRIX-v1.5

Final decision: LGO_WEB_RUNTIME_BROWSER_E2E_MATRIX_PASSED_v1.5

## Objective

Close the remaining WEB v1.5 runtime/browser evidence slice after v1.4 proved the uploaded Linux amd64 runtime kit works. This task expands browser coverage from the public app to the actual current web product surface: public web, player portal shell and ops/admin shell.

Runtime/browser/e2e is support infrastructure. The product direction after this closure returns to building the web experience itself: page quality, responsive UX, content clarity, download/support/news polish, and fixture-only portal/ops clarity until backend contracts are accepted.

## Baseline

Input baseline: LGO-WEB-runtime-preseed-split-upload-v1.4-full-source.zip

Baseline decision: LGO_WEB_RUNTIME_PRESEED_SPLIT_UPLOAD_RUNTIME_GATES_PASSED_WITH_TOOLING_FIX_v1.4

## Runtime kit

Uploaded runtime kit timestamp: lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T062355Z.tar.gz

Runtime kit state:

- split parts present: PASS
- part checksums: PASS
- reassembled full archive: PASS
- full archive SHA256: PASS
- extracted/installed kit: PASS
- Node from kit: v24.20.0
- pnpm from kit: 10.15.0

## Changes

Added runtime/browser matrix coverage:

- `tests/e2e/runtime-multi-app.spec.ts`
- `tools/run_lgo_web_browser_matrix.sh`
- `tools/validate_web_runtime_browser_matrix.py`
- `docs/execution/WEB-RUNTIME-BROWSER-E2E-MATRIX-v1.5.md`
- `docs/execution/checklists/WEB-RUNTIME-BROWSER-E2E-CHECKLIST-v1.5.md`

Updated scripts and governance docs:

- `package.json`
- `playwright.config.ts`
- `tools/validate_web_current_state.py`
- `tools/validate_web_runtime_preseed.py`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`

## Validation evidence

Source validators after cleaning generated artifacts:

- `python3 -m py_compile tools/*.py`: PASS
- `python3 tools/validate_web_current_state.py`: PASS
- `python3 tools/validate_web_runtime_preseed.py`: PASS
- `python3 tools/validate_web_runtime_browser_matrix.py`: PASS

Package/runtime gates using uploaded runtime kit:

- `pnpm install --offline --ignore-scripts`: PASS
- `pnpm lint`: PASS
- `pnpm typecheck`: PASS
- `pnpm exec turbo run test --concurrency=1 --output-logs=errors-only`: PASS, 11 packages successful
- `pnpm exec turbo run build --concurrency=1 --output-logs=errors-only`: PASS, 11 packages successful
- `pnpm test:e2e`: PASS through the sharded matrix runner

Browser matrix evidence:

- public navigation desktop: 5 passed
- public navigation mobile: 5 passed
- public web matrix desktop: 3 passed
- player portal matrix desktop: 3 passed
- ops/admin matrix desktop: 3 passed
- public web matrix mobile: 3 passed
- player portal matrix mobile: 3 passed
- ops/admin matrix mobile: 3 passed
- final marker: `LGO_WEB_BROWSER_MATRIX_RESULT PASS`
- total browser route assertions: 28 passed

## False-pass prevention

v1.5 preserves the v1.4 fix that prevents `pnpm test:e2e` from delegating to a missing workspace script. The root `test:e2e` script now calls `bash tools/run_lgo_web_browser_matrix.sh`, which starts all required apps, waits for real HTTP readiness, runs Playwright shards, and emits `LGO_WEB_BROWSER_MATRIX_RESULT PASS` only after all shards pass.

## Scope boundaries

No game source was changed or copied. No forbidden game roots were introduced. No `app/api/**` business backend route was created.

## Non-claims

- no production auth
- no DB persistence
- no real portal integration
- no real ops/admin mutation
- no independent backend
- no CMS
- no production deployment
- no payment/shop/economy
- no backend contract sync
- no Core Web Vitals pass claim

## Next recommendation

Proceed with `WEB-PUBLIC-UX-CONTENT-POLISH-v1.6`: focus on the actual web product content and UX. Runtime/browser E2E should remain as regression support, not the main body of work.
