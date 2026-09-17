#!/usr/bin/env python3
"""Source ownership and truthful local question discovery. Browser PASS is a separate gate."""
from pathlib import Path
import json
import re
ROOT = Path(__file__).resolve().parents[1]
ERRORS: list[str] = []

def require(rel: str, markers: tuple[str, ...] = ()) -> str:
    path = ROOT / rel
    if not path.is_file(): ERRORS.append(f"missing {rel}"); return ""
    text = path.read_text(encoding="utf-8")
    for marker in markers:
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/support/help/page.tsx", ("@lgo-web/ui/release-layout.css", "@lgo-web/ui/guidance-layout.css", "@lgo-web/ui/question-directory.css", "lgo-help-hub"))
    parts = ("<PublicHelpHero/>", "<PublicHelpAnswers/>", "<PublicHelpBoundary/>", "<PublicHelpReadingNotes/>")
    offsets = [page.find(p) for p in parts]
    if -1 in offsets or offsets != sorted(offsets): ERRORS.append("FAQ page must lead with real map and answer directory")
    for marker in ("<figure", "design-reference", "lgo-service-compact-proof-page", "<form"):
        if marker in page: ERRORS.append(f"obsolete/unsafe help composition: {marker}")
    experience = require("apps/web/src/components/PublicSupportHelpExperience.tsx", (
        "faqDiscoveryGroups", "supportFaqs", "faqHelpfulnessPrompts", "playerSafetyPrinciples", "QuestionDirectory", 'variant="map"',
        'title="FAQ nhanh"', 'title="Bản đồ câu hỏi"', 'fetchPriority="high"', "NO_ACCEPTED_BACKEND_CONTRACT",
        "Không có hệ thống ticket thật", "không có tìm kiếm backend", "mật khẩu", "token", "thông tin cá nhân nhạy cảm",
        'href:"/download/trust"', 'href:"/release/tester-pack"', 'href:"/support/safety"', 'href:"/status"', 'href:"/game/loop"', 'href:"/support"',
        'headingId="help-answers-heading"'))
    for topic in ("download", "test", "report", "account", "gameplay", "privacy"):
        if f'id:"faq-{topic}"' not in experience or f'href:"#faq-{topic}"' not in experience: ERRORS.append(f"missing real topic link {topic}")
    directory = require("packages/ui/src/question-directory.tsx", ('"use client"', "groups.filter", "QuestionDisclosureList", "aria-pressed", "aria-controls", 'role="status"', '"hashchange"', '"popstate"', "removeEventListener", "window.history.state", "group.href", 'data-filtered={selected !== "all"}'))
    for marker in ("fetch(", "XMLHttpRequest", "WebSocket", "localStorage", "sessionStorage", "setInterval(", "<form", "<input", "<textarea"):
        if marker in experience or marker in directory: ERRORS.append(f"unexpected query/intake/persistence path: {marker}")
    require("packages/ui/src/guidance.tsx", ('variant?: "station" | "map"', 'data-count={topics.length}', "QuestionDisclosureList"))
    require("packages/ui/src/index.ts", ("QuestionDirectory", "GuidanceQuestionGroup"))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./question-directory.css") != "./src/question-directory.css": ERRORS.append("missing shared question stylesheet export")
    css = require("packages/ui/src/question-directory.css", (".lgo-guidance-map", '.lgo-question-groups[data-filtered="true"]', ":focus-visible", "min-height:44px", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token: {token}")
    if "lgo-supporthelppage-stack" in require("packages/ui/src/service-layout.css"): ERRORS.append("obsolete help-only CSS retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ("support-help-detailed-design-target-v1132.png", 'pathname === "/support/help"'))
    for rel in ("docs/design/reference/WEB-FE-SUPPORT-HELP-DETAILED-DESIGN-TARGET-v1.132.png", "apps/web/public/game-art/world/dong-mon-skyline.webp"):
        if not (ROOT / rel).is_file(): ERRORS.append(f"missing approved reference/illustration {rel}")
    require("tests/e2e/fe-support-help-real-ui-layout-v1225.spec.ts", ("screenshot", "metrics.overflow", "toHaveCount(6)", "toHaveCount(1)", "page.goBack()", "page.reload()", 'keyboard.press("Space")', "requests).toEqual([])", "violations).toEqual([])", "groupBox!.width"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No independent backend"))
    print("WEB FE SUPPORT HELP REAL UI LAYOUT v1.225 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
