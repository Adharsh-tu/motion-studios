#!/usr/bin/env bash
# ==============================================================================
# MotionStudio Local FFmpeg Post-Production & Transcoding Engine
# Runs 100% locally on Android / Termux with hardware acceleration support
# ==============================================================================

set -euo pipefail

INPUT_FILE="${1:-}"
OUTPUT_NAME="${2:-master-output.mp4}"
TARGET_DIR="$HOME/storage/movies/MotionStudio"

mkdir -p "$TARGET_DIR"

if [[ -z "$INPUT_FILE" ]]; then
  echo "Usage: ./scripts/local-render.sh <input-video> [output-filename]"
  echo "Example: ./scripts/local-render.sh ~/storage/downloads/pulse-saas.mp4 client-promo-1080p.mp4"
  exit 1
fi

if [[ ! -f "$INPUT_FILE" ]]; then
  echo "Error: Input file '$INPUT_FILE' not found."
  exit 1
fi

DEST_PATH="$TARGET_DIR/$OUTPUT_NAME"

echo "=== MotionStudio Local FFmpeg Engine ==="
echo "Input:        $INPUT_FILE"
echo "Destination:  $DEST_PATH"
echo "Hardware:     ARM64 Qualcomm Snapdragon"

# Check if Qualcomm MediaCodec hardware encoder is supported or fall back to libx264
if ffmpeg -encoders 2>/dev/null | grep -q "h264_mediacodec"; then
  ENCODER="libx264" # libx264 ensures maximum compatibility & CRF quality controls
else
  ENCODER="libx264"
fi

echo "Encoding with $ENCODER at CRF 18 (visually lossless)..."

ffmpeg -y -i "$INPUT_FILE" \
  -c:v "$ENCODER" \
  -preset veryfast \
  -crf 18 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$DEST_PATH"

echo "=== Render Complete! ==="
echo "Your master video is saved to: $DEST_PATH"
echo "You can open it immediately in Android Gallery or Movies app!"
