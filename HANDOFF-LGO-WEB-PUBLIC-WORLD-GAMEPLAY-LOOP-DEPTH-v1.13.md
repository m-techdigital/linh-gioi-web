# HANDOFF — LGO WEB PUBLIC WORLD / GAMEPLAY LOOP DEPTH v1.13

Final decision: `LGO_WEB_PUBLIC_WORLD_GAMEPLAY_LOOP_DEPTH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.13`

## What changed

WEB v1.13 develops the public web product, not tooling. It deepens world/gameplay-loop explanation for new players:

- `/game/loop` explains Spirit Gate → Gate Keeper → Training Stone → Download Trust/Status/Support.
- `world-gameplay-loop-guide` gives a guide-detail version of the same loop.
- New typed content separates what players can expect now from what is not yet available.
- Guide-to-world navigation links route players through Start, Game Loop, Guide, Download Trust and Support.
- Gameplay scope boundaries protect against combat, economy, quest, live-world and backend claims.

## Apply full source

```bash
WEB_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-world-gameplay-loop-depth-v1.13-full-source.zip"
WEB_SHA="/Users/minhdc/Downloads/LGO-WEB-public-world-gameplay-loop-depth-v1.13-full-source.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$WEB_SHA"

rm -rf /Users/minhdc/Projects/LinhGioiOnline-Web
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip -o "$WEB_ZIP"

python3 -m py_compile tools/*.py
python3 tools/validate_web_public_world_gameplay_loop_depth.py
python3 tools/validate_web_current_state.py

corepack enable
corepack prepare pnpm@10.15.0 --activate
pnpm install
pnpm lint
pnpm --filter @lgo-web/content test
pnpm --filter @lgo-web/content typecheck
pnpm --filter @lgo-web/ui typecheck
pnpm --filter @lgo-web/web typecheck
NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build
```

## Apply delta over v1.12

```bash
BASE_DIR="/Users/minhdc/Projects/LinhGioiOnline-Web"
DELTA_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-world-gameplay-loop-depth-v1.13-delta.zip"
DELTA_SHA="/Users/minhdc/Downloads/LGO-WEB-public-world-gameplay-loop-depth-v1.13-delta.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$DELTA_SHA"

cd "$BASE_DIR"
unzip -o "$DELTA_ZIP"
python3 tools/validate_web_public_world_gameplay_loop_depth.py
python3 tools/validate_web_current_state.py
```

## Validation evidence

PASS:

- Source validators.
- Runtime kit Node/pnpm probe.
- Offline install.
- Lint.
- Targeted content/ui/web typecheck.
- Content tests.
- Web build on rerun.
- Post-package ZIP/SHA/integrity checks.
- Delta apply check.
- Git diff whitespace check.
- Package hygiene check.

## Non-claims

No production auth, DB persistence, real account portal integration, real ops/admin mutation, independent backend, CMS, production deployment, payment/shop/economy, public game download artifact, fake download CTA, placeholder checksum, portal entitlement backend, live community/chat/forum/guild backend, live support ticket, fake waitlist, account-aware personalization, backend recommendation engine, production quest/wiki, live world server, production map database, persisted quest state, NPC dialogue backend, combat damage, HP, loot, skill economy, inventory/economy, PvP, boss or live event reward claim.

Runtime/browser/e2e is guardrail only.

## Next recommended task

`WEB-PUBLIC-PLAYER-SAFETY-SUPPORT-FAQ-POLISH-v1.14`
