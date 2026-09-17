# LinhGioiOnline-Web Full Public Audit Design

**Status:** Approved for assessment only

**Goal:** Audit the entire public Web and its shared foundations, then produce an evidence-backed optimization backlog and a durable MCP/roadmap queue before any new product UI implementation.

**Scope:** `apps/web`, `packages/ui`, `packages/design-tokens`, `packages/content`, public runtime routes, shared public shell/navigation/footer, page-specific bases, public content/IA, accessibility, SEO, performance, test/governance structure. `apps/portal` and `apps/ops` are inspected only where they consume shared bases.

**Out of scope for this round:** Product UI fixes, new backend/auth/CMS, production deployment, independent portal/ops feature work, speculative game-backend contracts.

## Audit dimensions

1. Runtime UX/UI: all sitemap routes at desktop/mobile, hierarchy, density, first fold, page length, responsive behavior, touch targets, overflow, image health, navigation continuity.
2. Shared foundation: shell/chrome, tokens, primitives, CSS ownership, shared/page-local bases, duplication, legacy/dead styling risk.
3. Source architecture: pages, components, client state/hooks, component size/responsibility, reuse boundaries, static-vs-client rendering.
4. Content & IA: route necessity, duplication, player-facing usefulness, technical/internal wording, onboarding→world/class→release/tester/support journeys.
5. Quality/runtime: bundle/assets, image delivery, CSS/JS cost, accessibility, metadata/SEO/sitemap, errors/loading/not-found, regression coverage.
6. Governance: reconcile current visual queue, long-term WEB-00→WEB-10 roadmap and historical version evidence into one current product roadmap plus prioritized backlog.
## Evidence model

- Runtime measurements are collected from the current production build on the session-owned local production server; they are observations, not design acceptance by themselves.
- Source findings must cite concrete files/owners and distinguish active code from historical/provenance artifacts.
- Every backlog item must include: finding, impact, scope/owner, dependency, acceptance criteria, required browser evidence and non-claims.
- No score or PASS is inferred from historical validators. Existing tests remain evidence only for the behaviors they directly assert.

## Backlog model

Findings are grouped by shared root cause before page symptoms. Priorities use four operational classes: P0 correctness/trust/accessibility blockers; P1 cross-site UX/shared-foundation work; P2 page/content/IA refinement; P3 maintainability/debt or future-readiness.

Implementation remains sequential after this audit. A task is independently reviewable and must not mix unrelated pages or shared-system changes. Shared-base tasks precede page tasks that depend on them.

## Deliverables

- Full-system assessment report with evidence inventory and independent findings.
- Architecture/content/runtime risk register.
- Ordered implementation backlog with dependencies and task-level exit criteria.
- Updated `WEB-ACTIVE-GOAL`, `WEB-MASTER-ROADMAP`, `WEB-NEXT-ACTION`, `WEB-PROJECT-STATE`, and `WEB-TASK-LEDGER` so a successor sandbox can continue without reconstruction.
- MCP Session Manager checkpoint/result/next updated to the new assessment authority. Hub task creation/completion remains operator-controlled; the session must not impersonate operator actions.