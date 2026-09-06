#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh [KIT_BASE_OR_FIRST_PART] [PARTS_DIR]

Examples:
  ./tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh \
    /mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T051617Z.tar.gz

  ./tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh \
    /mnt/data/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-20260905T051617Z.tar.gz.part-aa

When no argument is provided, the script searches /mnt/data for exactly one
lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-aa file.
USAGE
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

INPUT="${1:-}"
PARTS_DIR="${2:-/mnt/data}"

if [[ -z "$INPUT" ]]; then
  mapfile -t FIRST_PARTS < <(find "$PARTS_DIR" -maxdepth 1 -type f -name 'lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz.part-aa' | sort)
  if [[ "${#FIRST_PARTS[@]}" -ne 1 ]]; then
    echo "Expected exactly one runtime-kit .part-aa in $PARTS_DIR, found ${#FIRST_PARTS[@]}" >&2
    printf '%s\n' "${FIRST_PARTS[@]}" >&2
    exit 20
  fi
  INPUT="${FIRST_PARTS[0]}"
fi

if [[ "$INPUT" == *.part-* ]]; then
  BASE="${INPUT%.part-*}"
else
  BASE="$INPUT"
fi

if [[ ! "$BASE" == *.tar.gz ]]; then
  echo "Runtime kit base must end with .tar.gz or .tar.gz.part-xx: $BASE" >&2
  exit 21
fi

BASE_DIR="$(cd "$(dirname "$BASE")" && pwd)"
BASE_NAME="$(basename "$BASE")"
cd "$BASE_DIR"

mapfile -t PARTS < <(find . -maxdepth 1 -type f -name "$BASE_NAME.part-*" | sed 's#^./##' | LC_ALL=C sort)
if [[ "${#PARTS[@]}" -eq 0 ]]; then
  echo "No parts found for $BASE_NAME in $BASE_DIR" >&2
  exit 22
fi

if [[ ! " ${PARTS[*]} " == *" $BASE_NAME.part-aa "* ]]; then
  echo "Missing first part: $BASE_NAME.part-aa" >&2
  exit 23
fi

PARTS_SHA="$BASE_NAME.parts.sha256"
FULL_SHA="$BASE_NAME.sha256"

if [[ -f "$PARTS_SHA" ]]; then
  sha256sum -c "$PARTS_SHA"
else
  echo "Missing parts checksum file: $BASE_DIR/$PARTS_SHA" >&2
  exit 24
fi

TMP="$BASE_NAME.reassembling.$$"
rm -f "$TMP"
cat "${PARTS[@]}" > "$TMP"
mv "$TMP" "$BASE_NAME"

if [[ -f "$FULL_SHA" ]]; then
  sha256sum -c "$FULL_SHA"
else
  echo "Missing full archive checksum file: $BASE_DIR/$FULL_SHA" >&2
  exit 25
fi

tar -tzf "$BASE_NAME" >/dev/null

echo "Reassembled runtime kit: $BASE_DIR/$BASE_NAME"
echo "Verified: $FULL_SHA and $PARTS_SHA"
