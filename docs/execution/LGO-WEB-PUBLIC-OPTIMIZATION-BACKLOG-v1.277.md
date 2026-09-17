# LGO-WEB PUBLIC OPTIMIZATION BACKLOG v1.277

Authority: `LGO-WEB-FULL-PUBLIC-ASSESSMENT-REPORT-v1.277.md`
Execution rule: sequential unless a future coordinator explicitly proves independent worktrees/resources. Each task gets fresh BEFORE evidence, RED→GREEN where behavior changes, real desktop/mobile review, source gates, normal push and closure evidence.

## Phase A — Shared public foundation

### WEB-OPT-01 — Public CSS Ownership & Payload Reset — v1.278 — P1
- Finding: `service-layout.css` is 5,067 lines and imported globally; `globals.css` retains 31 version blocks and substantial superseded selectors.
- Impact: unnecessary baseline CSS, unclear ownership and broad regression blast radius.
- Scope: root layout imports, `globals.css`, `packages/ui` shared CSS ownership and active selector migration only; no visual redesign.
- Dependency: none.
- Exit: remove global service-layout dependency; retain only active shared owners; representative modern + legacy route screenshots unchanged or intentionally improved; clean current-state passes.
- Evidence: decoded CSS baseline vs AFTER, 59-route overflow smoke, selected visual screenshots, typecheck/lint/build/current-state.

### WEB-OPT-02 — Interaction Hit-Area & Mobile Navigation — v1.279 — P1
- Finding: representative real links/buttons/summaries render 31–40px high; compact CSS overrides shared controls below comfortable mobile targets.
- Impact: harder touch interaction despite clean axe semantics.
- Scope: shared action/button/filter/disclosure geometry and mobile nav discoverability; native checkbox labels audited as hit areas, not blindly enlarged inputs.
- Dependency: WEB-OPT-01.
- Exit: no actionable link/button/summary below 44px on 390px audit except justified inline-text links; horizontal nav remains keyboard/focus reachable and visibly discoverable.
- Evidence: 59-route geometry scan desktop/mobile + keyboard browser checks.

### WEB-OPT-03 — Public Asset Boundary & Image Delivery — v1.280 — P1
- Finding: 48MB design-reference assets ship from `public/`; only one source file uses `next/image`; heavy hero assets transfer at source size.
- Impact: deployment/CDN footprint and unnecessary public review artifacts; homepage image transfer ~1.77MB on full scroll.
- Scope: move review-only design targets outside public static path; remove dead public reference component; optimize only high-impact hero/content images with stable dimensions.
- Dependency: WEB-OPT-01.
- Exit: no review-only design target under public deploy root; no broken product image; materially lower public artifact and heavy-route image transfer without visual loss.
- Evidence: asset inventory/SHA, fresh browser image health, transfer comparison, production screenshots.
### WEB-OPT-04 — Public IA & Player-Language Contract — v1.281 — P1
- Finding: News/Guides expose Web-program history and engineering terms; `/events` is orphaned; 20 routes have <=1 inbound link.
- Impact: public site feels like an engineering transparency portal instead of an MMORPG product journey.
- Scope: route taxonomy, player journeys, content visibility/indexability, language rules and archive strategy; preserve truthful non-claims.
- Dependency: WEB-OPT-01; may use WEB-OPT-03 asset boundary.
- Exit: approved content matrix defines Product/Guide/News/Support/Archive ownership; no sitemap route is unintentionally unreachable; internal version/change-log content has an explicit archive/devlog policy.
- Evidence: link graph, content inventory, before/after term audit, public navigation walkthrough.

### WEB-OPT-05 — SEO Metadata & Sitemap Ownership — v1.282 — P1
- Finding: 59 routes share one description, emit no canonical URL and static sitemap dates are stale.
- Impact: weak search snippets, duplicate-content ambiguity and misleading freshness signals.
- Scope: route metadata helpers, dynamic News/Guide metadata, canonical ownership, sitemap/indexability/lastModified policy, OG consistency.
- Dependency: WEB-OPT-04.
- Exit: every indexable public route has unique appropriate description + canonical; sitemap contains only intentional routes with truthful dates; robots remains explicit.
- Evidence: 59-route metadata crawler, sitemap diff and HTTP checks.

### WEB-OPT-06 — Editorial Renderer Consolidation — v1.283 — P1
- Finding: Guides have 16 slug-specialized branches; News has 11 specialized renderers despite shared article primitives.
- Impact: duplicate logic, CSS coupling and high cost for future content changes.
- Scope: data/registry-driven renderer selection around `PublishedArticle`, `GuideArticle` and small explicit variants; preserve authored content and route semantics.
- Dependency: WEB-OPT-04.
- Exit: dynamic route files no longer contain long slug `if` chains; all current slugs render equivalent or intentionally improved semantics; unknown slug behavior remains 404.
- Evidence: static params/metadata tests, all News/Guide route browser matrix, visual family samples.

### WEB-OPT-07 — Editorial Mobile Density & Reading Flow — v1.284 — P1
- Finding: mobile P90 page height ~4,917px; many Guides/News become repeated card walls.
- Impact: high cognitive/scroll cost on phone despite semantic accessibility.
- Scope: shared article/catalog rhythm, TOC, progressive disclosure and copy deduplication after IA reset; do not hide safety/truth boundaries.
- Dependency: WEB-OPT-04 and WEB-OPT-06.
- Exit: editorial family mobile P90 materially reduced from audit baseline while preserving discoverability and source meaning; no horizontal overflow; first useful next-step appears earlier.
- Evidence: family page-height distribution, screenshots, keyboard/fragment tests and content-diff review.
## Phase B — Remaining user-facing routes

Each route task inherits Phase A foundations and remains single-page unless the backlog explicitly names a family index/template task.

| Order | Task | Route | Priority | Dependency | Required outcome |
|---|---|---|---|---|---|
| 08 | WEB-OPT-08 v1.285 | `/support` | P2 | 01–04 | Replace generic proof-density with clear support entry hierarchy; keep no-ticket/no-account-lookup truth. |
| 09 | WEB-OPT-09 v1.286 | `/support/help` | P2 | 01–07 | Shorten FAQ discovery path, reduce wall-of-cards density, preserve local filtering and answer semantics. |
| 10 | WEB-OPT-10 v1.287 | `/support/safety` | P2 | 01–04 | Improve reporting/safety sequence and touch flow without creating live intake. |
| 11 | WEB-OPT-11 v1.288 | `/community` | P2 | 01–04 | Clarify community value vs unavailable live social systems; reduce repeated technical boundaries. |
| 12 | WEB-OPT-12 v1.289 | `/community/onboarding` | P2 | 01–04 | Make newcomer path shorter and more game-oriented; preserve static-only feedback limits. |
| 13 | WEB-OPT-13 v1.290 | `/game/loop` | P2 | 01–04 | Reduce 390px vertical length and repeated boundary blocks; keep gameplay non-claims. |
| 14 | WEB-OPT-14 v1.291 | `/guides` | P2 | 04–07 | Rebuild guide discovery around player intent and curated categories after editorial consolidation. |
| 15 | WEB-OPT-15 v1.292 | `/news` | P2 | 04–07 | Present real player/project news; remove engineering-history dominance from primary discovery. |
| 16 | WEB-OPT-16 v1.293 | `/events` | P2 | 04–05 | Make an explicit product decision: integrate truthful current/future events or remove from indexable public IA while only fixtures exist. |
| 17 | WEB-OPT-17 v1.294 | `/patch-notes` | P2 | 04–05 | Separate game/public release notes from browser/runtime engineering history. |
| 18 | WEB-OPT-18 v1.295 | `/performance` | P2 | 01–04 | Keep useful performance guidance but remove engineering-dashboard tone and repeated proof blocks. |
| 19 | WEB-OPT-19 v1.296 | `/accessibility` | P2 | 01–04 | Keep keyboard/readability practice while presenting it as player help rather than compliance tooling. |
| 20 | WEB-OPT-20 v1.297 | `/roadmap` | P2 | 04–05 | Replace mixed Web-engineering milestones with a player-readable product/release roadmap; link internal engineering roadmap only from governance docs. |

Per-page exit criteria: fresh desktop/mobile BEFORE and AFTER; target/reference only as a guardrail; no overflow; touch targets comply with shared contract; copy follows IA/player-language contract; relevant E2E + current-state + build pass; normal commit/push and evidence closure.
## Phase C — Maintainability and continuous quality

### WEB-OPT-21 — Active Test/Validator Authority Consolidation — v1.298 — P3
- Finding: 251 E2E specs, 284 validators, 112 ignored specs and 469 validator references in current-state authority.
- Scope: introduce one active-suite manifest; move retired cases out of normal execution/supersession logic while retaining immutable provenance.
- Dependency: Phase B source stabilizes enough that retired/current ownership can be frozen safely.
- Exit: a successor can identify active browser/source gates from one manifest; historical suites are not silently counted as PASS; current-state validator is materially simpler.

### WEB-OPT-22 — Content Fixture Modularization — v1.299 — P3
- Finding: `fixtures.ts` is 3,302 lines and mixes product, support, release, editorial and historical Web-program content.
- Scope: split typed fixture domains behind the existing repository contract; no copy rewrite unless already approved by WEB-OPT-04.
- Dependency: WEB-OPT-04 and WEB-OPT-06.
- Exit: repository consumers remain stable, content validation stays green, domain ownership is clear and each fixture module is reviewable independently.

### WEB-OPT-23 — Public Performance & Governance Budgets — v1.300 — P3
- Scope: codify automated budgets for decoded CSS, public asset footprint, heavy image transfer, route page-height outliers, accidental design-reference shipping and active-test authority drift.
- Dependency: WEB-OPT-01 through WEB-OPT-22 as applicable.
- Exit: budgets fail on regression without forcing cosmetic redesign; baseline values are documented from accepted optimized source.

## Future/backend-dependent lane

WEB-08 Contract Sync, real Portal/Ops integration, production auth/DB/CMS/live community/download entitlement and WEB-10 deployment remain gated by accepted canonical game-backend/release contracts. These are not completion blockers for the optimized pre-release public website and must not be faked by public fixtures.