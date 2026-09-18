# LGO Contract Intake / OpenAPI Consumer Readiness v1

Date: 2026-09-18
Status: IMPLEMENTATION-READY WEB CONSUMER PLAN — NO BACKEND CONTRACT CLAIM
Task: `T-ea0c821c8411 — LGO-CT-WEB-01`
Umbrella Mission: `MS-57a638c72421`
Game source inspected: `origin/feature/2d @ 3a50d4faa95b823e15c0b1c88252088ed79d9a71`
Web contract state remains: `NO_ACCEPTED_BACKEND_CONTRACT`

## 1. Goal

Prepare the Web repo to consume an accepted Game REST/OpenAPI contract without:
- hand-writing canonical DTOs;
- importing Game Java source;
- exposing dev/legacy endpoints to Portal;
- storing backend bearer tokens in browser localStorage;
- treating the planning document as an implemented contract.

This task defines intake structure, endpoint scope, generation ownership, provenance and acceptance gates. CT-01/02/03 remain the implementation tasks.
## 2. Current Game REST inventory

### Product/self-service surface candidates

| Method | Path | Current request | Current success response/status | Auth |
|---|---|---|---|---|
| POST | `/auth/register` | email, password, acceptedTerms | ProductRegisterResponse / 201 | none |
| POST | `/auth/recovery/request` | email | RecoveryRequestResponse / 202 | none |
| POST | `/auth/recovery/verify` | challengeId, code | RecoveryVerifyResponse / 200 | none |
| POST | `/auth/recovery/reset` | resetToken, newPassword | 204 | none |
| POST | `/auth/login` | identifier, password | ProductLoginResponse / 200 | none |
| GET | `/auth/session` | — | ProductSessionResponse / 200 | Bearer |
| POST | `/auth/logout` | — | 204 | Bearer |
| GET | `/auth/characters` | — | CharacterResponse[] / 200 | Bearer |
| GET | `/auth/characters/{characterId}` | path characterId | CharacterResponse / 200 | Bearer |
| POST | `/auth/characters/{characterId}/map01a-state` | laneX, facing | CharacterResponse / 200 | Bearer |

`/health` is an operational endpoint and not a player-domain contract.

### Internal/dev/legacy endpoints excluded from Player Web contract

- `POST /dev/auth/login`
- `GET /accounts/{accountId}/characters`
- `POST /accounts/{accountId}/characters`
- `GET /characters/{characterId}`
- `POST /characters/{characterId}/position`

These may remain for Game/dev compatibility, but Web must not treat them as production player APIs.
## 3. Current DTO facts

### AccountResponse
- accountId
- displayName
- createdAtUnixMs
- updatedAtUnixMs

### ProductLoginResponse
- account
- accessToken
- expiresAtUnixMs

### ProductSessionResponse
- account
- expiresAtUnixMs

### CharacterResponse
- characterId
- accountId
- name
- classId
- runtimeClassId
- runtimeState
- entityId
- x
- y
- z
- yawDegrees
- createdAtUnixMs
- updatedAtUnixMs
- slot

### CharacterRuntimeStateResponse
- mapId
- laneX
- facing
- updatedAtUnixMs

Compatibility note:
- `classId` may still contain legacy `class.sword/class.martial`;
- `runtimeClassId` is canonical five-class vocabulary.
Player Web should normally render the canonical runtime identity label, not raw legacy storage ID.
## 4. Current error reality

Controllers currently throw Spring `ResponseStatusException` with HTTP status + free-text reason.

Therefore current source does **not** yet satisfy the accepted target stable error envelope.

CT-01 may capture the current HTTP surface, but CT-02 must provide:
- stable machine error codes;
- request/correlation ID;
- safe error payload;
- negative-path contract tests.

Web must not generate UX branching from current reason strings.

Reference policy:
`docs/execution/LGO-CANONICAL-ID-VERSION-ERROR-POLICY-v1.md`.
## 5. OpenAPI source ownership

The accepted OpenAPI artifact is owned by the Game API/release process.

Preferred implementation direction for CT-01:
1. Game API exposes/generates a deterministic OpenAPI document from the accepted Spring MVC product surface.
2. CI validates the artifact against focused endpoint/DTO tests.
3. Product contract excludes dev/legacy routes from the player-facing group.
4. Artifact includes or is accompanied by provenance:
   - semantic contract version;
   - Game source commit;
   - SHA-256;
   - generation tool/version;
   - included domain groups.
5. Web receives the exact accepted artifact, never re-describes Java records by hand.

If implementation chooses annotation-generated or build-generated OpenAPI, generated output remains reproducible and checked against source. A manually maintained duplicate spec must not become an unsynchronized second authority.
## 6. Web package ownership

### `packages/contracts`

Target responsibilities:
- store accepted OpenAPI artifact or a verified intake copy/reference;
- generated TypeScript schema/types;
- contract metadata/version/checksum;
- stable exported contract status;
- generation/verification script entrypoint.

Suggested structure:

```text
packages/contracts/
├── openapi/
│   └── lgo-product-api.openapi.json
└── src/
    ├── generated/
    │   └── product-api.ts
    ├── contract-meta.ts
    └── index.ts
```

Generated files:
- are not manually edited;
- carry a generated marker/source checksum where tooling supports it;
- are regenerated from the accepted OpenAPI artifact.

### `packages/api-client`

Target responsibilities:
- typed HTTP transport built on generated contract types;
- base URL/server-bound configuration;
- auth header injection from BFF/server context;
- stable error-envelope decoding after CT-02;
- request/correlation propagation;
- timeout/network handling.

It must not:
- define duplicate DTOs;
- store tokens;
- own product auth/session state;
- invent endpoints.
## 7. Web-safe operation exposure

The accepted product OpenAPI may contain operations used by Unity and Web, but the Portal Web client should expose only the self-service/browser-safe subset through its BFF-facing adapter.

Portal-safe target operations:
- register;
- login;
- session validate/self;
- logout;
- recovery request/verify/reset;
- list own characters;
- get own character.

Portal must **not** expose browser UI helpers for:
- `POST /auth/characters/{characterId}/map01a-state`;
- dev account/character endpoints;
- arbitrary accountId-scoped character endpoints;
- future privileged Admin endpoints.

The Map01A state endpoint remains a Game/Unity integration concern unless a later product decision explicitly gives Web a valid command use case.
## 8. Browser/BFF boundary

Player Web should not pass raw backend bearer tokens to client-side storage.

Target flow:
1. browser submits login/register/recovery to Next.js server/BFF boundary;
2. BFF calls Game API;
3. backend token/session material is retained in server-side/HttpOnly cookie-safe representation according to PWEB-02 design;
4. browser UI receives player-safe session/account state, not raw bearer token;
5. subsequent server actions/loaders attach backend Authorization header;
6. logout invalidates backend session and clears browser session state.

Contract generation alone does not solve this boundary.
`packages/auth` remains blocked until PWEB-02.
## 9. Contract metadata

Target `contract-meta.ts` shape concept:

```ts
export const productApiContract = {
  version: "1.0.0",
  sourceCommit: "<game-commit>",
  sha256: "<openapi-sha256>",
  generatedBy: "<tool/version>",
  domains: ["auth", "character"]
} as const;
```

Exact values come from accepted CT-01 evidence.

Web builds/tests must be able to report:
- accepted contract version;
- checksum;
- generated client/source version.

Do not infer REST compatibility from:
- GameData version;
- database schema version;
- Web package version.
## 10. Deterministic generation gate

CT-03 must provide one canonical generation command.

Required behavior:
1. read the exact accepted OpenAPI artifact;
2. generate TypeScript into the dedicated generated path;
3. format deterministically;
4. second generation produces no diff;
5. TypeScript typecheck passes;
6. generated package exports contract metadata;
7. handwritten app code imports generated types/client primitives rather than copying shapes.

CI failure cases:
- OpenAPI checksum changes but generated output was not refreshed;
- generated output is manually modified;
- two generated DTOs disagree with the same schema;
- contract artifact exists without provenance metadata.
## 11. Required contract tests

### Game CT-01/02
- endpoint inventory matches the accepted product group;
- dev/legacy endpoints excluded from player contract;
- auth-required operations reject missing/invalid bearer;
- register/login/recovery success + negative semantics;
- character list/detail enforce account ownership;
- missing and foreign character follow the accepted concealed-not-found policy;
- legacy class storage maps to canonical `runtimeClassId`;
- Map01A response retains current runtimeState semantics;
- stable error envelope/codes after CT-02.

### Web CT-03
- generation deterministic;
- contract metadata checksum matches artifact;
- TypeScript compiles;
- typed client can decode representative success/error fixtures generated from accepted contract;
- no canonical DTO copies exist outside generated contract ownership;
- browser-safe adapter does not export Map01A mutation by default.

### Cross-system CT-04/05
- Unity current product auth/character parsing remains compatible;
- same integration account/character data matches Unity and Portal;
- environment reports contract + schema/GameData provenance independently.
## 12. Current gap matrix

| Need | Current Game | Current Web | Required task |
|---|---|---|---|
| Product auth endpoints | exists | blocked client | CT-01/03 |
| Product character read endpoints | exists | blocked client | CT-01/03 |
| Map01A mutation | exists | should not be Portal-exposed | CT-01 classify / CT-04 Unity |
| Stable error codes | not implemented | no parser | CT-02 |
| OpenAPI artifact | not present | no accepted artifact | CT-01 |
| Generated TS types | n/a | not present | CT-03 |
| Real API transport | n/a | intentionally throws | CT-03 |
| Browser auth/BFF | n/a | no production auth | PWEB-02 |
| Durable sessions/recovery | process memory | fixture only | DB-05 + contract update |
| Integration environment | local/source only | no shared env | CT-05 |
| Staff/Admin contract | not present | Ops fixture only | ADM-02+ |
## 13. Intake workflow

When CT-01 produces an artifact:

1. Game posts Mission checkpoint:
   - source commit;
   - artifact path;
   - SHA-256;
   - contract version;
   - endpoint/domain inventory;
   - relevant tests.
2. Web verifies artifact checksum/provenance.
3. Web stores or fetches the accepted artifact according to the agreed repo policy.
4. Run deterministic TS generation.
5. Run generated package typecheck/tests.
6. Compare generated endpoint inventory against the Web-safe exposure list.
7. Keep `NO_ACCEPTED_BACKEND_CONTRACT` until the artifact and generation are accepted.
8. Only then change package contract status in a dedicated implementation task.
9. Portal/Ops route integration occurs in PWEB/ADM tasks, not in CT-03 generation task itself.
## 14. Compatibility rules

- Current unversioned `/auth/*` paths remain valid until CT-01/02 intentionally changes them.
- Additive optional response fields are allowed only if generated consumers tolerate them.
- Required-field removal/rename/semantic change is breaking.
- Legacy `classId` values remain possible; Web logic branches on canonical `runtimeClassId` for class identity.
- `runtimeState` is optional today and consumers must tolerate null.
- Character ownership is derived from bearer account context, not a browser-supplied accountId.
- An OpenAPI change must trigger generated-client/checksum review even if TypeScript happens to compile.
## 15. Security constraints

Generated schemas must not accidentally publish internal records such as:
- ProductCredential/passwordHash;
- raw session-registry internals;
- recovery code hashes;
- file-system persistence paths;
- internal stack traces;
- staff-only schemas.

Player-facing OpenAPI describes controller contract DTOs, not every Java record in the module.

Recovery APIs must preserve enumeration-resistant behavior.
Error envelope details must be safe by default.
## 16. Implementation file-impact expectation — Web

Future CT-03 likely changes:
- `packages/contracts/package.json`;
- `packages/contracts/src/**`;
- `packages/contracts/openapi/**`;
- `packages/api-client/package.json`;
- `packages/api-client/src/**`;
- generation/verification scripts/tests;
- workspace lockfile when dependencies are added.

It should **not** modify:
- Portal route UI;
- Ops route UI;
- public Web pages;
- Game repo;
- `packages/auth` production behavior before PWEB-02.

This keeps generated contract work independently reviewable.
## 17. Game review questions

Posted/expected through Umbrella Mission during CT work:

1. Is the accepted OpenAPI generated from Spring source or maintained as a contract-first artifact with code conformance tests?
2. Which operation group is the canonical “product/player” surface?
3. Is `/auth/characters/{id}/map01a-state` included in the product artifact for Unity compatibility while intentionally not exported by the Portal adapter?
4. What request-ID header/body convention will CT-02 use?
5. What exact version/checksum metadata is published with the artifact?
6. How are dev/legacy controllers excluded from the player-facing schema?

These questions do not block this Web readiness task. They become CT-01 implementation decisions.
## 18. Acceptance

This readiness plan is complete when:
- exact current product and dev/legacy endpoints are distinguished;
- current DTOs are documented from Game source;
- Web package ownership and generated paths are explicit;
- no handwritten canonical DTO strategy is introduced;
- BFF/browser token boundary is explicit;
- Map01A mutation is not accidentally made a Portal operation;
- stable-error dependency on CT-02 is explicit;
- deterministic generation/provenance gates are explicit;
- current Web block markers remain in place;
- implementation file scope is narrow and route integration is deferred to PWEB/ADM tasks.

No code generation or backend integration is claimed by this document.
