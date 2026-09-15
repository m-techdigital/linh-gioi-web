#!/usr/bin/env python3
"""Source ownership and planning non-claims. Does not replace real browser verification."""
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
    page = require("apps/web/src/app/roadmap/page.tsx", ("@lgo-web/ui/planning-layout.css", "lgo-roadmap-experience"))
    parts = ("<PublicRoadmapHero/>", "<PublicRoadmapGates/>", "<PublicRoadmapBoundaries/>", "<PublicRoadmapStages/>", "<PublicRoadmapSourceArchive/>")
    offsets = [page.find(part) for part in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("roadmap must lead with real hero/conditions before historical records")
    for marker in ("public-roadmap-flow.svg", "lgo-service-compact-proof-page", "<form", "design-reference"):
        if marker in page: ERRORS.append(f"obsolete/unsafe composition {marker}")
    view = require("apps/web/src/components/PublicRoadmapExperience.tsx", (
        'title="Roadmap phát triển web"', "PlanningGateMap", "gatePresentation[gate.gate]", "stageTitles[stage.stage]",
        "roadmapDecisionGates.map", "state:gate.status", "gateLabels[gate.status]", "stagedReleaseMessages.map",
        "gate.decisionOwner", "gate.publicMessage", "gate.mustNotClaim", "stage.ownerChecklist", "stage.nonClaim",
        "items={publicRoadmapItems}", "không phải tiến độ hiện tại", "Không phải lịch phát hành", "NO_ACCEPTED_BACKEND_CONTRACT",
        'id="roadmap-source-archive"', 'href="/download/trust"', 'href="/community/onboarding"', 'fetchPriority="high"'))
    catalog = require("packages/ui/src/milestone-archive.tsx", (
        '"use client"', 'useState<Filter>("all")', "items.filter(item => item.status === filter)", "FilterChoices",
        'data-source-state={item.status}', "item.title", "item.summary", "item.version", 'role="status"',
        "visible.length === 0", 'setFilter("all")', "restoreAll", "toolbarRef", "?.focus()", "Không có mốc", "không có nghĩa dự án đã hoàn tất"))
    controls = require("packages/ui/src/filter-choices.tsx", ('role="group"', "aria-controls={controlsId}", "aria-pressed={value === option.value}", "onChange(option.value)"))
    require("packages/ui/src/visibility-catalog.tsx", ("FilterChoices", "items.filter(item => item.visibility === filter)", "visibilityLabels[item.visibility]"))
    planning = require("packages/ui/src/planning.tsx", ("PlanningGateMap", "aria-labelledby={headingId}", 'data-state={item.state}', 'href={`#${item.id}`}', "không phải phần trăm hoàn thành"))
    for name, text in (("view", view), ("catalog", catalog), ("controls", controls), ("planning", planning)):
        for marker in ("fetch(", "WebSocket", "setInterval(", "Date.now(", "localStorage", "sessionStorage", "<form", "role=\"progressbar\""):
            if marker in text: ERRORS.append(f"{name}: forbidden live progress/intake surrogate {marker}")
    require("packages/ui/src/index.ts", ("PlanningGateMap", "MilestoneArchive", "FilterChoices"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./planning-layout.css") != "./src/planning-layout.css": ERRORS.append("missing planning stylesheet export")
    css = require("packages/ui/src/planning-layout.css", (".lgo-planning-map", ".lgo-planning-gates", ".lgo-planning-stages", ".lgo-milestone-entries", "min-height:44px", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    if "Shared roadmap page layout for public planning gate surfaces" in require("packages/ui/src/service-layout.css"): ERRORS.append("obsolete compact roadmap block retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/roadmap"', "Kế hoạch không phải lịch phát hành", "design-atlas-public-service-v195.png"))
    for rel in ("apps/web/public/design-reference/design-atlas-public-service-v195.png", "apps/web/public/game-art/world/dong-mon-skyline.webp"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing existing visual reference {rel}")
    require("tests/e2e/fe-roadmap-real-ui-layout-v1231.spec.ts", ("m.overflow", "screenshot", "toHaveCount(15)", "current',11", "planned',3", "blocked',1", "next',0", "requests).toEqual([])", "page.reload()", "violations).toEqual([])"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No production deployment"))
    print("WEB FE ROADMAP REAL UI LAYOUT v1.231 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
