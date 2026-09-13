Current phase: WEB-OPS-GAME-OPERATIONS-UX-DEPTH-v1.35 closed at source level; next implementation task is WEB-PORTAL-ACCESS-ONBOARDING-UX-DEPTH-v1.36.

Current decision: LGO_WEB_OPS_GAME_OPERATIONS_UX_DEPTH_SOURCE_READY_RUNTIME_ENV_LIMITED_v1.35

## Ops game operations UX depth v1.35

- Ops Game Operations now presents fixture world/session/event overview → dynamic operation detail.
- Content & LiveOps is rebased onto shared `ProvisionalFeatureShell`, `CaseSummary` and `ActivityTimeline`.
- Existing shared page/data/case/timeline/form foundations fully cover the feature; no unnecessary new base primitive was added.
- All restart/drain/publish/rollback controls remain disabled fixtures.
- No world/session/event query API, scheduler, server mutation, RBAC/audit contract or canonical operations DTO is introduced.
- Ops targeted typecheck/lint PASS. Closure build attempt reached compile + TypeScript before environment timeout; retry exited 9. Production build and route smoke are not claimed.

Current phase: WEB-OPS-SUPPORT-TRIAGE-UX-DEPTH-v1.34 closed; next implementation task is WEB-OPS-GAME-OPERATIONS-UX-DEPTH-v1.35.

Current decision: LGO_WEB_OPS_SUPPORT_TRIAGE_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.34

## Ops support / triage UX depth v1.34

- Ops Support now presents fixture queue → support case detail → activity review using existing shared page/data/case/timeline/form primitives.
- No new base primitive was introduced because the v1.28–v1.33 shared foundation already covers the triage composition.
- Ops-owned support fixture data lives in `apps/ops/src/lib/ops-fixtures.ts`.
- Assignment, escalation, support lookup and moderation actions remain disabled fixture UX.
- No ticket backend, player query API, RBAC/audit contract or mutation endpoint is introduced.
- Targeted UI/Ops typecheck/lint PASS; Ops production build PASS, 11 routes; runtime route smoke PASS, 6/6 HTTP 200.

Current phase: WEB-PORTAL-SUPPORT-RECOVERY-UX-DEPTH-v1.33 closed; next implementation task is WEB-OPS-SUPPORT-TRIAGE-UX-DEPTH-v1.34.

Current decision: LGO_WEB_PORTAL_SUPPORT_RECOVERY_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.33

## Portal support / recovery UX depth v1.33

- Portal Support now presents fixture support topics, case summary and case activity using shared base primitives.
- Portal Recovery now presents a fixture recovery case, disabled identity field and explicit recovery stages.
- `packages/ui` owns `CaseSummary` / `CaseSummaryItem`; Portal does not own reusable case-state markup.
- Portal support/recovery fixture data lives in `apps/portal/src/lib/portal-fixtures.ts`.
- No support-ticket backend, account lookup, email delivery, recovery token or credential mutation is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime route smoke: PASS, 6/6 HTTP 200.
- Public Web and Ops source are unchanged; accepted runtime evidence is reused.

Current phase: WEB-OPS-PLAYER-OPERATIONS-UX-DEPTH-v1.32 closed; next implementation task is WEB-PORTAL-SUPPORT-RECOVERY-UX-DEPTH-v1.33.

Current decision: LGO_WEB_OPS_PLAYER_OPERATIONS_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.32

## Ops player operations UX depth v1.32

- Ops now presents a fixture review journey from player queue → Player 360 detail → activity timeline.
- `packages/ui` owns `ActivityTimeline` and `ActivityTimelineItem`; Ops does not own reusable activity markup.
- Audit reuses the same shared timeline instead of a second app-local timeline pattern.
- Ops fixture records live in `apps/ops/src/lib/ops-fixtures.ts` and remain `PROVISIONAL_WEB_FIXTURE` / `NO_REAL_OPS_MUTATION` / `NOT_CANONICAL_BACKEND_CONTRACT`.
- No player query API, RBAC/audit contract, mutation endpoint or canonical player DTO is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Ops production build: PASS, 11 routes; runtime route smoke: PASS, 5/5 HTTP 200.
- Public Web and Portal source are unchanged; accepted runtime evidence is reused and no redundant build is run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-PORTAL-ACCOUNT-CHARACTER-UX-DEPTH-v1.31 closed; next implementation task is WEB-OPS-PLAYER-OPERATIONS-UX-DEPTH-v1.32.

Current decision: LGO_WEB_PORTAL_ACCOUNT_CHARACTER_UX_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.31

## Portal account / character UX depth v1.31

- Player Portal now presents one coherent fixture journey across overview → account → security/sessions → characters → character detail.
- `packages/ui` owns `KeyValueGrid` and `KeyValueItem`; Portal does not own reusable detail-layout markup.
- Portal fixture records live in `apps/portal/src/lib/portal-fixtures.ts` and are explicitly `PROVISIONAL_WEB_FIXTURE` / `NOT_CANONICAL_BACKEND_CONTRACT`.
- No production auth, DB persistence, canonical account/session/character DTO or API request is introduced.
- Base First / Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime route smoke: PASS, 6/6 HTTP 200.
- Public Web and Ops source are unchanged; their accepted runtime evidence is reused and no redundant build is run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-DATA-DISPLAY-FOUNDATION-v1.30 closed; next implementation task is WEB-PORTAL-ACCOUNT-CHARACTER-UX-DEPTH-v1.31.

Current decision: LGO_WEB_SHARED_DATA_DISPLAY_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.30

## Shared data display v1.30

- `packages/ui/data.tsx` owns `MetricGrid`, `MetricCard`, `DataToolbar`, `DataTable`, and `PaginationBar`.
- `@lgo-web/ui/data.css` owns responsive metric/table/toolbar/pagination presentation.
- `DataTable` accepts presentation columns/rows only and does not define canonical player/character/ops DTOs.
- Portal Characters and Ops Player Operations consume fixture rows through the shared data-display base.
- No API fetch, live pagination, mutation or backend contract is introduced.
- Public Web is unchanged and accepted evidence is reused.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-FORM-CONTROL-FOUNDATION-v1.29 closed; next implementation task is WEB-SHARED-DATA-DISPLAY-FOUNDATION-v1.30.

Current decision: LGO_WEB_SHARED_FORM_CONTROL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.29

## Shared form controls v1.29

- `packages/ui/forms.tsx` owns `FormField`, `TextInput`, `SelectInput`, `CheckboxField`, `FormActions` and `InlineFeedback`.
- `@lgo-web/ui/forms.css` owns neutral form/control/help/error/action presentation.
- `ProvisionalFeatureShell` accepts children so fixture surfaces can reuse shared page + form base without app-local wrappers.
- Portal login/register/recovery use disabled fixture controls only; no auth submit or credential collection is introduced.
- Ops Security/Audit use disabled fixture controls only; no RBAC/audit query/mutation contract is introduced.
- Public Web is unchanged and no fake public search/ticket form is added.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28 closed; next implementation task is WEB-SHARED-FORM-CONTROL-FOUNDATION-v1.29.

Current decision: LGO_WEB_SHARED_PAGE_PATTERN_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.28

## Shared page patterns v1.28

- `packages/ui` owns `PageHeader`, `BoundaryBanner`, `DataList`, `DataListItem`, `PageStateGroup` and `WorkspacePage`.
- `WorkspaceBoundaryNotice` delegates to `BoundaryBanner`; `ProvisionalFeatureShell` delegates to `WorkspacePage`.
- Portal and Ops home pages consume shared page/list patterns instead of duplicating `SpiritPanel + Grid + GameCard` structures.
- Public Web keeps its game/story personality and may consume only neutral shared primitives where appropriate.
- Base First and Evidence Reuse / Build Once remain mandatory.
- Portal production build: PASS, 11 routes; runtime smoke: PASS, 5/5 HTTP 200.
- Ops production build: PASS, 11 routes; runtime smoke: PASS, 6/6 HTTP 200.
- Public Web source/build evidence is unchanged and reused; no redundant Public build was run.
- Browser visual review remains environment-limited by the existing localhost policy (`ERR_BLOCKED_BY_ADMINISTRATOR`).

Current phase: WEB-SHARED-APP-SHELL-FOUNDATION-v1.27 closed; next implementation task is WEB-SHARED-PAGE-PATTERN-FOUNDATION-v1.28.

Current decision: LGO_WEB_SHARED_APP_SHELL_FOUNDATION_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.27

# WEB-PROJECT-STATE

## Shared base v1.27

- Portal and Ops consume `WorkspaceAppShell`, `WorkspaceNavigation` and `WorkspaceBoundaryNotice` from `packages/ui`.
- Shared workspace shell CSS lives in `@lgo-web/ui/shell.css`; duplicated app-local shell selectors were removed.
- Direct design-token dependency ownership is explicit for Portal/Ops.
- Public Web keeps its brand-specific shell while sharing lower-level primitives.
- Portal production build: PASS; route smoke 5/5 PASS.
- Ops production build: PASS; route smoke 6/6 PASS.
- Browser visual review remains environment-limited by localhost policy.


Current phase: WEB-PUBLIC-CLASS-WORLD-STORY-DEPTH-v1.25 closed at source/package level; next implementation task is WEB-PUBLIC-HOMEPAGE-DISCOVERY-AND-MEDIA-STORYTELLING-v1.26.

Current decision: LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25

Base First governance: ACTIVE across Public Web, Player Portal and Ops/Admin. Shared/base owners are extended before reusable app-local duplication; Evidence Reuse / Build Once is mandatory.

v1.24 keeps the scenario-first v1.22/v1.23 information architecture, but gives the website its own editorial/cinematic visual language. Audited game art is treated as material for web composition, not as a layout contract.


## Public web v1.25

- Five Lộ now expose battle rhythm, world lens, team fantasy and signature verbs rather than only combat labels.
- Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới now reads as five different emotional/player promises, not only a route list.
- The opening three chapters now expose opening image, stakes and closing turn so escalation is readable as a story arc.
- New editorial sections remain asset-independent and preserve v1.24 art-provenance boundaries.

## Public web v1.24

- Đông Môn is used as a **world concept** layer inside the cinematic hero, not as a gameplay screenshot.
- Võ starter/skill sheets are presented as a **development art preview** in an editorial class spotlight.
- All five Lộ remain equal in navigation and class identity; Võ is only the first art-backed example.
- Web composition, typography, overlays, responsive behavior and CTA hierarchy remain website-owned so assets can be replaced independently later.
- No production-final artwork, public build or gameplay screenshot claim is introduced.

## Current public identity

- 2D Side-Scrolling Social Action MMORPG.
- HD 2D anime / illustrated direction, not pixel-art.
- Linh Thành is the social heart.
- Three pillars: Social MMORPG / Action / Progression.
- Five Lộ: Võ / Kiếm / Pháp / Cơ / Linh.
- Opening world route: Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.
- Opening narrative: Vết Nứt Đông Môn → Những Cánh Cổng Không Thuộc Về Thế Giới Này → Âm Giới Xâm Lăng.

## Public web v1.23

- Homepage retains fantasy-first narrative and adds a stronger cinematic visual system.
- Hero CTA hierarchy is `Khám phá Linh Giới` → `Chọn Lộ của bạn` → `Bắt đầu câu chuyện`.
- Five Lộ use class-specific emblem treatment without pretending to show production character art.
- Opening route uses a world panorama presentation rather than a technical/status timeline.
- Header CTA is `Trạng thái chơi`, not an unconditional `Tải game` promise.
- Download page starts with public-access status and player guidance before release-governance detail.
- CSS motion respects `prefers-reduced-motion`.

## Creative-source rule

The website is designed from the game scenario, world, class fantasy, narrative and player journey. Game source/runtime is used only to verify technical/public claims; it does not dictate website information architecture.

## Public web v1.26

- Homepage uses one discovery showcase instead of duplicating class/world/story deep sections.
- Discovery configuration references canonical typed content.
- Generic media framing lives in `packages/ui`; homepage composition remains app-owned.
- Base First / Shared Base governance remains active.

## Runtime evidence

### v1.26

- Canonical runtime: Node 24.20.0, Next.js 16.3.4.
- Dedicated v1.26 / Base First / Shared Base / WEB CURRENT STATE validators: PASS.
- Content tests: PASS, 14/14.
- Production build on tmpfs: PASS.
- Static generation: PASS, 63/63 pages.
- Runtime route smoke from the same build: PASS, 5/5 primary routes.
- Browser visual review: UNVERIFIED_ENV; existing Chromium localhost policy returns `ERR_BLOCKED_BY_ADMINISTRATOR`.

### v1.25

- Fresh runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- Direct web TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 13/13.
- v1.22/v1.23/v1.24/v1.25 validators: PASS.
- WEB CURRENT STATE: PASS.
- Production build on `/mnt/data`: UNVERIFIED_ENV due sandbox `EIO: i/o error, fsync`.
- Production build on `/dev/shm`: fsync succeeds, but Turbopack first rejects external dependency symlinks; after dependencies are copied inside tmpfs, `next build` exits 139/SIGSEGV.
- Browser/visual runtime review: UNVERIFIED_ENV; no browser PASS is claimed.

### v1.24

- Fresh minimal runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- `@lgo-web/web` TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 12/12.
- v1.22 continuity validator: PASS.
- v1.23 continuity validator: PASS.
- v1.24 dedicated art/provenance validator: PASS.
- WEB CURRENT STATE: PASS.
- Art derivative SHA256 + dimensions + claim boundaries: PASS.
- Next.js production build: UNVERIFIED_ENV / sandbox `EIO: i/o error, fsync`.
- Browser/visual review: UNVERIFIED_ENV because Next.js cannot stay alive past sandbox fsync failure.

### v1.23

- Runtime kit archive SHA verified before use.
- Fresh minimal runtime: Node 24.20.0, pnpm 10.15.0.
- Workspace lint: PASS, 11/11 packages.
- `@lgo-web/web` TypeScript: PASS.
- `@lgo-web/content` tests: PASS, 11/11.
- v1.22 continuity validator: PASS.
- v1.23 dedicated validator: PASS.
- WEB CURRENT STATE: PASS.
- Next.js production build: UNVERIFIED_ENV / blocked by sandbox `EIO: i/o error, fsync` after compilation begins.
- Next.js dev server: reaches Ready, then the same sandbox `fsync` EIO terminates the process before browser/curl review.
- Browser/visual review: UNVERIFIED_ENV.

## Backend / availability boundaries

- Production auth: NOT CLAIMED.
- Database persistence: NOT CLAIMED.
- Portal integration: NOT CLAIMED.
- Ops production readiness: NOT CLAIMED.
- Public game build: NOT CLAIMED.
- Production deployment: NOT CLAIMED.
- WEB-08-GAME-CONTRACT-SYNC-v1.0 remains blocked until accepted backend Auth/API/DB/RBAC/audit contract exists.

## Historical continuity markers

- LGO_WEB_PUBLIC_PLAYER_SAFETY_SUPPORT_FAQ_POLISH_READY_v1.14
- LGO_WEB_PUBLIC_ACCESSIBILITY_READABILITY_POLISH_READY_v1.15
- LGO_WEB_PUBLIC_FAQ_SEARCH_HELPFULNESS_POLISH_READY_v1.21
- LGO_WEB_PUBLIC_GAME_EXPERIENCE_BRAND_REALIGNMENT_READY_v1.22
- LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_SOURCE_READY_ENV_LIMITED_v1.23
- LGO_WEB_PUBLIC_APPROVED_ART_INGEST_VISUAL_REVIEW_SOURCE_READY_ENV_LIMITED_v1.24
- LGO_WEB_PUBLIC_CLASS_WORLD_STORY_DEPTH_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.25

- LGO_WEB_PUBLIC_HOMEPAGE_DISCOVERY_MEDIA_STORYTELLING_RUNTIME_READY_VISUAL_ENV_LIMITED_v1.26
