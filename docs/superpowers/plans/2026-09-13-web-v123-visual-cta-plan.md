# WEB v1.23 Visual Asset & CTA Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade v1.22 into a premium cinematic 2D MMORPG public website while keeping release/download claims honest.

**Architecture:** Keep the current Next.js/public-content architecture. Extend the existing `PublicGameExperienceSections` presentation layer and v1.22 CSS, add a dedicated v1.23 source validator, and update navigation/home CTA hierarchy without changing backend boundaries.

**Tech Stack:** Next.js, React, TypeScript, shared `@lgo-web/content`, shared `@lgo-web/ui`, CSS-only visual compositions, Python source validators.

**Spec:** `docs/superpowers/specs/2026-09-13-web-v123-visual-cta-design.md`

## Global Constraints
- Do not claim a public build exists.
- Do not create fake screenshots or fake download availability.
- Keep game scenario/narrative as creative source-of-truth.
- Keep support/status/release trust architecture intact.
- CSS motion must respect `prefers-reduced-motion`.

---

### Task 1: v1.23 validation gate
**Files:**
- Create: `tools/validate_web_public_game_visual_cta_v123.py`
- Modify: `tools/validate_web_current_state.py`
- Modify: `package.json`

- [ ] Add a failing validator that requires the v1.23 CTA hierarchy, cinematic class/world visual hooks, reduced-motion CSS and governance artifacts.
- [ ] Run it against v1.22 and confirm failure.
- [ ] Wire the validator into the master current-state validator only after implementation is green.

### Task 2: cinematic homepage and shared visual components
**Files:**
- Modify: `apps/web/src/components/PublicGameExperienceSections.tsx`
- Modify: `apps/web/src/app/page.tsx`
- Modify: `apps/web/src/app/globals.css`

- [ ] Strengthen the hero stage with additional world-layer composition and a route breadcrumb.
- [ ] Upgrade class cards into distinct visual sigil panels without fake character art.
- [ ] Upgrade the world route into a richer illustrated route rail.
- [ ] Add reduced-motion behavior.
- [ ] Run the dedicated validator until green.

### Task 3: CTA and navigation hierarchy
**Files:**
- Modify: `apps/web/src/components/PublicNavigation.tsx`
- Modify: `apps/web/src/components/PublicSiteShell.tsx`
- Modify: `apps/web/src/app/page.tsx`
- Modify: `apps/web/src/app/download/page.tsx`

- [ ] Replace unconditional header `Tải game` CTA with honest `Trạng thái chơi` CTA.
- [ ] Ensure homepage discovery CTA prioritizes world/class/story.
- [ ] Preserve explicit download/status boundaries on the download surface.

### Task 4: v1.23 governance and verification
**Files:**
- Modify: `docs/execution/WEB-PROJECT-STATE.md`
- Modify: `docs/execution/WEB-NEXT-ACTION.md`
- Modify: `docs/execution/WEB-TASK-LEDGER.md`
- Create: `LGO-WEB-PUBLIC-GAME-VISUAL-ASSET-CTA-POLISH-REPORT-v1.23.md`
- Create: `HANDOFF-LGO-WEB-PUBLIC-GAME-VISUAL-ASSET-CTA-POLISH-v1.23.md`
- Create: `LGO-WEB-PUBLIC-GAME-VISUAL-ASSET-CTA-POLISH-v1.23-CHANGED-FILES.txt`
- Create: `LGO-WEB-PUBLIC-GAME-VISUAL-ASSET-CTA-POLISH-v1.23-DELETIONS.txt`

- [ ] Run v1.22 + v1.23 validators.
- [ ] Run content tests, TypeScript and lint.
- [ ] Run production build and browser checks when environment permits; classify environment failures explicitly.
- [ ] Package clean full-source and delta ZIPs with SHA256.
