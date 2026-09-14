#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_events_real_ui_layout_v1198] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} still contains forbidden text {needle!r}")

def main() -> int:
    require_text("apps/web/src/app/events/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-eventspage-stack',
        'lgo-detail-hero-card lgo-events-hero-card', 'Lịch sự kiện tĩnh', 'Sự kiện Linh Giới',
        'lgo-service-proof-card-grid lgo-events-board', 'lgo-events-grid', 'lgo-service-proof-card lgo-events-card',
        'Chưa có lịch live, đăng ký tham gia hoặc phần thưởng sự kiện.', 'lgo-action-band'
    ])
    require_text("packages/content/src/fixtures.ts", [
        'slug: "spirit-festival-event-placeholder"', 'category: "events"', 'title: "Lễ hội Linh Khí"',
        'Thông báo định hướng cộng đồng về một lễ hội Linh Khí tương lai; chưa có lịch live, đăng ký tham gia, phần thưởng hoặc bộ lập lịch backend.',
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared public service/proof layout foundation.', '.lgo-service-compact-proof-page', '.lgo-detail-hero-card',
        '.lgo-service-proof-card-grid', '.lgo-service-proof-card', '.lgo-action-band'
    ])
    forbid_text("apps/web/src/app/globals.css", ['.lgo-eventspage-stack', '.lgo-events-hero-card', '.lgo-events-board', '.lgo-events-card'])
    require_text("tests/e2e/fe-events-real-ui-layout-v1198.spec.ts", [
        '/events renders compact Vietnamese static events page with shared service layout', 'Sự kiện Linh Giới',
        'toHaveCount(1)', 'desktop action band reachable', 'mobile action band reachable',
        '/tmp/events-${isMobile ? "mobile" : "desktop"}-v1198.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198 WEB_CLOSED', 'Select `/game/loop`',
        '/tmp/events-desktop-v1198.png', '/tmp/events-mobile-v1198.png', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.216', 'Current FE scope: select `/journey`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198 | WEB-FE | WEB_CLOSED | 8cf7798 |',
        'Playwright desktop/mobile 2/2 events real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198.md',
        'docs/execution/LGO-WEB-FE-EVENTS-REAL-UI-LAYOUT-REPORT-v1.198.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198.md',
    ]:
        require_text(rel, ['WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.198', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_events_real_ui_layout_v1198] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
