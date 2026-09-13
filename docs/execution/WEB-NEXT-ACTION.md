# WEB-NEXT-ACTION

Current task:

```text
WEB-FE-CONTINUED-SURFACE-POLISH-v1.41
```

Status: WEB_TASK_CONTINUE.

User direction: continue FE work first, use needed game images, and verify real UI/UX layout in browser/e2e. Demo data is allowed while backend is not ready. Do not create an independent backend and do not claim real integration.

Current FE scope: continue visual design/layout review across remaining demo surfaces after v1.40. Inspect Public/Portal/Ops routes for oversized typography, weak hierarchy, missing visual anchors, horizontal overflow, mobile readability and fixture boundary clarity. Prefer shared `packages/ui` ownership for reusable layout/components. Use selected existing game-art derivatives only when they improve design review and record provenance.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT FE-only visual/layout improvements → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Required evidence: source validator for the selected visual/layout task, app/UI typecheck, relevant production build, Playwright desktop/mobile e2e with font-size/layout/image/overflow assertions, screenshot review. No independent backend, no duplicate DTO owners, no fake fetch, no forms, no enabling fixture mutation controls.

WEB-08 note: accepted backend Auth/API/DB/RBAC/audit contract is still required before any real Portal/Ops integration. The WEB-08 blocked-state spec/report/handoff and validator remain as the integration gate. A source file or a fixture alone is not owner acceptance.

After acceptance: SELECT → SPEC_LOCK → IMPLEMENT contract records/client generation only where supported → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW (applicable scope recorded) → HANDOFF → CLOSED. Then select WEB-09 integration flows and WEB-10 deployment/security gates according to the master roadmap.

Base First and Evidence Reuse / Build Once remain mandatory. No independent backend, no duplicate DTO owners, no fake fetch, no enabling fixture mutation controls. Do not generate endless version-only fixture batches to claim production completion.

Historical continuity: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15 remains historical evidence. WEB-01 through WEB-07 environment-limited claims are not globally upgraded by scoped v1.36–v1.40 tests; rerun relevant package/runtime/browser gates before claiming them fully closed.

If WEB-01 package/runtime closure is revisited, first resolve package/runtime environment and rerun WEB-01 runtime gates. Before claiming historical environment-limited WEB-01 through WEB-07 milestones fully runtime-closed, rerun WEB-01 through WEB-07 package/runtime/browser gates.
