#!/usr/bin/env bash
# Assembles the deployable site into dist/.
#
# Only what the browser needs - never node_modules, src/ or tools/. Run
# `pnpm build` first so assets/css/main.css is current.

set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$root"

rm -rf dist
mkdir -p dist

cp index.html robots.txt CNAME dist/
cp -R assets dist/assets

# Cheap insurance: only matters if Pages is ever switched from the Actions
# artifact back to a branch source, where Jekyll would otherwise run.
touch dist/.nojekyll

echo "dist/ contents:"
find dist -type f | sort | sed 's/^/  /'
