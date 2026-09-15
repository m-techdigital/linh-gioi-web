#!/usr/bin/env python3
"""Source ownership/behavior guard. Not a substitute for production browser evidence."""
from pathlib import Path
import json
import re
ROOT = Path(__file__).resolve().parents[1]

def main() -> int:
    errors = []
    def read(rel, markers=()):
        path = ROOT/rel
        if not path.is_file(): errors.append(f"missing {rel}"); return ""
        text = path.read_text()
        for marker in markers:
            if marker not in text: errors.append(f"{rel}: missing {marker}")
        return text
    page = read("apps/web/src/app/support/page.tsx", ("lgo-guidance-layout", "@lgo-web/ui/guidance-layout.css"))
    offsets = [page.find(part) for part in ("<PublicSupportHero/>", "<PublicSupportTopics/>", "<PublicSupportAnswers/>", "<PublicSupportScope/>")]
    if -1 in offsets or offsets != sorted(offsets): errors.append("support hero/topics/answers order invalid")
    content = read("apps/web/src/components/PublicSupportExperience.tsx", ("ExperienceHero", 'title="Hỗ trợ cộng đồng"', "GuidanceStation", "GuidanceTopicGrid", "QuestionDisclosureList", "supportFaqs.map", "playerSupportExpectations.map", "/download/trust", "/support/help", "/release/tester-pack#tester-feedback", "/support/safety", "Không có hệ thống ticket thật", "NO_ACCEPTED_BACKEND_CONTRACT"))
    shared = read("packages/ui/src/guidance.tsx", ("export function GuidanceStation", "export function GuidanceTopicGrid", "export function QuestionDisclosureList", "href={topic.href}", "<details", "<summary", "aria-labelledby={headingId}"))
    for marker in ("<form", "<input", "<textarea", "fetch(", "XMLHttpRequest", "localStorage", "sessionStorage"):
        if marker in page + content + shared: errors.append(f"forbidden support intake surrogate: {marker}")
    if "design-reference/" in page or "design-reference/" in content: errors.append("reference image used instead of actual support UI")
    css=read("packages/ui/src/guidance-layout.css", (".lgo-guidance-station", "var(--lgo-color-parchment)", "grid-template-columns:repeat(4", ".lgo-question-list", "-webkit-line-clamp:none", ":focus-visible"))
    tokens=set(re.findall(r'(--lgo-[\w-]+)\s*:',read("packages/design-tokens/src/tokens.css")))
    missing=set(re.findall(r'var\((--lgo-[\w-]+)',css))-tokens
    if missing: errors.append(f"undefined canonical tokens: {sorted(missing)}")
    exports=json.loads(read("packages/ui/package.json"))["exports"]
    if exports.get("./guidance-layout.css") != "./src/guidance-layout.css": errors.append("missing shared guidance CSS export")
    read("packages/ui/src/index.ts", ("GuidanceStation", "GuidanceTopicGrid", "QuestionDisclosureList"))
    service=read("packages/ui/src/service-layout.css")
    if "Support station composes the shared compact proof/disclosure layout" in service: errors.append("legacy support density block still active")
    read("tests/e2e/fe-support-real-ui-layout-v1224.spec.ts", ("toHaveCount(4)", "toHaveCount(6)", 'keyboard.press("Enter")', 'keyboard.press("Space")', "violations", "boxes.overflow", "boundingBox", "parchment station"))
    read("apps/web/src/components/PublicDesignTargetReference.tsx", ("support-detailed-design-target-v1131.png", 'pathname === "/support"'))
    read("docs/execution/WEB-NON-CLAIMS.md", ("No production auth", "No DB persistence", "No independent backend"))
    print("WEB FE SUPPORT REAL UI LAYOUT v1.224 SOURCE " + ("FAIL" if errors else "PASS"))
    for error in errors: print("- " + error)
    return int(bool(errors))
if __name__ == "__main__": raise SystemExit(main())
