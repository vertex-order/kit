<!-- AGENTS.md (markdown) -->

# AGENTS.md

Guidance for AI coding tools working in a **full checkout** of this repo
(Cursor, Windsurf, Claude Code, Aider, …). Human contributors: read
[CONTRIBUTING.md](CONTRIBUTING.md).

> This file is **not** seen by browser-based design tools (Claude Design
> etc.), which pull in only the flat `site/` directory plus
> `.claude/CLAUDE.md`. Instructions for that environment live in
> [`.claude/CLAUDE.md`](.claude/CLAUDE.md) and the header comment of
> [`site/components.js`](site/components.js).

## What this repo is

**kit** is the shared build substrate for the
[Vertex Order](https://vertex-order.github.io) game-list sites: the Design
Component runtime (`site/support.js`), the **Nocturne** design system
(`site/_ds/`), and the `*.dc.html` components (`PlatformIcon.dc.html`,
`BackToTop.dc.html`, `HelpWanted.dc.html`). It's a component library — the
lists compose these; kit does not run anything itself.

There is no entry page here yet. If one is added it follows the vertex-order
convention and is named `page.dc.html` (a component gallery / preview).
`bundle-components.py` detects the entry page — any `*.dc.html` that
references `components.js` — so it needs no per-repo config.

## Cross-repo sync

kit and [`vertex-order/platforms`](https://github.com/vertex-order/platforms)
each **own** some files and **vendor** others from the other — a deliberate
two-way pull. [`sync.toml`](sync.toml) is the manifest.

| Owned here (edit these) | Vendored from `platforms` — don't hand-edit |
| --- | --- |
| `site/support.js`, `site/_ds/`, `site/images/ui/` | `site/PlatformIcon.dc.html` |
| `site/BackToTop.dc.html`, `site/HelpWanted.dc.html` | `site/data/platform-icons.js`, `site/images/platforms/` |
| `scripts/bundle-components.py`, `scripts/sync.py` | `scripts/{normalize-svg,strip-c2pa,trim-svg}.py`, `svgo.config.mjs` |
| `justfile`, `.githooks/`, `.github/` | |

`support.js` and everything under `_ds/` are **vendored Claude Design
output** — never hand-edit them either (the one exception is tuning token
*values* in `_ds/*/styles.css`).

kit re-bundles the vendored `PlatformIcon.dc.html` into its own
`components.js`, so a list repo pulling only `kit` gets the platform icons
too. `platforms` pulls the build substrate back from here for its tuning
bench; it also owns `ZoomedPlatformIcon.dc.html` (2× wrapper), not needed here.

- `just sync` — pull the subscribed files at the pinned `ref`.
- `just sync-check` — what CI runs (`check-vendored.yml`); fails on drift.
- `just sync-update platforms` — repin to platforms' current HEAD, then pull.

Never hand-edit a vendored file. Three guards:

1. **Header comment**, where the format allows one: `Owned by
   vertex-order/platforms — edit here. Vendored elsewhere via sync.toml;
   don't edit the copy there.` (skipped on `*.svg` and JSON.)
2. **Pre-commit** — `sync.py --check-staged` (`.githooks/pre-commit`) refuses
   to commit a staged vendored file that no longer matches its source.
3. **CI** — `check-vendored.yml`, on every PR and on push to `main`.

**A change spanning both repos:** land the platforms-side piece first →
`just sync-update platforms` here → land the kit-side change. In a design
tool (no shell) the vendored files are just the last-synced committed
copies — the header comment is the one guard still visible there.

## The one rule that bites

`site/components.js` is a **generated build artifact** — it inlines every
`site/*.dc.html` component. If you add, change, or remove any `*.dc.html`,
regenerate it:

```sh
just bundle-components   # or: just build  /  python3 scripts/bundle-components.py
```

The pre-commit hook in `.githooks/` also does this (run `just install-hooks`
once per clone), and CI
([`check-generated.yml`](.github/workflows/check-generated.yml)) fails any PR
where it's out of date. Never hand-edit `components.js`.

A page loads `components.js` **only over `file://`** — the fallback for
opening it straight off disk, where `fetch()` of sibling `*.dc.html` is
blocked. Over http(s) the runtime fetches each `*.dc.html` live, so a stale
bundle never changes what renders there — it only needs regenerating to keep
the committed file diff-clean and CI green.

(Ownership: see [Cross-repo sync](#cross-repo-sync) above. `site/components.js`
is generated — `just bundle-components`, never hand-edit.)

## Build / preview / deploy

- No bundler, no Node for the site. Open a page off disk, or `just serve`.
- No Pages deploy configured yet (kit is a library, not a site).
- Recipes: see [`justfile`](justfile).

## SVGs

- `scripts/normalize-svg.py` canonicalizes serialization to self-closing
  tags — run by the pre-commit hook and `just build`, enforced by
  `check-generated.yml`. Pure string pass, no visual change.
- `just trim-svg` is a **separate one-time minify pass**, not part of
  `build`: svgo (`svgo.config.mjs`) then `scripts/trim-svg.py`. Needs Node
  (`npx` fetches svgo on first run). Re-check every changed icon visually.
