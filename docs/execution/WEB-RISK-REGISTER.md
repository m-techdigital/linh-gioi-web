# WEB-RISK-REGISTER

| Risk | Impact | Mitigation | Status |
|---|---|---|---|
| Sandbox lacks Node.js 24 LTS | Cannot claim WEB-01 CLOSED or build runtime PASS | Build/upload vNext browser/e2e runtime kit | OPEN_ENV_LIMITED |
| Registry/DNS blocks pnpm | Cannot install dependencies in sandbox | Preseed pnpm store and node_modules via Linux kit | OPEN_ENV_LIMITED |
| Browser binaries unavailable | Playwright/e2e cannot run | Include Playwright Chromium cache in runtime kit | OPEN_ENV_LIMITED |
| Fixture data mistaken as backend contract | Future portal/ops drift | Required PROVISIONAL_WEB_FIXTURE and NOT_CANONICAL_BACKEND_CONTRACT markers | MITIGATED_SOURCE |
| Public site overclaims release/download | User trust/regulatory risk | Validators check no fake production download claim | MITIGATED_SOURCE |
| Ops shell mistaken for real admin tooling | Security risk | NO_REAL_OPS_MUTATION markers and no app/api routes | MITIGATED_SOURCE |
