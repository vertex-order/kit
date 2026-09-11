# Assemble the checkable build into build/ (gitignored, matches CI).
# kit is a component library — no entry page yet, so build/ is just the
# normalized site/ tree. Add an index rename here if a page.dc.html lands.
build: strip-metadata normalize-svg bundle-components
    rm -rf build
    mkdir build
    cp -r site/. build/

# Regenerate site/components.js — inlines every *.dc.html so <dc-import>
# resolves without a fetch() (needed for opening a page over file://).
bundle-components:
    python3 scripts/bundle-components.py

# Pull vendored files from the repos in sync.toml [subscribe.*].
sync:
    python3 scripts/sync.py

# CI check: fail if any vendored file drifted from its source.
sync-check:
    python3 scripts/sync.py --check

# Repin a subscription's ref to its current HEAD sha, then pull it.
sync-update name:
    python3 scripts/sync.py --update {{name}}

# Build then serve build/ locally over http.
serve: build
    cd build && python -m http.server 8000

clean:
    rm -rf build

# One-time per clone: wire up repo git hooks (pre-commit strips C2PA metadata
# from images and regenerates site/components.js when a component changes).
install-hooks:
    git config core.hooksPath .githooks

# Strip embedded C2PA provenance metadata from all site images (run after a fresh export).
strip-metadata:
    python3 scripts/strip-c2pa.py site/images

# Normalize SVG empty elements to self-closing form (the icons and Claude
# Design's exporter are inconsistent), for a stable check-in.
normalize-svg:
    python3 scripts/normalize-svg.py site/images

# One-time SVG trimming — NOT part of `build`, run by hand. Two passes:
#   1. svgo — editor cruft, unused defs, inline styles, excess precision
#      (see svgo.config.mjs). Can change rendering; re-check every icon.
#   2. trim-svg.py — drops path subpaths that lie fully outside the viewBox
#      (crops that still carry offscreen artwork). Pixel-safe by
#      construction, bails on anything it can't prove.
# Then normalize-svg.py restores the canonical self-closing form.
# Every changed icon still needs a visual re-check before committing.
# Needs Node — the only task that does: `winget install OpenJS.NodeJS.LTS`
# / `scoop install nodejs-lts` (Windows), `brew install node` (macOS).
# svgo is npm-only — no winget/scoop package — so npx fetches and caches it.
trim-svg:
    npx --yes svgo@3 --config svgo.config.mjs --recursive --folder site/images
    python3 scripts/trim-svg.py site/images
    python3 scripts/normalize-svg.py site/images
