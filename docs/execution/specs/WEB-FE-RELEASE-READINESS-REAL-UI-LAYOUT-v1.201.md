# WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201

Evidence tokens: WEB-FE-RELEASE-READINESS-REAL-UI-LAYOUT-v1.201; WEB_CLOSED; Real Browser UI/UX Layout First; Base First; browser/e2e; NO_ACCEPTED_BACKEND_CONTRACT.

Scope: close only `/release/readiness` as the active page from `WEB-NEXT-ACTION`. The existing Public Release Readiness design target is the comparison guardrail; no batch design work is allowed.

Implementation contract:

- Keep the page Vietnamese and release-scenario safe: no public build, no open beta, no entitlement, no production backend and no accepted backend contract.
- Preserve shared shell/header/footer/menu coherence and compare the rendered page against the registered target.
- Keep primary first-flow expanded: hero, design board, readiness hub and owner gate.
- Move secondary proof boards into the shared native disclosure pattern so the page remains readable and not dominated by always-expanded proof content.
- Use `packages/ui` for reusable compact/disclosure styling and do not add current-page blocks to `apps/web/src/app/globals.css`.

Closure evidence required: Playwright desktop/mobile metrics and screenshots, source validator, Web/UI typecheck, Web build, current-state validator, state/report/ledger/handoff update, commit and push.
