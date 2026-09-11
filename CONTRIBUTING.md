<!-- CONTRIBUTING.md (markdown) -->

# Contributing

**kit** is the shared build substrate for the Vertex Order game-list sites —
the Design Component runtime, the Nocturne design system, and the `*.dc.html`
components the lists render with. Changes here ripple to every list, so the
bar is "does this hold up everywhere it's used," not just in one place.

- [What this repo is](#what-this-repo-is)
- [Quick start](#quick-start)
- [Edit a component](#edit-a-component)
- [Restyle (Nocturne tokens)](#restyle-nocturne-tokens)
- [Interface icons](#interface-icons)
- [What you can't edit here](#what-you-cant-edit-here)
- [Cross-repo sync](#cross-repo-sync)
- [Open a PR](#open-a-pr)
- [Licensing](#licensing)
- [Appendix: repo layout](#appendix-repo-layout)

## What this repo is

```
site/
├── support.js              Design Component runtime — vendored, don't edit
├── PlatformIcon.dc.html    one platform icon at listing-row size
├── BackToTop.dc.html       floating back-to-top control
├── HelpWanted.dc.html      renders a "Help Wanted" list
├── components.js           AUTO-GENERATED from the *.dc.html above — don't hand-edit
├── images/ui/              chrome glyphs, inlined into the components
└── _ds/nocturne-.../       Nocturne — styles.css is editable; the rest is vendored
```

`site/data/platform-icons.js` and `site/images/platforms/` are **pulled from
[vertex-order/platforms](https://github.com/vertex-order/platforms)** — not
owned here. Icon artwork and per-platform sizing are tuned there, on the
bench in that repo. `ZoomedPlatformIcon.dc.html` also lives there.

## Quick start

```sh
git clone https://github.com/vertex-order/kit
cd kit
# open any site/*.dc.html in a browser — no build step
```

Optional: [`just`](https://github.com/casey/just) for the `just serve` /
`just build` shortcuts, and `just install-hooks` once to wire up the
pre-commit hook (strips image metadata, normalizes SVGs, regenerates
`site/components.js`).

## Edit a component

The components are readable HTML with `{{ expression }}` bindings, evaluated
at runtime by `support.js`. The `.dc.html` naming is just the format Claude
Design imports/exports — you don't need the tool to edit one.

After changing any `*.dc.html`, regenerate the bundle:

```sh
just bundle-components   # or: just build
```

CI ([`check-generated.yml`](.github/workflows/check-generated.yml)) fails the
PR if `site/components.js` is stale. Over http the runtime fetches each
`*.dc.html` live, so edits show on reload whether or not you regenerated;
opened off disk (`file://`), a refresh shows the *bundled* copy — regenerate
first.

`PlatformIcon.dc.html` is consumed by `platforms` (the tuning bench) and by
every list repo. Test a change to it against real data before you PR.

## Restyle (Nocturne tokens)

Colours, fonts, spacing and radii are CSS custom properties at the top of
`site/_ds/nocturne-*/styles.css`. Change the token *values* there — never
hard-code a hex / font / px a token already carries. Read that folder's
`readme.md` first; it documents the system and a do/don't list.

The rest of `_ds/` (`_ds_bundle.js`, `_ds_manifest.json`,
`_adherence.oxlintrc.json`) is vendored — don't hand-edit; start a
[discussion](https://github.com/vertex-order/kit/discussions) if something
there needs to change.

## Interface icons

UI chrome glyphs live in `site/images/ui/` and are inlined into the
components. If you add or change one, add its section to
[`NOTICE.md`](NOTICE.md) (alphabetical by icon name, with source URL and
licence).

## What you can't edit here

`site/support.js`, `site/components.js`, and everything under `site/_ds/`
except `styles.css` are **generated / vendored Claude Design output** —
overwritten on the next export.

## Cross-repo sync

kit and [`vertex-order/platforms`](https://github.com/vertex-order/platforms)
each own some files and vendor others from the other.
[`sync.toml`](sync.toml) is the manifest.

**Vendored from platforms** (`just sync`, don't hand-edit):
`site/PlatformIcon.dc.html`, `site/data/platform-icons.js`,
`site/images/platforms/`, `scripts/{normalize-svg,strip-c2pa,trim-svg}.py`,
`svgo.config.mjs`. Change those in `platforms`, then `just sync-update platforms`.

- `just sync` — pull the vendored files at the pinned `ref`.
- `just sync-check` — what CI runs
  ([`check-vendored.yml`](.github/workflows/check-vendored.yml)); fails on drift.
- `just sync-update platforms` — repin to platforms' current HEAD, then pull.

kit re-bundles the vendored `PlatformIcon.dc.html` into `components.js`, so a
list repo that pulls only `kit` still gets the platform icons.

Three things stop a hand edit from landing: an `Owned by vertex-order/platforms
— edit here` header comment on the file itself (where the format allows one),
a pre-commit guard (`sync.py --check-staged`) that refuses to commit a
vendored file that no longer matches its source, and the same check in CI.
None of them stop you from *making* the edit locally — only from committing
or merging it — so still read the header comment before you type.

## Open a PR

1. Raise it in [Discussions](https://github.com/vertex-order/kit/discussions)
   first and agree the change there. PRs without a linked Discussion (or
   issue) may be closed unreviewed.
2. Fork, branch off `main`.
3. Make your edit under `site/`.
4. Preview locally. If you touched a `*.dc.html`, run `just bundle-components`
   and commit `site/components.js`.
5. Sign off each commit — `git commit -s` (see [Licensing](#licensing)).
6. PR against `main`, linking the Discussion.

## Licensing

Everything in this repo is [MIT](LICENSE) — what you contribute, and what
ships out.

Exceptions, each with its own terms: the interface icons under
`site/images/ui/` (Bootstrap Icons, MIT), the DC runtime (`site/support.js`)
and Nocturne (`site/_ds/`), both vendored Claude Design output, and the
platform icons pulled from `vertex-order/platforms`. All recorded in
[`NOTICE.md`](NOTICE.md).

Sign off every commit with `git commit -s`. It adds a `Signed-off-by` line
certifying you wrote the change, or otherwise have the right to submit it
under MIT — the
[Developer Certificate of Origin](https://developercertificate.org/).

## Appendix: repo layout

```
site/                       component library (see above)
sync.toml                   cross-repo file-sync manifest
scripts/
├── bundle-components.py     regenerates site/components.js          (owned here)
├── sync.py                  cross-repo vendored-file sync           (owned here)
├── strip-c2pa.py            strips provenance metadata from images   (vendored ← platforms)
├── normalize-svg.py         canonicalizes SVG serialization         (vendored ← platforms)
└── trim-svg.py              one-time: drops subpaths outside viewBox (vendored ← platforms)
svgo.config.mjs              config for `just trim-svg`               (vendored ← platforms)
justfile                     build / bundle-components / sync / serve / clean / install-hooks
.githooks/pre-commit         strips image metadata, normalizes SVGs, regenerates components.js
.github/workflows/
├── check-generated.yml      PR check: components.js / SVG serialization stale
└── check-vendored.yml       PR check: a vendored file drifted from platforms
.github/
├── ISSUE_TEMPLATE/config.yml   points non-collaborators to Discussions
├── PULL_REQUEST_TEMPLATE.md    contributor checklist
└── dependabot.yml              weekly github-actions version bumps
```
