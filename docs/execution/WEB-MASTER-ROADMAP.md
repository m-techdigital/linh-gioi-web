# WEB-MASTER-ROADMAP

Current visual checkpoint: v1.227 `/community` verified; next v1.228 `/community/onboarding`. Delivery: commit/push, remote HEAD verification and ZIP/SHA256. No live social backend/production release. Whole-app no-JavaScript limitation remains open.

This roadmap governs the independent Linh Giới Online Web Program. Every phase must include goal, allowed scope, forbidden scope, entry criteria, exit criteria, required evidence, non-claims and next phase.

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
