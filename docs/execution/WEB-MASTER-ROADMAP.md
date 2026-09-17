# WEB-MASTER-ROADMAP

## 2026-09-18 optimization checkpoint v1.283

WEB-OPT-01 through WEB-OPT-06 are CLOSED. v1.283 at `b23fd22cbb6324a04769c315ca5cd16c3b3fba31` replaces 27 News/Guide slug-specific route branches with one typed renderer registry while preserving all 33 editorial routes, metadata/404 semantics and exact browser rendering.

Continue the v1.277 dependency backlog. Next is WEB-OPT-07 v1.284 (editorial mobile density and reading flow), then Phase B route work beginning with `/support` v1.285.

## 2026-09-18 optimization checkpoint v1.282

WEB-OPT-01 through WEB-OPT-05 are CLOSED. v1.282 at `d8f2a2b5af106ab51960835117c48fd4745ffda3` centralizes metadata ownership for all 59 public routes: 40 indexable routes have unique descriptions/canonicals, 19 Archive routes are canonical noindex surfaces, sitemap contains only intentional indexable routes and source-owned dates, and robots publishes explicit host/sitemap ownership.

Continue the v1.277 dependency backlog. Next is WEB-OPT-06 v1.283 (editorial renderer consolidation), followed by WEB-OPT-07 editorial mobile density before remaining route-family work.


## 2026-09-18 optimization checkpoint v1.281

WEB-OPT-01 through WEB-OPT-04 are CLOSED. v1.281 at `a5659a33e0e74710efe334a96057dad7f64489c2` establishes public route ownership/indexability/language policy, separates 17 Web-program News records into Archive/Devlog and resolves the `/events` orphan without rewriting article bodies.

Continue the v1.277 dependency backlog. Next is WEB-OPT-05 v1.282 (SEO metadata and sitemap ownership), then WEB-OPT-06 renderer consolidation and WEB-OPT-07 editorial mobile density before remaining route-family work.

## 2026-09-18 optimization checkpoint v1.280

WEB-OPT-01 CSS ownership, WEB-OPT-02 interaction ergonomics and WEB-OPT-03 public asset boundary/image delivery are CLOSED. v1.280 at `1c131e10ffe7f5ef060189cc02cbf57e77fcdf7a` removes 49.86MB of review-only public mirrors and reduces homepage hero transfer ~82.7% while retaining docs provenance and predecessor regressions.

Continue the v1.277 ordered optimization backlog. Next is WEB-OPT-04 v1.281 (public IA and player-language contract), followed by SEO metadata/sitemap ownership, editorial renderer consolidation and editorial mobile density.

## 2026-09-17 optimization checkpoint v1.279

WEB-OPT-01 CSS ownership/payload reset and WEB-OPT-02 interaction hit-area/mobile-navigation are CLOSED. v1.279 at `5de43e8de9378d57162ad741dd5b3a4e87609417` removes all audited sub-44px mobile action targets from the 59-route public set while preserving v1.278 CSS payload ownership and no-overflow behavior. Continue the v1.277 ordered optimization backlog; next is WEB-OPT-03 v1.280 (public asset boundary and image delivery).

The long-term WEB-00→WEB-10 product/backend/deployment program remains valid; the optimization backlog is the active public-Web execution lane.

## 2026-09-17 public optimization program

Full public assessment v1.277 supersedes the old page-only visual queue as current optimization authority. WEB-OPT-01 v1.278 is CLOSED at `89c391b5a240544ab6c8bac0eb3b9bdef91c84f5`, reducing median decoded CSS from 245,523 B to 171,998 B (-29.95%) without rendered-layout drift across 59 public routes × desktop/mobile. Continue the ordered dependency backlog from `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`; next is WEB-OPT-02 v1.279 (interaction hit-area and mobile navigation).

The long-term WEB-00→WEB-10 program remains valid for product/backend/deployment phases. The optimization backlog is the active public-Web execution lane until its current task closes; backend-dependent WEB-08/09/10 claims remain gated.

Current optimization checkpoint: `LGO-WEB-FULL-PUBLIC-ASSESSMENT-v1.277` is closed at `026a0719027b5db25bc7c07175ef1bb786d1ed6d`. The prior `/support` v1.277 page queue is superseded. Next: `WEB-OPT-01 — Public CSS Ownership & Payload Reset — v1.278`. Full ordered authority: `LGO-WEB-PUBLIC-OPTIMIZATION-BACKLOG-v1.277.md`.

This roadmap governs the independent Linh Giới Online Web Program. Every phase must include goal, allowed scope, forbidden scope, entry criteria, exit criteria, required evidence, non-claims and next phase.

## Current optimization lanes — authority after v1.277 audit

1. Public foundation optimization: WEB-OPT-01 through WEB-OPT-07.
2. Remaining user-facing routes: WEB-OPT-08 through WEB-OPT-20, one route at a time after shared dependencies.
3. Maintenance simplification: WEB-OPT-21 through WEB-OPT-23 after product-facing source stabilizes.
4. Backend-dependent future: WEB-08 contract sync, real Portal/Ops integration and WEB-10 deployment only after accepted canonical game-backend/release contracts.

The historical WEB-00→WEB-10 program phases remain architectural provenance and long-term gates; they do not override the current optimization queue.

## WEB-00 Program Constitution

Goal: Create governance/control-tower docs and validation for an independent Web repo.

Allowed scope: Docs, prompts, templates, validator, report and handoff.

Forbidden scope: No JS scaffold, no pages, no backend integration, no business backend.

Entry criteria: Uploaded game source context is available and SHA verified.

Exit criteria: Required control tower files exist, validator passes, full-source ZIP and SHA produced.

Required evidence: File inventory, py_compile, constitution validator, ZIP SHA.

Non-claims: No runtime web app, no auth, no DB, no portal, no ops, no deployment.

Next phase: WEB-01 Monorepo Foundation

## WEB-01 Monorepo Foundation

Goal: Scaffold pnpm/Turborepo/Next.js monorepo foundation.

Allowed scope: Package manager, workspaces, TypeScript strict, lint/typecheck/test/build scripts, compile-only app placeholders.

Forbidden scope: No homepage content, no backend integration, no business backend.

Entry criteria: WEB-00 closed and local repo initialized.

Exit criteria: apps/web builds minimal shell; portal/ops compile-only placeholders; scripts pass.

Required evidence: lint/typecheck/test/build plus scaffold validator.

Non-claims: No production content, auth, DB, portal integration, ops mutation or deployment.

Next phase: WEB-02 Design System

## WEB-02 Design System

Goal: Build the LGO web design system foundation.

Allowed scope: Tokens, primitives, component showcase, token usage rules, duplicate-owner validator.

Forbidden scope: No domain pages beyond showcase, no portal/ops flows, no backend.

Entry criteria: WEB-01 foundation scripts pass.

Exit criteria: Design tokens and shared primitives render in showcase; duplicate ownership guarded.

Required evidence: Storybook/equivalent build, component tests, token validator, visual evidence once app exists.

Non-claims: No production homepage, auth, DB, CMS or deployment.

Next phase: WEB-03 Public Website Vertical Slice

## WEB-03 Public Website Vertical Slice

Goal: Create the first official public website vertical slice.

Allowed scope: Routes `/`, `/game`, `/news`, `/news/[slug]`, `/download`, `/support`; file-backed typed content.

Forbidden scope: No backend integration, no CMS, no portal/ops feature, no account flows.

Entry criteria: WEB-02 design system closed.

Exit criteria: Public routes navigate, content is typed/file-backed, responsive checks pass.

Required evidence: Playwright navigation tests, responsive screenshots, accessibility smoke.

Non-claims: No dynamic CMS, no production auth, no DB, no real account integration.

Next phase: WEB-04 Live Content Architecture

## WEB-04 Live Content Architecture

Goal: Harden public content operations without adding full CMS.

Allowed scope: Content schema, editorial workflow, static content validation, release notes/news model.

Forbidden scope: No production CMS, no admin editor, no backend mutations.

Entry criteria: WEB-03 public slice closed.

Exit criteria: Content model supports news/support/download pages with validation and preview workflow.

Required evidence: Schema tests, broken-link checks, content validator, static build.

Non-claims: No CMS, no database, no portal/ops integration.

Next phase: WEB-05 Public Website Release Candidate

## WEB-05 Public Website Release Candidate

Goal: Prepare public website for a release candidate.

Allowed scope: Performance, accessibility, SEO metadata, download/support readiness, deployment plan dry-run.

Forbidden scope: No production deployment claim unless explicitly verified; no portal/ops.

Entry criteria: WEB-04 content architecture closed.

Exit criteria: Public website meets budgets and release checklist for staging candidate.

Required evidence: Lighthouse/Core Web Vitals proxy, Playwright, axe, build, bundle analysis.

Non-claims: No portal, no ops, no auth/DB, no CMS, no production deployment.

Next phase: WEB-06 Player Portal UX Shell

## WEB-06 Player Portal UX Shell

Goal: Create player portal UX shell without real backend integration.

Allowed scope: Routes, empty/loading/error/auth-required states, fixture-only UI.

Forbidden scope: No production auth, no DB, no real account/character mutation.

Entry criteria: Public web candidate is stable; Auth/DB still unaccepted.

Exit criteria: Portal shell compiles and communicates blocked state clearly.

Required evidence: Typecheck, component tests, route tests, visual evidence.

Non-claims: No real login, no real account integration, no DB persistence.

Next phase: WEB-07 Internal Ops/Admin Foundation

## WEB-07 Internal Ops/Admin Foundation

Goal: Create internal Ops/Admin/GM foundation shell.

Allowed scope: Information architecture, guarded route shell, risk banners, read-only fixture states.

Forbidden scope: No admin mutation, no public exposure, no RBAC bypass, no backend integration.

Entry criteria: Portal shell exists and security baseline is accepted.

Exit criteria: Ops shell compiles with high-risk non-claims and route guards.

Required evidence: Typecheck, tests, security baseline checklist, visual evidence.

Non-claims: No real ops/admin mutation, no production RBAC, no audit trail.

Next phase: WEB-08 Contract Sync with Game Backend

## WEB-08 Contract Sync with Game Backend

Goal: Introduce explicit sync records for game backend API contracts.

Allowed scope: Contract register, endpoint inventory, generated/centralized API client plan, unsupported fields list.

Forbidden scope: No hand-written canonical DTO per app, no independent backend, no integration without accepted contract.

Entry criteria: Game backend Auth/DB/API surface has owner-approved contract details.

Exit criteria: Contract records include commit, API version, endpoint list, auth/session/error semantics.

Required evidence: Contract sync validator, type generation check if available, drift report.

Non-claims: No portal/ops production readiness just from contract records.

Next phase: WEB-09 Real Portal/Ops Integration

## WEB-09 Real Portal/Ops Integration

Goal: Integrate Portal/Ops with accepted game backend contracts.

Allowed scope: API client consumption, auth/session integration, read/write flows only where accepted.

Forbidden scope: No unsupported mutations, no hidden DTOs, no bypass of RBAC/audit/security gates.

Entry criteria: WEB-08 contract sync accepted and backend supports required semantics.

Exit criteria: Selected Portal/Ops flows run through real API contracts and handle errors safely.

Required evidence: Integration tests, Playwright, auth/session tests, negative/error tests.

Non-claims: No production deployment or live ops claim until deployment/security closure.

Next phase: WEB-10 Production Deployment Closure

## WEB-10 Production Deployment Closure

Goal: Close deployment readiness for public web, portal and ops according to risk.

Allowed scope: Environments, secrets policy, domain mapping, monitoring, rollback, security gates.

Forbidden scope: No deployment without verified environment and owner approval.

Entry criteria: WEB-09 integration closed or public-only release scope explicitly isolated.

Exit criteria: Deployment checklist and environment gates pass for approved surfaces.

Required evidence: Build, smoke, security checklist, monitoring/rollback rehearsal, production readiness report.

Non-claims: No claim for surfaces not deployed; portal/ops may remain blocked while public web ships.

Next phase: Program enters maintenance/release workflow

## 2026-09-13 continuation checkpoint v1.38

Portal access/onboarding, shared workspace visual repair and remaining Ops review compositions are verified at fixture UX scope. Shared ProgressSteps has Portal and Ops consumers. WEB-08 is the current external-contract gate; WEB-09 real integration and WEB-10 deployment remain incomplete. Scoped local build/browser evidence does not retroactively certify all historical release/security gates or the target Node runtime.
