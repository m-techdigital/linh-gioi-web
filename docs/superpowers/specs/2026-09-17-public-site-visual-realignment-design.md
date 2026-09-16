# LGO Public Site Visual Realignment — Design

## Goal
Rebuild public Web pages to match their existing page-specific detailed design targets in real browser rendering, starting with the main player entry flow. Historical validator/test PASS is engineering evidence only and must never substitute for visual fidelity.

## Authority
- Source/runtime: current `main` worktree only.
- Visual authority: page-specific files under `apps/web/public/design-reference/*-detailed-design-target-*.png` when present.
- Shared header/footer/nav must stay truthful: no fake login, playable/download state, live server/player counts, trailer, account or backend claims.
- Existing content fixtures stay authoritative for source-backed text/data; design copy may be used only when it is truthful presentation copy.

## Scope order
1. Entry world: `/game`, `/story`, `/classes`, `/journey`, `/start`.
2. Release/service: `/download`, `/download/trust`, `/release`, `/release/readiness`, `/release/tester-pack`, `/status`.
3. Support/community: `/support`, `/support/help`, `/support/safety`, `/community`.
4. Secondary hubs without a page-specific target: `/community/onboarding`, `/roadmap`, `/game/loop`, `/guides`, guide detail, `/news`, news detail, `/events`, `/patch-notes`, `/performance`, `/accessibility`.

## Architecture
Use shared immersive shell/navigation already established by homepage. Add reusable visual owners in `packages/ui` only when at least two entry pages need the same behavior. Each page keeps a thin app-level composition component. Source-derived artwork crops are allowed only as decorative art with provenance; never embed the full UI board or baked buttons/text as an interactive surface.

## Per-page closure
- RED test proving current layout differs from intended structure.
- Real browser desktop + mobile screenshot review against target.
- Source-backed text/route behavior and accessible fallback.
- Targeted regression plus sibling no-regression checks.
- Typecheck/lint/build/current-state validator.
- Commit/push/package only after the page is genuinely visually aligned.

## Current audit finding
Homepage r6 is the only main route that has undergone full design realignment. The 15 other routes with detailed design targets still materially diverge in composition, artwork density, first-fold hierarchy or information architecture. The largest gap is the entry-world family, especially `/game`.
