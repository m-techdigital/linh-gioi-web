#!/usr/bin/env python3
from pathlib import Path
import sys
ROOT = Path(__file__).resolve().parents[1]

def fail(message: str) -> None:
    print(f"[validate_web_fe_guide_world_loop_real_ui_layout_v1155] FAIL: {message}", file=sys.stderr)
    sys.exit(1)

def read(rel: str) -> str:
    path = ROOT / rel
    if not path.exists(): fail(f"missing {rel}")
    return path.read_text(encoding="utf-8")

def require_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle not in text: fail(f"{rel} missing {needle!r}")

def forbid_text(rel: str, needles: list[str]) -> None:
    text = read(rel)
    for needle in needles:
        if needle in text: fail(f"{rel} still contains stale text {needle!r}")

def require_order(rel: str, first: str, second: str) -> None:
    text = read(rel)
    a, b = text.find(first), text.find(second)
    if a < 0 or b < 0 or a >= b: fail(f"{rel} order invalid: {first!r} before {second!r}")

def main() -> int:
    require_text("apps/web/src/app/guides/[slug]/page.tsx", [
        "lgo-service-compact-proof-page lgo-guidedetailpage-stack",
        "lgo-guide-detail-hero-card",
        "WEB v1.155 · hướng dẫn gameplay",
        "Guide tĩnh · chưa có hệ thống wiki · chưa có tiến trình tài khoản",
        "Xem vòng lặp",
        "Trạng thái chơi",
        "Tin cậy tải game",
        "lgo-guide-detail-boundary",
        "GuideDetailDepth",
        "WorldGameplayLoopCta",
    ])
    require_order("apps/web/src/app/guides/[slug]/page.tsx", "lgo-guide-detail-hero-card", "<GuideDetailDepth slug={entry.slug} />")
    require_order("apps/web/src/app/guides/[slug]/page.tsx", "<GuideDetailDepth slug={entry.slug} />", "<WorldGameplayLoopCta />")
    require_order("apps/web/src/app/guides/[slug]/page.tsx", "<WorldGameplayLoopCta />", "<PlayerTrustReleaseCta />")
    require_order("apps/web/src/app/guides/[slug]/page.tsx", "<PlayerTrustReleaseCta />", "<ReleaseReadinessHubCta />")
    forbid_text("apps/web/src/app/guides/[slug]/page.tsx", [
        "PROVISIONAL_WEB_FIXTURE · NOT_CANONICAL_BACKEND_CONTRACT · no live guide/wiki backend",
        "Guide detail giúp người chơi",
        "Support FAQ",
        "wiki backend",
    ])

    require_text("packages/content/src/fixtures.ts", [
        "slug: \"world-gameplay-loop-guide\"",
        "title: \"Vòng lặp thế giới nhập môn\"",
        "hướng dẫn công khai tĩnh",
        "cơ sở dữ liệu nhiệm vụ",
        "hệ thống tiến trình vận hành",
        "sát thương chiến đấu",
        "Chưa có trạng thái nhiệm vụ lưu trữ",
        "Chưa có artifact công khai",
    ])
    forbid_text("packages/content/src/fixtures.ts", [
        "title: \"World loop: từ Spirit Gate tới Training Stone\"",
        "quest database, combat tutorial hoặc live progression system",
        "No combat damage, HP, loot, inventory/economy or quest database.",
        "No public artifact, no ticket backend, no production auth.",
    ])

    require_text("apps/web/src/components/PublicDetailSections.tsx", [
        "Chi tiết hướng dẫn",
        "Các bước guide có kết quả mong đợi và phạm vi tạm khóa",
        "Không công bố wiki vận hành",
    ])
    forbid_text("apps/web/src/components/PublicDetailSections.tsx", [
        "WEB v1.9 guide detail\" title=\"Các bước guide có kết quả mong đợi và blocked scope",
        "Guide detail là static public content",
        "quest database",
    ])

    require_text("packages/ui/src/service-layout.css", [
        "WEB v1.9 public news / guide detail pages",
        "Shared guide detail real layout for public reading surfaces",
        ".lgo-guidedetailpage-stack",
        ".lgo-guide-detail-hero-card",
        ".lgo-guide-detail-boundary",
        ".lgo-guide-detail-steps",
        "grid-template-columns: repeat(2, minmax(0, 1fr))",
    ])
    forbid_text("apps/web/src/app/globals.css", [
        "WEB v1.9 public news / guide detail pages",
        ".lgo-guide-detail-step",
        ".lgo-detail-next-steps",
    ])

    require_text("tests/e2e/fe-guide-world-loop-real-ui-layout-v1155.spec.ts", [
        "/guides/world-gameplay-loop-guide starts with compact guide content",
        "Vòng lặp thế giới nhập môn",
        "CTA headings should not precede guide content",
        "desktop hero compact",
        "mobile hero compact",
        "horizontal overflow",
    ])

    require_text("docs/execution/WEB-PROJECT-STATE.md", [
        "Current phase: WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155 WEB_CLOSED",
        "Real Browser UI/UX Layout First",
        "Base First",
        "/tmp/guide-world-loop-desktop-v1155.png",
        "/tmp/guide-world-loop-mobile-v1155.png",
    ])
    require_text("docs/execution/WEB-NEXT-ACTION.md", [
        "WEB-FE-ACCESSIBILITY-INTERACTION-AUDIT-v1.191",
        "Current FE scope: select `/news/accessibility-readability-polish-started`",
        "Real Browser UI/UX Layout First",
        "Base UI/UX Layout",
    ])
    require_text("docs/execution/WEB-TASK-LEDGER.md", [
        "| WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155 | WEB-FE | WEB_CLOSED |",
        "Playwright desktop/mobile 2/2 guide world-loop layout checks",
        "NO_ACCEPTED_BACKEND_CONTRACT retained",
    ])
    for rel in [
        "docs/execution/specs/WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155.md",
        "docs/execution/LGO-WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-REPORT-v1.155.md",
        "docs/execution/HANDOFF-LGO-WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155.md",
    ]:
        require_text(rel, ["WEB-FE-GUIDE-WORLD-LOOP-REAL-UI-LAYOUT-v1.155", "WEB_CLOSED", "Real Browser UI/UX Layout First", "Base First", "browser/e2e", "NO_ACCEPTED_BACKEND_CONTRACT"])
    print("[validate_web_fe_guide_world_loop_real_ui_layout_v1155] PASS")
    return 0

if __name__ == "__main__": sys.exit(main())
