# WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: FE browser/e2e accessibility matrix across representative public, Portal and Ops routes. This slice adds an axe-powered browser gate and fixes a real mobile overflow found by that gate in Ops `/support` metric cards.

Acceptance:
- Playwright injects `axe-core` in browser and checks representative public, Portal and Ops routes on desktop/mobile for no serious/critical WCAG 2A/2AA violations.
- The same matrix asserts no page-level horizontal overflow and readable heading/link/button font-size caps.
- Shared `packages/ui/src/data.css` wraps long fixture/contract tokens inside metric cards so Ops `/support` mobile Pixel 7 no longer overflows.
- No backend calls, forms, CMS, Portal integration, Ops mutation or accepted backend contract claims are introduced.

Evidence:
- RED browser/e2e reproduced Ops `/support` mobile horizontal overflow of 19px after axe route matrix setup.
- GREEN browser/e2e passed 16/16 route/viewport checks after the shared metric wrap fix.
- Source validator locks axe test coverage, metric overflow CSS, docs, and next-action handoff.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

keyboard evidence: route links, buttons and focus-specific coverage remain part of the surrounding accessibility audit.
