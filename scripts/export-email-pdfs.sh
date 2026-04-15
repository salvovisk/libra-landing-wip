#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="$ROOT_DIR/email-previews"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [ ! -x "$CHROME_BIN" ]; then
  echo "Google Chrome not found at: $CHROME_BIN" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

"$CHROME_BIN" \
  --headless \
  --disable-gpu \
  --print-to-pdf="$OUT_DIR/guide-delivery.pdf" \
  "file://$OUT_DIR/guide-delivery.html"

"$CHROME_BIN" \
  --headless \
  --disable-gpu \
  --print-to-pdf="$OUT_DIR/demo-confirmation.pdf" \
  "file://$OUT_DIR/demo-confirmation.html"

echo "Exported PDFs to $OUT_DIR"
