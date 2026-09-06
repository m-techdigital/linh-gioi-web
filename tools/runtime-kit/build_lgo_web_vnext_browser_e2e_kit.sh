#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT_DIR="${LGO_WEB_RUNTIME_KIT_OUT_DIR:-$ROOT/out/runtime-kit}"
STAMP="${LGO_WEB_RUNTIME_KIT_STAMP:-$(date -u +%Y%m%dT%H%M%SZ)}"
PLATFORM="${LGO_WEB_RUNTIME_KIT_PLATFORM:-linux/amd64}"
SPLIT_SIZE="${LGO_WEB_RUNTIME_KIT_SPLIT_SIZE:-450m}"
NO_SPLIT="${LGO_WEB_RUNTIME_KIT_NO_SPLIT:-0}"
IMAGE="lgo-web-vnext-browser-e2e-kit:$STAMP"
CONTAINER="lgo-web-vnext-browser-e2e-kit-$STAMP"
KIT_NAME="lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64-$STAMP.tar.gz"

mkdir -p "$OUT_DIR"
cd "$ROOT"

echo "Building LGO Web runtime kit"
echo "ROOT=$ROOT"
echo "OUT_DIR=$OUT_DIR"
echo "PLATFORM=$PLATFORM"
echo "SPLIT_SIZE=$SPLIT_SIZE"
echo "IMAGE=$IMAGE"

docker build \
  --platform "$PLATFORM" \
  --build-arg TARGETPLATFORM="$PLATFORM" \
  -f tools/runtime-kit/Dockerfile.lgo-web-vnext-browser-e2e-kit \
  -t "$IMAGE" \
  .

docker create --name "$CONTAINER" "$IMAGE" >/dev/null
trap 'docker rm -f "$CONTAINER" >/dev/null 2>&1 || true' EXIT

docker cp "$CONTAINER:/tmp/lgo-web-vnext-browser-e2e-runtime-kit-linux-amd64.tar.gz" "$OUT_DIR/$KIT_NAME"
(
  cd "$OUT_DIR"
  rm -f "$KIT_NAME.part-"* "$KIT_NAME.parts.sha256" "$KIT_NAME.MANIFEST.txt" UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
  sha256sum "$KIT_NAME" > "$KIT_NAME.sha256"
  tar -tzf "$KIT_NAME" | sort > "$KIT_NAME.MANIFEST.txt"

  if [[ "$NO_SPLIT" != "1" ]]; then
    split -b "$SPLIT_SIZE" "$KIT_NAME" "$KIT_NAME.part-"
    sha256sum "$KIT_NAME".part-* > "$KIT_NAME.parts.sha256"
  fi

  cat > UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt <<EOF_UPLOAD
Upload these files to ChatGPT sandbox.
Do NOT upload the full .tar.gz if it is larger than the platform limit.
Upload the split parts and checksum sidecars instead.

Required split upload files:
EOF_UPLOAD

  if [[ "$NO_SPLIT" != "1" ]]; then
    for part in "$KIT_NAME".part-*; do
      printf '%s\n' "$(basename "$part")" >> UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt
    done
    cat >> UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt <<EOF_UPLOAD
$KIT_NAME.parts.sha256
$KIT_NAME.sha256
$KIT_NAME.MANIFEST.txt

Optional local-only file, upload only if small enough:
$KIT_NAME

Sandbox reassemble command after upload:
bash tools/runtime-kit/reassemble_lgo_web_vnext_browser_e2e_kit_parts.sh /mnt/data/$KIT_NAME.part-aa
bash tools/runtime-kit/verify_lgo_web_vnext_browser_e2e_kit.sh /mnt/data/$KIT_NAME
bash tools/runtime-kit/install_uploaded_runtime_kit.sh /mnt/data/$KIT_NAME /mnt/data/lgo-web-runtime-kit
EOF_UPLOAD
  else
    cat >> UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt <<EOF_UPLOAD
$KIT_NAME
$KIT_NAME.sha256
$KIT_NAME.MANIFEST.txt
EOF_UPLOAD
  fi
)

echo "Built runtime kit: $OUT_DIR/$KIT_NAME"
echo "Full archive SHA: $OUT_DIR/$KIT_NAME.sha256"
if [[ "$NO_SPLIT" != "1" ]]; then
  echo "Split parts created with size $SPLIT_SIZE:"
  ls -lh "$OUT_DIR/$KIT_NAME".part-* "$OUT_DIR/$KIT_NAME.parts.sha256"
  echo "Upload split parts + .parts.sha256 + .sha256 + .MANIFEST.txt."
else
  echo "NO_SPLIT=1: upload the full archive if it is within platform limits."
fi
echo "Upload manifest: $OUT_DIR/UPLOAD-THESE-LGO-WEB-RUNTIME-KIT-FILES.txt"
echo "Sidecar pattern: tar.gz.sha256 and tar.gz.parts.sha256"
