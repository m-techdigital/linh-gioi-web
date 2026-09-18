#!/usr/bin/env python3
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

TARGETS = (
    "packages/ui/src/shell.css",
    "packages/ui/src/forms.css",
    "packages/ui/src/data.css",
    "packages/ui/src/progress.css",
    "apps/portal/src/app/globals.css",
    "apps/ops/src/app/globals.css",
)

APP_CSS = {
    "apps/portal/src/app/globals.css",
    "apps/ops/src/app/globals.css",
}

# Small ownership map for the current workspace foundation only.
# Public Web CSS is intentionally outside this checker.
BREAKPOINTS_BY_FILE = {
    "packages/ui/src/shell.css": {"720px", "820px"},
    "packages/ui/src/forms.css": {"640px"},
    "packages/ui/src/data.css": {"700px"},
    "packages/ui/src/progress.css": {"40rem"},
    "apps/portal/src/app/globals.css": {"760px"},
    "apps/ops/src/app/globals.css": {"760px"},
}

SHARED_SELECTOR_PREFIXES = (
    ".lgo-workspace-",
    ".lgo-button",
    ".lgo-link-button",
    ".lgo-panel",
    ".lgo-card",
    ".lgo-state",
    ".lgo-status-badge",
    ".lgo-boundary-banner",
    ".lgo-page-header",
    ".lgo-data-",
    ".lgo-metric-",
    ".lgo-key-value-",
    ".lgo-form-",
    ".lgo-progress-",
)

MEDIA_WIDTH_RE = re.compile(
    r"@media\s*\([^)]*(?:max|min)-width\s*:\s*([0-9.]+(?:px|rem))",
    re.IGNORECASE,
)
FIXED_WIDTH_RE = re.compile(
    r"\b(min-width|width)\s*:\s*([0-9]+(?:\.[0-9]+)?)px\s*;",
    re.IGNORECASE,
)
IMPORT_RE = re.compile(r"@import\s+[\"']([^\"']+)[\"']", re.IGNORECASE)
TOKEN_DEF_RE = re.compile(r"--lgo-[a-z0-9-]+\s*:", re.IGNORECASE)
OVERFLOW_HIDE_RE = re.compile(r"overflow-x\s*:\s*hidden\s*;", re.IGNORECASE)
WIDTH_100VW_RE = re.compile(r"\bwidth\s*:\s*100vw\s*;", re.IGNORECASE)
SELECTOR_BLOCK_RE = re.compile(r"(^|\})([^@{}]+)\{", re.MULTILINE)


@dataclass(frozen=True)
class Issue:
    path: str
    line: int
    message: str


def _line(text: str, offset: int) -> int:
    return text.count("\n", 0, offset) + 1


def _issue(path: str, text: str, match: re.Match[str], message: str) -> Issue:
    return Issue(path=path, line=_line(text, match.start()), message=message)


def _has_owned_scroll_marker(text: str, offset: int) -> bool:
    prefix = text[max(0, offset - 240):offset]
    return "style-boundary-owned-scroll:" in prefix


def _scan_breakpoints(path: str, text: str) -> list[Issue]:
    allowed = BREAKPOINTS_BY_FILE.get(path, set())
    issues: list[Issue] = []
    for match in MEDIA_WIDTH_RE.finditer(text):
        value = match.group(1).lower()
        if value not in allowed:
            issues.append(_issue(
                path,
                text,
                match,
                f"unapproved workspace breakpoint {value}; use the owning shared/profile breakpoint or document a deliberate owner change",
            ))
    return issues


def _scan_app_ownership(path: str, text: str) -> list[Issue]:
    if path not in APP_CSS:
        return []

    issues: list[Issue] = []

    for match in TOKEN_DEF_RE.finditer(text):
        issues.append(_issue(
            path,
            text,
            match,
            "app-local CSS redefines a shared token; move --lgo-* ownership to the shared design-token layer",
        ))

    for match in IMPORT_RE.finditer(text):
        imported = match.group(1).replace("\\", "/")
        cross_app = (
            "apps/portal/" in path and ("ops/src/" in imported or "/ops/" in imported)
        ) or (
            "apps/ops/" in path and ("portal/src/" in imported or "/portal/" in imported)
        )
        if cross_app:
            issues.append(_issue(
                path,
                text,
                match,
                "cross-app style import is forbidden; shared styles belong in packages/ui or design-tokens",
            ))

    for match in SELECTOR_BLOCK_RE.finditer(text):
        selector = match.group(2).strip()
        if any(prefix in selector for prefix in SHARED_SELECTOR_PREFIXES):
            issues.append(_issue(
                path,
                text,
                match,
                f"app-local CSS overrides shared selector ownership: {selector.splitlines()[0].strip()}",
            ))

    return issues


def _scan_overflow_and_fixed_width(path: str, text: str) -> list[Issue]:
    issues: list[Issue] = []

    for match in OVERFLOW_HIDE_RE.finditer(text):
        issues.append(_issue(
            path,
            text,
            match,
            "overflow-x:hidden is not an accepted workspace responsive fix; resolve the owning layout/component instead",
        ))

    for match in WIDTH_100VW_RE.finditer(text):
        issues.append(_issue(
            path,
            text,
            match,
            "100vw width is unsafe inside workspace shells and can create horizontal overflow",
        ))

    for match in FIXED_WIDTH_RE.finditer(text):
        prop = match.group(1).lower()
        value = float(match.group(2))
        if value < 600:
            continue
        if _has_owned_scroll_marker(text, match.start()):
            continue
        issues.append(_issue(
            path,
            text,
            match,
            f"large fixed pixel width {prop}:{value:g}px has no style-boundary owner marker",
        ))

    return issues


def scan_text(path: str, text: str) -> list[Issue]:
    normalized = path.replace("\\", "/")
    issues: list[Issue] = []
    issues.extend(_scan_breakpoints(normalized, text))
    issues.extend(_scan_app_ownership(normalized, text))
    issues.extend(_scan_overflow_and_fixed_width(normalized, text))
    return issues


def main() -> int:
    issues: list[Issue] = []
    for rel in TARGETS:
        path = ROOT / rel
        if not path.is_file():
            issues.append(Issue(rel, 0, "workspace style owner file is missing"))
            continue
        issues.extend(scan_text(rel, path.read_text(encoding="utf-8")))

    if issues:
        print("WEB WORKSPACE STYLE BOUNDARY VALIDATION FAIL")
        for issue in issues:
            print(f"- {issue.path}:{issue.line}: {issue.message}")
        return 1

    print("WEB WORKSPACE STYLE BOUNDARY VALIDATION PASS")
    print(f"- scanned {len(TARGETS)} owned workspace CSS files")
    print("- public Web CSS intentionally out of scope")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
