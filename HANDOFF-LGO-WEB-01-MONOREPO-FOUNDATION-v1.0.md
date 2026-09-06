# HANDOFF — LGO WEB-01 MONOREPO FOUNDATION v1.0

Final decision: WEB_01_MONOREPO_FOUNDATION_ENV_LIMITED

## Scope closed in this artifact

WEB-01 created the source-level monorepo foundation for the independent `LinhGioiOnline-Web` repo from the accepted WEB-00 baseline.

This is new web code. It does not modify the uploaded game source and does not copy Unity, Java server, protocol or gamedata roots.

## Files changed

See:

- `LGO-WEB-01-CHANGED-FILES.txt`
- `LGO-WEB-01-DELETIONS.txt`

## Evidence table

| Gate | Result | Evidence |
|---|---|---|
| Input ZIP SHA | PASS | `f1cddceebcd402abe61ff50704e3aa0f8d033b973ff50357d481f519817005f9` |
| WEB-00 sidecar mismatch normalization | NOT NEEDED | Sidecar matched actual ZIP in current sandbox |
| Unzip integrity | PASS | `unzip -t` exit 0 |
| No parent wrapper | PASS | Required root files found after extraction |
| WEB-00 validator | PASS | `WEB PROGRAM CONSTITUTION VALIDATION PASS` |
| WEB-01 validator py_compile | PASS | exit 0 |
| WEB-01 validator | PASS | Initial targeted verify found transient `__pycache__` self-failure after `py_compile`; validator was fixed in scope and rerun PASS |
| Node.js target | UNVERIFIED_ENVIRONMENT | Sandbox has Node v22.16.0, target is Node 24 LTS |
| pnpm availability | UNVERIFIED_ENVIRONMENT | Corepack shim exists, but pinned pnpm 10.15.0 download failed with DNS `EAI_AGAIN` |
| pnpm install | UNVERIFIED_ENVIRONMENT | Attempted; failed before install because Corepack could not download pinned pnpm |
| pnpm lint | UNVERIFIED_ENVIRONMENT | Not run; no PASS claimed |
| pnpm typecheck | UNVERIFIED_ENVIRONMENT | Not run; no PASS claimed |
| pnpm test | UNVERIFIED_ENVIRONMENT | Not run; no PASS claimed |
| pnpm build | UNVERIFIED_ENVIRONMENT | Not run; no PASS claimed |
| Package hygiene | PASS | generated/cache directories absent before packaging |
| Forbidden roots leakage scan | PASS | no `client`, `server`, `protocol`, `gamedata` roots |
| Backend non-integration | PASS | no `app/api/**`, no business backend, no DB |

## Commands executed

```bash
sha256sum /mnt/data/LGO-WEB-00-program-constitution-v1.0-full-source.zip
unzip -t /mnt/data/LGO-WEB-00-program-constitution-v1.0-full-source.zip
python3 -m py_compile tools/validate_web_program_constitution.py
python3 tools/validate_web_program_constitution.py
python3 -m py_compile tools/validate_web_monorepo_foundation.py
python3 tools/validate_web_monorepo_foundation.py
node --version
corepack --version
pnpm --version
corepack enable
pnpm install
find . \( -name node_modules -o -name .next -o -name dist -o -name build -o -name coverage -o -name __pycache__ \) -print
find . -maxdepth 1 -type d \( -name client -o -name server -o -name protocol -o -name gamedata \) -print
git init
git add .
git --no-pager diff --check --cached
git status --short --untracked-files=all
```

## Targeted verification update

Targeted verification found one actionable source validator issue: `py_compile` created transient `tools/__pycache__`, then the validator failed its own cache scan. The fix is limited to `tools/validate_web_monorepo_foundation.py`: verifier-generated `__pycache__` is treated as transient during source-tree validation, while final package hygiene is still enforced before packaging and through ZIP-entry scans.

The app layout files were also hardened to use explicit `ReactNode` type imports. No homepage content, backend integration, route handlers, auth, DB, CMS or deployment behavior was added.

## Runtime/build verification status

Source validators passed. Runtime package gates are environment-limited because this sandbox does not have the target Node.js 24 LTS and could not fetch pnpm from the package registry.

## Environment limitations

- Node.js is v22.16.0, below the WEB-01 Node.js 24 LTS target.
- pnpm is represented by a Corepack shim, but the pinned pnpm 10.15.0 package is not locally available.
- Corepack attempted to download pnpm 10.15.0 but DNS/registry access failed with `EAI_AGAIN registry.npmjs.org`.

## Output artifacts

- `LGO-WEB-01-monorepo-foundation-v1.0-full-source.zip`
- `LGO-WEB-01-monorepo-foundation-v1.0-full-source.zip.sha256`
- `LGO-WEB-01-monorepo-foundation-v1.0-delta.zip`
- `LGO-WEB-01-monorepo-foundation-v1.0-delta.zip.sha256`
- `WEB-01-MONOREPO-FOUNDATION-REPORT-v1.0.md`
- `HANDOFF-LGO-WEB-01-MONOREPO-FOUNDATION-v1.0.md`
- `LGO-WEB-01-CHANGED-FILES.txt`
- `LGO-WEB-01-DELETIONS.txt`
- `LGO-WEB-01-ARTIFACTS-v1.0.sha256`

SHA256 values are emitted in the external `.sha256` sidecar files and final response.

## Next allowed task

Resolve package/runtime environment or rerun WEB-01 runtime gates.

`WEB-02-DESIGN-SYSTEM-v1.0` is not automatically opened from this handoff because WEB-01 is environment-limited.

## Forbidden next task

Do not begin WEB-02, homepage feature content, portal integration, ops integration, production auth, DB persistence, CMS or deployment from this source unless the owner explicitly accepts the environment-limited risk or WEB-01 package gates are rerun and pass.

## Explicit non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
