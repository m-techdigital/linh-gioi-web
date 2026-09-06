# LGO WEB PUBLIC ROUTE CONTINUITY / CONVERSION-SAFE POLISH REPORT v1.17

Decision: `LGO_WEB_PUBLIC_ROUTE_CONTINUITY_CONVERSION_POLISH_READY_WITH_TARGETED_RUNTIME_GUARDRAILS_v1.17`

## Product intent

v1.17 continues public web development after performance/copy budget polish. The main problem addressed is that the site had many useful routes, but the user journey could still feel like a long menu. This update adds a Journey hub and cross-route CTA logic so players can move from Start to World Loop, Download Trust, Status, Support Safety and Community Onboarding without being pushed toward fake download/account/support actions.

## Product surfaces changed

- `/journey` route added.
- Homepage now exposes Journey hub as the first route-continuity entry.
- Start hub now introduces Journey before deeper route groups.
- Download and Download Trust route copy now link back to route continuity before conversion-sensitive expectations.
- Status, Support Safety, Game Loop, Accessibility and Performance now include continuity CTAs.
- Guides now include `route-continuity-conversion-guide`.
- Sitemap exposes `/journey` and the new guide.

## Data model additions

- `RouteContinuityBridge`
- `ConversionSafeCta`
- `JourneyFrictionCheck`
- `PageCohesionCheckpoint`

## Guardrails

v1.17 keeps all sensitive conversions static and bounded:

- download surfaces explain artifact/checksum/provenance gates;
- support surfaces explain privacy-safe issue reporting;
- account/portal surfaces remain blocked;
- community surfaces remain static guidance;
- performance/accessibility remain public product clarity, not certification claims.

## Validation evidence

PASS:

- `python3 -m py_compile tools/*.py`
- `python3 tools/validate_web_public_route_continuity_conversion_polish.py`
- `python3 tools/validate_web_current_state.py`
- Runtime kit Node: `v24.20.0`
- Runtime kit pnpm: `10.15.0`
- `pnpm install --offline --ignore-scripts`
- `pnpm lint`
- `pnpm --filter @lgo-web/content test`
- `pnpm --filter @lgo-web/content typecheck`
- `pnpm --filter @lgo-web/ui typecheck`
- `pnpm --filter @lgo-web/web typecheck`
- `NEXT_TELEMETRY_DISABLED=1 pnpm --filter @lgo-web/web build`

## Non-claims

No backend integration, production auth, DB persistence, CMS, public artifact, fake download CTA, entitlement, ticket backend, payment/shop, live community backend, production deployment or Core Web Vitals/Lighthouse certification is claimed.

## Final packaging closure note

- v1.17 keeps the v1.16 `pnpm-lock.yaml` because this task does not change dependencies; the earlier deletion candidate was rejected before final closure.
- Final package checks include SHA sidecars, ZIP integrity, post-package validators, delta apply from v1.16 baseline with `unzip -o`, git diff whitespace hygiene and artifact summary verification.
- Final deletion semantics: `No deletions.`
