# WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15

## Goal

Continue product-first public web development by improving accessibility/readability surfaces:

- clear route headings and summary-first copy;
- mobile scannability for long public pages;
- visible focus order and skip-to-content affordance;
- route-level reading comfort for Start, Download Trust, Safety Support and Game Loop;
- explicit non-claims near sensitive surfaces.

Runtime/browser/e2e remains a guardrail only and is not the product focus.

## Added public surface

- `/accessibility` — accessibility/readability hub for new players.
- `PublicAccessibilityReadabilitySections.tsx` — reusable boards for principles, route readability, mobile scan rules and focus order.
- `accessibility-readability-guide` guide fixture.
- `accessibility-readability-polish-started` news fixture.

## Boundaries

- No formal WCAG audit certification.
- No legal accessibility compliance claim.
- No assistive-technology lab certification.
- No personal accessibility settings backend.
- No account-aware accessibility profile.
- No production deployment claim.

## Verification intent

Use source validators and targeted runtime guardrails after product copy/layout changes. Do not expand tooling unless a real product regression blocks development.
