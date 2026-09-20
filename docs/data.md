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

| File | Owned by | Schema | What it holds |
| --- | --- | --- | --- |
| `index.js` | list repo | `index.schema.json` | `SERIES_ORDER` — which `series-*.js` files exist and their display order. Rest of the file is fixed loader boilerplate. |
| `series-<code>.js` | list repo | `series.schema.json` | One series' entries (`games[]`) — the actual list content: titles, ratings, platforms, languages, descriptions. The big one. |
| `site.js` | list repo | `site-config.schema.json` | `SITE_CONFIG` — franchise name/tagline/license/footer config for the whole page. |
| `credits.js` | list repo | `credits.schema.json` | `CREDITS` — the attribution paragraph(s) in the footer. |
| `faq.js` | list repo | `faq.schema.json` | `FAQ_ITEMS` — this franchise's own FAQ entries, plus a spread of kit's `FAQ_ITEMS_COMMON`. |
| `help-wanted.js` | list repo | `help-wanted.schema.json` | `HELP_WANTED_ITEMS` — flat list of open tasks shown in the Help Wanted section. |
| `common-faq.js` | kit (vendored) | `faq.schema.json` | `FAQ_ITEMS_COMMON` — FAQ entries identical across every list, folded into each repo's `faq.js`. |
| `catalogs.js` | kit (vendored) | `catalogs.schema.json` | Fixed lookup tables (language names, rating-source labels, Steam review abbreviations) that entry fields reference by code instead of repeating text. |
| `platform-icons.js` | `vertex-order/platforms` (vendored) | `platform-icons.schema.json` | `PLATFORM_ICONS` — the icon/size/label catalog a series entry's `platformGroups[][].key` looks up. |

A **list repo** (final-fantasy, kingdom-hearts, ...) hand-writes
`index.js`/`series-*.js`/`site.js`/`credits.js`/`faq.js`/`help-wanted.js`
for its own franchise. `common-faq.js`/`catalogs.js`/`platform-icons.js`
are vendored — never hand-edit those copies, edit them at the owning repo
and pull via `just sync`.

## A few things worth knowing before opening a schema

- **`series-*.js` entries recurse.** A `games[]` item's shape (title,
  rating, platforms, languages, description, ...) is the same shape used
  for its own `extras[]` (other versions, behind a toggle), `alt` (a
  singular inline "or" row), and `alts[]` (multiple parallel "or" rows). A
  sub-entry can omit its own title/subtitle and inherit its parent's
  wholesale. See `series.schema.json`'s `SeriesEntry` `$def`.
- **There are three different "styled text run" shapes**, not
  interchangeable: `ConfigPart`/`Paragraph` (site config, credits, FAQ
  answers — `common.schema.json`), `DescPart` (entry `description[]` —
  richer, supports `<abbr>`/tooltips), and `BylinePart` (`bylineParts[]` —
  narrower still). Using the wrong one for a given field is a schema
  validation error, not a silent no-op.
- **Ratings have two unrelated modes**: a `scores[]` array (one or more
  independently-linked scores) or a single text/`<abbr>` badge
  (`textOnly`/`kind`). A `rating` object that's neither renders nothing.
- Some real, common fields are annotations with no runtime effect (e.g. a
  language's `native`, a platform item's `noUrl`) — kept valid because
  real data uses them, not because anything reads them.
