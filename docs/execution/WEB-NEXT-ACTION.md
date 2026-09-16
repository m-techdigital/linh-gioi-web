# WEB-NEXT-ACTION

Status: WEB_TASK_CONTINUE

Owner delivery policy: commit and push are now explicitly authorized. Close each page with reviewed source/test/docs, verified origin/main HEAD, ZIP/SHA256 and browser evidence, then continue without asking for confirmation. No force-push or production deployment.

Next task:
WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.262

Objective:
Continue the sequential Real Browser UI/UX Layout pass for the next source news article after v1.261 `/news/community-roadmap-onboarding-started` closure. Keep the work page-scoped, Base First and browser-evidence driven.

Current FE scope: select `/news/content-ia-hub-polish-started` as the next single active page after v1.261 `/news/community-roadmap-onboarding-started` closure. Complete `/news/content-ia-hub-polish-started` fully before any other page. Use its registered public route target as the comparison guardrail and prioritize real news UI/UX Layout: the original article title/summary/body and existing detail sections, complete readable article structure and onward links, publication semantics and clear distinction from live game operations, native reading routes, spacing, typography, responsive density, keyboard/focus and actual interaction. No invented articles, publication dates, live-news feed, personal recommendations, subscriber counts, notifications, release availability or backend.

Mandatory execution rules:

1. Real Browser UI/UX Layout First is Priority #1.
   If the existing design target is usable, stop design work and fix the rendered page. Only make a minimal just-in-time target correction when missing, stale, English-heavy, scenario-wrong or inconsistent with the accepted shared header/footer/menu/shell/navigation. Return immediately to browser layout.

2. Base UI/UX Layout First is mandatory.
   Inspect sibling release/download/download-trust/status/support/performance/accessibility pages, packages/ui and packages/design-tokens. Reusable hero, proof board, card grid, CTA, form, table, status badge, route map, typography rhythm, responsive density and focus states belong in shared owners first.

3. CSS must be managed by owner/role.
   Theme/tokens: packages/design-tokens. Reusable component/layout style: packages/ui. Apps compose base and keep only truly route-specific differences. Do not inflate apps/web/src/app/globals.css with duplicate page blocks.

4. Do not move past `/news/content-ia-hub-polish-started` until closure evidence exists:
   - render in real browser/e2e;
   - desktop/mobile metrics and screenshot/visual review against the target and accepted shell;
   - active source validator and necessary typecheck/build;
   - updated state, report, ledger and handoff;
   - commit, normal push to origin/main, remote HEAD verification and verified ZIP/SHA256.

5. Forbidden substitutes: text-only/copy-only, translation-only, design-only, validator/doc-only, content edits without browser evidence, multiple pages at once. Never relax layout tests just to obtain PASS.

6. If execution drifts, return to `/news/content-ia-hub-polish-started`, inspect rendered layout, check Base First owners, modify the shared base where reusable, and continue until `/news/content-ia-hub-polish-started` is closed.

Non-claims: FE-only until accepted game backend contracts exist. No independent backend. No production auth. No DB persistence. No CMS. No production deployment. No payment/shop/economy.

Validator compatibility and anti-drift guardrails:
- Resolve package/runtime environment or rerun WEB-01 runtime gates when their foundation evidence is invalidated; reuse unchanged closed evidence.
- Historical closed marker: WEB-PUBLIC-ACCESSIBILITY-READABILITY-POLISH-v1.15.
- Vietnamese public labels and design evidence, except external technical identifiers.
- Design targets must stay synchronized with accepted shared header, footer, menu, shell and navigation layout.
- Deprecated phrase marker: Design Target First. Active interpretation is Real Browser UI/UX Layout First, with only just-in-time comparison correction.
- complete one page at a time; DESIGN_TARGET_ATTACH_OR_CREATE just-in-time only when comparison is blocked; LOCAL_HANDOFF after closure; COMMIT_PUSH is a historical marker only. Do not move to another page before CLOSED.
- Base First Stop Gate: inspect shared owners and reuse/extend shared layout before page-local component/CSS work.

Runtime resource policy: keep dev3221 and reuse production3236 after fresh ownership/process verification. Do not open another port per version. Release finished handoff write claims after verified delivery; retain artifacts.
