#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_world_gameplay_loop_real_ui_layout_v1165] FAIL: {message}", file=sys.stderr)
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

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/[slug]/page.tsx", [
        'entry.slug === "world-gameplay-loop-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-worldlooppage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-world-loop-guide-hero-card',
        'Vòng lặp thế giới',
        'Guide tĩnh · chưa có combat live · chưa có tiến trình tài khoản',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "world-gameplay-loop-guide"',
        'title: "Vòng lặp thế giới nhập môn"',
        'Cổng Linh',
        'Người Gác Cổng',
        'Đá Luyện Tập',
        'Vào Cổng Linh',
        'Gặp Người Gác Cổng',
        'Tương tác Đá Luyện Tập',
        'Kiểm trạng thái tải game',
        'Chưa có artifact công khai, quyền tải, checksum thật, backend ticket hoặc xác thực vận hành.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Vòng lặp thế giới: từ Spirit Gate tới Training Stone"',
        'Vào Spirit Gate bằng kỳ vọng đúng',
        'Gặp Gate Keeper như onboarding guide',
        'Training Stone là vòng luyện tập an toàn',
        'Rời loop qua Status và Support',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'World gameplay loop guide composes compact guide-flow base',
        '.lgo-worldlooppage-stack',
        '.lgo-world-loop-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-worldlooppage-stack',
        '.lgo-world-loop-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-world-gameplay-loop-real-ui-layout-v1165.spec.ts", [
        '/guides/world-gameplay-loop-guide renders compact Cổng Linh loop before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first world step appears near first fold',
        'Vòng lặp thế giới',
        '/tmp/guides-world-gameplay-loop-${isMobile ? "mobile" : "desktop"}-v1165.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165 WEB_CLOSED',
        'Select `/guides/world-gameplay-loop-guide`',
        '/tmp/guides-world-gameplay-loop-desktop-v1165.png',
        '/tmp/guides-world-gameplay-loop-mobile-v1165.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.211',
        'Current FE scope: select `/roadmap`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 world gameplay loop guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165.md',
        'docs/execution/LGO-WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-REPORT-v1.165.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-WORLD-GAMEPLAY-LOOP-REAL-UI-LAYOUT-v1.165', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_world_gameplay_loop_real_ui_layout_v1165] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
