#!/usr/bin/env bash
# ==============================================================================
# MotionStudio Cloud Render Dispatcher (GitHub Actions / Cloud Runners)
# ==============================================================================

set -euo pipefail

COMPOSITION="${1:-MobileAppShowcase}"
CLIENT="${2:-insta-growth}"
RESOLUTION="${3:-9:16-Reel}"

echo "========================================================"
echo "      MotionStudio Cloud Rendering Dispatcher           "
echo "========================================================"
echo "Composition: $COMPOSITION"
echo "Client:      $CLIENT"
echo "Resolution:  $RESOLUTION"
echo "--------------------------------------------------------"

# 1. Check if git remote is configured
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")

if [[ -z "$REMOTE_URL" ]]; then
  echo "⚠️  No remote GitHub repository linked yet."
  echo ""
  echo "To render via GitHub Actions (100% Free):"
  echo "  1. Create a repository on GitHub (e.g. 'motion-studio')"
  echo "  2. Link it to your local project:"
  echo "       git remote add origin https://github.com/<your-username>/<your-repo>.git"
  echo "       git branch -M main"
  echo "       git push -u origin main"
  echo ""
  echo "  3. Once pushed, you can trigger cloud renders anytime via:"
  echo "       gh workflow run render.yml -f composition=$COMPOSITION -f client=$CLIENT"
  echo "     or run it directly from the 'Actions' tab on GitHub.com!"
  echo ""
  echo "--------------------------------------------------------"
  echo "💡 Need an instant MP4 right now without GitHub?"
  echo "   Open your phone browser at http://localhost:5173 and tap 'Export MP4'!"
  echo "========================================================"
  exit 0
fi

# 2. If remote exists and gh is installed, trigger workflow
if command -v gh >/dev/null 2>&1; then
  echo "🚀 Dispatching render workflow to GitHub Actions..."
  gh workflow run render.yml \
    -f composition="$COMPOSITION" \
    -f client="$CLIENT" \
    -f resolution="$RESOLUTION"
  echo "✅ Workflow triggered! Check status at:"
  echo "   gh run list --workflow=render.yml"
else
  echo "Pushing latest commits to GitHub..."
  git push
  echo "✅ Pushed! Head over to your repository's 'Actions' tab to view progress."
fi
