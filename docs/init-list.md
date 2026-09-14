<!-- docs/init-list.md (markdown) -->

# Creating a new Vertex Order list from the kit template

This repo (`vertex-order/kit`) is the "Use this template" source for a new
game-list site (e.g. `vertex-order/chrono-trigger`). Templating copies kit's
entire tree byte-for-byte, so the new repo starts out with several files
still shaped for *kit*, not for a list. This is the checklist for turning
that copy into a real list repo.

## 1. Run the bootstrap script

```sh
python3 scripts/init-list.py
```

This does exactly one thing: it swaps kit's own `sync.toml` (shaped as
`[publish]` + `[subscribe.platforms]`, for kit's two-way sync with
`vertex-order/platforms`) for `sync.list.toml` (a plain `[subscribe.kit]`
manifest — the shape every list repo actually needs, same as
[`vertex-order/final-fantasy`](https://github.com/vertex-order/final-fantasy)'s
real `sync.toml`). `sync.list.toml` is consumed in the process; `sync.toml`
now holds its content.

Then run `just sync` once, as a sanity check — it should report "nothing to
update," since the tree already matches what it just got copied from.

## 2. Files to change by hand

Nothing past step 1 is automated: what's left is either genuinely per-repo
content, or prose specific enough that generating it would read worse than
writing it from a working example.
[`vertex-order/final-fantasy`](https://github.com/vertex-order/final-fantasy)
and [`vertex-order/kingdom-hearts`](https://github.com/vertex-order/kingdom-hearts)
are the two existing list repos to copy the *shape* of — not kit.

### Rename

- `vertex-order-kit.code-workspace` → `<list-name>-vertex-order.code-workspace`
  — note the word order flips (kit: `vertex-order-kit`, a list:
  `<name>-vertex-order`). Update the `// <filename> (jsonc)` comment on
  line 1 to match; nothing else in the file needs to change.

### Replace (kit's version doesn't apply to a list)

- `LICENSE` — kit's is plain MIT, because kit is 100% code. A list repo has
  both game data/page content *and* code, so it needs a split: `LICENSE`
  becomes the **content** license (final-fantasy's and kingdom-hearts' use
  CC BY-NC-SA 4.0, markdown, "Applies to `data/`... and the page content as
  displayed — not the code"), and a new `LICENSE-CODE` is added (MIT,
  "Applies to the code in this repository"). Copy the pair from an existing
  list rather than adapting kit's single `LICENSE`.

### Rewrite (not vendored, no shortcut)

- `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `.claude/CLAUDE.md` — kit's
  copies describe kit (component library, sync with platforms, no entry
  page). A list's day-to-day is different (edit `site/data/*.js`, preview
  `page.dc.html`, what's vendored vs. yours). Start from final-fantasy's or
  kingdom-hearts' copy, not kit's.
- `NOTICE.md` — kit's records kit's own third-party credits (fonts, UI
  chrome icons). A list's needs the split-license line above, a section
  crediting kit for the vendored components, and every game's own
  wiki/store/rating/icon sources. See final-fantasy's `NOTICE.md` for the
  shape.

### Fill in the per-repo blank

- `.github/ISSUE_TEMPLATE/*`, `.github/PULL_REQUEST_TEMPLATE.md` — each
  needs this repo's own GitHub Discussions URL (and, for the PR template,
  checklist lines specific to a game list). This is already called out in
  kit's `sync.toml` comments — it's why these paths aren't in `[publish]`
  at all; kit's copies are a starting point, not something to subscribe to.

### Your actual content

- `site/data/*.js` — series/entries, `faq.js`, `help-wanted.js`, `index.js`.
  (`platform-icons.js` stays the vendored copy — don't touch it.) There's no
  kit-provided example to override yet, so write these from scratch, using
  final-fantasy's or kingdom-hearts' `site/data/` as the schema reference.
- `site/page.dc.html` — same story: no generic version lives in kit yet, so
  start from an existing list's `page.dc.html` and adapt it. (If kit ever
  grows a shared, data-driven `page.dc.html`, this step should collapse to
  "just write `site/data/*.js`" — that isn't the case today, so this doc
  will need a rewrite when it lands.)

## 3. Everything else

Every other path is now pulled in via this repo's own `[subscribe.kit]` (in
`sync.toml`, courtesy of step 1) — don't hand-edit any of it. Pull future
updates the same way every other list does: `just sync-update kit`.
