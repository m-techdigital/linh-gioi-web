#!/usr/bin/env python3
"""Reading-route source guard. This is not enrollment, release approval or runtime evidence."""
from pathlib import Path
import json
import re

ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    p = ROOT / rel
    if not p.is_file():
        ERRORS.append(f"missing {rel}")
        return ""
    text = p.read_text(encoding="utf-8")
    for m in markers:
        if m not in text: ERRORS.append(f"{rel}: missing {m}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/community/onboarding/page.tsx", ("@lgo-web/ui/progress.css", "@lgo-web/ui/reading-journey.css", "lgo-onboarding-experience"))
    order = [page.find(p) for p in ("<PublicOnboardingHero/>", "<PublicOnboardingReading/>", "<PublicOnboardingAudiences/>", "<PublicOnboardingScopeNotes/>")]
    if -1 in order or order != sorted(order): ERRORS.append("onboarding must start with hero then real reading route")
    for m in ("community-onboarding-gameplay-loop.svg", "lgo-service-compact-proof-page", "<form"):
        if m in page: ERRORS.append(f"obsolete/unsafe composition {m}")
    parts = require("apps/web/src/components/PublicCommunityOnboardingExperience.tsx", (
        'title="Hòa nhập cộng đồng Linh Giới"', "FieldManual", "ReadingJourney", "communityOnboardingPaths.map",
        "communityFeedbackChannels.map", 'href:"/status"', 'href:"/roadmap"', 'href:"/community"',
        "Kiểm tra trạng thái", "Đọc mốc mở dần", "Quay lại cộng đồng", "không cấp quyền thử nghiệm",
        "Chưa có danh sách chờ", "NO_ACCEPTED_BACKEND_CONTRACT", 'fetchPriority="high"'))
    journey = require("packages/ui/src/reading-journey.tsx", (
        '"use client"', "useState(0)", "ProgressStep", "ProgressSteps", "aria-controls={panelId}",
        "aria-pressed={stepIndex === index}", "setPosition(stepIndex)", "setPosition(index - 1)", "setPosition(index + 1)",
        "disabled={index === 0}", "disabled={index === steps.length - 1}", 'role="status"', 'aria-atomic="true"',
        'aria-labelledby={headingId}', 'id={headingId}', 'href={active.href}'))
    for text, name in ((parts, "page components"), (journey, "reading journey")):
        for m in ("fetch(", "WebSocket", "XMLHttpRequest", "localStorage", "sessionStorage", "<form", "<input", "<textarea", "state=\"complete\""):
            if m in text: ERRORS.append(f"{name}: forbidden persistence/enrollment surrogate {m}")
    require("packages/ui/src/progress.tsx", ("marker?: ReactNode", "children?: ReactNode", 'marker ?? (state === "complete" ? "✓" : "•")'))
    require("packages/ui/src/index.ts", ("ReadingJourney", "ReadingJourneyStep"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./reading-journey.css") != "./src/reading-journey.css": ERRORS.append("missing shared CSS export")
    css = require("packages/ui/src/reading-journey.css", ("repeat(3,minmax(0,1fr))", ".lgo-reading-journey-panel", "min-height:44px", ":focus-visible", ":disabled", "opacity:.45", "prefers-reduced-motion", "forced-colors:active"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    service = require("packages/ui/src/service-layout.css")
    if "Shared community onboarding page layout" in service: ERRORS.append("old compact onboarding CSS retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/community/onboarding"', "Bố cục hòa nhập cộng đồng", "community-detailed-design-target-v1149.png"))
    require("tests/e2e/fe-community-onboarding-real-ui-layout-v1228.spec.ts", ("m.columns", "m.overflow", "1/3", "2/3", "3/3", "toBeDisabled()", "disabled navigation must be visually distinct", "page.reload()", "requests).toEqual([])", "toHaveCount(4)", "violations).toEqual([])", "screenshot"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No fake waitlist", "No production auth", "No DB persistence"))
    print("WEB FE COMMUNITY ONBOARDING REAL UI LAYOUT v1.228 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for e in ERRORS: print(f"- {e}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
