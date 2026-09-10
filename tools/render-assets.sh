#!/usr/bin/env bash
# Regenerates the two raster assets from their HTML sources.
#
#   assets/og.png       1200x630 link-preview card  <- tools/og.html
#   assets/icon-180.png iOS home-screen icon        <- tools/icon.html (favicon.svg)
#
# Both are committed, so you only need this after changing the design.
# Requires Google Chrome.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [ ! -x "$chrome" ]; then
  echo "Chrome not found at: $chrome" >&2
  echo "Set CHROME=/path/to/chrome and try again." >&2
  exit 1
fi

render() {
  local src=$1 out=$2 w=$3 h=$4
  "$chrome" --headless --disable-gpu --hide-scrollbars \
    --virtual-time-budget=12000 --window-size="$w,$h" \
    --screenshot="$root/$out" "file://$root/$src" 2>/dev/null
  echo "  $out  ${w}x${h}"
}

echo "Rendering assets:"
render tools/og.html   assets/og.png       1200 630
render tools/icon.html assets/icon-180.png  180 180
echo "Done."
