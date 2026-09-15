#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_accessibility_real_ui_layout_v1210] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/accessibility/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-accessibilitypage-stack',
        'Dễ đọc và dễ thao tác', 'Chưa có audit WCAG chính thức', 'chưa có claim pháp lý', 'chưa có thiết lập cá nhân',
        'lgo-accessibility-design-board', 'lgo-accessibility-route-board', 'readabilitySteps',
        'Đọc tiêu đề trước', 'Theo thứ tự focus', 'Giữ mobile dễ quét',
        'lgo-service-disclosure-stack lgo-accessibility-expanded-evidence', 'Bằng chứng phụ và tuyến liên quan',
        'AccessibilityReadabilityPrincipleBoard', 'RouteReadabilityBoard', 'MobileScannabilityBoard', 'FocusOrderBoard',
        'MobileDensityBudgetBoard', 'PlayerTrustReleaseCta', 'PerformanceBudgetCta', 'AccessibilityReadabilityCta',
        'ContentIaStartCta', 'RouteContinuityCta', 'DownloadTrustCta', 'PlayerSafetySupportCta', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared accessibility page layout for public readability/focus surfaces.', '.lgo-accessibilitypage-stack',
        '.lgo-accessibility-design-board', '.lgo-accessibility-route-board', '.lgo-accessibility-step-grid',
        '.lgo-accessibility-expanded-evidence', 'grid-template-columns: repeat(3, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;', 'font-size: clamp(1.82rem, 7vw, 2.02rem);'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.210 accessibility real UI layout', '.lgo-accessibility-expanded-evidence', '.lgo-accessibilitypage-stack'
    ])
    require_text("tests/e2e/fe-accessibility-real-ui-layout-v1210.spec.ts", [
        'accessibility real UI layout v1.210', '/accessibility', 'secondary accessibility proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero accessibility actions',
        '/tmp/accessibility-mobile-v1210.png', '/tmp/accessibility-desktop-v1210.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.210 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/accessibility-desktop-v1210.png', '/tmp/accessibility-mobile-v1210.png',
        'desktop hero bottom 387.75px', 'mobile hero bottom 486.91px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.221', 'Current FE scope: select `/release/readiness`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.210 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 accessibility real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.210.md',
        'docs/execution/LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-REPORT-v1.210.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.210.md',
    ]:
        require_text(rel, ['WEB-FE-ACCESSIBILITY-REAL-UI-LAYOUT-v1.210', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_accessibility_real_ui_layout_v1210] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
