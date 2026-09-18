# LGO Player Web Product Design Pack v1

Date: 2026-09-18
Status: IMPLEMENTATION DESIGN BASELINE — REAL INTEGRATION NOT YET OPEN
Task: T-fdd70208c592 — LGO-PWEB-01
Umbrella Mission: MS-57a638c72421

## 1. Product role

Player Web is a companion portal, not browser gameplay.

It helps a player:
- regain account access;
- understand account/session state;
- see owned characters;
- understand where a character currently is;
- later inspect progression/inventory;
- later manage support/social/event companion information.

It does not:
- simulate gameplay;
- write map/combat state;
- become an alternate game client;
- invent progression/equipment/social data not owned by the backend.

## 2. Design principles

1. Real data before decorative metric.
2. Unavailable capability is explicit, not filled with fixture rows.
3. Game identity/art can enrich the experience but cannot impersonate live state.
4. Shared primitives/tokens remain the base; do not fork a second “real backend UI kit”.
5. Every route has complete loading/empty/error/expired/offline states.
6. Auth/session safety is designed before real forms are enabled.
7. Portal visual hierarchy can reference the game world while staying a web product.
## 3. Information architecture

### Unauthenticated
- Đăng nhập
- Đăng ký
- Khôi phục truy cập
- Trạng thái truy cập / help handoff

### Authenticated primary navigation
1. Tổng quan
2. Nhân vật
3. Hành trình — visible only when Progression domain opens
4. Hỗ trợ — active only when Support domain opens
5. Tài khoản

Nested under Tài khoản:
- Bảo mật
- Phiên đăng nhập

Future character companion areas:
- Tiến trình
- Hành trang / Trang bị
- Ngoại hình

These future areas should live under character context unless later product research proves a global inventory is required.

The current permanent “Đăng nhập” nav item should become an unauthenticated/action state, not remain beside an authenticated account session.

## 4. Authentication/BFF architecture

Browser flow:

Browser → Next.js BFF/server boundary → typed Game API client → Java Product Auth API → PostgreSQL IAM/session authority.

Rules:
- backend bearer token is never stored in browser localStorage/sessionStorage;
- browser receives a secure HttpOnly/SameSite cookie or equivalent server-session representation;
- BFF attaches Authorization to Game API requests;
- logout invalidates backend session then clears browser session;
- expired backend session invalidates Portal state consistently;
- CSRF protections are applied to browser-originated mutations according to the chosen cookie/session mechanism;
- raw recovery reset token is never logged or exposed beyond the required reset flow.

packages/auth owns browser/server auth adaptation.
packages/api-client owns typed transport.
Neither owns account/session business rules.
## 5. Core player scenarios

### Scenario P1 — Returning player login
Goal: return to the account/character context quickly.

Flow:
login → authenticated session → Portal home → character shortcut.

Required states:
- idle;
- submitting;
- invalid credentials;
- invalid request;
- service unavailable;
- network error;
- success;
- session already valid.

No account-existence disclosure.

### Scenario P2 — New account
register → created account → login/session establishment according to accepted backend flow → Portal home.

Required:
- invalid form;
- identifier conflict;
- terms not accepted;
- backend unavailable;
- success.

Email verification must not appear as complete/required until a backend domain exists.

### Scenario P3 — Recovery
request → verification → reset → login.

Required:
- request accepted;
- cooldown/rate limit;
- delivery unavailable;
- invalid/expired challenge;
- invalid/expired reset grant;
- password validation;
- reset success;
- session invalidation behavior.

### Scenario P4 — Character roster
Portal home → characters → character detail.

Shows only real roster data:
- name;
- canonical class label;
- slot;
- known current runtime map label where available.

No level/last-played/equipment until their domains open.

### Scenario P5 — Account/session self-service
account → sessions → revoke selected session.

Only opens after durable session list/revoke semantics exist.

### Scenario P6 — Journey/progression
Only opens after server-authoritative progression exists.

### Scenario P7 — Support
Only opens after Support domain exists.
## 6. Route design — login

### Data / command
Request:
- identifier;
- password.

Future stable error codes:
- auth.invalid_credentials;
- request.invalid or login-specific validation code;
- service.unavailable;
- rate_limited if introduced.

### Layout
Desktop:
- compact game-context visual panel + login form;
- primary CTA visually dominant;
- register/recovery secondary links.

Mobile web:
- single-column;
- visual context reduced before form;
- form and CTA above long background/story copy;
- keyboard-safe input flow.

### Accessibility
- explicit labels;
- password manager compatible;
- error summary + field association;
- submit state announced;
- focus moves to first invalid field/error summary;
- no disabled fixture controls after real route opens.

### Do not copy from fixture
- fixture-only password;
- disabled controls;
- blocked-action reason text;
- three-step illustration if it obstructs real login.

## 7. Route design — register

Request authority:
- email;
- password;
- acceptedTerms.

The current UI must not invent:
- display-name request if backend register does not accept it;
- email-verification state;
- referral/invite;
- class selection;
- character creation.

Layout states:
- initial;
- client validation;
- submitting;
- identifier conflict;
- validation error;
- service unavailable;
- created/success transition.

Terms acceptance must be a real required form control if backend requires it.
## 8. Route design — recovery

Stages:
1. request;
2. verify;
3. reset;
4. completed/login.

Do not render all stages as simultaneously active form sections.

Security:
- request response remains enumeration-safe;
- verification code input handles 6-digit semantics without logging;
- reset token stays server/route-safe;
- retry/cooldown timer derives from backend timestamps;
- expired state has a clear restart path.

The current fixture timeline can inspire orientation copy but not backend behavior.

## 9. Route design — Portal home

Authenticated home answers:
- Who am I?
- Which characters do I own?
- What should I do next on the Portal?

Phase 1 data:
- account display name;
- character count derived from real roster;
- compact character summary;
- known account/session expiration warning if appropriate.

Do not show:
- fake recent activity;
- fake session count;
- fake progression;
- fake “backend blocked” metric after integration.

Visual game-art area:
- may show world/class artwork with provenance/claim label;
- live data card must be visually distinct from development-art preview;
- art does not imply the depicted class/map is the player’s current state unless data says so.

## 10. Route design — account

Real initial fields:
- displayName;
- accountId;
- createdAt;
- updatedAt.

Derived:
- character count from roster response.

Deferred:
- email verification;
- security posture;
- session count until durable sessions exist.

Actions:
- Bảo mật;
- Phiên đăng nhập;
- Nhân vật;
- logout.

Do not display internal PostgreSQL UUIDs.
Public account ID may be available for support/copy only if product wants it.
## 11. Route design — account/security

First real version should be conservative.

Possible real content:
- account identity summary;
- session expiry/current-session status;
- password/recovery guidance based on accepted capabilities;
- link to session management;
- last security-sensitive action only if a canonical source exists.

Do not invent:
- risk score;
- security grade;
- “verified secure” badge;
- device trust score;
- geographic risk.

Static security guidance can exist without pretending to be account telemetry.

## 12. Route design — account/sessions

Dependency:
durable session list/revoke backend.

Each session row:
- stable session display ID if safe;
- current-session marker;
- device label/user-agent summary only from accepted privacy policy;
- created/last-seen/expiry timestamps if backend owns them;
- revoke action where allowed.

Avoid:
- precise geolocation unless explicitly collected/approved;
- pretending IP-derived city is exact location;
- displaying raw token/token hash.

States:
- only current session;
- multiple sessions;
- stale/expired row;
- revoke success;
- already revoked;
- current-session revoke policy;
- permission/ownership failure.
## 13. Route design — characters

Initial real roster columns:
- Nhân vật: name;
- Lộ: runtimeClassId mapped to Vietnamese label;
- Slot;
- Khu vực hiện tại if runtimeState.mapId is known and has a player-safe label;
- action to detail.

Do not show initially:
- level;
- lastPlayed;
- Ready/Resting state;
- equipment;
- power score.

The current table component can be reused, but its column model must shrink to real fields until Progression/Inventory open.

States:
- loading;
- empty roster;
- one/two/three characters;
- null runtimeState;
- server unavailable;
- auth expired.

No create-character CTA until the real product create-character contract is explicitly opened for Player Web.

## 14. Route design — characters/[id]

Initial real sections:

Identity:
- name;
- class label;
- slot.

Current world state:
- current runtime map label if available;
- updated timestamp if useful/player-safe.

Account relationship:
- own account only; backend concealed-not-found semantics for missing/foreign IDs.

Developer/internal fields such as entityId, legacy x/y/z/yaw and raw stored classId are not automatically player-facing.

Future sections:
- progression;
- equipped items;
- cosmetic loadout;
- achievements.

Each future section stays absent or explicitly “chưa mở” until its domain exists. Do not populate with fixture detail.

## 15. Route design — journey

Dependency:
server-authoritative progression domain.

Future content:
- current chapter;
- current objective;
- completed milestones;
- class progression summary;
- next recommended activity.

States:
- new character;
- tutorial in progress;
- chapter complete;
- no active objective;
- temporarily unavailable;
- version/degraded state.

Portal is read-oriented.
Opening a route or clicking a card must never advance a quest.

Until GAME-DATA-01 exists, journey remains a clearly blocked/design-reference surface.
## 16. Route design — support

Dependency:
shared Support domain.

Player capabilities:
- create own case;
- list own cases;
- open own case detail/timeline;
- understand current status/next step.

Never expose:
- operator assignment internals unless product intentionally surfaces them;
- staff notes;
- moderation/sanction controls;
- other players’ cases.

States:
- no cases;
- creating;
- duplicate retry/idempotent result;
- case created;
- open/in review/waiting player/closed states according to accepted state machine;
- network unavailable;
- auth expired.

Recovery and support can hand off between each other, but recovery remains IAM-owned and support remains case-workflow-owned.

## 17. Access route

The access route is a guidance/status surface, not its own backend domain.

Unauthenticated:
- explain login/register/recovery choices;
- communicate planned/unavailable capability truthfully.

Authenticated:
- normally redirect/guide to Portal home rather than showing “access unavailable”.

After auth integration, remove copy claiming no account/session backend exists.
## 18. Global state matrix

Every real-data Portal route must define these state classes.

### Authentication
- unauthenticated;
- authenticated;
- expired;
- revoked;
- recovery in progress.

### Data
- loading;
- loaded;
- empty;
- partial;
- stale/revalidating;
- unavailable;
- contract/error response.

### Connectivity
- online;
- transient network failure;
- backend unavailable;
- timeout;
- retry.

### Mutation
- idle;
- submitting;
- accepted/success;
- validation failure;
- conflict;
- rate limited;
- permission/session failure;
- ambiguous transport failure only when backend result cannot be determined.

Fixture data must never be the fallback for a failed real request.

## 19. Error UX mapping

UI branches on stable machine error code, not backend reason text.

Examples:
- auth.invalid_credentials → generic login error, no account enumeration;
- auth.identifier_conflict → registration field/global error;
- auth.recovery_rate_limited → cooldown guidance;
- auth.recovery_unavailable → temporary-service guidance;
- auth.session_invalid → clear authenticated state and route to login;
- character.not_found → player-safe “không tìm thấy nhân vật”;
- service.unavailable → retry/status guidance;
- unknown future code → generic safe fallback with requestId.

Support text may include requestId for troubleshooting.
## 20. Responsive design

Player Web is a normal responsive companion website.
The game runtime mobile-landscape rule does not force Portal web to landscape-only.

### Desktop
- max-width shared container;
- optional two-column visual + data composition;
- full navigation visible/scroll-safe;
- character table or card/table hybrid depending density.

### Tablet
- preserve two-column only when content remains readable;
- otherwise stack visual/context before data;
- navigation may horizontally scroll.

### Mobile web
- single-column;
- primary action first;
- forms full width;
- tables convert to safe horizontal scroll or card representation using shared primitives;
- no viewport horizontal overflow;
- long IDs wrap/copy safely;
- artwork never pushes primary account/auth action below excessive decorative content.

Shared breakpoints/tokens remain the base rather than route-specific magic numbers.
## 21. Typography and spacing

Keep existing shared design tokens:
- font families;
- spacing scale;
- radii;
- colors;
- motion;
- page max width.

Portal pages should not introduce their own independent font/spacing system.

Hierarchy:
- one H1 per page;
- route summary below H1;
- section headings H2;
- data item headings/labels remain subordinate;
- IDs/meta use muted/supporting typography.

Long Vietnamese labels are first-class test cases.

Primary actions need stable 44px-or-greater interactive target behavior consistent with current shared shell.
## 22. Visual identity

Reuse the current spiritual-fantasy visual system:
- dark navy;
- spirit cyan;
- warm gold;
- jade;
- shadow purple for warning/boundary contexts;
- game-art visual anchors with provenance.

Rules:
- live account/character data visually outranks decorative art;
- development art keeps a provenance/preview cue where necessary;
- no visual implies a live item/class/map ownership claim without data;
- Portal should feel connected to LGO, but not imitate gameplay HUD.

The current design target atlas remains a visual reference, not a data contract.
## 23. Shared component strategy

Keep and evolve:
- WorkspaceAppShell;
- WorkspacePage;
- PageHeader;
- BoundaryBanner;
- DataList/DataTable;
- MetricCard;
- KeyValueGrid;
- form primitives;
- LoadingState;
- EmptyState;
- ErrorState;
- StatusBadge;
- LinkButton/action primitives.

During real integration:
- ProvisionalFeatureShell should be removed/replaced route by route only after the exact route is real.
- BoundaryBanner can remain for partial/unavailable future sections.
- BlockedActionButton remains useful for unopened capability, not for actions that are actually implemented.

Do not duplicate these components inside Portal because the backend became real.
## 24. Accessibility

Required:
- skip link remains;
- semantic page headings;
- form labels/help/errors connected by aria attributes;
- keyboard reachable actions;
- visible focus;
- disabled/blocked actions explain why without trapping focus;
- loading uses polite live region where useful;
- errors use alert semantics appropriately;
- table headers/captions remain meaningful;
- contrast follows shared design system;
- reduced motion respected;
- artwork has useful alt text or is decorative as appropriate.

Auth flows must work fully without a mouse.
## 25. Fixture-to-real migration plan

### Step F1 — Contract package only
No Portal behavior changes.
packages/contracts and packages/api-client become accepted/generated.

### Step F2 — BFF/auth boundary
Open server-side session handling.
Portal still keeps fixture pages blocked until routes are wired.

### Step F3 — Login/register/recovery
Replace disabled fixture controls with real forms and complete state handling.
Keep account/character fixtures blocked until their route tasks.

### Step F4 — Account + characters
Replace fixture identity/roster/detail data with real calls.
Remove unsupported fixture fields instead of inventing backend values.

### Step F5 — Durable sessions
Open sessions route only after backend semantics exist.

### Step F6 — Progression/inventory/support
Open each domain independently as backend contracts arrive.

No “big bang” fixture removal across all routes.
## 26. Analytics/telemetry boundary

Before adding product analytics, define:
- event purpose;
- privacy basis;
- data minimization;
- retention;
- environment.

Do not log:
- password;
- access/reset token;
- recovery code;
- raw sensitive form values.

Useful product events may later include:
- route viewed;
- login outcome category without credentials;
- recovery stage completion;
- character detail viewed;
- support case created.

Analytics is not required for the first integration slice and must not block core auth/account/character work.
## 27. Test and visual evidence plan

### Component/unit
- error-code to UX-state mapping;
- class ID to Vietnamese label;
- map ID to safe display label;
- no generated DTO duplication;
- auth/session helper behavior.

### Browser E2E
For each opened route:
- success path;
- negative/domain errors;
- session expiry;
- network/service unavailable;
- empty state;
- keyboard flow;
- no horizontal overflow.

### Visual profiles
At minimum:
- desktop;
- tablet/intermediate;
- mobile web.

Visual review checks:
- hierarchy;
- data vs art priority;
- form readability;
- long Vietnamese copy;
- long IDs;
- action visibility;
- empty/error states;
- no fixture residue.

Tests being green does not replace by-eye visual review.
## 28. Route implementation order

1. login/register/recovery/access
2. Portal home/account
3. characters + character detail
4. durable sessions
5. journey/progression
6. inventory/equipment companion
7. support

Reason:
- steps 1–3 can use already-defined account/character product contracts once DB/CT/BFF are ready;
- later steps depend on domains not yet implemented.

## 29. Game/Web cross-system review points

Game lane should notify Mission if any of these change:
- AccountResponse fields;
- CharacterResponse fields;
- runtimeClassId semantics;
- runtimeState/map ID semantics;
- auth/session endpoints;
- recovery semantics;
- stable error envelope;
- character ownership behavior.

Player Web design must not force Game to expose fields solely for visual convenience.
## 30. Acceptance

This product design pack is accepted when:
- all current Portal routes have a user goal/data/command/state model;
- auth/BFF/token boundary is explicit;
- fixture-only fields are excluded from real-data requirements;
- account/character real fields match current Game source;
- future progression/inventory/support surfaces are correctly gated;
- desktop/tablet/mobile web behavior is defined;
- accessibility and error states are explicit;
- shared component reuse is the default;
- fixture-to-real migration is staged;
- evidence/visual test plan is implementation-ready.

This document does not claim real Portal integration is active.
## 31. Route / authority / first-real-release matrix

| Route | Player job | First real data | First real command | Open dependency | Status |
|---|---|---|---|---|---|
| /login | enter account | none before submit | login | DB IAM + CT + BFF | READY_DESIGN |
| /register | create account | none before submit | register | DB IAM + CT + BFF | READY_DESIGN |
| /recovery | regain access | challenge/grant state | request/verify/reset | durable recovery + CT + BFF | READY_DESIGN |
| /access | understand access options | auth capability/session state | navigation only | PWEB auth boundary | READY_DESIGN |
| / | resume companion journey | account + roster | navigation/logout later | account/character CT + BFF | READY_DESIGN |
| /account | inspect account | AccountResponse + roster-derived count | logout/navigation | account CT + BFF | READY_DESIGN |
| /account/security | understand security capability | current session + real policy fields only | recovery/session links | IAM/security read model | PARTIAL_DESIGN |
| /account/sessions | inspect/revoke sessions | durable session list | revoke session | DB-05 + API contract | BLOCKED_BY_DOMAIN |
| /characters | choose owned character context | own roster | navigation only | character CT + BFF | READY_DESIGN |
| /characters/[id] | inspect character | CharacterResponse | navigation only | character CT + BFF | READY_DESIGN |
| /journey | understand progression | chapter/objective/progress | none initially | GAME-DATA-01 | BLOCKED_BY_DOMAIN |
| /support | get help | own case list/detail | create case | ADM-06/PWEB-08 | BLOCKED_BY_DOMAIN |

Rows marked READY_DESIGN are design-ready, not implementation-ready until their DB/CT/BFF dependencies close.
## 32. Field binding matrix

| UI concept | Canonical source | Display rule | Status |
|---|---|---|---|
| Player display name | AccountResponse.displayName | show as primary account identity | real-capable |
| Public account ID | AccountResponse.accountId | diagnostic/copy only if useful | real-capable |
| Account created/updated | AccountResponse timestamps | localized date/time | real-capable |
| Character name | CharacterResponse.name | primary roster label | real-capable |
| Character class | CharacterResponse.runtimeClassId | map to Võ/Kiếm/Pháp/Cơ/Linh | real-capable |
| Stored classId | CharacterResponse.classId | hidden from normal player UI; compatibility only | diagnostic only |
| Character slot | CharacterResponse.slot | show as slot/context if useful | real-capable |
| Current map | runtimeState.mapId | map to safe display label if Game review confirms | WAITING_CROSS_SANDBOX: MM-a610edff1357 |
| Character level | Progression domain | never infer from fixture | blocked |
| Last played | no current accepted source | do not show as real | blocked |
| Equipment | Inventory domain | open after GAME-DATA-02 | blocked |
| Session count/list | durable IAM session domain | open after DB-05 | blocked |
| Email verification | no current AccountResponse field | do not invent | WAITING_CROSS_SANDBOX: MM-a610edff1357 |
| Security posture | no canonical source | static guidance only | blocked |
| Support cases | Support domain | own cases only | blocked |
## 33. Layout wireframe — authenticated desktop

Conceptual structure:

[global header / LGO Portal / primary nav / account action]

[page title + concise status/action]

[primary live-data region]
- current account or selected character context
- real state first

[secondary companion region]
- contextual art or next actions
- future/blocked capability notices

[footer / support / legal]

Rules:
- live data always appears before low-priority decorative content on task-oriented routes;
- actions related to account/session appear near their state;
- artwork never occupies the only above-the-fold slot on auth or error recovery;
- long data tables use shared responsive table/card behavior.

## 34. Layout wireframe — mobile web

[compact header]
[page title]
[primary state/action]
[form or character/account content]
[secondary next actions]
[optional art/context]
[footer]

Rules:
- one-column;
- no game-style joystick/HUD;
- no landscape lock;
- touch-friendly action height;
- avoid placing important submit/recovery controls after large art blocks;
- safe keyboard viewport behavior for forms.
## 35. Character detail content hierarchy

Phase 1:

1. Identity
   - name
   - class
   - slot

2. Current known world context
   - map label if contract-approved
   - last runtime-state update only if meaningful

3. Future capability boundaries
   - progression unavailable until opened
   - equipment unavailable until opened
   - support link if available

Do not create a fake MMO “character sheet” full of stats because it looks complete.

Phase 2+ adds real progression/inventory sections from their owning domains.

## 36. Auth route visual hierarchy

Login/register/recovery should share:
- brand/shell;
- form primitives;
- error patterns;
- secondary navigation.

They should not be forced into identical whole-screen compositions.

Login emphasizes speed.
Register emphasizes requirements/terms.
Recovery emphasizes stage clarity and safe retry.

This follows the same shared-primitives-not-generic-screen rule being communicated to the Game UIF lane.
## 37. Design review checklist

For each Portal route:
- Is the player job obvious within two seconds?
- Is live data distinguishable from development-art/reference content?
- Does the route avoid unsupported fields?
- Is the primary action visually obvious?
- Are loading/empty/error/expired states designed?
- Does Vietnamese copy wrap safely?
- Does desktop/tablet/mobile preserve hierarchy?
- Is keyboard navigation complete?
- Is focus visible?
- Does the route avoid horizontal overflow?
- Does auth/session handling stay server/BFF-side?
- Does the route remain useful when future domains are still closed?
- Is there any fixture residue that could be mistaken for real account/game state?

A visually polished page that violates data authority fails review.
## 38. Cross-sandbox response tracking

Current required Game review:
- message: MM-a610edff1357
- task: T-fdd70208c592
- responder: S-LGO-HUB-20260917-D4F1
- status: WAITING_CROSS_SANDBOX for rows A–E only
- expected reply: reply_to=MM-a610edff1357

PWEB-01 may continue and commit its design baseline while waiting.
If Game response changes A–E assumptions, reopen this task from REVIEW, patch the affected sections, rerun verification, then complete.

The program does not stop while this ASK is unanswered.
