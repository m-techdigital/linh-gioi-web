"""Logical source reader for modular public content fixtures.

Active source validators use this helper so fixture ownership may be split by
domain without weakening the existing marker/count assertions.
"""
from pathlib import Path

FIXTURE_DOMAIN_FILES = (
    "packages/content/src/fixtures/product.ts",
    "packages/content/src/fixtures/editorial.ts",
    "packages/content/src/fixtures/support.ts",
    "packages/content/src/fixtures/release.ts",
    "packages/content/src/fixtures/historical.ts",
)

def fixture_source(root: Path) -> str:
    parts = []
    for rel in FIXTURE_DOMAIN_FILES:
        path = root / rel
        if not path.is_file():
            continue
        parts.append(path.read_text(encoding="utf-8"))
    return "\n".join(parts)
