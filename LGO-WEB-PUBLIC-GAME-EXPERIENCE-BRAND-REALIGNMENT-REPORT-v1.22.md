# LGO WEB — PUBLIC GAME EXPERIENCE & BRAND REALIGNMENT v1.22 — REPORT

## Decision
`LGO_WEB_PUBLIC_GAME_EXPERIENCE_BRAND_REALIGNMENT_SOURCE_READY_ENV_LIMITED_v1.22`

## Input
- Baseline: `LGO-WEB-public-faq-search-helpfulness-polish-v1.21-full-source(5).zip`
- SHA256: `ac8b34120b9f85108db93a2cc7c8a3279d7d17320694b5cfae7d1cdd81c36b6c`

## Product direction applied
The public website is now designed from the approved 2D scenario and brand fantasy rather than from game source status. Core narrative anchors:
- 2D Side-Scrolling Social Action MMORPG.
- Linh Thành is the social heart.
- Social MMORPG / Action / Progression are the three public pillars.
- Five Lộ: Võ, Kiếm, Pháp, Cơ, Linh.
- World route: Linh Thành → Đông Môn → Linh Lâm → Cổ Di Tích → Âm Giới.
- Opening chapters: Vết Nứt Đông Môn → Những Cánh Cổng Không Thuộc Về Thế Giới Này → Âm Giới Xâm Lăng.
- Sample session: social → adventure → combat → reward → return to Linh Thành.

## Player-facing changes
- Homepage rebuilt around cinematic fantasy and player choice instead of WEB-version/status markers.
- New `/classes` page for the five Lộ.
- New `/story` page for the opening narrative.
- `/game` reframed around Linh Thành, zone network and world fantasy.
- `/journey` reframed around a sample 20-minute play session.
- `/start` reframed around Đông Môn onboarding.
- `/guides` reframed as player codex rather than program-status documentation.
- Primary navigation simplified to World / Classes / Story / Journey / Guides / News / Community / Download.
- Footer retains Status / Roadmap / Support as trust utilities.
- CSS-only cinematic scene, spirit gate, skyline, portal crack, class sigils and invasion portal added without claiming production art.

## Verification
PASS:
- `vitest run packages/content/src/content.test.ts`: 11/11 tests.
- `tsc -p packages/content/tsconfig.json --noEmit`.
- `tsc -p packages/ui/tsconfig.json --noEmit`.
- `tsc -p apps/web/tsconfig.json --noEmit`.
- `node tools/lgo_web_lint.mjs apps/web packages/content packages/ui`.
- `python3 tools/validate_web_public_game_experience_v122.py`.
- `python3 tools/validate_web_current_state.py`.

Environment-limited:
- `next build apps/web` entered Next.js 16.3.4 then failed with `Error: EIO: i/o error, fsync`.
- Independent fsync probe failed with `OSError(5, 'Input/output error')` in both `/mnt/data/...` and `/tmp`.
- Browser/visual runtime was not claimed because Next cannot reliably write its build/runtime files while the filesystem fsync gate is broken.

## Non-claims
- No public build/download artifact.
- No production auth/DB/CMS/backend integration.
- No production deployment.
- No claim that all designed regions, classes, social systems or the full Âm Giới Xâm Lăng event are already publicly playable.
- CSS artwork is presentation scaffolding, not final production art.
