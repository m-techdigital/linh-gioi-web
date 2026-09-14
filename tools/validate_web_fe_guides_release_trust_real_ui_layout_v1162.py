#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_release_trust_real_ui_layout_v1162] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "release-trust-and-checksum-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-releasetrustpage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-release-trust-hero-card',
        'Tin cậy phát hành',
        'Guide tĩnh · chưa có gói build/checksum · chưa có phê duyệt',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<RouteContinuityCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "release-trust-and-checksum-guide"',
        'title: "Tin cậy phát hành và checksum"',
        'gói build thật',
        'checksum',
        'phê duyệt chủ sở hữu',
        'Xác nhận gói build trước nút tải',
        'Đặt checksum cạnh link tải',
        'Nói rõ giới hạn bản build',
        'Đồng bộ trạng thái và hỗ trợ',
        'Chưa có checksum thật, nguồn gốc file hoặc xác minh gói build.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Release trust and checksum guide"',
        'A player-facing guide that explains why build artifact',
        'This guide turns release trust into readable public copy',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Release trust checksum guide composes compact guide-flow base',
        '.lgo-releasetrustpage-stack',
        '.lgo-release-trust-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-releasetrustpage-stack',
        '.lgo-release-trust-hero-card',
    ])

    require_text("tests/e2e/fe-guides-release-trust-real-ui-layout-v1162.spec.ts", [
        '/guides/release-trust-and-checksum-guide renders artifact/checksum proof flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first proof step appears in first fold',
        'Tin cậy phát hành',
        '/tmp/guides-release-trust-${isMobile ? "mobile" : "desktop"}-v1162.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162 WEB_CLOSED',
        'Select `/guides/release-trust-and-checksum-guide`',
        '/tmp/guides-release-trust-desktop-v1162.png',
        '/tmp/guides-release-trust-mobile-v1162.png',
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
        '| WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 release trust guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162.md',
        'docs/execution/LGO-WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-REPORT-v1.162.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-RELEASE-TRUST-REAL-UI-LAYOUT-v1.162', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_release_trust_real_ui_layout_v1162] PASS')
    return 0

if __name__ == "__main__":
    sys.exit(main())
