# HANDOFF

TASK_ID: WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39
PHASE: WEB-PORTAL
STATUS: CLOSED
SOURCE_BASELINE_ID: 73e615b
SOURCE_BASELINE_SHA256: not applicable; git commit baseline used
PRIOR_ACCEPTED_OVERLAYS: WEB-08 blocked intake gate

## Goal completed

Portal now has a fixture-only `/journey` route that connects account, session,
character and support demo states with game-art visuals. Typography and layout
are guarded by browser/e2e checks across desktop and mobile.

## Changed files

### Added

- `apps/portal/AGENTS.md`
- `apps/portal/CLAUDE.md`
- `apps/portal/src/app/journey/page.tsx`
- `apps/portal/public/game-art/manifest.json`
- `apps/portal/public/game-art/world/dong-mon-skyline.webp`
- `apps/portal/public/game-art/classes/vo-lv1-starter-atlas.webp`
- `apps/portal/public/game-art/classes/vo-lv1-skill-atlas.webp`
- `apps/ops/AGENTS.md`
- `apps/ops/CLAUDE.md`
- `tests/e2e/portal-journey-demo.spec.ts`
- `tools/validate_web_portal_journey_demo_v139.py`
- `docs/execution/specs/WEB-PORTAL-JOURNEY-DEMO-DATA-v1.39.md`
- `LGO-WEB-PORTAL-JOURNEY-DEMO-DATA-REPORT-v1.39.md`

### Modified

- `apps/portal/next-env.d.ts`
- `apps/portal/src/app/layout.tsx`
- `apps/portal/src/lib/portal-fixtures.ts`
- `packages/ui/src/shell.css`
- `docs/execution/WEB-PROJECT-STATE.md`
- `docs/execution/WEB-NEXT-ACTION.md`
- `docs/execution/WEB-TASK-LEDGER.md`
- `tools/validate_web_current_state.py`
- `tools/validate_web_game_contract_sync_v10.py`

### Deleted

None.

## Allowed-path compliance

Only web repo FE, fixture, test, validator, Next-generated agent metadata and documentation files changed.

## Contracts consumed

No production backend contract consumed. `NO_ACCEPTED_BACKEND_CONTRACT` remains
active.

Selected `game-art` derivatives were copied from existing audited web assets
into Portal public assets with SHA provenance. They remain design/demo material,
not gameplay screenshots.

Fixture markers remain visible and authoritative: `PROVISIONAL_WEB_FIXTURE`,
`NOT_CANONICAL_BACKEND_CONTRACT`, `NO_ACCEPTED_BACKEND_CONTRACT`.

## Contract changes

None. Fixture data is not a canonical backend contract.

## Generated-file note

`next dev` generated `AGENTS.md`/`CLAUDE.md` files under Portal and Ops. They are committed because the generated files state that removing them only recreates the uncommitted change and committing them keeps the tree clean. `apps/portal/next-env.d.ts` was also refreshed by the Next build/type generation step.

## Build/tool versions actually used

- Node 26.8.1
- pnpm 10.15.0
- Next.js 16.3.4
- Playwright Chromium

## Commands executed

- `python3 tools/validate_web_portal_journey_demo_v139.py`
- `pnpm --filter @lgo-web/portal typecheck`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm exec playwright test tests/e2e/portal-journey-demo.spec.ts`
- `pnpm --filter @lgo-web/portal build`
- production screenshot capture against `http://127.0.0.1:3111/journey`

## Test/evidence results

- v1.39 validator: PASS.
- Portal typecheck: PASS.
- UI typecheck: PASS.
- Portal production build: PASS; `/journey` prerendered static.
- Playwright desktop/mobile: PASS, 4/4.
- Browser image checks: three `game-art` images loaded with nonzero natural
  dimensions.
- Browser layout checks: no horizontal overflow; H1 44px desktop / 32px mobile;
  H2 28.8px desktop / 21.6px mobile.

## Runtime/manual verification

Production screenshots captured and inspected:

- `/tmp/lgo-web-v139-screens-final/portal-journey-desktop.png`
- `/tmp/lgo-web-v139-screens-final/portal-journey-mobile.png`

Visual review found the first desktop art grid too tall before final CSS
adjustment; the final screenshots show compact typography and no empty stretched
world-card panel.

## Known limitations

- No production auth.
- No DB persistence.
- No real Portal integration.
- Backend integration still waits for accepted Auth/API/DB/RBAC/audit contract.

## Integration steps

After WEB-08 is accepted, map this demo journey to real contract-backed flows
only through centralized contract/client ownership.

## Rollback notes

Revert this task commit to remove the demo route, layout typography caps and
v1.39 tests/docs.

## Output artifact SHA256

No source package artifact generated for this FE checkpoint.
