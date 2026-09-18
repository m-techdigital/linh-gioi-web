#!/usr/bin/env python3
"""Source guard for native keyboard practice; not an accessibility certification."""
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
    for marker in markers:
        if marker not in text: ERRORS.append(f"{rel}: missing {marker}")
    return text

def main() -> int:
    ERRORS.clear()
    page = require("apps/web/src/app/accessibility/page.tsx", ("@lgo-web/ui/keyboard-practice.css", "lgo-accessibility-experience"))
    parts = ("<PublicAccessibilityHero/>", "<PublicAccessibilityPractice/>", "<PublicAccessibilityRoutes/>", "<PublicAccessibilityPrinciples/>", "<PublicAccessibilityNotes/>")
    positions = [page.find(p) for p in parts]
    if -1 in positions or positions != sorted(positions): ERRORS.append("accessibility page must start with real hero and native practice")
    for marker in ("accessibility-readability-route-map.svg", "lgo-service-compact-proof-page", "<form"):
        if marker in page: ERRORS.append(f"obsolete/unsafe page composition {marker}")
    experience = require("apps/web/src/components/PublicAccessibilityExperience.tsx", (
        'title="Dễ đọc và dễ thao tác"', "KeyboardPractice", 'nextHref="#accessibility-routes"', "<kbd>Tab</kbd>",
        "Chưa có audit WCAG chính thức", "Không lưu thiết lập cá nhân", "Không tuyên bố chứng nhận pháp lý",
        "Khung thực hành cần JavaScript", "NO_ACCEPTED_BACKEND_CONTRACT", "routeReadabilityChecks.map",
        "accessibilityReadabilityPrinciples.map", "mobileScannabilityRules.map", "focusOrderCheckpoints.map"))
    practice = require("packages/ui/src/keyboard-practice.tsx", (
        '"use client"', "export function KeyboardPractice", "CheckboxField", "SpiritButton", "LinkButton",
        "useState(false)", 'ref={details}', "onToggle", "details.current.open=false", "document.getElementById(inputId)?.focus()",
        'role="status"', 'aria-live="polite"', 'aria-atomic="true"', 'checked={checked}', "Bắt đầu lượt thử", "Không có vùng khóa focus"))
    for name, text in (("experience", experience), ("practice", practice)):
        for marker in ("fetch(", "WebSocket", "localStorage", "sessionStorage", "preventDefault", "onKeyDown", "addEventListener", "<form", "<textarea", "autoFocus"):
            if marker in text: ERRORS.append(f"{name}: forbidden telemetry/settings/key-trap/auto-focus surrogate {marker}")
    require("packages/ui/src/index.ts", ("KeyboardPractice",))
    exports = json.loads(require("packages/ui/package.json"))["exports"]
    if exports.get("./keyboard-practice.css") != "./src/keyboard-practice.css": ERRORS.append("missing shared stylesheet export")
    css = require("packages/ui/src/keyboard-practice.css", ("focus-within", "focus-visible", "outline:3px solid", "min-height:44px", "@media(forced-colors:active)", "Highlight", "prefers-reduced-motion"))
    tokens = set(re.findall(r"(--lgo-[\w-]+)\s*:", require("packages/design-tokens/src/tokens.css")))
    for token in sorted(set(re.findall(r"var\((--lgo-[\w-]+)", css)) - tokens): ERRORS.append(f"undefined canonical token {token}")
    if "Shared accessibility page layout for public readability/focus surfaces" in require("packages/ui/src/service-layout.css"):
        ERRORS.append("superseded accessibility compact block retained")
    require("apps/web/src/components/PublicDesignTargetReference.tsx", ('pathname === "/accessibility"', "PUBLIC_ACCESSIBILITY_TARGET", "Thiết kế cách đọc và thao tác"))
    require("tests/e2e/fe-accessibility-real-ui-layout-v1230.spec.ts", ("STATIC_BUILD", "m.overflow", "toBeFocused", "keyboard.press('Shift+Tab')", "practice.evaluate(e=>e.contains(document.activeElement))", "page.reload()", "outgoing).toEqual([])", "#main-content", "forcedColors:'active'", "violations).toEqual([])", "screenshot"))
    require("docs/execution/WEB-NON-CLAIMS.md", ("No formal WCAG audit certification", "No personal accessibility settings backend", "No assistive-technology lab certification"))
    print("WEB FE ACCESSIBILITY REAL UI LAYOUT v1.230 SOURCE " + ("FAIL" if ERRORS else "PASS"))
    for error in ERRORS: print(f"- {error}")
    return int(bool(ERRORS))

if __name__ == "__main__": raise SystemExit(main())
