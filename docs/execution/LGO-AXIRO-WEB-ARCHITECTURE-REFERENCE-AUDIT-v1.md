# LGO Web/Admin — AXIRO Architecture & Optimization Reference Audit v1

Date: 2026-09-18
Status: READ-ONLY REFERENCE AUDIT
Task: T-8c53dda4430c — LGO-WEB-REF-01
Umbrella Mission: MS-57a638c72421

## 1. Scope and source safety

AXIRO is used as a comparative reference only.

Read-only source baselines:
- AXIRO API develop: e5f48f5b815583a90ef0bb188238cb13dd5422bd
- AXIRO Admin develop: ea0fa41ad81e8df16ec470aa550090f6a4360a68

Both checkouts were remote-equal but had active uncommitted WIP when audited.
Therefore:
- stable comparison uses committed HEAD source via git show;
- dirty WIP such as current RelationSelect / Calculation Governance changes is not treated as accepted architecture;
- no AXIRO file/process/task is modified by this LGO task.

Classification:
- ADOPT — concept fits LGO with minor translation.
- ADAPT — useful concept but implementation must change for LGO.
- REJECT — unsuitable for LGO or too costly/unsafe.
## 2. Executive verdict

AXIRO demonstrates several mature enterprise patterns worth carrying into LGO:
- clear transport/error normalization;
- reusable UI primitives and workflow composition;
- permission/action boundaries;
- optimistic concurrency;
- correlation IDs;
- audit redaction;
- post-commit/non-authoritative side-effect handling;
- changed-scope verification;
- explicit style/bundle/evidence budgets;
- manual visual review in addition to automated visual checks.

However LGO should NOT copy:
- browser localStorage access/refresh token architecture;
- the extremely broad generic CRUD/module abstraction;
- hundreds of domain-specific verification scripts;
- AXIRO’s Laravel/MySQL-specific persistence patterns;
- enterprise form/selector complexity before LGO actually needs it.

LGO needs a smaller architecture optimized for:
Game API contracts + companion Portal + privileged Ops workflows + domain authority.
## 3. Frontend transport and error handling

### AXIRO pattern
Committed AXIRO Admin has:
- one Axios transport owner;
- centralized token injection/refresh;
- normalized API errors;
- requestId/correlation extraction;
- typed-ish behavior flags for conflict/validation/forbidden/retry;
- best-effort refresh after stale/permission errors.

### Classification: ADAPT

Adopt the separation:
transport → normalized error → feature/UI behavior.

For LGO:
- packages/api-client owns typed HTTP transport;
- packages/contracts owns generated shapes;
- BFF/auth layer owns browser session adaptation;
- shared error adapter maps stable backend error codes/status/requestId;
- feature UI maps normalized error to player/operator states.

Do NOT copy Axios-specific global redirect behavior blindly.

LGO error object target should expose:
- status;
- code;
- requestId;
- field errors if the contract supports them;
- retryable;
- conflict metadata;
- original cause for server logs only.

This reinforces CT-02/CT-03 and the existing canonical error policy.
## 4. Browser token storage

### AXIRO pattern
AXIRO committed source stores access_token and refresh_token in localStorage and injects Authorization from browser JavaScript.

### Classification: REJECT for LGO Player Web

LGO already chose:
Browser → Next.js BFF/server boundary → Java API.

Reasons:
- Player Web can contain backend bearer credentials server-side/HttpOnly rather than expose them to arbitrary browser JS.
- LGO does not need AXIRO’s legacy SPA token architecture.
- logout/session invalidation can stay coordinated with ProductAuth.

For LGO Admin, staff session architecture should also prefer secure server/session boundaries rather than copy localStorage token handling without a dedicated threat review.
## 5. Shared base components

### AXIRO pattern
AXIRO has a very broad src/components/base library:
tables, forms, filters, responsive split, cards, list views, modals, destructive actions, permission dialogs, canonical hub layouts, mobile table view and more.

### Classification: ADAPT

Good principle:
- common behavior should have one base owner;
- route/module code should compose, not reimplement common loading/form/table/action behavior.

LGO already has a smaller shared packages/ui foundation and should keep it small.

Recommended LGO shared families:
- shell/page/header/boundary;
- form field/input/action/error;
- list/table/data/metric;
- loading/empty/error;
- confirmation/destructive-action;
- responsive split/stack primitives when real Portal/Ops layouts need them.

Do not attempt to recreate AXIRO’s entire base-component catalogue in advance.
Add a shared primitive only after at least two real LGO workflows need the same behavioral contract.
## 6. Responsive split / container-aware layout

### AXIRO pattern
BaseResponsiveSplit responds to owned available width and defines sidebar min/max/gap rather than assuming browser viewport alone.

### Classification: ADOPT as principle, ADAPT implementation

For LGO Web/Admin:
- layout primitives should respond to their container/context;
- desktop/tablet/mobile composition changes should not be one global scale;
- shared tokens own spacing/type/control minimums;
- component variants own sidebar/card/stack behavior.

This aligns with the advice already sent to Game UIF-02R:
named presentation classes + semantic tokens + component variants before uniform scaling.
## 7. Module/service/page decomposition

### AXIRO pattern
Representative Reservations slice:
page composes:
- module registry;
- service;
- fields;
- columns;
- filters/statistics;
- shared list/form/action hooks.

Backend separates:
Controller → FormRequest → Service → Resource/Transformer/Model/query helpers.

### Classification: ADAPT

Good LGO Web structure:
route/page → feature/view-model hook/server loader → typed service/client → generated contract.

Good LGO Admin structure:
route/workflow page → workflow model/controller → typed admin API adapter → generated contract.

Avoid making every LGO route a generic CRUD module.
Auth, character companion, support, Player 360, audit and LiveOps have different workflow semantics.

For LGO backend:
Controller → validated request/command → domain service → repository/transaction → DTO.
This fits the current modular-monolith direction without copying Laravel class conventions.
## 8. Generic CRUD abstraction

### AXIRO pattern
createCrudService, large generic BaseTable/BaseForm/BaseListView and module registry allow many enterprise modules to share behavior.

### Classification: REJECT as LGO default

LGO has far fewer, higher-semantics workflows.
A generic CRUD architecture risks:
- leaking storage shape into UI;
- making privileged commands look like row updates;
- encouraging direct “edit player” forms;
- weakening domain command language.

Use generic primitives for rendering and interaction, not generic CRUD semantics for business operations.
## 9. Async action / stale-state behavior

### AXIRO pattern
useAsyncAction centralizes:
- loading;
- duplicate/concurrent action handling;
- normalized failures;
- conflict reload behavior;
- permission context refresh;
- success/error notifications.

useList also guards stale async completion with request sequence and scope identity.

### Classification: ADOPT as concept

LGO Web should have small shared async-state helpers after real integration starts:
- prevent duplicate submit unless explicitly allowed;
- abort/ignore stale response when identity/scope changes;
- keep form input on validation/conflict;
- clear session on accepted auth invalidation;
- preserve original mutation error if follow-up refresh fails.

Prefer framework-native/server-state tools when appropriate; do not rebuild a full client state framework prematurely.
## 10. Permission boundaries

### AXIRO pattern
AXIRO combines:
- module/context permission requirements;
- record-projected permissions;
- action-specific additional requirements;
- backend model enforcement.

### Classification: ADAPT strongly for LGO Admin

LGO staff authorization should expose capability-aware read/action contracts.

Useful distinction:
- route/workflow capability;
- resource-level eligibility;
- command-specific capability;
- additional high-risk approval requirements.

But LGO should keep capability vocabulary domain-oriented:
player.read, session.revoke, audit.read, support.assign, moderation.sanction, liveops.publish, etc.

Player Web ownership checks remain backend account ownership, not staff RBAC.
## 11. Optimistic concurrency / expected version

### AXIRO pattern
ExpectedVersionMutationRequest and 409 conflict behavior are explicit.

### Classification: ADOPT

LGO should use optimistic versioning where ordinary durable aggregate edits can race:
- character/runtime persisted state where appropriate;
- support case transitions;
- staff role assignment;
- LiveOps draft/version lifecycle;
- possibly equipment changes depending command design.

Do not require expectedVersion for append-only/idempotency-ledger operations when the domain has a better concurrency primitive.

Web/Admin UX must preserve context on 409 and reload/compare rather than silently overwrite.
## 12. Correlation IDs

### AXIRO pattern
CorrelationContext resolves explicit/current/X-Correlation-ID and threads it through operations.

### Classification: ADOPT

LGO CT-02 should standardize one request/correlation ID:
- accepted or generated at API boundary;
- returned in response/error;
- logged;
- included in audit/outbox where relevant;
- surfaced to Portal/Admin support/error UX safely.

Do not expose trace internals or secrets.
## 13. Audit payload sanitization

### AXIRO pattern
AuditPayloadSanitizer masks credentials, tokens, identity/contact, money, internal URLs/paths and bounds depth/items/string size.

### Classification: ADOPT concept, ADAPT policy

LGO audit system should use allowlist-first or domain-safe payload projection where possible.

At minimum centrally reject/mask:
- password/hash;
- bearer/reset/session tokens;
- recovery codes;
- DB credentials;
- private paths;
- provider secrets;
- sensitive player/staff personal data not needed for the audit event.

Do not make UI redaction the only protection.
## 14. Post-commit side effects

### AXIRO pattern
Non-authoritative side effects run after DB commit and cannot turn a committed mutation into a false HTTP failure/retry loop.

### Classification: ADOPT principle with stronger LGO split

LGO should distinguish:
- authoritative cross-system event that must be reliable → transactional outbox;
- best-effort notification/secondary refresh/telemetry → after-commit best-effort.

Do not use best-effort callbacks for inventory/currency/progression events that must never be lost.
## 15. Reference-option / selected hydration pattern

### AXIRO pattern
Large relation selectors:
- bounded options;
- eligibility/scope checks;
- selected historical item can be hydrated without widening permission/eligibility;
- selected value remains visible even when not in first result page.

### Classification: ADAPT for LGO Admin only when needed

Potential uses:
- staff assignment;
- support operator assignment;
- LiveOps target/environment selectors;
- player/admin search references.

Not needed for early Player Web.

If adopted:
- selected hydration never bypasses authorization;
- pagination/search stays bounded;
- ID lookups remain canonical.
## 16. Style-boundary validation

### AXIRO pattern
Static checks catch:
- overflow-x:hidden used to hide layout bugs;
- large fixed pixel widths;
- 100vw page overflow;
- noncanonical breakpoints;
- unscoped third-party overrides;
- cross-module style ownership.

### Classification: ADAPT

LGO should keep a much smaller boundary checker:
- no page-level overflow hiding;
- no route-local duplicate shared tokens;
- only accepted breakpoints/tokens;
- no giant fixed widths without owned scroll policy;
- no cross-app CSS import;
- no local redefinition of shared component styles.

Do not create a huge baseline of accepted debt as a normal development pattern.
## 17. Bundle budget

### AXIRO pattern
Build artifact is measured by chunk/category and has explicit temporary debt budgets.

### Classification: ADOPT later, lightweight

For LGO:
- Portal/Ops bundle budget becomes useful when real API/auth/UI integrations add libraries;
- track total JS and largest route/shared chunks;
- route-isolate heavy libraries if introduced;
- explicit temporary exceptions need reason/owner.

Do not add heavy chart/map/editor dependencies before actual feature need.
## 18. Verification orchestration

### AXIRO pattern
Changed-file mapping selects affected contract checks; fast/canonical/integrated/release modes deduplicate command DAGs and record timing/fingerprints.

### Classification: ADAPT

LGO should eventually have:
- changed/focused;
- integration;
- release modes;
- source/contract ownership map;
- timing evidence;
- no duplicate expensive executions.

But avoid hundreds of one-off scripts.

Target for LGO Web:
- one small verification manifest;
- each package/domain lists canonical tests/checks;
- changed files select owners;
- unknown changes fail broad;
- visual/runtime checks are separate from static checks.
## 19. Visual evidence and manual review

### AXIRO pattern
Release evidence can require:
- route × viewport visual matrix;
- no overflow/offender/accessibility issues;
- explicit manual visual review fields;
- exact frontend/backend commit pairing.

### Classification: ADOPT strongly, simplify scope

This is directly useful after recent LGO Game/Web visual lessons.

For LGO Portal/Ops:
- canonical route subset × desktop/tablet/mobile web;
- automated overflow/a11y/basic geometry;
- manual hierarchy/spacing/usability/text-wrap/state/action review;
- exact contract/backend commit/version;
- evidence reuse instead of screenshot duplication.

For Game:
the same principle applies through runtime captures, but source/profile matrix differs from Web.
## 20. Evidence index / clean-source binding

### AXIRO pattern
Release evidence index binds FE/BE SHAs, environment, tests, visual/manual review and refuses dirty source.

### Classification: ADOPT principle

LGO cross-system milestone evidence should bind:
- Game commit;
- Web commit;
- OpenAPI checksum/version;
- DB schema/Flyway version;
- GameData/protocol version where relevant;
- exact E2E scenario evidence.

Do not package entire source trees per task.
Use compact manifests + immutable evidence references.
## 21. Over-abstraction risk in AXIRO

AXIRO’s mature enterprise surface creates very large abstraction inventories:
- extensive Base* component catalogue;
- module registries;
- many service/action helpers;
- many specialized validators.

### Classification: REJECT as a target shape for LGO

LGO should optimize for:
- fewer product domains;
- stronger domain semantics;
- explicit vertical slices;
- generated API contracts;
- low abstraction until repeated need is proven.

Rule:
copy a principle only after identifying the concrete LGO problem it solves.
Do not import architecture merely because it exists in AXIRO.
## 22. LGO concrete architecture updates from AXIRO audit

### Add / strengthen now in planning
1. Shared normalized API error adapter after CT-02.
2. Request/correlation ID propagation into Portal/Admin UX.
3. Optimistic concurrency UX contract for future mutable Admin workflows.
4. Small shared async-action/stale-response guard.
5. Capability + resource/action boundary design for Admin.
6. Audit payload sanitizer as backend infrastructure.
7. Clear outbox vs best-effort post-commit rule.
8. Small style-boundary checker for shared tokens/responsive ownership.
9. Lightweight bundle budget once real integration adds dependencies.
10. Verification ownership manifest with changed/focused/integration/release modes.
11. Cross-system evidence manifest binding Game/Web/contract/DB versions.
12. Manual visual review remains mandatory for visual claims.

### Keep existing LGO choices unchanged
- Next.js Portal/Ops companion architecture.
- BFF/server-side bearer containment.
- PostgreSQL/Flyway/jOOQ/Testcontainers/pgAdmin.
- Java modular monolith.
- generated OpenAPI TypeScript contracts.
- workflow-oriented Admin, not CRUD.
## 23. Explicit non-adoptions

Do not copy from AXIRO:
- localStorage access/refresh token storage;
- generic CRUD endpoint/UI generation as Admin architecture;
- Ant Design dependency;
- AXIRO module naming/enterprise taxonomy;
- Laravel FormRequest/Resource classes literally;
- MySQL-specific test/runtime model;
- all AXIRO check scripts;
- current dirty AXIRO selector/governance WIP;
- temporary bundle debt numbers;
- large generic BaseTable implementation.

These are project-specific implementation choices, not universal best practices.
## 24. Follow-up LGO tasks recommended

1. LGO-WEB-ARCH-01 — Shared API error/correlation adapter design/implementation after CT-02.
2. LGO-WEB-ARCH-02 — Small async action + stale request guard for real Portal/Ops integration.
3. LGO-WEB-QUALITY-01 — Shared style-boundary/responsive ownership checker.
4. LGO-WEB-QUALITY-02 — Verification ownership manifest + changed/focused runner.
5. LGO-WEB-QUALITY-03 — Bundle budget and chunk evidence after first real integrations.
6. LGO-XEVID-01 — Cross-system release evidence manifest binding Game/Web/API/DB/GameData versions.
7. LGO-BE-AUDIT-01 — Central audit payload sanitization policy/utility.
8. LGO-BE-OUTBOX-01 — Durable outbox vs best-effort post-commit event policy.

Create these only with dependency-aware scope; this audit itself does not implement them.
## 25. Acceptance

This audit is complete when:
- AXIRO source pins and dirty-WIP caveat are recorded;
- representative committed frontend/backend source was read, not inferred from docs;
- every borrowed pattern is classified ADOPT/ADAPT/REJECT;
- LGO auth/session choice is not weakened by AXIRO token storage;
- LGO does not inherit AXIRO over-abstraction/script sprawl;
- concrete LGO architecture/task follow-ups are identified;
- AXIRO source remains untouched;
- output is committed/pushed only in LGO Web repo.
