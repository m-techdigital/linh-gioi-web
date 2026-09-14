#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_events_real_ui_layout_v1174] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/events/page.tsx", [
        'metadata = { title: "Sự kiện Linh Giới" }',
        'lgo-eventspage-stack',
        'lgo-events-hero-card',
        'Lịch sự kiện tĩnh',
        'Sự kiện Linh Giới',
        'lgo-events-board',
        'lgo-events-grid',
        'lgo-events-card',
        'lgo-action-band',
        'Trạng thái chơi',
        'Ranh giới:',
    ])
    forbid_text("apps/web/src/app/events/page.tsx", [
        'PageHeader',
        'Local content',
        'Fixture entries',
        'PROVISIONAL_WEB_FIXTURE · No CMS · No backend',
        'Spirit festival event placeholder',
        'No CMS',
        'No backend',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "spirit-festival-event-placeholder"',
        'title: "Lễ hội Linh Khí"',
        'Thông báo định hướng cộng đồng',
        'chưa có lịch live',
        'không phải lịch vận hành live hoặc hợp đồng backend được chấp nhận',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Spirit festival event placeholder"',
        'Event taxonomy exists',
        'production CMS',
        'backend scheduler',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Events page composes shared service proof/card layout for static community event announcements.',
        '.lgo-eventspage-stack',
        '.lgo-events-hero-card',
        '.lgo-events-board',
        '.lgo-events-card',
        '.lgo-service-compact-proof-page .lgo-events-board .lgo-events-grid',
        '-webkit-line-clamp: 2;',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-eventspage-stack',
        '.lgo-events-hero-card',
        '.lgo-events-board',
        '.lgo-events-card',
    ])

    require_text("tests/e2e/fe-events-real-ui-layout-v1174.spec.ts", [
        '/events renders compact event-state layout without fake live calendar',
        'Trạng thái chơi',
        'mobile hero compact',
        'desktop hero compact',
        'metrics.columns',
        '/tmp/events-${isMobile ? "mobile" : "desktop"}-v1174.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174 WEB_CLOSED',
        'Select `/events`',
        '/tmp/events-desktop-v1174.png',
        '/tmp/events-mobile-v1174.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.185',
        'Current FE scope: select `/news/player-trust-release-narrative-started`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 events real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174.md',
        'docs/execution/LGO-WEB-FE-EVENTS-REAL-UI-LAYOUT-REPORT-v1.174.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174.md',
    ]:
        require_text(rel, ['WEB-FE-EVENTS-REAL-UI-LAYOUT-v1.174', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_events_real_ui_layout_v1174] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
