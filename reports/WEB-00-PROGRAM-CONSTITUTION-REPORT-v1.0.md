# WEB-00 Program Constitution Report v1.0

## Task ID

WEB-00-PROGRAM-CONSTITUTION-v1.0

## Goal

Create a complete artifact-first source package for the independent `LinhGioiOnline-Web` repo.

## Input game source artifact

`LGO-CHATGPT-HANDOFF-full-source-1cfe462-20260905(1).zip`

## Input SHA256

`170d02c9e60cde2a69191003e76bb4d6a66a16b3fa46e89840c9678fa4f61055`

## Game source commit reference

`1cfe462 fix: clarify world interaction prompts`

## Missing/available context files reviewed

### Available

- README.md: available
- START-HERE.md: available
- VERSIONING.md: available
- docs/execution/PROJECT-STATE.md: available
- docs/execution/NEXT-ACTION.md: available
- docs/execution/TASK-LEDGER.md: available
- docs/execution/MILESTONE-ROADMAP.md: available
- docs/execution/LGO-MASTER-ROADMAP-v1.0.md: available
- docs/execution/LGO-PRODUCTION-READINESS-ROADMAP-v1.0.md: available
- docs/execution/LGO-AUTH-DB-COMBAT-ROADMAP-v1.0.md: available
- docs/design/**: available (16 files)
- docs/art/**: available (40 files)
- m0-manifest.json: available
- m1-manifest.json: available
- m2-manifest.json: available
- m3-manifest.json: available
- m4-manifest.json: available
- m5-manifest.json: available

### Missing

- m6-manifest.json

## Repo separation decision

`LinhGioiOnline-Web` is an independent source repo. It does not copy large Unity/game/server files and does not modify game source.

## Backend canonical decision

The Java/Spring Boot backend in `LinhGioiOnline/server` remains canonical for auth/account/character/game data. This Web repo must not create an independent business backend.

## 3 app model

- `apps/web`: official public website.
- `apps/portal`: player portal, blocked until Auth/DB/API contract acceptance.
- `apps/ops`: internal Ops/Admin/GM, blocked until RBAC/audit/security/API contract acceptance.

## Phase roadmap

WEB-00 through WEB-10 are defined in `docs/execution/WEB-MASTER-ROADMAP.md`.

## Created files

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

## Validator result

`WEB PROGRAM CONSTITUTION VALIDATION PASS`

## Package result

Full-source ZIP is produced from inside `web-source` with no parent wrapper. Exact ZIP SHA256 is recorded in the sibling `.sha256` file and `LGO-WEB-00-ARTIFACTS-v1.0.sha256` after packaging.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.

## Next action

`WEB-01-MONOREPO-FOUNDATION-v1.0`

## Targeted verification addendum

A VERIFY-phase spot check found one wording compliance issue: `WEB-PERFORMANCE-BUDGET.md` used `Initial route JavaScript budget` while the authoritative WEB-00 prompt required `initial route JS budget`.

Root cause: semantically equivalent wording did not preserve the exact required phrase.

Fix applied within WEB-00 scope:

- Updated `docs/execution/WEB-PERFORMANCE-BUDGET.md` to use the exact required phrase `initial route JS budget`.
- Strengthened `tools/validate_web_program_constitution.py` so the performance budget gate also checks `initial route JS budget`, `image budget`, `font loading rules`, `no heavy animation by default`, and `bundle analysis gate`.
- Removed generated `tools/__pycache__` before packaging.

Targeted verification after fix:

```text
python3 -m py_compile tools/validate_web_program_constitution.py: PASS
python3 tools/validate_web_program_constitution.py: WEB PROGRAM CONSTITUTION VALIDATION PASS
targeted content spot check: PASS
forbidden artifact/cache scan after cleanup: PASS
```
