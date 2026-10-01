<!-- docs/data.md (markdown) -->

# `site/data/*.js` files

Broad strokes only — for exact fields see `schemas/*.schema.json`
(machine-readable, one schema per file below), and for worked examples see
`vertex-order/final-fantasy`'s or `vertex-order/kingdom-hearts`' real
`site/data/`. Don't duplicate schema-level field detail here; if this doc
and a schema ever disagree, the schema wins — fix this doc, not the other
way round.

Every file here is a classic `<script>` (not an ES module) assigning
`window.*` global(s) — plain JS, not JSON, so page.dc.html and friends can
load it over `file://` too.

Each file below points at its own schema with a `// schema: <name>.schema.json`
comment before the assignment it covers — `scripts/validate-data.py`
(`just check-data`) scans for that comment and validates against whatever
it names, so the table below is a description of current convention, not
something the validator reads. A file with no such comment (or one naming
a schema outside this directory, e.g. a repo's own local schema) is simply
not covered by kit's default schemas/ — see `schemas/README.md`.

| File | Owned by | Schema | What it holds |
| --- | --- | --- | --- |
| `index.js` | list repo | `index.schema.json` | `GROUP_ORDER` — which `group-*.js` files exist and their display order. Rest of the file is fixed loader boilerplate. |
| `group-<code>.js` | list repo | `group.schema.json` | One group's entries (`games[]`) — the actual list content: titles, ratings, platforms, languages, descriptions. The big one. |
| `site.js` | list repo | `site-config.schema.json` | `SITE_CONFIG` — franchise name/tagline/license/footer config for the whole page. |
| `credits.js` | list repo | `credits.schema.json` | `CREDITS` — the attribution paragraph(s) in the footer. |
| `faq.js` | list repo | `faq.schema.json` | `FAQ_ITEMS` — this franchise's own FAQ entries, plus a spread of kit's `FAQ_ITEMS_COMMON`. |
| `help-wanted.js` | list repo | `help-wanted.schema.json` | `HELP_WANTED_ITEMS` — flat list of open tasks shown in the Help Wanted section. |
| `common-faq.js` | kit (vendored) | `faq.schema.json` | `FAQ_ITEMS_COMMON` — FAQ entries identical across every list, folded into each repo's `faq.js`. |
| `catalogs.js` | kit (vendored) | `catalogs.schema.json` | Fixed lookup tables (language names, rating-source labels, Steam review abbreviations) that entry fields reference by code instead of repeating text. |
| `platform-icons.js` | `vertex-order/platforms` (vendored) | `platform-icons.schema.json` | `PLATFORM_ICONS` — the icon/size/label catalog a group entry's `platformGroups[][].key` looks up. |

A **list repo** (final-fantasy, kingdom-hearts, ...) hand-writes
`index.js`/`group-*.js`/`site.js`/`credits.js`/`faq.js`/`help-wanted.js`
for its own franchise. `common-faq.js`/`catalogs.js`/`platform-icons.js`
are vendored — never hand-edit those copies, edit them at the owning repo
and pull via `just sync`.

## A few things worth knowing before opening a schema

- **`group-*.js` entries recurse.** A `games[]` item's shape (title,
  rating, platforms, languages, description, ...) is the same shape used
  for its own `extras[]` (other versions, behind a toggle), `alt` (a
  singular inline "or" row), and `alts[]` (multiple parallel "or" rows). A
  sub-entry can omit its own title/subtitle and inherit its parent's
  wholesale. See `group.schema.json`'s `GroupEntry` `$def`.
- **There are three different "styled text run" shapes**, not
  interchangeable: `ConfigPart`/`Paragraph` (site config, credits, FAQ
  answers — `common.schema.json`), `DescPart` (entry `description[]` —
  richer, supports `<abbr>`/tooltips), and `BylinePart` (`bylineParts[]` —
  narrower still). Using the wrong one for a given field is a schema
  validation error, not a silent no-op.
- **A `Prose` paragraph's own array can mix two kinds of item**: a bare
  `DescPart` object (`{ text: '...' }`/`{ emLinkText: '...', ... }`,
  today's flat run — concatenated exactly as written, never auto-spaced)
  and a "sentence" (a bare string, or a nested `DescPart[]`) — splitting a
  paragraph into sentences purely for editing clarity. Consecutive
  sentences get a convenience space auto-inserted at their seam when
  neither side already has one there (`'Hi.'` next to `'Ho.'` joins as
  `'Hi. Ho.'`, same as `'Hi. '` next to `'Ho.'` or `'Hi.'` next to
  `' Ho.'` — never a double space); plain `DescPart` objects are never
  touched by this, so e.g. a link immediately followed by its own trailing
  period stays glued with no inserted space, exactly as authored. Only the
  *outer* array (`versionDesc`/`mediaDesc`/group `note` itself) creates an
  actual new, visually distinct paragraph — promote a sentence to its own
  outer-array item instead if it's meant to read as a separate paragraph,
  don't rely on the inner grouping for that.
- **Ratings have two unrelated modes**: a `scores[]` array (one or more
  independently-linked scores) or a single text/`<abbr>` badge
  (`textOnly`/`kind`). A `rating` object that's neither renders nothing.
- Some real, common fields are annotations with no runtime effect (e.g. a
  language's `native`, a platform item's `noUrl`) — kept valid because
  real data uses them, not because anything reads them.
- **`DateValue`'s `approx`/`ongoing` flags apply to the whole value, not
  per side** of a `{start,end}` range — there's no `startApprox`/`endApprox`
  split. `ongoing` (a franchise/series expected to get more entries) is
  unrelated to `releaseDate`'s future-dated / `Upcoming` machinery (see
  docs/upcoming.md), which is about one specific unreleased title.

## Choosing a rating when more than one exists

Applies to every entry with a `ratings`/`scores[]` field — games, books,
films, anything — not just books/comics. See docs/sources.md for which
*site* wins by default per media type; this is about picking *within*
that once several candidate numbers are on the table.

- **Minimum ~10 ratings/reviews to count.** Below that, the number is
  noise — skip it even if it's otherwise the "right" source.
- **Confidence (sample size) beats site-priority when the gap is an
  order of magnitude or more** — 1.3k ratings beats 10 ratings outright,
  regardless of which site each is on. A close gap (1.3k vs 1.5k) isn't
  a clear win either way — judgment call, fall back to the normal
  site-priority pecking order.
- **Not concerned with matching the rating to this exact print/edition.**
  Use the best-confidence rating found across any version/edition of the
  title, not necessarily the one for this specific one — e.g. a book's
  displayed rating can come from an omnibus edition's page even though
  the entry itself represents the individual volumes.
