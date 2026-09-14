# WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202

Evidence tokens: WEB-FE-RELEASE-TESTER-PACK-REAL-UI-LAYOUT-v1.202; WEB_CLOSED; Real Browser UI/UX Layout First; Base First; browser/e2e; NO_ACCEPTED_BACKEND_CONTRACT.

Scope: close only `/release/tester-pack` as the active page from `WEB-NEXT-ACTION`. The existing Gói tester công khai design target is the comparison guardrail; no batch design work is allowed.

Implementation contract:

- Keep the page Vietnamese and tester-scenario safe: no intake form, no slot promise, no entitlement, no feedback backend and no accepted backend contract.
- Preserve shared shell/header/footer/menu coherence and compare the rendered page against the registered target.
- Keep primary first-flow expanded: hero, design board, intro and checklist.
- Move feedback templates, known limitations, device report template and secondary route proof boards into the shared native disclosure pattern so the page remains readable.
- Use `packages/ui` for reusable compact/disclosure styling and do not add current-page blocks to `apps/web/src/app/globals.css`.

Closure evidence required: Playwright desktop/mobile metrics and screenshots, source validator, Web/UI typecheck, Web build, current-state validator, state/report/ledger/handoff update, commit and push.
