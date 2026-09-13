from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
errors = []

def read(path):
    p = ROOT / path
    if not p.exists():
        errors.append(f"missing: {path}")
        return ""
    return p.read_text(encoding="utf-8")

ui = read("packages/ui/src/primitives.tsx")
ui_index = read("packages/ui/src/index.ts")
ui_pkg = read("packages/ui/package.json")
portal_layout = read("apps/portal/src/app/layout.tsx")
ops_layout = read("apps/ops/src/app/layout.tsx")
portal_css = read("apps/portal/src/app/globals.css")
ops_css = read("apps/ops/src/app/globals.css")
portal_pkg = read("apps/portal/package.json")
ops_pkg = read("apps/ops/package.json")
current = read("tools/validate_web_current_state.py")

for symbol in ("WorkspaceAppShell", "WorkspaceNavigation", "WorkspaceBoundaryNotice"):
    if f"export function {symbol}" not in ui:
        errors.append(f"shared UI missing {symbol}")
    if symbol not in ui_index:
        errors.append(f"UI index missing {symbol}")

if '"./shell.css"' not in ui_pkg:
    errors.append("@lgo-web/ui missing shell.css export")

for name, text in (("portal", portal_layout), ("ops", ops_layout)):
    if '@lgo-web/ui/shell.css' not in text:
        errors.append(f"{name} layout does not import shared shell css")
    if "WorkspaceAppShell" not in text:
        errors.append(f"{name} layout does not consume WorkspaceAppShell")

for name, text in (("portal", portal_pkg), ("ops", ops_pkg)):
    if '"@lgo-web/design-tokens"' not in text:
        errors.append(f"{name} package must declare direct design-tokens dependency")

# duplicated shell styling must leave app-local stylesheets
for selector in (".lgo-stack", ".lgo-grid", ".lgo-panel", ".lgo-status-badge"):
    if selector in portal_css:
        errors.append(f"portal css still duplicates shared selector {selector}")
    if selector in ops_css:
        errors.append(f"ops css still duplicates shared selector {selector}")

if "validate_web_shared_app_shell_v127.py" not in current:
    errors.append("master current-state validator does not include v1.27 validator")

if errors:
    print("WEB SHARED APP SHELL v1.27 VALIDATION FAIL")
    for e in errors:
        print(f"- {e}")
    raise SystemExit(1)

print("WEB SHARED APP SHELL v1.27 VALIDATION PASS")
