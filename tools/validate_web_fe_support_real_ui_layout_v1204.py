#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_support_real_ui_layout_v1204] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/support/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-supportpage-stack',
        'Hỗ trợ cộng đồng', 'Không có hệ thống ticket thật', 'FAQ nhanh', 'Báo lỗi an toàn',
        'SupportFaqDepth', 'PlayerSafetySupportCta', 'PlayerSupportExpectationBoard',
        'lgo-service-disclosure-stack lgo-support-expanded-evidence',
        'Bằng chứng phụ và tuyến liên quan', 'FaqHelpfulnessCta', 'PlayerTrustReleaseCta',
        'SupportIssuePathBoard', 'CommunityConductBoard', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Support station composes the shared compact proof/disclosure layout for the current public support page.',
        '.lgo-service-compact-proof-page.lgo-supportpage-stack .lgo-support-hero',
        '.lgo-service-compact-proof-page.lgo-supportpage-stack .lgo-support-design-board',
        '.lgo-service-compact-proof-page.lgo-supportpage-stack .lgo-faq-panel .lgo-faq-list',
        '.lgo-service-compact-proof-page.lgo-supportpage-stack .lgo-support-expanded-evidence',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.204 support real UI layout', '.lgo-support-expanded-evidence'
    ])
    require_text("tests/e2e/fe-support-real-ui-layout-v1204.spec.ts", [
        'support real UI layout v1.204', '/support', 'secondary support proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero support actions',
        '/tmp/support-mobile-v1204.png', '/tmp/support-desktop-v1204.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204 WEB_CLOSED',
        'Select `/community`', '/tmp/support-desktop-v1204.png', '/tmp/support-mobile-v1204.png',
        'desktop hero bottom 352.16px', 'mobile hero bottom 431.03px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.207', 'Current FE scope: select `/community`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204 | WEB-FE | WEB_CLOSED | 00e0936 |',
        'Playwright desktop/mobile 2/2 support real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204.md',
        'docs/execution/LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-REPORT-v1.204.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204.md',
    ]:
        require_text(rel, ['WEB-FE-SUPPORT-REAL-UI-LAYOUT-v1.204', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_support_real_ui_layout_v1204] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
