# HANDOFF-LGO-WEB-PUBLIC-PLAYER-SAFETY-SUPPORT-FAQ-POLISH-v1.14

## Final decision

`LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.14`

## Baseline

- Baseline: `LGO-WEB-public-world-gameplay-loop-depth-v1.13-full-source.zip`.
- Delta applies on top of v1.13 from repository root.
- Delta ZIP has no parent wrapper.

## What changed

v1.14 develops the public web product by making support and safety guidance understandable before closed testing:

- New route: `/support/safety`.
- New component: `apps/web/src/components/PublicPlayerSafetySections.tsx`.
- New typed content: safety principles, issue paths, closed-test support expectations, and community conduct rules.
- New guide/news: `player-safety-support-guide`, `player-safety-support-faq-polish-started`.
- Updated public pages and sitemap so new players can discover safety/support guidance from normal entry paths.
- Updated non-claims so no support backend, account lookup, recovery, moderation dashboard, SLA, or sensitive-data collection is implied.

## Apply full source

```bash
WEB_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-player-safety-support-faq-polish-v1.14-full-source.zip"
WEB_SHA="/Users/minhdc/Downloads/LGO-WEB-public-player-safety-support-faq-polish-v1.14-full-source.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$WEB_SHA"

rm -rf /Users/minhdc/Projects/LinhGioiOnline-Web
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip -o "$WEB_ZIP"

python3 -m py_compile tools/*.py
python3 tools/validate_web_public_player_safety_support_faq_polish.py
python3 tools/validate_web_current_state.py
```

## Apply delta on v1.13

```bash
BASE_DIR="/Users/minhdc/Projects/LinhGioiOnline-Web"
DELTA_ZIP="/Users/minhdc/Downloads/LGO-WEB-public-player-safety-support-faq-polish-v1.14-delta.zip"
DELTA_SHA="/Users/minhdc/Downloads/LGO-WEB-public-player-safety-support-faq-polish-v1.14-delta.zip.sha256"

cd /Users/minhdc/Downloads
shasum -a 256 -c "$DELTA_SHA"

cd "$BASE_DIR"
unzip -o "$DELTA_ZIP"
python3 -m py_compile tools/*.py
python3 tools/validate_web_public_player_safety_support_faq_polish.py
python3 tools/validate_web_current_state.py
```

## Optional runtime guardrails

```bash
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

## Non-claims

No production auth, DB persistence, real portal/ops integration, independent backend, CMS, production deployment, payment/shop/economy, public game download artifact, live community/chat/forum/guild backend, live support ticket, secure ticket inbox, production support SLA, moderation dashboard, account recovery or account lookup.

## Next recommended task

`WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15`
