<!-- .claude/CLAUDE.md (markdown) -->

## What this repo is

**kit** — the shared build substrate for the Vertex Order game-list sites:
the Design Component runtime (`site/support.js`), the **Nocturne** design
system (`site/_ds/`), and the `*.dc.html` components the lists render with.
A component library. It doesn't run anything itself.

## Ownership

`sync.toml` is the manifest for the two-way pull with
`vertex-order/platforms`.

Owned and edited here:

- `site/BackToTop.dc.html`, `site/HelpWanted.dc.html` — the generic components.
- `site/_ds/nocturne-*/styles.css` — design token *values* (the rest of the
  file is generated Claude Design output).
- `site/images/ui/` — chrome glyphs (arrow-up, sun, moon-stars).
- `scripts/bundle-components.py`, `scripts/sync.py`, `scripts/ssr-render.js`,
  `package.json`/`package-lock.json` (Node deps for `ssr-render.js` only —
  never shipped to the browser).

Vendored from `vertex-order/platforms` (`just sync`), **never hand-edit**:
`site/PlatformIcon.dc.html`, `site/data/platform-icons.js`,
`site/images/platforms/`.

`scripts/{normalize-svg,strip-c2pa,trim-svg}.py` and `svgo.config.mjs` are
**kit-owned**, not vendored from platforms despite the name — kit's own
`sync.toml` doesn't subscribe to them from anywhere.

Vendored Claude Design output, **never hand-edit**: `site/support.js`,
`site/components.js` (generated), everything under `site/_ds/` except
`styles.css`.

kit re-bundles the vendored `PlatformIcon.dc.html` into its own
`components.js`, for its own tuning-bench preview only — list repos don't
depend on that bundling. A list repo pulls the platform-icon files directly
from `platforms` (its own `[subscribe.platforms]`, see `sync.list.toml`),
not transitively through kit; that's a separate, direct hop specifically to
avoid an extra repin/PR wait whenever platforms changes. `platforms` pulls
the build substrate back from here and owns `ZoomedPlatformIcon.dc.html`
(2× wrapper), not needed here.

`site/page.dc.html` is kit's own entry page — a "tuning bench" that renders
kit's fixture data (`site/data/`) for the component-gallery preview. It's
also the generic, data-driven entry-page template every list repo pulls
verbatim (it's in `sync.toml`'s `[publish].paths`); a list repo supplies its
own `site/data/index.js` + `series-*.js` and gets rendering for free.
`bundle-components.py` detects the entry page (any `*.dc.html` referencing
`components.js`), so it needs no per-repo config.

## Regenerating components.js

`site/components.js` is a **derived build artifact** — it inlines every
`site/*.dc.html` component (all except an entry page `page.dc.html`, if one
exists). The `*.dc.html` files are the single source of truth. Never
hand-edit `components.js`.

### When it matters

A page loads `components.js` **only over `file://`**, where the runtime's
`fetch()` for sibling `*.dc.html` is blocked. Over **http(s)** — Pages,
`just serve`, **and the Claude Design preview** — the runtime fetches each
`*.dc.html` live, so a stale `components.js` **cannot** cause wrong rendering
there. Editing a `*.dc.html` shows up in the preview immediately.

Regenerate it to keep the committed artifact honest — the pre-commit hook
and CI (`.github/workflows/check-generated.yml`) do, and CI fails the PR
until it matches. If someone opens a page over `file://` and refreshes, they
see the stale bundle until it's regenerated.

### How to regenerate

**Full checkout** (has `scripts/`, `justfile`, `.githooks/`):

```sh
just bundle-components                 # or: just build
python3 scripts/bundle-components.py   # same thing, if `just` isn't installed
```

**Design tool / flat working directory** (no shell) — reproduce the script's
exact output by hand so it stays diff-clean. Read every `*.dc.html` except an
entry page, then overwrite `components.js` to match the shape documented in
the header comment at the top of the current `components.js`:

- One `C` entry per `*.dc.html` (excluding `page.dc.html`), sorted by
  filename.
- Key is `"./" + filename`. Value is the file's full source, JSON-stringified
  (2-space indent, `ensure_ascii=False`).
- Keep the IIFE + `var C` + loop shape and the `window.__resourceBlobs`
  global exactly — `support.js` reads that global; a different name or shape
  silently no-ops.
- The header comment at the top of the current `components.js` is the
  authoritative spec.

## SSR prerender

`just build`'s final step runs `scripts/ssr-render.js`, which boots the real
support.js DC runtime inside jsdom against build-time defaults (no
localStorage yet) and serializes the settled result back over
`build/index.html`, so the deployed page paints real content immediately
instead of the blank shell support.js fills in after React + data load. Not
a reimplementation of anything — same support.js, same React, same
`*.dc.html` components, just run once at build time against default state.
Client boot is unchanged (support.js still does a full non-hydrating
`ReactDOM.createRoot` remount on load), so this changes no runtime behavior,
only what's already in the HTML before that remount happens.

`build/` stays gitignored, generated fresh by CI at deploy time
(`.github/workflows/static.yml` → `just build`) — nothing from this step is
ever committed. Needs Node; CI always has it (GitHub Actions' runners ship
it), so the deployed site always gets the prerender. Locally, `just
build`/`just serve` degrade gracefully without Node on PATH — same
blank-then-hydrate behavior as before this feature, not a failure.

## SVGs

`site/images/**/*.svg` check in minified and self-closing. In a full checkout
a pre-commit hook plus a one-time `just trim-svg` pass maintain that; in a
design tool (no shell) neither runs, so keep hand edits minimal and don't
paste a pretty-printed file over a minified one. Re-serialization
(self-closing vs `</path>`, re-indent) is cosmetic — the hook and CI
normalize it on commit.
