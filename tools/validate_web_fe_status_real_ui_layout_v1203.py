#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_status_real_ui_layout_v1203] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/status/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-statuspage-stack',
        'Trạng thái công khai', 'Không CMS', 'Không máy chủ', 'Không giám sát',
        'StatusExplanationDepth', 'StatusTrustBoard',
        'lgo-service-disclosure-stack lgo-status-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'ReleaseReadinessHubCta', 'PlayerTrustReleaseCta',
        'AccessibilityReadabilityCta', 'PerformanceBudgetCta', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Status page composes the shared compact proof/disclosure layout for public static service state.',
        '.lgo-statuspage-stack.lgo-service-compact-proof-page .lgo-status-hero-card',
        '.lgo-statuspage-stack.lgo-service-compact-proof-page .lgo-status-design-board',
        '.lgo-statuspage-stack.lgo-service-compact-proof-page .lgo-status-explainers .lgo-grid',
        '.lgo-statuspage-stack.lgo-service-compact-proof-page .lgo-status-trust .lgo-grid',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 3;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.203 status real UI layout', '.lgo-status-expanded-evidence'
    ])
    require_text("tests/e2e/fe-status-real-ui-layout-v1203.spec.ts", [
        'status real UI layout v1.203', '/status', 'secondary status proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero status controls',
        '/tmp/status-mobile-v1203.png', '/tmp/status-desktop-v1203.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-STATUS-REAL-UI-LAYOUT-v1.203 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/status-desktop-v1203.png', '/tmp/status-mobile-v1203.png',
        'desktop hero bottom 384.22px', 'mobile hero bottom 514.39px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.218', 'Current FE scope: select `/download`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-STATUS-REAL-UI-LAYOUT-v1.203 | WEB-FE | WEB_CLOSED | 03b7c8d |',
        'Playwright desktop/mobile 2/2 status real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-STATUS-REAL-UI-LAYOUT-v1.203.md',
        'docs/execution/LGO-WEB-FE-STATUS-REAL-UI-LAYOUT-REPORT-v1.203.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-STATUS-REAL-UI-LAYOUT-v1.203.md',
    ]:
        require_text(rel, ['WEB-FE-STATUS-REAL-UI-LAYOUT-v1.203', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_status_real_ui_layout_v1203] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
