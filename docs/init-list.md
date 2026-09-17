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

This does two things: it swaps kit's own `sync.toml` (shaped as `[publish]` +
`[subscribe.platforms]`, for kit's two-way sync with
`vertex-order/platforms`) for `sync.list.toml` (a `[subscribe.kit]` +
`[subscribe.platforms]` manifest — the shape every list repo actually
needs: most files from kit, but the platform-icon files pulled directly
from `platforms` rather than transitively through kit, to avoid an extra
repin/PR hop whenever platforms changes. Same shape as
[`vertex-order/final-fantasy`](https://github.com/vertex-order/final-fantasy)'s
real `sync.toml`). `sync.list.toml` is consumed in the process; `sync.toml`
now holds its content.

It also deletes `site/data/*.js` — kit's own fixture data (a made-up
"Wyrmwatch" franchise: 3 series, a handful of entries across games, a book,
and a video, exercising every row type, platform, language, and rating shape)
that exists only so kit's own `page.dc.html` has something to render in
preview. A real list has its own franchise, so this gets removed rather than
adapted — see "Your actual content" below for the schema reference to write
it from scratch. `platform-icons.js` and `common-faq.js` are untouched:
those stay, vendored from `platforms`/kit respectively.

Then run `just sync-restore` once, as a sanity check — it should report
"nothing to update," since the tree already matches what it just got
copied from.

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

### Rewrite (not vendored, no shortcut)

- `site/Intro.dc.html` — the "Where to start?" prose lives directly in this
  component's markup, not in `site/data/`. Kit's own copy renders the
  made-up "Wyrmwatch" fixture text; a new list repo starts with that same
  copy (templating copies the whole tree byte-for-byte) and hand-edits it in
  place — replace the hardcoded headings/paragraphs with the real
  franchise's own "Where to start?" guidance, following the same shape:
  a heading + paragraph per pilcrow-anchored section, with `{{ pXxx }}`
  bound to a `this.buildPilcrow('xxx')` call in the script block for each
  section id you add or rename. `title`, `last-updated`, `tagline`, and
  `stats-text` stay dynamic props computed by `page.dc.html` from
  `site/data/site.js` — leave those alone. Once written, this file is
  yours: it's never subscribed from kit again, so future edits are
  hand-edits, not a vendor pull.

### Theme colors (optional)

- `site/data/theme.css` — the `--color-*` custom properties for light and
  dark mode, loaded after Nocturne's own stylesheet
  (`site/_ds/nocturne-*/styles.css`) so these values win. Not vendored, like
  `Intro.dc.html`: templating copies kit's own values byte-for-byte, so a new
  list repo starts out looking identical to kit, and stays that way until you
  hand-edit this file. Delete a line to fall back to the Nocturne default for
  that token. Every `*.dc.html` component's own helmet links this
  stylesheet too, so a component previewed standalone in Claude Design
  picks up your overrides the same as the full page does.

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

`site/page.dc.html` is now a generic, data-driven entry page vendored from
kit like everything else — don't hand-edit it. What it needs is
`site/data/*.js`: `faq.js`, `help-wanted.js`, `index.js` (series/entries),
plus three that feed `page.dc.html` directly (`platform-icons.js` stays the
vendored copy — don't touch it):

- `site/data/site.js` → `window.SITE_CONFIG` — `name` (franchise display
  name), `tagline` (a parts array — `{ text }` / `{ strong }` / `{ em }` /
  `{ text, url }` / `{ em, url }`), `description` (plain string for
  `<meta name="description">`, rendered by `Metadata.dc.html`; omit to fall
  back to `tagline` flattened to plain text), `lastUpdated` (ISO date, or
  omit for no "Last Updated" line), `foundingYear` (default 2026), `entities`
  (who you're disclaiming affiliation with, e.g. `['Square Enix']`),
  `license` (parts array; omit for the default CC BY-NC-SA 4.0 line), and
  `storagePrefix`. **`storagePrefix` is optional but has teeth**: if you set
  it, that literal string becomes the `localStorage` key prefix for every
  visitor's saved checklist/theme/display preferences — get this right once
  and never change it, since changing it later silently orphans everyone's
  saved data. If you omit it, `page.dc.html` derives a stable one from
  `name` (e.g. "Chrono Trigger" → `chronoTriggerPlayOrder`) — deterministic
  across rebuilds, so it's a safe default for a brand-new repo with no
  visitors yet. A repo migrating from a hand-authored `page.dc.html` that
  already had visitors (as final-fantasy and kingdom-hearts did) must set
  `storagePrefix` explicitly to its existing literal value instead.
- `site/data/credits.js` → `window.CREDITS`, the same parts schema, for the
  CREDITS paragraph `Footer.dc.html` renders.

Write these three from scratch using final-fantasy's or kingdom-hearts'
`site/data/` as the schema reference. The same goes for `index.js` and
`series-*.js` (the actual entries) — final-fantasy's is the in-depth
reference; kit's own fixture (just deleted by step 1) was a much smaller
worked example of the same schema covering every row type, platform,
language, and rating shape, if step 1 hasn't run yet in your checkout it's
worth skimming before it goes.

## 3. Everything else

Every other path is now pulled in via this repo's own `[subscribe.kit]` and
`[subscribe.platforms]` (in `sync.toml`, courtesy of step 1) — don't
hand-edit any of it. Pull future updates the same way every other list
does: `just sync`.
