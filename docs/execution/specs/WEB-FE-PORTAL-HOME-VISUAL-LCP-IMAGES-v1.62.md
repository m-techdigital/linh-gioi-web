# WEB-FE-PORTAL-HOME-VISUAL-LCP-IMAGES-v1.62

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: Portal home visual image loading. This FE-only slice responds to browser review where the Portal home Võ development-art image was detected as LCP-sensitive on mobile, while keeping the page fixture-only and contract-blocked.

Acceptance:
- `apps/portal/src/app/page.tsx` owns the Portal home visual panel composition.
- Both Portal home visual panel images render with `loading="eager"` because either image can become LCP depending on viewport/layout.
- Browser/e2e verifies both Portal home visual images are visible, loaded, eager, have no page-level overflow, and keep copy font sizes capped on desktop/mobile.
- No forms, fetches, server actions, backend routes, Portal integration or Ops/Admin mutation are introduced; existing keyboard behavior is preserved.

Evidence:
- RED browser/e2e reproduced `loading="lazy"` on `Portal home development art Võ`.
- GREEN browser/e2e passed after the Portal home visual panel loading change.
- Source validator locks Portal home image loading, e2e coverage, docs and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
