# WEB-FE-START-VISUAL-REALIGNMENT-v1.270

Status: WEB_CLOSED when this governance commit is verified on `origin/main` and the final archive/replay gate passes.

## Why `/start` was reopened

The full-site visual audit showed that historical `/start` PASS/CLOSED evidence did not match `start-detailed-design-target-v1124.png`. The old route still exposed a generic hero, a technical SVG design board, three blockout screenshots, the full five-Lộ grid and the world-route proof flow. The page was much longer and more engineering-oriented than the target onboarding composition.

## Real UI replacement

`/start` now opts into the shared immersive public shell and composes `PublicStartLanding`. The live page provides:
- a cinematic Đông Môn hero with truthful reading/status actions;
- a five-step onboarding rail: movement, Người Giữ Cổng, Bia Luyện, Slime Bóng Tối and Mở Linh Thành;
- a live HTML first-step control guide for WASD, Space, Shift and Lộ skill;
- four illustrated onboarding milestone cards;
- responsive mobile composition without document-level horizontal overflow.

The old class grid, world route, embedded design board and technical onboarding blockout gallery are no longer part of the public first flow.
## Visual RED → GREEN and artwork provenance

The focused v1.270 suite first ran against historical production and produced 13 expected failures with one mobile density no-op pass. Missing contracts were exactly the new immersive owner, five onboarding steps, movement guide, four visual milestones, removal of board/blockout UI and truthful actions. After implementation the same suite reached 14/14 PASS.

The target-derived art lives in `apps/web/public/game-art/start-target/`. `provenance.json` locks the target SHA256 plus crop/resize/output SHA256 for the hero, Người Giữ Cổng, Bia Luyện, Slime Bóng Tối and Mở Linh Thành. The full target board is never embedded as runtime UI; labels, controls and actions remain live HTML. Historical technical onboarding screenshots remain evidence only.

Visual review used fresh stable BEFORE, dev MID and final production AFTER desktop/mobile captures. The public-shell loading state was separately measured: it is visible initially and the full page is present by 250ms, so final visual evidence waits for `.lgo-start-landing` rather than treating the transient loader as the page layout.

## Fresh verification

- Focused `/start`: 14/14 PASS, desktop + mobile.
- Selected dev regression: 100/100 PASS across `/start`, `/journey`, `/classes`, `/story`, `/game`, `/game/loop`, homepage density and public navigation.
- Fresh production selected regression on port 3236: 100/100 PASS across the same set.
- Production build: 63 static pages; `/start` prerendered successfully.
- `validate_web_fe_start_visual_realignment_v1270.py`: PASS, including target/source and five crop hashes.
- v1.25 class/world/story depth compatibility validator: PASS.
- UI/Web typecheck and lint: PASS; `git diff --check`: PASS before source delivery.
Production metrics: desktop 1280×720 has no horizontal overflow, 430px hero, 1220px guide/milestone width, five steps, four controls and four milestones; mobile Pixel 7 has no horizontal overflow, 600px hero, 388px guide/milestone width and 1940px page height. All five runtime images completed with nonzero natural dimensions.

## Source delivery

Implementation commit `bc60189e5ec61fbb43bb8e0c3aca35f83684bbfc` was pushed normally to `origin/main` and remote HEAD was verified equal before this governance closure record was prepared. A clean `git archive` of that source commit passed `WEB CURRENT STATE VALIDATION PASS` before push.

## Non-claims and next

This remains public informational FE. The keyboard guide is explanatory HTML, not browser-controlled gameplay. No account creation, saved tutorial state, playable launch, production auth, DB persistence, CMS, download entitlement or independent backend is claimed. `NO_ACCEPTED_BACKEND_CONTRACT` remains.

Next single page after final delivery verification: `/download` — WEB-FE-DOWNLOAD-VISUAL-REALIGNMENT-v1.271. Do not resume the historical `/news` queue.
