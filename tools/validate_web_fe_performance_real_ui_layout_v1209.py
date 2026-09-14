#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_performance_real_ui_layout_v1209] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/performance/page.tsx", [
        'lgo-player-facing-stack lgo-service-compact-proof-page lgo-performancepage-stack',
        'Hiệu năng và ngân sách nội dung', 'Chưa có đo Core Web Vitals', 'chưa có chứng nhận Lighthouse', 'chưa có CDN ảnh riêng',
        'lgo-performance-design-board', 'lgo-performance-route-board', 'performanceSteps',
        'Nhẹ ở lần đọc đầu', 'Ít chữ nhưng đúng ranh giới', 'Mobile không bị dày',
        'lgo-service-disclosure-stack lgo-performance-expanded-evidence', 'Bằng chứng phụ và tuyến liên quan',
        'PerformanceCopyBudgetPrincipleBoard', 'StaticRouteCompositionBoard', 'PerceivedLoadSignalBoard', 'MobileDensityBudgetBoard',
        'PlayerTrustReleaseCta', 'RouteContinuityCta', 'PerformanceBudgetCta', 'AccessibilityReadabilityCta',
        'ContentIaStartCta', 'WorldGameplayLoopCta', 'DownloadTrustCta', 'PlayerSafetySupportCta', 'ClosedTesterInformationPackCta'
    ])
    require_text("packages/ui/src/service-layout.css", [
        'Shared disclosure stack for long public evidence pages.', '.lgo-service-disclosure-stack', '.lgo-service-disclosure-body',
        'Shared performance page layout for public copy/asset budget surfaces.', '.lgo-performancepage-stack',
        '.lgo-performance-design-board', '.lgo-performance-route-board', '.lgo-performance-step-grid',
        '.lgo-performance-expanded-evidence', 'grid-template-columns: repeat(3, minmax(0, 1fr));',
        'grid-template-columns: repeat(2, minmax(0, 1fr));', '-webkit-line-clamp: 2;', 'font-size: clamp(1.82rem, 7vw, 2.02rem);'
    ])
    forbid_text("apps/web/src/app/globals.css", [
        'WEB v1.209 performance real UI layout', '.lgo-performance-expanded-evidence', '.lgo-performancepage-stack'
    ])
    require_text("tests/e2e/fe-performance-real-ui-layout-v1209.spec.ts", [
        'performance real UI layout v1.209', '/performance', 'secondary performance proof boards use shared disclosure base',
        'mobile h1 scale', 'desktop page height stays focused after disclosure', 'keyboard/focus can land in hero performance actions',
        '/tmp/performance-mobile-v1209.png', '/tmp/performance-desktop-v1209.png'
    ])
    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.209 WEB_CLOSED',
        'Select `/game/loop`', '/tmp/performance-desktop-v1209.png', '/tmp/performance-mobile-v1209.png',
        'desktop hero bottom 378.28px', 'mobile hero bottom 514.86px', 'Real Browser UI/UX Layout First', 'Base First'
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.216', 'Current FE scope: select `/journey`',
        'Real Browser UI/UX Layout First', 'Base UI/UX Layout', 'CSS must be managed by owner/role'
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.209 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 performance real UI layout checks', 'NO_ACCEPTED_BACKEND_CONTRACT retained'
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.209.md',
        'docs/execution/LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-REPORT-v1.209.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.209.md',
    ]:
        require_text(rel, ['WEB-FE-PERFORMANCE-REAL-UI-LAYOUT-v1.209', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_performance_real_ui_layout_v1209] PASS')
    return 0
if __name__ == "__main__":
    raise SystemExit(main())
