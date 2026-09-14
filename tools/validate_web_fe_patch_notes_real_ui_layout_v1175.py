#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_patch_notes_real_ui_layout_v1175] FAIL: {message}", file=sys.stderr)
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
    require_text("apps/web/src/app/patch-notes/page.tsx", [
        'metadata = { title: "Ghi chú cập nhật Linh Giới" }',
        'lgo-patchnotespage-stack',
        'lgo-patchnotes-hero-card',
        'Nhật ký cập nhật tĩnh',
        'Ghi chú cập nhật Linh Giới',
        'lgo-patchnotes-board',
        'lgo-patchnotes-grid',
        'lgo-patchnotes-card',
        'lgo-action-band',
        'Trạng thái chơi',
        'Ranh giới:',
    ])
    forbid_text("apps/web/src/app/patch-notes/page.tsx", [
        'PageHeader',
        'Local content',
        'Fixture entries',
        'PROVISIONAL_WEB_FIXTURE · No CMS · No backend',
        'Patch notes hiện là fixture',
        'No CMS',
        'No backend',
    ])

    require_text("packages/content/src/fixtures.ts", [
        'slug: "monorepo-foundation-env-limited"',
        'title: "Nền tảng web đã sẵn sàng cho kiểm runtime local"',
        'slug: "browser-matrix-guardrail-passed"',
        'title: "Browser matrix trở thành guardrail hỗ trợ"',
        'runtime gate vẫn phải được xác minh',
        'ít rủi ro regression hơn',
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        'title: "Monorepo foundation source is ready for local runtime closure"',
        'title: "Browser matrix is now a support guardrail"',
    ])

    require_text("packages/ui/src/service-layout.css", [
        'Patch notes page composes shared service proof/card layout for static release-note boundaries.',
        '.lgo-patchnotespage-stack',
        '.lgo-patchnotes-hero-card',
        '.lgo-patchnotes-board',
        '.lgo-patchnotes-card',
        '.lgo-service-compact-proof-page .lgo-patchnotes-board .lgo-patchnotes-grid',
        'max-width: 100%;',
    ])
    forbid_text("apps/web/src/app/globals.css", [
        '.lgo-patchnotespage-stack',
        '.lgo-patchnotes-hero-card',
        '.lgo-patchnotes-board',
        '.lgo-patchnotes-card',
    ])

    require_text("tests/e2e/fe-patch-notes-real-ui-layout-v1175.spec.ts", [
        '/patch-notes renders compact release-note boundary layout without raw fixture CMS claims',
        'Ghi chú cập nhật Linh Giới',
        'mobile hero compact',
        'desktop hero compact',
        'heroStatusLink',
        '/tmp/patch-notes-${isMobile ? "mobile" : "desktop"}-v1175.png',
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        'Current phase: WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.175 WEB_CLOSED',
        'Select `/community/onboarding`',
        '/tmp/patch-notes-desktop-v1175.png',
        '/tmp/patch-notes-mobile-v1175.png',
        'Real Browser UI/UX Layout First',
        'Base First',
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        'WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.208',
        'Current FE scope: select `/community/onboarding`',
        'Real Browser UI/UX Layout First',
        'Base UI/UX Layout',
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        '| WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.175 | WEB-FE | WEB_CLOSED |',
        'Playwright desktop/mobile 2/2 patch notes real UI layout checks',
        'NO_ACCEPTED_BACKEND_CONTRACT retained',
    ])
    for rel in [
        'docs/execution/specs/WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.175.md',
        'docs/execution/LGO-WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-REPORT-v1.175.md',
        'docs/execution/HANDOFF-LGO-WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.175.md',
    ]:
        require_text(rel, ['WEB-FE-PATCH-NOTES-REAL-UI-LAYOUT-v1.175', 'WEB_CLOSED', 'Real Browser UI/UX Layout First', 'Base First', 'browser/e2e', 'NO_ACCEPTED_BACKEND_CONTRACT'])
    print('[validate_web_fe_patch_notes_real_ui_layout_v1175] PASS')
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
