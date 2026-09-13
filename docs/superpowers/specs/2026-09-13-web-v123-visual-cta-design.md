# Linh Giới Online Web v1.23 — Visual Asset & CTA Polish Design

## Goal
Turn the v1.22 player-facing narrative into a more premium 2D MMORPG marketing experience without inventing production screenshots, playable availability, or backend functionality.

## Creative source of truth
The website follows the approved game scenario: Linh Thành is the social heart; the opening journey travels through Đông Môn, Linh Lâm, Cổ Di Tích and toward Âm Giới; five Lộ (Võ, Kiếm, Pháp, Cơ, Linh) represent distinct combat and narrative identities; the signature threat is Âm Giới Xâm Lăng.

## Chosen approach
Use a cinematic presentation system built from reusable HTML/CSS visual compositions rather than fake screenshots or invented production art. The system should feel intentional enough for a commercial game website while remaining honest about the current lack of a public build and production asset pack.

## Homepage composition
1. Cinematic hero with brand lockup, stronger atmospheric stage, route breadcrumb, class sigil accents and primary CTA hierarchy.
2. Three product pillars as visual cards.
3. Five-Lộ showcase with stronger silhouette/sigil language and one clear path to `/classes`.
4. World route presented as an illustrated travel rail rather than a plain timeline.
5. Story/event feature section with stronger portal visual and narrative CTA.
6. Session-loop and latest news lower in the page.
7. Availability note remains present but visually subordinate.

## CTA hierarchy
- Primary discovery CTA: `Khám phá Linh Giới` → `/game` or relevant world route.
- Secondary identity CTA: `Chọn Lộ của bạn` → `/classes`.
- Narrative CTA: `Bắt đầu câu chuyện` → `/story`.
- Release/download CTA is never presented as immediately playable unless the accepted release state permits it. Header uses `Trạng thái chơi` rather than a misleading unconditional `Tải game` call to action.

## Visual system
- Dark navy base, spirit cyan, warm artifact gold, shadow purple, restrained jade.
- Layered mist, spirit lines, portal rings, architecture silhouettes and lantern lights.
- Class cards get distinct sigil geometry and accent behavior while sharing the same design system.
- No photo-realistic mockup, no screenshot claim, no external stock art.
- Motion is CSS-only and disabled/reduced under `prefers-reduced-motion`.

## Responsive behavior
- Desktop: split cinematic hero, full nav, 5-class composition, horizontal world route.
- Tablet: stacked hero, 2–3 column class/world compositions.
- Mobile landscape/portrait web: single-column content, thumb-friendly CTAs, horizontal nav scroll where necessary, no overlap or tiny text.

## Accessibility
- Decorative artwork is `aria-hidden`.
- Content hierarchy remains semantic.
- Focus states remain visible.
- Motion respects reduced-motion preference.
- CTA labels describe destinations rather than availability that does not exist.

## Non-goals
- No production game art claim.
- No fake gameplay screenshots.
- No public launcher or download artifact.
- No backend/auth/account implementation.
- No redesign of support/status/release trust architecture.
- No re-derivation of website IA from game source code.

## Verification
- Dedicated v1.23 validator verifies CTA wording, required visual sections, reduced-motion support, and absence of fake availability claims.
- Existing v1.22 validator remains green.
- TypeScript, content tests, lint and build run when environment permits.
- Browser visual review is required for full closure; environment limitations are reported rather than skipped as PASS.
