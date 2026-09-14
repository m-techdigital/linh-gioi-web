#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guides_player_trust_release_real_ui_layout_v1170] FAIL: {message}", file=sys.stderr)
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
        'entry.slug === "player-trust-release-guide"',
        'isCompactGuideFlow',
        'lgo-guideflowpage-stack',
        'lgo-playertrustreleaseguidepage-stack',
        'lgo-guide-flow-hero-card',
        'lgo-player-trust-release-guide-hero-card',
        'Tin cậy phát hành',
        'Guide tĩnh · chưa có public build · chưa có closed-test access',
        '<GuideDetailDepth slug={entry.slug} />',
        '<WorldGameplayLoopCta />',
        '<PlayerTrustReleaseCta />',
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", '<GuideDetailDepth slug={entry.slug} />', '<WorldGameplayLoopCta />')

    require_text("packages/content/src/fixtures.ts", [
        'slug: "player-trust-release-guide"',
        'title: "Tin cậy trước khi chờ bản test"',
        'content-ready → chuẩn bị closed test → kiểm chứng tải game → trạng thái hỗ trợ',
        'Đọc stage phát hành hiện tại',
        'Kiểm chứng trước khi tin CTA tải',
        'Xem trạng thái và ranh giới hỗ trợ',
        'Theo dõi điều kiện closed test',
        'Chưa có bản build công khai, thử nghiệm mở hoặc phát hành production.',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Player trust: từ content-ready tới closed test"',
        'No public build, no open beta, no production launch.',
        'No open registration, no reward/economy promise, no automated entitlement.',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Compact guide-flow detail variant shared by sequential guide pages',
        '.lgo-guideflowpage-stack',
        'Player trust release guide composes compact guide-flow base',
        '.lgo-playertrustreleaseguidepage-stack',
        '.lgo-player-trust-release-guide-hero-card',
        'grid-template-columns: repeat(4, minmax(0, 1fr));',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-playertrustreleaseguidepage-stack',
        '.lgo-player-trust-release-guide-hero-card',
    ])

    require_text("tests/e2e/fe-guides-player-trust-release-real-ui-layout-v1170.spec.ts", [
        '/guides/player-trust-release-guide renders compact release-trust flow before generic CTAs',
        'body horizontal overflow',
        'visible element overflow',
        'desktop h1 scale',
        'mobile first player-trust step appears near first fold',
        'Tin cậy phát hành',
        '/tmp/guides-player-trust-release-${isMobile ? "mobile" : "desktop"}-v1170.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170 WEB_CLOSED',
        'Select `/guides/player-trust-release-guide`',
        '/tmp/guides-player-trust-release-desktop-v1170.png',
        '/tmp/guides-player-trust-release-mobile-v1170.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.205',
        'Current FE scope: select `/support/help`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 player trust release guide layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170.md',
        'docs/execution/LGO-WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-REPORT-v1.170.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170.md',
    ]:
        require_text(rel, ['WEB-FE-GUIDES-PLAYER-TRUST-RELEASE-REAL-UI-LAYOUT-v1.170', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_guides_player_trust_release_real_ui_layout_v1170] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
