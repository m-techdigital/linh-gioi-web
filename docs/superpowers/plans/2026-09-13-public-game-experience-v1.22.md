# Public Game Experience v1.22 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe the Linh Giới Online public website around its 2D social-action MMORPG fantasy, world, class paths and story while preserving honest release/support boundaries.

**Architecture:** Add typed player-facing marketing/narrative data to the existing content package, render it through focused public experience components, and simplify primary public navigation. Keep existing release/status/support infrastructure as secondary trust surfaces.

**Tech Stack:** Next.js, React 19, TypeScript, local typed content fixtures, existing `@lgo-web/ui`, CSS design tokens, Vitest, Python validators.

**Spec:** `docs/superpowers/specs/2026-09-13-public-game-experience-v1.22-design.md`

## Global Constraints
- 2D Side-Scrolling Social Action MMORPG; HD 2D anime/illustrated, not pixel-art.
- Linh Thành remains the social heart; Âm Giới Xâm Lăng is the signature long-term event fantasy.
- Five paths: Võ, Kiếm, Pháp, Cơ, Linh.
- Keep public availability claims conservative; no fake public build/download.
- No backend/auth/DB/CMS/deployment implementation.

### Task 1: Typed game-experience content
**Files:** modify `packages/content/src/types.ts`, `fixtures.ts`, `index.ts`, `content.test.ts`.
- [ ] Write failing tests for five paths, three narrative chapters, three product pillars, world route and 20-minute session loop.
- [ ] Run targeted content test and verify RED.
- [ ] Implement the minimal typed fixtures and exports.
- [ ] Run targeted test and verify GREEN.

### Task 2: Player-facing experience components
**Files:** create `apps/web/src/components/PublicGameExperienceSections.tsx`; modify `globals.css`.
- [ ] Add validator expectation for required component sections and CSS markers; verify RED.
- [ ] Build cinematic scene, pillars, paths, world route, story chapters, session loop and invasion feature components.
- [ ] Add responsive visual styling using existing tokens.
- [ ] Verify validator GREEN.

### Task 3: Primary public routes
**Files:** modify `page.tsx`, `game/page.tsx`, `journey/page.tsx`, `start/page.tsx`, `guides/page.tsx`; create `classes/page.tsx`, `story/page.tsx`.
- [ ] Add route/content validator assertions and verify RED.
- [ ] Replace status-heavy home composition with the approved player narrative.
- [ ] Add dedicated Classes and Story routes and deepen World/Journey/Start/Guides.
- [ ] Verify route/content validator GREEN.

### Task 4: Navigation, metadata and sitemap
**Files:** modify `PublicNavigation.tsx`, `layout.tsx`, `sitemap.ts`.
- [ ] Add assertions for player-first primary nav and new routes; verify RED.
- [ ] Implement brand navigation, metadata and sitemap updates.
- [ ] Verify GREEN.

### Task 5: Governance and compatibility
**Files:** create `tools/validate_web_public_game_experience_v122.py`; modify `validate_web_current_state.py`, `package.json`, project state/next action/ledger/non-claims; create report/handoff.
- [ ] Add validator tests first and verify RED where practical.
- [ ] Wire validator into current-state checks.
- [ ] Update governance without overwriting historical v1.21 evidence.
- [ ] Run all source validators.

### Task 6: Runtime and visual verification
- [ ] Run content tests, lint, typecheck and production build with the pinned runtime where available.
- [ ] Run browser smoke for `/`, `/game`, `/classes`, `/story`, `/journey`, `/download` when browser runtime is available.
- [ ] Inspect responsive screenshots if capture tooling is available.
- [ ] Package full source + delta + SHA256 + handoff only after package hygiene checks.
