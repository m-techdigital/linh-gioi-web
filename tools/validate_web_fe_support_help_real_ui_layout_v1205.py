#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_support_help_real_ui_layout_v1205] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/support/help/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-supporthelppage-stack',
        'FAQ nhanh', 'không có ticket thật', 'Báo lỗi an toàn', 'Độ tin cậy tải game',
        'lgo-support-help-design-board', 'lgo-support-help-route-board', 'FaqDiscoveryGroupBoard',
        'lgo-service-disclosure-stack lgo-support-help-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'IssueCategoryRouteBoard', 'FaqHelpfulnessCta',
        'NoSearchBackendNoteBoard', 'PlayerSafetySupportCta', 'PerformanceBudgetCta', 'RouteContinuityCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared support/help FAQ route-map layout.', '.lgo-service-compact-proof-page.lgo-supporthelppage-stack',
        '.lgo-support-help-route-grid', '.lgo-support-help-route-board', '.lgo-faq-discovery-board',
        '.lgo-support-help-expanded-evidence', 'grid-template-columns: repeat(6, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.205 support help real UI layout', '.lgo-support-help-expanded-evidence', '.lgo-supporthelppage-stack'
    ])
    require_text("tests/e2e/fe-support-help-real-ui-layout-v1205.spec.ts", [
        'support help real UI layout v1.205', '/support/help', 'secondary support-help proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero FAQ actions',
        '/tmp/support-help-mobile-v1205.png', '/tmp/support-help-desktop-v1205.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/support-help-desktop-v1205.png', '/tmp/support-help-mobile-v1205.png',
        'desktop hero bottom 400.75px', 'mobile hero bottom 530.80px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221', 'Current FE scope: select `/release/readiness`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 support help real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205.md',
        'docs/execution/LGO-WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-REPORT-v1.205.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205.md',
    ]:
        require_text(rel, ['WEB-FE-SUPPORT-HELP-REAL-UI-LAYOUT-v1.205', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_support_help_real_ui_layout_v1205] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
