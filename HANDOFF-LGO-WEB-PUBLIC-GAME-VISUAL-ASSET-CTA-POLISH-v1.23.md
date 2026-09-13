# HANDOFF — WEB-PUBLIC-GAME-VISUAL-ASSET-AND-CTA-POLISH-v1.23

Task: WEB-PUBLIC-GAME-VISUAL-ASSET-AND-CTA-POLISH-v1.23
Status: SOURCE_READY_ENV_LIMITED
Decision: LGO_WEB_PUBLIC_GAME_VISUAL_ASSET_CTA_POLISH_SOURCE_READY_ENV_LIMITED_v1.23

## Baseline

- `LGO-WEB-public-game-experience-brand-realignment-v1.22-full-source.zip`
- v1.22 remains the narrative/IA baseline.

## Implemented

- Stronger cinematic homepage hero while keeping the scenario-first copy.
- Spirit route breadcrumb: Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.
- CSS-only atmospheric world scene with mountains, spirit trails and portal depth.
- Three pillar visuals.
- Five Lộ class-specific emblem language for Võ / Kiếm / Pháp / Cơ / Linh.
- New world panorama band to sell the journey without fake gameplay screenshots.
- Stronger chapter and Âm Giới Xâm Lăng event visuals.
- CTA hierarchy prioritizes `Khám phá Linh Giới`, `Chọn Lộ của bạn`, `Bắt đầu câu chuyện`.
- Header action changed from unconditional `Tải game` to `Trạng thái chơi`.
- Download page reordered into a player-facing access/status page before detailed release governance.
- Added `prefers-reduced-motion` handling.
- Added dedicated v1.23 validator and wired it into WEB CURRENT STATE.

## Verification evidence

- Node: 24.20.0 — PASS.
- pnpm: 10.15.0 — PASS.
- `pnpm lint` — PASS, 11/11 packages.
- `pnpm --filter @lgo-web/web typecheck` — PASS.
- `pnpm --filter @lgo-web/content test` — PASS, 11/11 tests.
- `python3 tools/validate_web_public_game_experience_v122.py` — PASS.
- `python3 tools/validate_web_public_game_visual_cta_v123.py` — PASS.
- `python3 tools/validate_web_current_state.py` — PASS.
- `pnpm --filter @lgo-web/web build` — UNVERIFIED_ENV: Next.js starts production compilation then sandbox filesystem returns `EIO: i/o error, fsync`.
- Dev server smoke — UNVERIFIED_ENV: Next.js reports Ready, then the same `fsync` EIO terminates it before route/browser review.
- Browser visual review — UNVERIFIED_ENV.

## Environment incident

A previous large runtime-kit extraction triggered filesystem EIO and temporarily turned `apps/web/src/app/download/page.tsx` into NUL bytes. The file was restored from the intended v1.23 source, runtime symlinks/cache were removed, and a final source scan reported no NUL-corrupted source files. The runtime kit archive itself remained checksum-valid; a minimal fresh extraction produced working Node 24.20.0 and pnpm 10.15.0.

## Explicit non-claims

- No production game art claim.
- No fake gameplay screenshots.
- No public launcher/build claim.
- No production auth/DB/backend work.
- No production deployment claim.
- No browser/visual PASS claim while fsync EIO remains.

## Next allowed step

`WEB-PUBLIC-APPROVED-ART-INGEST-AND-VISUAL-REVIEW-v1.24` after approved web-safe art/screenshots exist or after browser runtime becomes available for final visual review.
