#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_public_game_info_real_ui_layout_v1180] FAIL: {message}", file=sys.stderr)
    sys.exit(1)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists():
        fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")

def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text:
            fail(f"{rel} missing {needle!r}")

def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text:
            fail(f"{rel} still contains stale text {needle!r}")

def main() -> int:
    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        '"public-game-info-depth-started": "Bài viết giải thích thông tin game public"',
        'title={articleDetailTitle(slug)}',
        'Trang bài viết mở rộng ngữ cảnh người chơi cần biết',
        'không tuyên bố backend vận hành chính thức',
        'lgo-newsdetail-depth',
        'lgo-newsdetail-depth-card',
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        'Detail page mở rộng ngữ cảnh',
        'ranh giới non-claim',
        'không tuyên bố backend production',
        'WEB v1.9 article detail',
        'Detail section',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "public-game-info-depth-started"',
        'WEB v1.8 làm sâu nội dung game trên web public',
        'Thông tin game public nối lore với hành trình người mới',
        'Readiness cộng đồng phải giữ ranh giới web public',
        'Không công bố cơ sở dữ liệu nhiệm vụ, chỉ số nhân vật, tài khoản thật hoặc dữ liệu server vận hành thật.',
        'Không mở tải game, không mở xác thực vận hành chính thức, không có CMS và không tích hợp backend vận hành thật.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'WEB v1.8 focuses on the actual public website product',
        'world story chapters, beginner guide steps',
        'runtime/browser checks remain guardrails only',
        'claim hệ thống production',
        'Từ placeholder sang thông tin game dễ đọc',
        'No production quest/wiki/combat/economy claim.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack',
        'max-width: 18ch;',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth-card',
        '.lgo-newsdetail-related-card',
        '.lgo-newsdetail-next-steps',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-newsdetailpage-stack',
        '.lgo-newsdetail-hero-card',
        '.lgo-newsdetail-depth',
        '.lgo-newsdetail-related',
        '.lgo-newsdetail-next-steps',
    ])

    require_text("tests/e2e/fe-news-public-game-info-real-ui-layout-v1180.spec.ts", [
        '/news/public-game-info-depth-started renders compact Vietnamese game-info article detail flow',
        'Bài viết giải thích thông tin game public',
        'toHaveCount(2)',
        'mobile related not pushed by raw body',
        'desktop next steps reachable',
        'backToNews',
        '/tmp/news-public-game-info-${isMobile ? "mobile" : "desktop"}-v1180.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180 WEB_CLOSED',
        'Select `/news/performance-copy-asset-budget-polish-started`',
        '/tmp/news-public-game-info-desktop-v1180.png',
        '/tmp/news-public-game-info-mobile-v1180.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.192',
        'Current FE scope: select `/news/performance-copy-asset-budget-polish-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180 | WEB-FE | WEB_CLOSED | afbdad3 |',
        'Playwright desktop/mobile 2/2 news public game info detail real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180.md',
        'docs/execution/LGO-WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-REPORT-v1.180.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-PUBLIC-GAME-INFO-REAL-UI-LAYOUT-v1.180', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_public_game_info_real_ui_layout_v1180] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
