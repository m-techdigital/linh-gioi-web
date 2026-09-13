# WEB-FE-PUBLIC-CLASS-ART-TYPOGRAPHY-v1.55

Status: WEB_CLOSED.

Lifecycle: SELECT → SPEC_LOCK → IMPLEMENT → SOURCE_VERIFY → RUNTIME_VERIFY → VISUAL_REVIEW → HANDOFF → CLOSED.

Scope: public `/classes` class art typography scale. This FE-only slice keeps the real Võ art boards introduced in earlier work, but reduces the oversized decorative VÕ pseudo lettering and caps the mobile class art heading so the section reads like a designed art spotlight instead of a viewport-dominant title block.

Acceptance:
- The `.lgo-class-art-spotlight::before` decorative VÕ remains atmospheric, non-interactive, and visually tucked near the card edge.
- Desktop decorative VÕ font-size is capped at 128px in browser metrics; mobile is capped at 88px.
- Class art heading/body text stay within browser/e2e font-size cap and the page has no horizontal overflow.
- keyboard navigation and existing route content remain reachable; this slice does not add form controls, backend fetches, or mutation paths.

Evidence:
- RED browser/e2e reproduced decorative VÕ at 281.6px on desktop before implementation.
- Playwright desktop/mobile verifies decorative VÕ font-size cap, class art heading font-size cap, body copy cap, and horizontal overflow.
- Source validator verifies CSS clamp ownership, e2e coverage, control docs, and non-claims.

Non-claims: No production auth, No DB persistence, No real Portal integration, No real Ops/Admin mutation, and NO_ACCEPTED_BACKEND_CONTRACT remain explicit.
