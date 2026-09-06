# LGO-WEB-PUBLIC-GAME-INFO-DEPTH-REPORT-v1.8

## Final decision

`LGO_WEB_PUBLIC_GAME_INFO_DEPTH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.8`

## Scope

WEB v1.8 focuses on the actual public web product. The work deepens Linh Giới Online game information for players instead of expanding tooling: world story, beginner guide, download/status wording, support FAQ and community readiness.

Runtime/browser/e2e remains a guardrail only.

## Product changes

- Added `worldStoryChapters` typed content for Spirit Gate arrival, Gate Keeper guidance, Training Stone loop and return-to-lobby framing.
- Added `beginnerGuideSections` typed content for a four-step beginner path.
- Added `downloadStatusNotes` typed content to explain release artifact/checksum/owner approval requirements.
- Added `supportFaqs` typed content for download, dev login, production auth/DB, combat/social/economy and backend contract questions.
- Added `communityReadinessSteps` typed content to avoid fake chat/forum/guild/live backend claims.
- Added `apps/web/src/components/PublicGameInfoDepthSections.tsx`.
- Added `/guides/beginner` route.
- Updated homepage, game, download, support, community and guides pages to consume v1.8 content depth.
- Updated sitemap to include `/guides/beginner`.
- Updated docs/state/versioning for next product-focused task.

## Validation

Source validators PASS:

- `python3 -m py_compile tools/*.py`
- `python3 tools/validate_web_public_game_info_depth.py`
- `python3 tools/validate_web_current_state.py`

Runtime guardrails PASS with uploaded runtime kit:

- Node `v24.20.0`
- pnpm `10.15.0`
- `pnpm install --offline --ignore-scripts`
- `pnpm lint`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/content typecheck`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build`

Packaging checks PASS:

- full ZIP integrity
- delta ZIP integrity
- artifact summary SHA check
- post-package full-source validators
- delta apply from v1.7 then validators
- no parent wrapper
- package hygiene: no `node_modules`, `.next`, `.turbo`, `dist`, `build`, `coverage`, `__pycache__`, `.git`

## Runtime non-claim

No full v1.8 multi-app browser matrix PASS is claimed. v1.5 remains the latest full browser matrix PASS. v1.8 uses targeted runtime guardrails because the task focus is public web content depth.

## Non-claims

- No production auth.
- No DB persistence.
- No real account portal integration.
- No real ops/admin mutation.
- No independent backend.
- No CMS.
- No production deployment.
- No payment/shop/economy.
- No live community/chat/forum/guild backend.
- No public game download artifact.
- No production quest system or gameplay wiki.
- No combat damage, HP, loot or skill economy claim.
