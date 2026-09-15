#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_support_safety_real_ui_layout_v1206] FAIL: {message}", file=sys.stderr)
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
            fail(f"{rel} contains forbidden text {needle!r}")

def main() -> int:
    require_text("apps/web/src/app/support/safety/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-supportsafetypage-stack',
        'Báo lỗi an toàn', 'không gửi dữ liệu nhạy cảm', 'Che mật khẩu', 'Che token',
        'lgo-safety-support-design-board', 'lgo-support-safety-checklist', 'PlayerSafetyPrinciplesBoard',
        'SupportIssuePathBoard', 'lgo-service-disclosure-stack lgo-support-safety-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'IssueCategoryRouteBoard', 'SafeFeedbackTemplateBoard',
        'DeviceReportTemplateBoard', 'NoSearchBackendNoteBoard', 'PlayerSafetySupportCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared support/safety safe-reporting layout.', '.lgo-service-compact-proof-page.lgo-supportsafetypage-stack',
        '.lgo-support-safety-checklist', '.lgo-support-safety-expanded-evidence', '.lgo-player-safety-board',
        '.lgo-support-issue-path-list', 'grid-template-columns: repeat(5, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.206 support safety real UI layout', '.lgo-support-safety-expanded-evidence', '.lgo-supportsafetypage-stack'
    ])
    require_text("tests/e2e/fe-support-safety-real-ui-layout-v1206.spec.ts", [
        'support safety real UI layout v1.206', '/support/safety', 'secondary support-safety proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero safety actions',
        '/tmp/support-safety-mobile-v1206.png', '/tmp/support-safety-desktop-v1206.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.206 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/support-safety-desktop-v1206.png', '/tmp/support-safety-mobile-v1206.png',
        'desktop hero bottom 368.95px', 'mobile hero bottom 489.16px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT', 'Current FE scope: select',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.206 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 support safety real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.206.md',
        'docs/execution/LGO-WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-REPORT-v1.206.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.206.md',
    ]:
        require_text(rel, ['WEB-FE-SUPPORT-SAFETY-REAL-UI-LAYOUT-v1.206', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_support_safety_real_ui_layout_v1206] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
