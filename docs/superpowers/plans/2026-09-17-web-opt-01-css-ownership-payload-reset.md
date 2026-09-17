# WEB-OPT-01 Public CSS Ownership & Payload Reset Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the global historical service-layout payload, keep CSS with the routes that still consume it, prune proven-dead superseded blocks, and reduce median decoded public-route CSS by at least 20% without redesigning pages.

**Architecture:** `globals.css` remains the minimal app-wide foundation; `public-chrome.css` remains the canonical public shell. Legacy service/editorial families import `service-layout.css` explicitly, while accepted modern landing routes use their dedicated `packages/ui/*-landing-layout.css` owners. The first implementation pass trims modern superseded blocks from `service-layout.css`; if measured median CSS stays above 196,418 B, split the remaining active service file by family rather than relaxing the budget.

**Tech Stack:** Next.js App Router, React 19, TypeScript, shared CSS in `packages/ui`, Playwright, Python source validators, pnpm.

**Spec:** `docs/superpowers/specs/2026-09-17-public-web-full-audit-design.md`

## Global Constraints

- Work only in `/Users/minhdc/Projects/LinhGioiOnline-Web` on the registered `main` worktree; normal push is already owner-authorized, never force-push.
- No visual redesign, content rewrite, backend/auth/DB/CMS/deployment work, or Portal/Ops feature work.
- Preserve all 59 current public URLs and their truthful non-claims.
- Baseline median decoded CSS is 245,523 B; accepted AFTER median must be <= 196,418 B.
- Browser evidence must show zero horizontal overflow at 1440px and 390px and no unintended layout regression in modern and legacy representative routes.
- Do not count historical validators as runtime PASS; clean `WEB CURRENT STATE` must still pass.

---### Task 1: RED ownership and payload guards

**Files:**
- Create: `tools/validate_web_opt_public_css_ownership_v1278.py`
- Create: `tests/e2e/web-opt-public-css-payload-v1278.spec.ts`
- Evidence only: `handoff/web-opt-v1.278/evidence/before-css-metrics.json`

**Interfaces:**
- Consumes: current root layout and route CSS imports; v1.277 runtime payload inventory.
- Produces: source ownership validator plus browser budget/overflow regression suite used by the rest of v1.278.

- [ ] Capture fresh BEFORE decoded CSS bytes for all 59 sitemap routes and persist median/P75/max plus per-route values.
- [ ] Write a source validator that rejects `@lgo-web/ui/service-layout.css` in `apps/web/src/app/layout.tsx`, requires it only in the explicit legacy service/editorial route entries, rejects the six proven-dead design-board selectors in `globals.css`, and verifies the v1.278 plan/authority markers.
- [ ] Run the validator before production edits and record RED because root still imports `service-layout.css` and route entries do not own it.
- [ ] Write Playwright coverage that measures decoded CSS response bytes, asserts 59-route horizontal overflow = 0, and checks representative routes `/`, `/status`, `/support`, `/guides`, `/news`, `/game/loop` for a visible h1/public chrome.
- [ ] Keep the final median budget assertion at <=196,418 B; do not weaken it if the first implementation pass misses the target.

### Task 2: Move service CSS ownership to active route families

**Files:**
- Modify: `apps/web/src/app/layout.tsx`
- Modify explicit legacy entry pages under `apps/web/src/app/**/page.tsx`
- Modify: `packages/ui/src/service-layout.css`

**Interfaces:**
- Consumes: Task 1 ownership contract.
- Produces: route-scoped legacy CSS while modern accepted landing routes rely only on their dedicated layout owners.

- [ ] Remove the root `service-layout.css` import.
- [ ] Add the service-layout import only to the legacy service/editorial entry points that actually use service classes: accessibility, performance, roadmap, game/loop, community, community/onboarding, support, support/help, support/safety, guides, guides/beginner, guides/[slug], news, news/[slug], events and patch-notes.
- [ ] Delete the superseded modern overview section beginning at `/* Shared game overview page layout for public world atlas surfaces. */` through the end of `service-layout.css`; these `/game`→`/release` owners are replaced by dedicated landing CSS.
- [ ] Run source validator and targeted browser pages; if any modern route changes unintentionally, restore only the specific still-active rule into its dedicated landing owner rather than restoring global service CSS.
### Task 3: Prune proven-dead global CSS and hit the budget

**Files:**
- Modify: `apps/web/src/app/globals.css`
- Potentially create/modify family CSS in `packages/ui/src/` only if the first AFTER median is still above 196,418 B.

**Interfaces:**
- Consumes: route-scoped service CSS from Task 2 and literal-consumer evidence from the audit.
- Produces: smaller app-wide baseline with no known superseded design-board ownership.

- [ ] Remove the six superseded blocks for `.lgo-status-design-board`, `.lgo-journey-design-board`, `.lgo-start-design-board`, `.lgo-closed-tester-design-board`, `.lgo-release-narrative-design-board`, and `.lgo-release-readiness-design-board`; source search already shows no production consumer outside CSS.
- [ ] Rebuild and remeasure all 59 routes.
- [ ] If median decoded CSS is <=196,418 B, stop structural CSS work and preserve the smallest change set.
- [ ] If median remains above 196,418 B, split the active pre-1889 service rules into route-family bundles (support/community, gameplay, editorial/common) and import only the bundle(s) each entry family consumes; retain shared selector definitions in exactly one owner.
- [ ] Rerun the source validator after any split and fail on duplicate ownership or a restored root service import.

### Task 4: Whole-site verification and delivery

**Files:**
- Update: `docs/execution/LGO-WEB-FULL-PUBLIC-ASSESSMENT-REPORT-v1.277.md` only with v1.278 outcome reference if needed.
- Create: `docs/execution/LGO-WEB-OPT-01-CSS-OWNERSHIP-PAYLOAD-RESET-REPORT-v1.278.md`
- Update: `WEB-ACTIVE-GOAL`, `WEB-MASTER-ROADMAP`, `WEB-NEXT-ACTION`, `WEB-PROJECT-STATE`, `WEB-TASK-LEDGER`.

**Interfaces:**
- Consumes: accepted source from Tasks 1–3.
- Produces: closed v1.278 authority and successor `WEB-OPT-02 v1.279`.

- [ ] Run UI/Web typecheck, Web lint, `git diff --check`, v1.278 validator and clean-archive `validate_web_current_state.py`.
- [ ] Build exact source and run 59-route production browser smoke at desktop/mobile: HTTP success, h1, public chrome, image health and horizontal overflow.
- [ ] Run focused screenshot review for `/`, `/status`, `/support`, `/guides`, `/news`, `/game/loop` against BEFORE evidence; CSS cleanup must not silently redesign them.
- [ ] Capture final decoded CSS distribution and prove median <=196,418 B with before/after delta recorded in the report.
- [ ] Commit/push source normally, verify local/origin/remote equality, package handoff evidence outside Git, update MCP Session Manager, and queue only WEB-OPT-02 v1.279.
