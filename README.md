# LinhGioiOnline-Web

Independent source package for the Linh Giới Online Web Program.

## What this repo is

This repo is the future home for:

- `apps/web` — official public website for Linh Giới Online.
- `apps/portal` — player account portal after Auth/DB/API contracts are accepted from the game backend.
- `apps/ops` — internal Ops/Admin/GM UI after RBAC, audit, security and backend contracts are accepted.
- `packages/*` — shared web UI, design tokens, content model, API client, contract records, auth shell, configuration and testing utilities.

## What this repo is not

This repo is not the Unity client, not the Java/Spring Boot business backend, not the realtime game server, not the GameData source of truth, and not a replacement for gameplay runtime work.

It does not claim production auth, database persistence, real portal integration, real ops/admin mutation, payment/shop/economy, CMS, or production deployment.

## Relationship to LinhGioiOnline game repo

The current game source reference is:

```text
1cfe462 fix: clarify world interaction prompts
```

The game repo remains canonical for:

- Unity client.
- Java/Spring Boot backend.
- Protocol.
- GameData.
- Gameplay runtime.
- World/combat/player flow.

The Web repo is source-independent, but its real Portal/Ops features must consume the game backend contracts through explicit sync.

## Artifact-first workflow

This WEB-00 package is built for ChatGPT sandbox handoff without GitHub connector, remote, push or assumed local paths. The output ZIP is repo-relative and has no parent folder wrapper. Unzip it directly into a local `LinhGioiOnline-Web` directory.

## Local Git initialization

After downloading `LGO-WEB-00-program-constitution-v1.0-full-source.zip`:

```bash
mkdir -p /Users/minhdc/Projects/LinhGioiOnline-Web
cd /Users/minhdc/Projects/LinhGioiOnline-Web
unzip /path/to/LGO-WEB-00-program-constitution-v1.0-full-source.zip
git init
git add .
git commit -m "docs: establish LGO web program control tower"
```

## 3-app model

| App | Purpose | Current WEB-00 state |
|---|---|---|
| `apps/web` | Official public website | directory placeholder only |
| `apps/portal` | Player portal | directory placeholder only; blocked by Auth/DB/API contract |
| `apps/ops` | Internal Ops/Admin/GM | directory placeholder only; blocked by RBAC/audit/security/API contract |

## Shared packages

| Package | Owner |
|---|---|
| `packages/design-tokens` | CSS variables and theme primitives |
| `packages/ui` | reusable UI primitives |
| `packages/content` | file-backed public content model |
| `packages/contracts` | imported/synced game API contract records |
| `packages/api-client` | generated/centralized API access |
| `packages/auth` | web auth shell after backend contract acceptance |
| `packages/config` | shared lint/build/runtime config once scaffolded |
| `packages/testing` | test helpers and runtime evidence utilities |

## Current phase

`WEB-00 Program Constitution` is a documentation/control-tower package only. It intentionally does not run `npm install`, scaffold Next.js, integrate the backend or implement pages.

## How to continue

Read:

```text
AGENTS.md
docs/execution/WEB-PROJECT-STATE.md
docs/execution/WEB-NEXT-ACTION.md
docs/execution/WEB-MASTER-ROADMAP.md
```

The only next allowed task after WEB-00 validation passes is:

```text
WEB-01-MONOREPO-FOUNDATION-v1.0
```


## WEB-01 Monorepo Foundation

WEB-01 adds the first real engineering foundation for the independent `LinhGioiOnline-Web` repo:

- pnpm workspace manifest.
- Turborepo task graph.
- strict TypeScript base config.
- minimal Next.js app shells for `apps/web`, `apps/portal` and `apps/ops`.
- shared package skeletons for UI, design tokens, content, contracts, API client, auth, config and testing.

`apps/web` is active as a public app shell only. It intentionally does not implement full homepage content. `apps/portal` and `apps/ops` are compile-only placeholders and remain blocked by Auth/DB/API/RBAC/audit/security contract gates.

The Java/Spring Boot backend in the game repo remains the canonical business backend. WEB-01 does not create an independent business backend.

## WEB v1.8 Public Game Info Depth

Current source package: `LGO-WEB-public-game-info-depth-v1.8-full-source.zip`.

WEB v1.8 shifts attention back to the web product itself: deeper world story, beginner guide, download/status explanation, support FAQ and community readiness. Runtime/browser/e2e remains a regression guardrail only.

Key player-facing routes:

- `/` — public landing page with game info depth.
- `/game` — Spirit Gate / Gate Keeper / Training Stone world context.
- `/guides` and `/guides/beginner` — beginner public guide, source-owned and fixture-only.
- `/download` — honest release artifact/checksum/owner approval status.
- `/support` — static FAQ without ticket/account backend claims.
- `/community` — community readiness without live chat/forum/guild backend claims.

No production auth, DB persistence, CMS, independent backend, real portal integration, real ops/admin mutation, payment/shop/economy, live community backend or public game download artifact is claimed.

## WEB v1.12 Public Content IA Hub Polish

Current product focus: content IA, hub discoverability and player entry clarity.

Key route:

```text
/start
```

The Start hub maps player questions to routes for world info, download trust, roadmap/status, guides, support and community onboarding. It does not add CMS, backend recommendations, account-aware personalization, production auth, DB persistence or a public game download artifact.


## WEB-PUBLIC-WORLD-GAMEPLAY-LOOP-DEPTH-v1.13

Adds `/game/loop`, world gameplay loop depth, beginner expectations, guide-to-world navigation and explicit gameplay scope boundaries. Runtime/browser/e2e remains guardrail only.

## WEB v1.14 player safety / support FAQ polish

Adds `/support/safety`, privacy-first issue reporting guidance, closed-test support expectations and community conduct clarity. This is static public guidance only; no live support ticket, secure inbox, account lookup, moderation dashboard or production support SLA is claimed.


## WEB v1.15 accessibility/readability

Public web polish now includes `/accessibility`, skip-to-main-content affordance, route readability checks, mobile scannability rules and focus-order checkpoints. Runtime/browser/e2e remains guardrail only. No formal WCAG audit certification, legal accessibility compliance claim or personal accessibility settings backend is claimed.

## WEB v1.16 performance / copy / asset budget polish

Public web polish now includes `/performance`, a product-facing hub for copy weight, CSS-only visual budget, static route composition, perceived-load clarity and mobile reading density.

This is not a production performance claim. The repo still does not claim Core Web Vitals measured PASS, Lighthouse certification, production RUM monitoring, CDN deployment, image CDN integration or approved production art pipeline. Runtime/browser/e2e remains guardrail only.

## WEB v1.17 — route continuity / conversion-safe polish

WEB v1.17 adds `/journey` as the public route-continuity hub. It connects Start, World Loop, Download Trust, Status, Support Safety, Community Onboarding, Accessibility and Performance through conversion-safe CTAs. It does not add backend, CMS, account, entitlement, ticket, payment, or release artifact behavior.


## WEB v1.18 player trust / release narrative

Adds `/release`, player trust signals, staged release narrative, closed-test readiness checks and trust journey checkpoints. No public build, no open beta and no entitlement automation are claimed.


## WEB v1.19 release readiness hub
Adds `/release/readiness` with owner gates, tester expectations and Download/Status/Support alignment.


## WEB v1.20 closed tester information pack

Adds `/release/tester-pack` with static tester checklist, safe feedback guidance, known limitations and device report template. No live tester intake or data collection backend is claimed.


## Current public web product slice

`WEB-PUBLIC-FAQ-SEARCH-AND-HELPFULNESS-POLISH-v1.21` adds `/support/help`, FAQ discovery groups, helpfulness prompts, issue-category routing and no-search-backend copy. It keeps support static and privacy-safe until real backend/search/ticket contracts exist.
