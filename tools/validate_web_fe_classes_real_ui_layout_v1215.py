#!/usr/bin/env python3
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]


def fail(message: str) -> None:
    print(f"[validate_web_fe_classes_real_ui_layout_v1215] FAIL: {message}", file=sys.stderr)
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


def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a = text.find(first)
    b = text.find(second)
    if a < 0 or b < 0 or a >= b:
        fail(f"{rel} order invalid: {first!r} must appear before {second!r}")


def main() -> int:
    require_text("apps/web/src/app/classes/page.tsx", [
        "lgo-player-facing-stack lgo-classespage-stack",
        "PublicPlayerHero",
        "ClassPathGrid",
        "details className=\"lgo-service-disclosure-stack lgo-classespage-expanded-evidence\"",
        "Bằng chứng phụ và chiều sâu Năm Lộ",
        "không ép toàn bộ proof board vào first-flow `/classes`",
        "lgo-service-disclosure-body",
        "ClassIdentityDeck",
        "ClassArtSpotlight",
        "lgo-path-philosophy",
    ])
    require_order("apps/web/src/app/classes/page.tsx", "<PublicPlayerHero", "<ClassPathGrid />")
    require_order("apps/web/src/app/classes/page.tsx", "<ClassPathGrid />", "lgo-classespage-expanded-evidence")
    require_order("apps/web/src/app/classes/page.tsx", "lgo-classespage-expanded-evidence", "<ClassIdentityDeck />")
    require_order("apps/web/src/app/classes/page.tsx", "<ClassIdentityDeck />", "<ClassArtSpotlight />")
    require_order("apps/web/src/app/classes/page.tsx", "<ClassArtSpotlight />", "lgo-path-philosophy")
    forbid_text("apps/web/src/app/classes/page.tsx", [
        "Class philosophy",
        "Design Target First",
        "Development art preview",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "v1.215 shared classes overview layout for the public Năm Lộ route",
        ".lgo-classespage-stack .lgo-paths-hero",
        ".lgo-classespage-stack .lgo-class-path-grid",
        ".lgo-classespage-stack .lgo-class-path",
        ".lgo-classespage-stack .lgo-classespage-expanded-evidence",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
        "v1.215 final first-fold tightening for rendered /classes desktop flow",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.122 classes detailed design target density",
        "WEB v1.137 classes Vietnamese design match",
        ".lgo-classespage-stack .lgo-paths-hero",
        ".lgo-classespage-stack > .lgo-experience-section:nth-child(2)",
    ])

    require_text("tests/e2e/fe-classes-real-ui-layout-v1215.spec.ts", [
        "classes real UI layout v1.215",
        "lgo-classespage-expanded-evidence",
        "one shared disclosure for secondary classes proof",
        "details:not([open])",
        "desktop page height remains reviewable while proof is collapsed",
        "mobile page height remains reviewable while proof is collapsed",
        "/tmp/classes-mobile-v1215.png",
        "/tmp/classes-desktop-v1215.png",
    ])
    require_text("tests/e2e/fe-classes-design-target-density-v1122.spec.ts", ["classes design target density", "first class card"])
    require_text("tests/e2e/fe-classes-vietnamese-design-match-v1137.spec.ts", ["classes Vietnamese design match", "Năm Lộ"])
    require_text("tests/e2e/fe-public-class-art-loading-v154.spec.ts", ["lgo-classespage-expanded-evidence > summary", "Bảng thiết kế nhiều lớp của Lộ Võ"])
    require_text("tests/e2e/fe-public-class-art-typography-v155.spec.ts", ["lgo-classespage-expanded-evidence > summary", "class art typography scale"])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215 WEB_CLOSED",
        "/classes",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/classes-desktop-v1215.png",
        "/tmp/classes-mobile-v1215.png",
        "Next task: WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
        "Select `/download/trust` as the next single active page",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.219",
        "Current FE scope: select `/download/trust`",
        "Complete `/download/trust` fully before any other page",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout First",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215 | WEB-FE | WEB_CLOSED |",
        "Public Classes real browser UI layout and Base First disclosure class flow",
        "Playwright desktop/mobile 10/10 classes layout/design/art checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215.md",
        "docs/execution/LGO-WEB-FE-CLASSES-REAL-UI-LAYOUT-REPORT-v1.215.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215.md",
    ]:
        require_text(rel, [
            "WEB-FE-CLASSES-REAL-UI-LAYOUT-v1.215",
            "WEB_CLOSED",
            "Real Browser UI/UX Layout First",
            "Base First",
            "browser/e2e",
            "NO_ACCEPTED_BACKEND_CONTRACT",
            "AXIRO",
        ])

    print("[validate_web_fe_classes_real_ui_layout_v1215] PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
