# WEB-01 MONOREPO FOUNDATION REPORT v1.0

Task ID: WEB-01-MONOREPO-FOUNDATION-v1.0

Final decision: WEB_01_MONOREPO_FOUNDATION_ENV_LIMITED

## Input artifact

- Input artifact: LGO-WEB-00-program-constitution-v1.0-full-source.zip
- Input actual SHA256: f1cddceebcd402abe61ff50704e3aa0f8d033b973ff50357d481f519817005f9
- Source baseline: WEB-00 Program Constitution closed source
- WEB-00 SHA sidecar mismatch normalization result: WEB_00_SHA_SIDECAR_MATCHED

## Goal

Create the first real engineering foundation for the independent `LinhGioiOnline-Web` repository: pnpm workspace, Turborepo, Next.js app structure, strict TypeScript configuration, shared packages, source validators and artifact-first handoff.

WEB-01 intentionally does not implement homepage content, portal workflows, ops workflows, backend integration or any business backend.

## Files changed

See `LGO-WEB-01-CHANGED-FILES.txt` and `LGO-WEB-01-DELETIONS.txt`.

## Apps created

- `apps/web`: active public website app shell only.
- `apps/portal`: compile-only placeholder blocked by accepted Auth/DB/API contract.
- `apps/ops`: compile-only placeholder blocked by accepted RBAC/audit/security/API contract.

## Packages created

- `packages/design-tokens`: minimal LGO color/theme tokens.
- `packages/ui`: tiny `FoundationBadge` component only.
- `packages/content`: placeholder file-backed content status and no CMS claim.
- `packages/contracts`: contract sync boundary and README.
- `packages/api-client`: `BackendContractUnavailableError` and `NO_ACCEPTED_BACKEND_CONTRACT` only.
- `packages/auth`: auth blocked placeholder, no production auth helpers.
- `packages/config`: environment labels only.
- `packages/testing`: placeholder test utility only.

## Root tooling created

- `package.json`
- `pnpm-workspace.yaml`
- `turbo.json`
- `tsconfig.base.json`
- `eslint.config.mjs`
- `prettier.config.mjs`
- `vitest.config.ts`
- `tools/validate_web_monorepo_foundation.py`

## Commands executed

| Command | Exit | Result |
|---|---:|---|
| `sha256sum /mnt/data/LGO-WEB-00-program-constitution-v1.0-full-source.zip` | 0 | PASS, matched expected actual SHA |
| `unzip -t /mnt/data/LGO-WEB-00-program-constitution-v1.0-full-source.zip` | 0 | PASS |
| `test -f web-source/AGENTS.md` | 0 | PASS |
| `test -f web-source/docs/execution/WEB-NEXT-ACTION.md` | 0 | PASS |
| `test -f web-source/tools/validate_web_program_constitution.py` | 0 | PASS |
| `python3 -m py_compile tools/validate_web_program_constitution.py` | 0 | PASS |
| `python3 tools/validate_web_program_constitution.py` | 0 | PASS |
| `python3 -m py_compile tools/validate_web_monorepo_foundation.py` | 0 | PASS |
| `python3 tools/validate_web_monorepo_foundation.py` | 0 | PASS |
| `node --version` | 0 | v22.16.0, below Node.js 24 LTS target |
| `corepack --version` | 0 | 0.32.0 |
| `pnpm --version` | 1 | Corepack shim present but pnpm package download failed with DNS `EAI_AGAIN registry.npmjs.org` |
| `corepack enable` | 0 | PASS |
| `pnpm install` | 1 | Corepack attempted pnpm 10.15.0 download and failed with DNS `EAI_AGAIN registry.npmjs.org` |
| package hygiene scan | 0 | PASS, empty result |
| forbidden game roots leakage scan | 0 | PASS, empty result |

## Node/pnpm environment

- Node.js available: yes.
- Node.js version: v22.16.0.
- Required target: Node.js 24 LTS.
- Corepack available: yes, version 0.32.0.
- pnpm available: Corepack shim present, but the pinned pnpm 10.15.0 package was not locally available.
- Corepack pnpm download: failed due DNS/registry `EAI_AGAIN registry.npmjs.org`.

## Install/build/typecheck/test results

- `pnpm install`: UNVERIFIED_ENVIRONMENT, attempted and failed before dependency install because Corepack could not download pnpm 10.15.0.
- `pnpm lint`: UNVERIFIED_ENVIRONMENT, not run.
- `pnpm typecheck`: UNVERIFIED_ENVIRONMENT, not run.
- `pnpm test`: UNVERIFIED_ENVIRONMENT, not run.
- `pnpm build`: UNVERIFIED_ENVIRONMENT, not run.
- `pnpm validate`: UNVERIFIED_ENVIRONMENT through pnpm; Python validator equivalent PASS.

No pnpm gate is claimed as PASS.


## Targeted verification finding and fix

During targeted verification, the required command order `python3 -m py_compile tools/validate_web_monorepo_foundation.py` followed by `python3 tools/validate_web_monorepo_foundation.py` produced transient `tools/__pycache__` bytecode and caused the WEB-01 validator to fail its own source-tree cache scan.

Root cause: the validator treated verifier-generated `__pycache__` as final source even though the prompt-required `py_compile` step creates it before the validator runs.

Fix applied in scope: `tools/validate_web_monorepo_foundation.py` now treats `__pycache__` as a transient verifier artifact in source-tree validation while final package hygiene remains enforced by pre-package cleanup and ZIP-entry scans.

Additional source hardening: Next.js app layouts now import `ReactNode` explicitly from `react` instead of relying on the global `React` namespace. This is a type-safety hardening change only; it does not add features.

Targeted verification rerun result: `python3 -m py_compile` and both WEB validators PASS after the fix.

## Validator results

- WEB-00 validator: PASS.
- WEB-01 validator: PASS.

## Package hygiene result

PASS. Final source excludes `node_modules`, `.next`, `dist`, `build`, `coverage` and `__pycache__` directories.

## Forbidden roots leakage scan

PASS. WEB-01 artifact does not contain forbidden game roots: `client`, `server`, `protocol`, `gamedata`.

## Backend non-integration confirmation

- No `app/api/**` route handlers were created.
- No endpoint integration was added.
- No business backend was created.
- No database package or persistence layer was added.
- Game Java/Spring Boot backend remains the future canonical business backend owner.

## Non-claims

- No production auth.
- No DB persistence.
- No real portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.

## Next action

Resolve package/runtime environment or rerun WEB-01 runtime gates on a valid Node.js 24 LTS + pnpm environment. Do not move to WEB-02 until WEB-01 package gates pass or the owner explicitly accepts the environment-limited scaffold risk.
