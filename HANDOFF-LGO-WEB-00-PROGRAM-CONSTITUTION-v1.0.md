# HANDOFF — LGO WEB-00 Program Constitution v1.0

## Final decision

LGO_WEB_PROGRAM_CONSTITUTION_CLOSED_v1.0

## Files created

See `LGO-WEB-00-CHANGED-FILES.txt`.

## Commands executed

```text
$ pwd
/mnt/data/lgo-web-00-work/web-source

$ find . -maxdepth 3 -type f | sort
Listed repo-relative WEB-00 files and placeholders.

$ python3 -m py_compile tools/validate_web_program_constitution.py
exit 0

$ python3 tools/validate_web_program_constitution.py
WEB PROGRAM CONSTITUTION VALIDATION PASS
exit 0
```

## Evidence

| Gate | Result | Evidence |
|---|---|---|
| Input source SHA256 | PASS | `170d02c9e60cde2a69191003e76bb4d6a66a16b3fa46e89840c9678fa4f61055` |
| Required source structure | PASS | `find . -maxdepth 3 -type f | sort` |
| Validator syntax | PASS | `python3 -m py_compile tools/validate_web_program_constitution.py` |
| Constitution validator | PASS | `WEB PROGRAM CONSTITUTION VALIDATION PASS` |
| Runtime app validation | DEFERRED_BY_SCOPE | WEB-00 intentionally does not scaffold JS app or run npm/pnpm. |


## VERIFY-phase finding and fix

- Finding: `WEB-PERFORMANCE-BUDGET.md` did not preserve the exact prompt phrase `initial route JS budget`; it used `Initial route JavaScript budget`.
- Classification: documentation wording compliance issue, not architecture drift.
- Fix: changed the heading to the exact required phrase `initial route JS budget` and strengthened the validator to check this budget wording plus image/font/animation/bundle-analysis budget sections.
- Retest: `python3 -m py_compile tools/validate_web_program_constitution.py` PASS, `python3 tools/validate_web_program_constitution.py` PASS, targeted content spot check PASS, package hygiene scan PASS after removing generated cache.

## Output artifacts

- `LGO-WEB-00-program-constitution-v1.0-full-source.zip`
- `LGO-WEB-00-program-constitution-v1.0-full-source.zip.sha256`
- `WEB-00-PROGRAM-CONSTITUTION-REPORT-v1.0.md`
- `HANDOFF-LGO-WEB-00-PROGRAM-CONSTITUTION-v1.0.md`
- `LGO-WEB-00-CHANGED-FILES.txt`
- `LGO-WEB-00-DELETIONS.txt`
- `LGO-WEB-00-ARTIFACTS-v1.0.sha256`

## SHA256

Exact artifact SHA256 values are recorded in the sibling `.sha256` file and `LGO-WEB-00-ARTIFACTS-v1.0.sha256` after packaging. The source-internal handoff does not embed the full-source ZIP hash to avoid self-referential package hashing.

## Next allowed task

`WEB-01-MONOREPO-FOUNDATION-v1.0`

## Forbidden next task

- Do not continue to WEB-02.
- Do not implement homepage content before WEB-01 foundation gates pass.
- Do not integrate backend.
- Do not create business backend.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No payment/shop/economy.
- No independent backend.
- No CMS.
- No production deployment.
