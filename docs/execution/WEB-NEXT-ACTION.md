# WEB-NEXT-ACTION

Current task:

```text
WEB-08-GAME-CONTRACT-SYNC-v1.0
```

Status: WEB_BLOCKED_EXTERNAL_CONTRACT.

v1.36–v1.38 fixture UX work and its discovered visual repairs are closed. Continue the program with the accepted backend Auth/API/DB/RBAC/audit contract. The program is not production-complete.

Required input: canonical Java/Spring Boot repository commit and API version; owner-approved endpoint inventory/schema; auth/session/expiry/error semantics; permission and audit requirements; integration environment and test-account procedure. Read and record these centrally in packages/contracts before any real Portal/Ops integration. A source file or a fixture alone is not owner acceptance.

After acceptance: SELECT → SPEC_LOCK → IMPLEMENT contract records/client generation only where supported → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW (applicable scope recorded) → HANDOFF → CLOSED. Then select WEB-09 integration flows and WEB-10 deployment/security gates according to the master roadmap.

Base First and Evidence Reuse / Build Once remain mandatory. No independent backend, no duplicate DTO owners, no fake fetch, no enabling fixture mutation controls. Do not generate endless version-only fixture batches to claim production completion.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped v1.36–v1.38 tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.
