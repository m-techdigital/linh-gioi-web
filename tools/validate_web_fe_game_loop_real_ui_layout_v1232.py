#!/usr/bin/env python3
"""Guard for world-loop reading UI; this is not verification of gameplay or a live server."""
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
    page = require("apps/web/src/app/game/loop/page.tsx", (
        "@lgo-web/ui/progress.css", "@lgo-web/ui/reading-journey.css", "@lgo-web/ui/world-loop-layout.css", "lgo-world-loop-experience"))
    parts = ("<PublicWorldLoopHero/>", "<PublicWorldLoopReading/>", "<PublicWorldLoopQuestionsAndScope/>", "<PublicWorldLoopRoutes/>", "<PublicWorldLoopSourceNotes/>")
    offsets = [page.find(part) for part in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("loop must start with real hero and source-backed reading journey")
    for marker in ("world-gameplay-loop-board.svg", "lgo-service-compact-proof-page", "<form", "design-reference"):
        if marker in page: ERRORS.append(f"obsolete/unsafe page composition {marker}")
    view = require("apps/web/src/components/PublicWorldLoopExperience.tsx", (
        'title="Vòng lặp gameplay thế giới"', "gameplayLoopStages.map", "labels[stage.id]", "href:stage.route", "stage.currentBoundary",
        "detail:stage.expectedFeeling", "summary:stage.playerAction", "beginnerExpectations.map", "gameplayScopeBoundaries.map", "guideWorldNavigationLinks.map",
        "Đang đọc, không phải đang chơi", "không có mô phỏng combat", "không lưu tiến trình nhân vật", "NO_ACCEPTED_BACKEND_CONTRACT",
        '<ReadingJourney columns={4}', "lgo-loop-vista", 'fetchPriority="high"', 'href={item.recommendedReading}', 'href={item.to}'))
    journey = require("packages/ui/src/reading-journey.tsx", (
        "columns?: 4", "note?: string", "data-columns={columns}", "active.note", "lgo-reading-journey-note",
        "useState(0)", 'state={stepIndex === index ? "current" : "upcoming"}', "aria-pressed", 'role="status"',
        "disabled={index === 0}", "disabled={index === steps.length - 1}"))
    for name, text in (("view", view), ("journey", journey)):
        for marker in ("fetch(", "WebSocket", "setInterval(", "requestAnimationFrame", "Date.now(", "localStorage", "sessionStorage", "<canvas", "<form", "role=\"progressbar\""):
            if marker in text: ERRORS.append(f"{name}: forbidden game/persistence surrogate {marker}")
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./world-loop-layout.css") != "./src/world-loop-layout.css": ERRORS.append("missing shared stylesheet export")
    css = require("packages/ui/src/world-loop-layout.css", (".lgo-loop-vista", ".lgo-loop-route-grid", "object-fit:cover", "@media(max-width:480px)"))
    reading_css = require("packages/ui/src/reading-journey.css", ('[data-columns="4"]', "repeat(4,minmax(0,1fr))", "repeat(3,minmax(0,1fr))", "lgo-reading-journey-note", "min-height:44px", ":focus-visible", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for name, text in (("world-loop", css), ("reading-journey", reading_css)):
        for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", text)) - tokens): ERRORS.append(f"{name}: undefined canonical token {token}")
    service = require("packages/ui/src/service-layout.css")
    for marker in ("WEB v1.82 public world gameplay-loop board", "Shared game-loop page layout for public gameplay expectation surfaces"):
        if marker in service: ERRORS.append(f"obsolete compact block retained {marker}")
    if "Shared legacy world-loop evidence styles still consumed by sibling pages" not in service: ERRORS.append("missing retained sibling CSS owner")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/game/loop"', "PUBLIC_GAME_WORLD_TARGET", "Hướng dẫn, không phải gameplay live"))
    for rel in ("apps/web/public/design-reference/game-world-detailed-design-target-v1120.png", "apps/web/public/game-art/world/dong-mon-skyline.webp"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing existing visual source {rel}")
    require("tests/e2e/fe-game-loop-real-ui-layout-v1232.spec.ts", ("m.overflow", "screenshot", "toHaveCount(4)", "boundaries[i]", "page.reload()", "requests).toEqual([])", "violations).toEqual([])", "isMobile", "outlineStyle"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No combat damage", "No live world server claim"))
    print("WEB FE GAME LOOP REAL UI LAYOUT v1.232 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
