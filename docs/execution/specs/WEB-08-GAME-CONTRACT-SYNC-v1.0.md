# WEB-08-GAME-CONTRACT-SYNC-v1.0

Status: WEB_BLOCKED_EXTERNAL_CONTRACT.

Decision: the web repo cannot begin real Portal/Ops integration because no
accepted Auth/API/DB/RBAC/audit contract package has been supplied.

## Scope

Allowed:

- Record the contract intake gate in `packages/contracts`.
- Record inspected upstream evidence and why it is not sufficient.
- Keep API client and auth packages in a blocked state.
- Add source validation that prevents fake contracts, fixture promotion, or
  hidden app-local DTOs.

Forbidden:

- No independent backend.
- No production auth implementation.
- No generated or hand-written canonical account, character, inventory,
  support, RBAC, audit, or ops mutation DTOs.
- No fake fetch, axios client, or route handler integration.
- No enabling disabled fixture controls.

## Required Acceptance Inputs

WEB-08 can move past SPEC_LOCK only after these inputs are supplied together:

- canonical Java/Spring Boot repository commit and API version;
- owner-approved endpoint inventory/schema;
- auth/session/expiry/error semantics;
- permission and audit requirements;
- integration environment and test-account procedure.

A source file or fixture alone is not owner acceptance.

## Upstream Evidence Inspected

The sibling game repo at `../LinhGioiOnline` was inspected at commit
`efa46a898b738cb84f275463e6449a8cde48e177`. That repo had a dirty worktree at
inspection time, so the observed tree cannot be treated as a sealed baseline.

Relevant accepted game-side markers found:

- `LGO_MASTER_ROADMAP_ACCEPTED_v1.0`
- `LGO_CODE_GOVERNANCE_CONTRACT_ACCEPTED_v1.0`
- `M6_COMBAT_PROTOCOL_GAMEDATA_CONTRACT_ACCEPTED_v0.40.0`

These records cover roadmap/governance/combat/network/gamedata context. They are
not sufficient for Portal/Ops web integration because they do not provide an
owner-approved endpoint inventory/schema, auth/session/expiry/error semantics,
permission and audit requirements, or integration environment/test-account
procedure for web.

## Current Package State

`packages/contracts`, `packages/api-client`, and `packages/auth` remain in
`NO_ACCEPTED_BACKEND_CONTRACT` mode. Any real integration must start from a
central contract sync in `packages/contracts`; app-local DTOs and fixture data
remain non-canonical.

## Lifecycle Position

- SELECT: complete.
- SPEC_LOCK: blocked by missing accepted contract inputs.
- IMPLEMENT: not started for real contract records.
- SOURCE_VERIFY: blocked-state validator added.
- RUNTIME_VERIFY: not applicable until contract records or generated client
  surfaces exist.
- VISUAL_REVIEW: not applicable; no UI changed.
- HANDOFF: blocked handoff recorded.
- CLOSED: not closed.
