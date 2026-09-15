#!/usr/bin/env python3
"""Source ownership/non-claim guard; browser verification is separate from source validation."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file():
        ERRORS.append(f"missing {rel}")
        return ""
    text = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/performance/page.tsx", ("@lgo-web/ui/performance-layout.css", "lgo-performance-experience"))
    parts = ("<PublicPerformanceHero/>", "<PublicPerformanceWorkshop/>", "<PublicPerformanceMeasurement/>", "<PublicPerformancePrinciples/>", "<PublicPerformanceRoutes/>")
    positions = [page.find(p) for p in parts]
    if -1 in positions or positions != sorted(positions): ERRORS.append("performance composition must start with hero and real reading workshop")
    for forbidden in ("performance-copy-budget-hud.svg", "lgo-service-compact-proof-page", "<form"):
        if forbidden in page: ERRORS.append(f"obsolete/unsafe page composition {forbidden}")
    experience = require("apps/web/src/components/PublicPerformanceExperience.tsx", (
        'title="Hiệu năng và ngân sách nội dung"', "ReadingPreview", "Chưa có số đo production", "Không phải kết quả benchmark",
        "Chưa công bố", "Chưa chứng nhận", "Chưa có CDN riêng", "NO_ACCEPTED_BACKEND_CONTRACT",
        "performanceCopyBudgetPrinciples.map", "staticRouteCompositionRules.map", "mobileDensityBudgets.map", "perceivedLoadSignals.map",
        'href={item.route}', "không phải báo cáo tốc độ website", "Không phải báo cáo tối ưu của từng trang"))
    preview = require("packages/ui/src/reading-preview.tsx", (
        '"use client"', "export function ReadingPreview", 'useState(false)', "CheckboxField", "SpiritButton",
        "aria-pressed", "aria-controls", 'role="status"', 'aria-live="polite"', 'data-density={density}',
        "illustration ? <PreviewIllustration", 'onLoad={() => setState("loaded")}', 'onError={() => setState("error")}',
        "Không tải được minh họa", "Ẩn ảnh không hoàn lại dữ liệu đã tải", 'setDensity("compact"); setIllustration(false)',
        "Không lưu tùy chọn"))
    for name, source in (("experience", experience), ("preview", preview)):
        for token in ("fetch(", "XMLHttpRequest", "WebSocket", "PerformanceObserver", "localStorage", "sessionStorage", "sendBeacon", "setInterval(", "<form", "<textarea", "<iframe"):
            if token in source: ERRORS.append(f"{name}: forbidden monitoring/persistence/input surrogate {token}")
    require("packages/ui/src/index.ts", ("ReadingPreview", "ReadingPreviewImage"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./performance-layout.css") != "./src/performance-layout.css": ERRORS.append("missing shared stylesheet export")
    css = require("packages/ui/src/performance-layout.css", (
        ".lgo-reading-preview", '.lgo-reading-preview-sample[data-density="comfortable"]',
        "min-height:44px", "-webkit-line-clamp:none", "focus-visible", "img[hidden]", "prefers-reduced-motion",
        ".lgo-measurement-boundary", "@media(max-width:480px)"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    if "Shared performance page layout for public copy/asset budget surfaces" in require("packages/ui/src/service-layout.css"):
        ERRORS.append("superseded compact performance layout retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/performance"', "PUBLIC_PERFORMANCE_TARGET", "Thiết kế hiệu năng và khả năng đọc"))
    for rel in ("apps/web/public/design-reference/design-atlas-public-service-v195.png", "apps/web/public/game-art/world/dong-mon-skyline.webp"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing approved reference {rel}")
    require("tests/e2e/fe-performance-real-ui-layout-v1229.spec.ts", (
        "m.overflow", "m.sample.top", "before", "not.toBeChecked", "requests).toEqual([])", "page.reload()",
        "route.abort()", "page.unroute", "outgoing).toEqual([])", "violations).toEqual([])", "screenshot"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production RUM monitoring", "No Lighthouse score certification", "No CDN deployment claim"))
    print("WEB FE PERFORMANCE REAL UI LAYOUT v1.229 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
