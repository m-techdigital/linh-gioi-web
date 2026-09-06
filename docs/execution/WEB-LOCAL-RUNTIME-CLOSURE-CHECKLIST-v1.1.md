# WEB Local Runtime Closure Checklist v1.1

Use this checklist after applying the latest `LGO-WEB` source package locally or after installing an uploaded runtime kit in sandbox.

## Source gates

- [ ] `python3 -m py_compile tools/*.py`
- [ ] `python3 tools/validate_web_program_constitution.py`
- [ ] `python3 tools/validate_web_monorepo_foundation.py`
- [ ] `python3 tools/validate_web_current_state.py`
- [ ] no forbidden roots: `client`, `server`, `protocol`, `gamedata`
- [ ] no generated/cache folders in final source: `node_modules`, `.next`, `dist`, `build`, `coverage`, `__pycache__`

## Runtime gates

- [ ] `node --version` reports Node.js 24.x or newer.
- [ ] `pnpm --version` reports pnpm 10.x or newer.
- [ ] `pnpm install`
- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] `pnpm test`
- [ ] `pnpm build`
- [ ] `pnpm validate`
- [ ] `pnpm test:e2e`

## Runtime kit gates

- [ ] runtime kit SHA verifies.
- [ ] runtime kit manifest contains `bin/node`.
- [ ] runtime kit manifest contains `bin/pnpm`.
- [ ] runtime kit manifest contains `cache/pnpm-store`.
- [ ] runtime kit manifest contains `cache/ms-playwright`.
- [ ] runtime kit manifest contains `workspace/node_modules`.
- [ ] `run-web-checks.sh` exits zero in sandbox.

## Closure rule

Do not claim `LGO_WEB_PUBLIC_RC_WITH_PORTAL_OPS_SHELLS_CLOSED` unless every runtime gate above passes in Node.js 24 + pnpm. If any runtime or browser gate cannot execute because of environment, keep final decision at `ENV_LIMITED`.
