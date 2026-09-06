# WEB-PUBLIC-PLAYER-TRUST-RELEASE-NARRATIVE-v1.18

## Purpose

WEB v1.18 continues product-first public web development. The focus is player trust, staged release narrative, closed-test readiness and download/status/support journey clarity.

Runtime/browser/e2e remains a guardrail only. This task must not become another tooling expansion task.

## Product scope

- Add `/release` as the public release narrative / player trust hub.
- Explain the difference between content-ready web, closed-test preparation, limited closed test and public download candidate.
- Keep proof-before-claim copy near every download/status/support sensitive step.
- Connect `/release` to `/download/trust`, `/status`, `/support/safety` and `/community/onboarding`.
- Add typed content for player trust signals, release narrative stages, closed-test readiness checks and trust journey checkpoints.
- Add guide/news content for player trust and release narrative.

## Boundaries

- No public build.
- No open beta.
- No closed-test entitlement automation.
- No fake download CTA.
- No placeholder checksum.
- No account portal claim.
- No live support ticket.
- No reward/economy promise.
- No production deployment claim.

## Validation expectation

- `python3 tools/validate_web_public_player_trust_release_narrative.py`
- `python3 tools/validate_web_current_state.py`
- Targeted pnpm guardrails after content is complete.

## Decision

`LGO_WEB_PUBLIC_PLAYER_TRUST_RELEASE_NARRATIVE_READY_v1.18`
