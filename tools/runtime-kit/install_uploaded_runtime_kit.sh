#!/usr/bin/env bash
set -euo pipefail
KIT_INPUT="${1:?path to uploaded lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-*.tar.gz or .tar.gz.part-aa}"
DEST="${2:-/mnt/data/lgo-web-runtime-kit}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [[ "$KIT_INPUT" == *.part-* ]]; then
  "$SCRIPT_DIR/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh" "$KIT_INPUT"
  KIT="${KIT_INPUT%.part-*}"
else
  KIT="$KIT_INPUT"
fi

SHA="${KIT}.sha256"
rm -rf "$DEST"
mkdir -p "$DEST"
if [[ -f "$SHA" ]]; then
  (cd "$(dirname "$KIT")" && sha256sum -c "$(basename "$SHA")")
fi
tar -xzf "$KIT" -C "$DEST"
chmod +x "$DEST"/*.sh "$DEST"/bin/* 2>/dev/null || true
export LGO_WEB_RUNTIME_KIT_ROOT="$DEST"
source "$DEST/env.sh"
hash -r
node --version
pnpm --version
printf 'Installed runtime kit to %s\n' "$DEST"
printf 'Run: export LGO_WEB_RUNTIME_KIT_ROOT=%s && source %s/env.sh\n' "$DEST" "$DEST"
