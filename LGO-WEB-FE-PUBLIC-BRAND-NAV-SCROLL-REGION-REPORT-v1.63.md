# LGO-WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-REPORT-v1.63

Status: WEB_CLOSED

`WEB-FE-PUBLIC-BRAND-NAV-SCROLL-REGION-v1.63` fixes the public mobile header route-link rail. The rail now has the accessible name `Public primary route links`, exposes `role="region"`, is reachable with `tabIndex={0}`, and shows a visible focus outline while preserving the capped mobile nav font size.

Evidence:

- RED browser/e2e reproduced the missing named region on mobile `/classes` and `/download`.
- GREEN browser/e2e passed for the same routes with keyboard focus, no page overflow, scrollable rail metrics and nav font-size <= 18px.
- Source validator PASS.
- UI and Web typecheck PASS.
- Web production build PASS.
- Public navigation v1.44 regression e2e PASS on desktop and mobile.

Scope remains FE-only. No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
