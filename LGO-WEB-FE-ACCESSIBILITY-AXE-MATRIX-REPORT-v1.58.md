# LGO Web FE Accessibility Axe Matrix Report v1.58

Task: WEB-FE-ACCESSIBILITY-AXE-MATRIX-v1.58
Status: WEB_CLOSED.

Change summary:
- Added browser/e2e `tests/e2e/fe-accessibility-axe-matrix-v158.spec.ts`, which injects `axe-core` into real Playwright browser sessions for representative public, Portal and Ops routes on desktop/mobile.
- The matrix asserts no serious/critical axe violations, no page-level horizontal overflow, and capped h1/link/button font sizes.
- Fixed shared metric card overflow in `packages/ui/src/data.css` by allowing long fixture/contract tokens such as `NO_REAL_OPS_MUTATION` to wrap safely.

Verification evidence:
- RED: `pnpm exec playwright test tests/e2e/fe-accessibility-axe-matrix-v158.spec.ts --project=chromium-mobile --reporter=line --trace=off` failed on Ops `/support` with mobile horizontal overflow 19px.
- GREEN: `pnpm exec playwright test tests/e2e/fe-accessibility-axe-matrix-v158.spec.ts --reporter=line --trace=off` passed 16/16 after the shared metric wrap fix.
- Source validator: `python3 tools/validate_web_fe_accessibility_axe_matrix_v158.py` expected after control docs update.
- Required closure gates to run before commit: UI typecheck, Web/Portal/Ops typecheck, Web/Portal/Ops production build, v1.58 Playwright desktop/mobile matrix, v1.58 validator, current-state validator in a clean copy, and screenshot visual review.

Runtime/browser review notes:
- The e2e matrix covers public `/`, `/classes`, `/download`; Portal `/login`, `/support`; Ops `/support`, `/audit`, `/trust-safety`.
- The matrix is evidence-only plus a shared CSS fix. It does not add any backend integration, mutation or query behavior.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.

keyboard evidence: route links, buttons and focus-specific coverage remain part of the surrounding accessibility audit.
