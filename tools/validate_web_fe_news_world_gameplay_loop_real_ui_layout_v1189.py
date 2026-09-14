#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_news_world_gameplay_loop_real_ui_layout_v1189] FAIL: {message}", file=sys.stderr)
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
        '"world-gameplay-loop-depth-started": "Bài viết giải thích world loop và boundary gameplay"',
        'title={articleDetailTitle(slug)}', 'lgo-newsdetail-depth', 'lgo-newsdetail-depth-card'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "world-gameplay-loop-depth-started"',
        'title: "World loop và kỳ vọng gameplay rõ hơn"',
        'WEB v1.13 làm rõ hành trình Spirit Gate, Gate Keeper, Training Stone, route đọc tiếp và ranh giới gameplay để người chơi không nhầm nội dung web với combat release.',
        'Bản cập nhật này tập trung vào nội dung game public: vòng lặp người chơi mới, kỳ vọng hiện tại, đường nối từ guide sang world và ranh giới phạm vi trước khi có combat, economy hoặc backend contract thật.',
        'Gameplay loop được mô tả theo cảm giác người chơi, không theo log tooling',
        'Route-level copy nối guide, world và trust pages',
        'Không có sát thương chiến đấu, máu nhân vật, vật phẩm rơi, túi đồ/kinh tế, cơ sở dữ liệu nhiệm vụ hoặc claim máy chủ thế giới live.',
        'Không có CTA tải game giả, không có xác thực vận hành và không có hệ thống gợi ý backend.',
    ])
    fixtures = read("packages/content/src/fixtures.ts")
    if fixtures.count('slug: "world-gameplay-loop-depth-started"') != 3:
        fail('packages/content/src/fixtures.ts should contain one content entry and two detail sections for world-gameplay-loop-depth-started')
    forbid_text("packages/content/src/fixtures.ts", [
        'guided world loop explanation',
        'No fake download CTA, no production auth, no backend recommendation engine.',
        'No combat damage, HP, loot, inventory/economy, quest DB or live world server claim.',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'News detail page composes shared service/detail layout for compact public article reading.',
        '.lgo-newsdetailpage-stack', 'max-width: 18ch;', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth-card', '.lgo-newsdetail-related-card', '.lgo-newsdetail-next-steps'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-newsdetailpage-stack', '.lgo-newsdetail-hero-card', '.lgo-newsdetail-depth', '.lgo-newsdetail-related', '.lgo-newsdetail-next-steps'])
    require_text("tests/e2e/fe-news-world-gameplay-loop-real-ui-layout-v1189.spec.ts", [
        '/news/world-gameplay-loop-depth-started renders compact Vietnamese world gameplay loop article flow',
        'World loop và kỳ vọng gameplay rõ hơn', 'Bài viết giải thích world loop và boundary gameplay', 'toHaveCount(2)',
        'mobile related not pushed by raw body', 'desktop next steps reachable', '/tmp/news-world-gameplay-loop-${isMobile ? "mobile" : "desktop"}-v1189.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189 WEB_CLOSED',
        'Select `/news/closed-tester-information-pack-started`',
        '/tmp/news-world-gameplay-loop-desktop-v1189.png', '/tmp/news-world-gameplay-loop-mobile-v1189.png',
        'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.196',
        'Current FE scope: select `/news/closed-tester-information-pack-started`', 'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189 | WEB-FE | WEB_CLOSED | aa0ebce |',
        'Playwright desktop/mobile 2/2 news world gameplay loop real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189.md',
        'docs/execution/LGO-WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-REPORT-v1.189.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189.md',
    ]:
        require_text(rel, ['WEB-FE-NEWS-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.189', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_news_world_gameplay_loop_real_ui_layout_v1189] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
