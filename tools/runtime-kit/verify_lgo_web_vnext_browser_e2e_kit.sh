#!/usr/bin/env bash
set -euo pipefail
KIT_INPUT="${1:?path to lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz or .tar.gz.part-aa}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "$KIT_INPUT" == *.part-* ]]; then
  "$SCRIPT_DIR/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh" "$KIT_INPUT"
  KIT="${KIT_INPUT%.part-*}"
else
  KIT="$KIT_INPUT"
fi

SHA="$KIT.sha256"
test -f "$KIT"
test -f "$SHA"
(cd "$(dirname "$KIT")" && sha256sum -c "$(basename "$SHA")")
TMP_MANIFEST="$(mktemp)"
trap 'rm -f "$TMP_MANIFEST"' EXIT
tar -tzf "$KIT" > "$TMP_MANIFEST"
grep -E '(^|/)run-web-checks\.sh$' "$TMP_MANIFEST"
grep -E '(^|/)install-into-repo\.sh$' "$TMP_MANIFEST"
grep -E '(^|/)env\.sh$' "$TMP_MANIFEST"
grep -E '(^|/)bin/node$' "$TMP_MANIFEST"
grep -E '(^|/)bin/pnpm$' "$TMP_MANIFEST"
grep -E '(^|/)cache/corepack/v1/pnpm/10\.15\.0/bin/pnpm\.cjs$' "$TMP_MANIFEST"
grep -E '(^|/)cache/pnpm-store/v10/' "$TMP_MANIFEST"
grep -E '(^|/)cache/ms-playwright/' "$TMP_MANIFEST"
grep -E '(^|/)workspace-node-modules/.*/node_modules/' "$TMP_MANIFEST"
grep -E '(^|/)workspace/pnpm-lock\.yaml$' "$TMP_MANIFEST"
echo "LGO WEB vNext browser/e2e runtime kit verification PASS"
# validator literal: workspace/pnpm-lock.yaml
