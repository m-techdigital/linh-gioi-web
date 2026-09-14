# WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118

Status: WEB_CLOSED.

## SELECT

Current `WEB-NEXT-ACTION` is FE accessibility/interaction audit v1.118. The user clarified that FE work must return to design-target-first page design instead of only shell guardrails. Homepage is the most important public surface, so this slice creates a page-specific detailed design target before further homepage UI changes.

## SPEC_LOCK

Design Target First applies before implementation. The existing v1.95 Public Core atlas covers homepage broadly, but it is not a dedicated page-level target. v1.118 adds a `Public Homepage` target and registers it before treating homepage UI as comparable.

## DESIGN_TARGET_ATTACH_OR_CREATE

Created `apps/web/public/design-reference/homepage-detailed-design-target-v1118.png` and docs mirror `docs/design/reference/WEB-FE-HOMEPAGE-DETAILED-DESIGN-TARGET-v1.118.png` using built-in image_gen.

Final prompt summary:

```text
Use case: ui-mockup. Asset type: high-fidelity website design target for Linh Giới Online homepage. Primary request: professional 16:9 desktop homepage mockup for a Vietnamese 2D side-scrolling social action MMORPG called “Linh Giới Online”, concrete UI destination rather than loose moodboard. Sections: sticky glass navigation, cinematic hero with large title and three CTAs, right-side game-world visual panel, identity signal chips, three pillar cards, discovery/media showcase, latest news cards, availability/status note, design target footer band. Palette: dark navy, spirit cyan, warm gold, jade, shadow purple. Text includes “Linh Giới Online”, “Sống một đời khác trong Linh Giới”, “Khám phá Linh Giới”, “Chọn Lộ của bạn”, “Bắt đầu câu chuyện”, “Tin mới từ Linh Giới”, “Design Target First”. Constraints: no browser chrome, no watermark, no fake company logos, no backend/admin panels.
```

The generated raster is 1672x941 and is now the active target for `/`.

## IMPLEMENT

Updated `docs/design/DESIGN-TARGET-REGISTRY.md` with a `Public Homepage` row. Updated `PublicDesignTargetReference` so `/` exposes the homepage-specific target, while other public core/service routes keep their existing atlas targets.

Base UI/UX Layout remained centralized: only the design-target reference routing changed; no page-local duplicate layout owner was added.

## SOURCE_VERIFY

Dedicated source validator: `tools/validate_web_fe_homepage_detailed_design_target_v1118.py`.

## RUNTIME_VERIFY

- RED browser/e2e: `pnpm exec playwright test tests/e2e/fe-homepage-detailed-design-target-v1118.spec.ts --project=chromium-desktop --project=chromium-mobile` failed before app attachment because `/` still exposed Public Core instead of Public Homepage.
- Browser/e2e after attachment: same command passed 4/4.

## VISUAL_REVIEW

The homepage now links to a detailed page-level design target with hero, CTA, signal chips, discovery/media, news and footer/status design intent. Future homepage UI work should compare against this target first.

## HANDOFF

Next homepage UI changes should implement toward `Public Homepage`, not the broad Public Core atlas alone. If the target becomes misleading, replace it and delete/supersede this v1.118 target in the same task.

Non-claims retained: No production auth. No DB persistence. No real Portal integration. No real Ops/Admin mutation. NO_ACCEPTED_BACKEND_CONTRACT.
