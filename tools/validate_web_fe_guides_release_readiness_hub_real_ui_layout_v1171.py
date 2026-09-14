#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_release_readiness_hub_real_ui_layout_v1171] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "release-readiness-hub-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-releasereadinessguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-release-readiness-guide-hero-card',
        'Sẵn sàng phát hành',
        'Guide tĩnh · chưa có phê duyệt · chưa có quyền kiểm thử',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<ReleaseReadinessHubCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "release-readiness-hub-guide"',
        'title: "Kiểm sẵn sàng trước lời mời test"',
        'Tải game · Trạng thái · Hỗ trợ',
        'Mở readiness hub trước',
        'Kiểm bằng chứng cổng phê duyệt',
        'Đọc Tải game · Trạng thái · Hỗ trợ như một bộ',
        'Hiểu closed test là stage có điều kiện',
        'Chưa có download công khai, thử nghiệm mở hoặc cấp quyền tự động.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Release readiness hub guide"',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Release readiness hub guide composes compact guide-flow base',
        '.lgo-releasereadinessguidepage-stack',
        '.lgo-release-readiness-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-releasereadinessguidepage-stack',
        '.lgo-release-readiness-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-release-readiness-hub-real-ui-layout-v1171.spec.ts", [
        '/guides/release-readiness-hub-guide renders compact release-readiness flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first release-readiness step appears near first fold',
        'Sẵn sàng phát hành',
        '/tmp/guides-release-readiness-hub-${isMobile ? "mobile" : "desktop"}-v1171.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171 WEB_CLOSED',
        'Select `/guides/release-readiness-hub-guide`',
        '/tmp/guides-release-readiness-hub-desktop-v1171.png',
        '/tmp/guides-release-readiness-hub-mobile-v1171.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.180',
        'Current FE scope: select `/news/public-game-info-depth-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 release readiness hub guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171.md',
        'docs/execution/LGO-WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-REPORT-v1.171.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-RELEASE-READINESS-HUB-REAL-UI-LAYOUT-v1.171', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_release_readiness_hub_real_ui_layout_v1171] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
