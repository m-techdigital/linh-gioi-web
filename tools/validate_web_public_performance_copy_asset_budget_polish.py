#!/usr/bin/env python3
from __future__ import annotations
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def fail(msg: str) -> None:
    ERRORS.append(msg)

def read(rel: str) -> str:
    p = ROOT / rel
    if not p.is_file():
        fail(f"missing file: {rel}")
        return ""
    return p.read_text(encoding="utf-8")

def require_file(rel: str) -> None:
    if not (ROOT / rel).is_file():
        fail(f"missing file: {rel}")

def require_text(rel: str, needle: str) -> None:
    if needle not in read(rel):
        fail(f"{rel} missing required text: {needle}")

def main() -> int:
    require_file("apps/web/src/app/performance/page.tsx")
    require_file("apps/web/src/components/PublicPerformanceBudgetSections.tsx")
    require_file("docs/execution/WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16.md")
    require_file("docs/execution/checklists/WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-CHECKLIST-v1.16.md")
    checks = {
        "packages/content/src/types.ts": [
            "PerformanceCopyBudgetPrinciple", "StaticRouteCompositionRule", "PerceivedLoadSignal", "MobileDensityBudget"
        ],
        "packages/content/src/fixtures.ts": [
            "performanceCopyBudgetPrinciples", "staticRouteCompositionRules", "perceivedLoadSignals", "mobileDensityBudgets",
            "performance-copy-budget-guide", "performance-copy-asset-budget-polish-started", "No Core Web Vitals measured PASS"
        ],
        "packages/content/src/index.ts": [
            "performanceCopyBudgetPrinciples", "staticRouteCompositionRules", "perceivedLoadSignals", "mobileDensityBudgets"
        ],
        "apps/web/src/components/PublicPerformanceBudgetSections.tsx": [
            "PerformanceCopyBudgetPrincipleBoard", "StaticRouteCompositionBoard", "PerceivedLoadSignalBoard", "MobileDensityBudgetBoard", "PerformanceBudgetCta"
        ],
        "apps/web/src/app/performance/page.tsx": [
            "Hiệu năng và ngân sách nội dung", "Chưa có đo Core Web Vitals", "chưa có chứng nhận Lighthouse", "chưa có CDN ảnh riêng"
        ],
        "apps/web/src/app/globals.css": [
            "WEB v1.16 performance / copy / asset budget polish", "lgo-performance-cta", "lgo-static-route-item"
        ],
        "apps/web/src/components/PublicNavigation.tsx": ["/performance", "Hiệu năng"],
        "apps/web/src/app/sitemap.ts": ["/performance", "/guides/performance-copy-budget-guide"],
        "apps/web/src/app/page.tsx": ["/performance", "WEB v1.16 performance/copy budget"],
        "apps/web/src/app/start/page.tsx": ["/performance", "MobileDensityBudgetBoard"],
        "apps/web/src/app/download/page.tsx": ["PerformanceBudgetCta", "StaticRouteCompositionBoard"],
        "apps/web/src/app/status/page.tsx": ["PerformanceBudgetCta", "PerceivedLoadSignalBoard"],
        "docs/execution/WEB-PROJECT-STATE.md": ["LGO_WEB_PUBLIC_PERFORMANCE_COPY_ASSET_BUDGET_POLISH_READY_v1.16"],
        "docs/execution/WEB-NEXT-ACTION.md": ["WEB-PUBLIC-ROUTE-CONTINUITY-CONVERSION-POLISH-v1.17"],
        "docs/execution/WEB-NON-CLAIMS.md": ["No Core Web Vitals measured PASS", "No Lighthouse score certification", "No production RUM monitoring", "No image CDN integration"]
    }
    for rel, needles in checks.items():
        for needle in needles:
            require_text(rel, needle)
    for rel in ["packages/content/src/fixtures.ts", "apps/web/src/app/performance/page.tsx", "docs/execution/WEB-PUBLIC-PERFORMANCE-COPY-ASSET-BUDGET-POLISH-v1.16.md"]:
        text = read(rel).lower()
        for forbidden in ["lighthouse certified", "production rum enabled", "cdn deployed", "image cdn enabled", "core web vitals: pass"]:
            if forbidden in text:
                fail(f"{rel} contains forbidden performance claim marker: {forbidden}")
    if ERRORS:
        print("WEB PUBLIC PERFORMANCE COPY ASSET BUDGET POLISH VALIDATION FAIL")
        for error in ERRORS:
            print(f"- {error}")
        return 1
    print("WEB PUBLIC PERFORMANCE COPY ASSET BUDGET POLISH VALIDATION PASS")
    return 0

if __name__ == "__main__":
    sys.exit(main())
